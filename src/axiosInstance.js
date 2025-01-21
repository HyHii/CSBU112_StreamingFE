import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "https://csbu-software-design-be.onrender.com/api",
});

// Thêm interceptor để xử lý lỗi token hết hạn
api.interceptors.response.use(
  (response) => {
    // Nếu phản hồi thành công, trả về response như bình thường
    return response;
  },
  (error) => {
    const navigate = useNavigate();

    // Kiểm tra mã lỗi từ server
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Token hết hạn hoặc không hợp lệ. Chuyển hướng về Login.");
      
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("name");

      // Chuyển hướng về trang Login
      navigate("/login");
    }

    // Tiếp tục ném lỗi để các nơi khác cũng nhận được
    return Promise.reject(error);
  }
);

export default api;
