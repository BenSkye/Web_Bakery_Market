import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'https://web-bakery-market.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(function (config) {
  config.headers['x-api-key'] = Cookies.get('x-api-key') || '';
  config.headers['x-client-id'] = Cookies.get('x-client-id') || '';
  config.headers['authorization'] = Cookies.get('authorization') || '';
  config.headers['x-refresh-token'] = Cookies.get('x-refresh-token') || '';

  return config;
}, function (error) {
  return Promise.reject(error);
});

export default apiClient;