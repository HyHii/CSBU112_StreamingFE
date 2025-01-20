import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";

const api = axios.create({
  baseURL: "https://csbu-software-design-be.onrender.com/api",
});

// ✅ Interceptor bắt lỗi 401 và tự động đăng xuất
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn, đăng xuất...");
      const { logout } = useContext(AuthContext);
      logout(); // Gọi logout để xóa token & chuyển hướng
    }
    return Promise.reject(error);
  }
);

export default api;
