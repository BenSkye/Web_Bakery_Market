import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:2024/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;