import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

export default httpClient;
