import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const dummyStreams = [
  //   {
  //     id: "1",
  //     name: "nguyengiahy",
  //     title: "Stream Liên Minh Huyền Thoại",
  //     description: "Chơi game vui vẻ cùng anh em.",
  //   },
  //   {
  //     id: "2",
  //     name: "player123",
  //     title: "Stream PUBG Mobile",
  //     description: "Top 1 không khó, cùng theo dõi nhé!",
  //   },
  //   {
  //     id: "3",
  //     name: "kaygv",
  //     title: "Stream Valorant",
  //     description: "Valorant ranked cùng pro team.",
  //   },
  //   {
  //     id: "4",
  //     name: "streamertest",
  //     title: "Stream CS:GO",
  //     description: "Hành động gay cấn, anh em vào xem.",
  //   },
  // ];

  // const fetchStreams = async () => {
  //   setIsLoading(true);
  //   try {
  //     setTimeout(() => {
  //       console.log("Dummy API Response:", dummyStreams);
  //       setStreams(dummyStreams);
  //       setIsLoading(false);
  //     }, 1000);
  //   } catch (err) {
  //     console.error("Error fetching streams:", err);
  //     setError("Không thể tải danh sách stream.");
  //     setIsLoading(false);
  //   }
  // };

  const fetchStreams = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://csbu-software-design-be.onrender.com/api/stream/streaming",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setStreams(response.data);
      } else {
        setStreams([]);
      }
    } catch (err) {
      console.error("Error fetching streams:", err);
      setError("Không thể tải danh sách stream.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Stream Đang Phát</h2>

      {isLoading && <p className="text-white">Đang tải danh sách stream...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {streams.length > 0 ? (
          streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <div className="mb-4">
                <img
                  src={"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTlrbm05enhrZHM3cmptc3gxazdtNDR6dzZhMWI1MXQ2NnZjZ3ByciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sthmCnCpfr8M8jtTQy/giphy.webp"}
                  alt="stream gif"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold">{stream.title || "No Title"}</h3>
              <p className="text-gray-400">{stream.description || "Không có mô tả."}</p>
              <Link
                to={`/streampage?name=${stream.name}`}
                className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
              >
                Xem Stream
              </Link>
            </div>
          ))
        ) : (
          !isLoading && <p className="text-gray-500">Không có stream nào đang tồn tại.</p>
        )}
      </div>
    </div>
  );
};

export default VideoList;
