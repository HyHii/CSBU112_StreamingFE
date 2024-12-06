import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoList = () => {
  const [livestreams, setLivestreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Lấy dữ liệu livestream từ API
  useEffect(() => {
    const fetchLivestreams = async () => {
      try {
        const response = await fetch("https://api.example.com/livestreams"); // Thay bằng API thực tế
        if (!response.ok) throw new Error("Failed to fetch livestreams");
        const data = await response.json();
        setLivestreams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLivestreams();
  }, []);

  if (loading) return <p>Loading livestreams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Live Streams</h2>
      <ul>
        {livestreams.map((stream) => (
          <li
            key={stream.id}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
            onClick={() => navigate(`/stream/${stream.id}`)} // Điều hướng tới trang phát trực tiếp
          >
            <img
              src={stream.thumbnail}
              alt={stream.title}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
              <h3 className="text-sm font-semibold">{stream.title}</h3>
              <p className="text-gray-400 text-xs">{stream.viewers} viewers</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
