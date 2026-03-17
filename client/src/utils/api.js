import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.get('/api/auth/logout'),
};

export const portfolioAPI = {
  getAll: () => api.get('/api/portfolio'),
  getById: (id) => api.get(`/api/portfolio/${id}`),
  create: (data) => api.post('/api/portfolio', data),
  update: (id, data) => api.put(`/api/portfolio/${id}`, data),
  delete: (id) => api.delete(`/api/portfolio/${id}`),
};

export const skillsAPI = {
  getAll: () => api.get('/api/skills'),
  create: (data) => api.post('/api/skills', data),
  delete: (id) => api.delete(`/api/skills/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/api/contact', data),
};

export default api;