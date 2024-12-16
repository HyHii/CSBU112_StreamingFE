import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStreams = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://marmoset-unbiased-logically.ngrok-free.app/api/stream/streaming",
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
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching streams:", err);
      setError("Không thể tải danh sách stream.");
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
        {!isLoading && streams.length > 0 ? (
          streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold">{stream.title || "No Title"}</h3>
              <p className="text-gray-400">{stream.description || "Không có mô tả."}</p>
              <Link
                to={`/streampage?username=${stream.name}`}
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
