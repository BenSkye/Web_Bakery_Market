import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'https://web-bakery-market.onrender.com/v1/api',
  // baseURL: 'http://localhost:2024/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(function (config) {
  config.headers['x-api-key'] = Cookies.get('x-api-key') || '';
  config.headers['x-client-id'] = Cookies.get('x-client-id') || '';
  config.headers['authorization'] = Cookies.get('authorization') || '';

  return config;
}, function (error) {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const originalRequest = error.config;
  console.log('error::', error)
  if ((error.response.status === 401 || error.response.status === 403 || error.response.data.message === "jwt expired") && !originalRequest._retry) {
    console.log('run error 401::')

    originalRequest._retry = true;
    const refreshToken = Cookies.get('x-refresh-token');

    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      const response = await apiClient.post('/user/handleRefreshToken', {}, {
        headers: {
          'x-client-id': Cookies.get('x-client-id') || '',
          'x-api-key': Cookies.get('x-api-key') || '',
          'x-refresh-token': refreshToken
        }
      });

      console.log('response::', response)
      Cookies.set('authorization', response.data.metadata.tokens.accessToken);
      Cookies.set('x-refresh-token', response.data.metadata.tokens.refreshToken);
      originalRequest.headers['authorization'] = response.data.metadata.tokens.accessToken;
      return apiClient(originalRequest);

    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export default apiClient;