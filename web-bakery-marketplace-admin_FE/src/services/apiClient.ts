import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://66ab79e1636a4840d7cad37f.mockapi.io/merci/api/v1',  // URL to mock API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;