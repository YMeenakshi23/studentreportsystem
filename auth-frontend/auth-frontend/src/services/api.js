import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8088/api', // Or your correct backend port
});

// THIS PART IS CRUCIAL
// It finds the token in localStorage and adds it to the header of every request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;