import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoList = () => {
  const [items, setItems] = useState([]); // Lưu danh sách dữ liệu
  const [isLoaded, setIsLoaded] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Xử lý lỗi

  const api = "https://marmoset-unbiased-logically.ngrok-free.app/api/stream"; // Thay bằng URL đúng
  const token =""

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data); // Lưu dữ liệu vào state
        setIsLoaded(true); // Đánh dấu dữ liệu đã tải xong
      } catch (err) {
        setError(err.message); // Ghi nhận lỗi nếu xảy ra
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []); // Chạy một lần khi component được render

  if (!isLoaded) return <p>Loading...</p>; // Hiển thị khi đang tải
  if (error) return <p>Error: {error}</p>; // Hiển thị khi có lỗi

  return (
    <div>
      <h2>Live Streams</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>Title: {item.title}</p>
            <p>Status: {item.liveStatus ? "Live" : "Offline"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
