import axios from 'axios';
import Cookies from 'js-cookie';
const apiClient = axios.create({
  baseURL: 'http://localhost:2024/v1/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': Cookies.get('x-api-key') || '',
    'x-client-id': Cookies.get('x-client-id') || '',
    'authorization': Cookies.get('authorization') || '',
    'x-refresh-token': Cookies.get('x-refresh-token') || '',
  },
});

export default apiClient;