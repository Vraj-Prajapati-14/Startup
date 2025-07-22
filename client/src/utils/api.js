import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // This will be your backend URL in production
});

export default api;