import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


 

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

// Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., logout user)
      // localStorage.removeItem('token');
      sessionStorage.clear()
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    api.get<T>(url, config).then(response => response.data),
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    api.post<T>(url, data, config).then(response => response.data),
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    api.put<T>(url, data, config).then(response => response.data),
    
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    api.delete<T>(url, config).then(response => response.data),
};

export default api;