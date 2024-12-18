import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import StreamerInfo from "../components/StreamInfo";
import ChatBox from "../components/ChatBox";

const StreamPage = () => {
  const [streamData, setStreamData] = useState(null);
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

        const response = await axios.get(
          `https://csbu-software-design-be.onrender.com/api/stream/watch?streamId=${name}`, // Truyền `name` vào API  
          // "https://csbu-software-design-be.onrender.com/api/stream/watch?streamId=KayGV"
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const url = `https://csbu-software-design-be.onrender.com/api/stream/watch?streamId=${name}`;
        console.log("Request URL:", url);
        console.log("Token:", token);
        console.log("Stream URL:", streamData);
        // console.log("API Response:", response.data);
        setStreamData(response.data);
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
            videoSrc={streamData?.streamUrl || ""}
            autoplay={true}
          />
          <StreamerInfo streamer={streamData || {}} />
        </div>
        <div>
          <ChatBox user={streamData?.name || "Anonymous"} />
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
