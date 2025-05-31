import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
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

// Auth services
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
  },
};

// User services
export const users = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Budget services
export const budgets = {
  create: (data) => api.post('/budgets', data),
  getAll: () => api.get('/budgets'),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`),
};

// Expense services
export const expenses = {
  create: (data) => api.post('/expenses', data),
  getAll: () => api.get('/expenses'),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

// Investment services
export const investments = {
  create: (data) => api.post('/investments', data),
  getAll: () => api.get('/investments'),
  update: (id, data) => api.put(`/investments/${id}`, data),
  delete: (id) => api.delete(`/investments/${id}`),
};

// Savings services
export const savings = {
  create: (data) => api.post('/savings', data),
  getAll: () => api.get('/savings'),
  update: (id, data) => api.put(`/savings/${id}`, data),
  delete: (id) => api.delete(`/savings/${id}`),
};

// Leaderboard services
export const leaderboard = {
  getAll: () => api.get('/leaderboard'),
  getUserRank: () => api.get('/leaderboard/rank'),
};

export default api; 