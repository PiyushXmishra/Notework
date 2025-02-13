import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});




// Add request interceptors (optional)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify request config before sending (e.g., add auth token)
//     const token = localStorage.getItem('authToken'); // Example: Get token from localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptors (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
