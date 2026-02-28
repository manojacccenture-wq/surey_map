import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  
  console.log('import.meta.env.VITE_API_URL: ', import.meta.env.VITE_API_URL)
export const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API === "true";

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling here
    if (error.response?.status === 401) {
      // Optionally emit logout event
    }
    return Promise.reject(error);
  }
);

export default apiClient;