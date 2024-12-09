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

        const liveStreams = data.map((stream) => ({
          id: stream.id,
          title: stream.title,
          liveStatus: stream.isLive,
        }));
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
      <ul className="space-y-4">
        {livestreams.map((stream) => (
          <li
            key={stream.id}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate(`/streampage?id=${stream.id}`)}
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-white">{stream.title}</h3>
            {/* Live Status */}
            <p className={`text-sm ${stream.liveStatus ? "text-green-500" : "text-red-500"}`}>
              {stream.liveStatus ? "Live" : "Offline"}
            </p>
            {/* ID */}
            <p className="text-gray-400 text-sm">Stream ID: {stream.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
