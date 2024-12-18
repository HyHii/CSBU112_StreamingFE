import axios from "axios";

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: "https://marmoset-unbiased-logically.ngrok-free.app/api", // URL gốc của API
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm Interceptor để đính kèm token vào mọi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;