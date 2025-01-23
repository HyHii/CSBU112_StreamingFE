import axios from "axios";

// Tạo instance của Axios
const api = axios.create({
  baseURL: "https://csbu-software-design-be.onrender.com/api",
});

// Interceptor để kiểm tra lỗi 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn, tự động logout...");
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
      localStorage.removeItem("name");
      window.location.href = "/login"; // Chuyển hướng về trang login
    }
    return Promise.reject(error);
  }
);

export default api;
