import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoList = () => {
  const [streams, setStreams] = useState([]); // Lưu danh sách stream
  const [error, setError] = useState(null);   // Trạng thái lỗi
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage

        // Gọi request GET tới API
        const response = await axios({
          method: "GET",
          url: "https://marmoset-unbiased-logically.ngrok-free.app/api/stream",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Lưu kết quả vào state
        setStreams(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching streams:", err);
        setError("Không thể tải danh sách stream. Vui lòng thử lại!");
        setIsLoading(false);
      }
    };

    fetchStreams(); // Gọi hàm khi component mount
  }, []);

  // Trạng thái loading
  if (isLoading) return <div className="text-white p-4">Đang tải danh sách stream...</div>;

  // Trạng thái lỗi
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Stream</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {streams.length > 0 ? (
          streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold">{stream.title}</h3>
              <p className="text-gray-400">{stream.description || "Không có mô tả."}</p>
              <p className="mt-2">
                Trạng thái:{" "}
                <span
                  className={`font-bold ${
                    stream.liveStatus ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stream.liveStatus ? "Đang phát" : "Offline"}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có stream nào đang tồn tại.</p>
        )}
      </div>
    </div>
  );
};

export default VideoList;
