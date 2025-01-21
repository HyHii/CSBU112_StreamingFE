import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../axiosInstance";
import VideoPlayer from "../components/VideoPlayer";
import StreamerInfo from "../components/StreamInfo";
import ChatBox from "../components/ChatBox";

const StreamPage = () => {
  const [streamData, setStreamData] = useState(null);
  const [streamerData, setStreamerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name"); // Lấy `name` từ URL

  useEffect(() => {
    const fetchStreamData = async () => {
      if (!name) {
        setError("Không tìm thấy tên người dùng.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");

        // Gọi API lấy dữ liệu livestream
        const response = await api.get(`/stream/watch?streamId=${name}`);
        setStreamData(response.data);
        console.log("Stream Data:", response.data);

        // Gọi API lấy thông tin streamer
        const profileResponse = await api.get(`/account?name=${name}`);
        console.log("Streamer Profile:", profileResponse.data);

        setStreamerData({
          ...profileResponse.data,
        });

      } catch (err) {
        console.error("Error fetching stream data:", err);
        setError("Không thể tải dữ liệu stream.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamData();
  }, [name]);

  if (isLoading) return <div className="text-white p-4">Đang tải stream...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <VideoPlayer
            videoSrc={`https://csbu-software-design-be.onrender.com/api/stream/watch?streamId=${name}`}
            autoplay={true}
          />
          <StreamerInfo streamerData={streamerData} />
        </div>
        <ChatBox user={streamData?.name || "Anonymous"} />
      </div>
    </div>
  );
};

export default StreamPage;
