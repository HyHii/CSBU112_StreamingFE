import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoList = () => {
  const [livestreams, setLivestreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Lấy danh sách livestream từ API
  useEffect(() => {
    const fetchLivestreams = async () => {
      try {
        const response = await fetch("https://marmoset-unbiased-logically.ngrok-free.app/api/stream"); // Thay bằng URL API thực tế
        if (!response.ok) throw new Error("Failed to fetch livestreams");
        const data = await response.json();

        // Lọc chỉ những streamer đang livestream
        const liveStreams = data.filter((stream) => stream.isLive === true);
        setLivestreams(liveStreams);
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Live Streams</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {livestreams.map((stream) => (
          <div
            key={stream.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/streampage?id=${stream.id}`)}
          >
            <img
              src={stream.thumbnail}
              alt={stream.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{stream.title}</h3>
              <p className="text-gray-400 text-sm">{stream.viewers} viewers</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
