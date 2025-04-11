// src/services/api.ts
import axios from 'axios';
import authService from '@/services/authService';

const API = axios.create({
  // baseURL: 'http://192.168.1.178:8000',
  baseURL: 'http://172.20.10.4:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
API.interceptors.request.use(
  async (config) => {
    const token = await authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      // Clear token on auth errors
      await authService.removeToken();
      // Handle redirection or state updates for auth failure
    }
    return Promise.reject(error);
  }
);

export default API;
