import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const portfolioAPI = {
  getAll: () => api.get('/api/portfolio'),
  getById: (id) => api.get(`/api/portfolio/${id}`),
  create: (data) => api.post('/api/portfolio', data),
  update: (id, data) => api.put(`/api/portfolio/${id}`, data),
  delete: (id) => api.delete(`/api/portfolio/${id}`),
  uploadImage: (formData) => api.post('/api/portfolio/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const skillsAPI = {
  getAll: () => api.get('/api/skills'),
  create: (data) => api.post('/api/skills', data),
  update: (id, data) => api.put(`/api/skills/${id}`, data),
  delete: (id) => api.delete(`/api/skills/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/contact'),
  markAsRead: (id) => api.put(`/api/contact/${id}/read`),
  delete: (id) => api.delete(`/api/contact/${id}`),
};

export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getProfile: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/profile', data),
};

export default api;