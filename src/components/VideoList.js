import React, { useState, useEffect } from "react";
import api from "../axiosInstance";
import { Link } from "react-router-dom";

function checkLogin(){
  const token = localStorage.getItem("token");
  return !!token;
}

const VideoList = () => {
  const [streams, setStreams] = useState([]);
  const [followedIds, setFollowedIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(checkLogin == null ? false : true);

  const fetchStreams = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await api.get(
        "/stream/streaming",
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

  const fetchFollowedStreams = async () => {
    if(!isLogin) return
    try {
      const token = localStorage.getItem("token");
      const streamsResponse = await api.get("/stream/streaming");
      const followedResponse = await api.get("/account/auth/following", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log(streamsResponse.data);
      console.log(followedResponse.data);

      const streamList = streamsResponse.data?.dataArray || [];
      const followedList = followedResponse.data?.dataArray || [];

      const followedIdSet = new Set(followedList.map((stream) => stream.id));
      console.log(followedIdSet);

      setFollowedIds(followedIdSet);
      console.log(followedIdSet);

      const updatedStreams = streamList.map(stream => ({
        ...stream,
        isFollowing: followedIdSet.has(stream.id),
      }));
      console.log("Updated Streams:", updatedStreams);
    } catch (err) {
      console.error("Error fetching followed streams:", err);
    }
  };

  useEffect(() => {
    fetchStreams(); 
    if (!isLogin){
      console.log("isLogin:", isLogin);
      fetchFollowedStreams();
    }
  }, []);

  const followedStreams = streams.filter((stream) => followedIds.has(stream.id));
  const unfollowedStreams = streams.filter((stream) => !followedIds.has(stream.id));

  const renderStreamList = (streamList) => (
    <div className="flex space-x-4 overflow-x-auto p-2">
      {streamList.map((stream) => (
        <div key={stream.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform min-w-[250px]">
          <div className="mb-4">
            <img
              src={"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTlrbm05enhrZHM3cmptc3gxazdtNDR6dzZhMWI1MXQ2NnZjZ3ByciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sthmCnCpfr8M8jtTQy/giphy.webp"}
              alt="stream gif"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold">{stream.title || "No Title"}</h3>
          <p className="text-l text-gray-300 font-semibold">{stream.name}</p>
          <p className="text-gray-400">{stream.description || "Không có mô tả."}</p>
          <Link
            to={`/streampage?name=${stream.name}`}
            className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
          >
            Xem Stream
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Stream Đang Phát</h2>
      {isLoading && <p className="text-white">Đang tải danh sách stream...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {isLogin && (
        <>
          <h3 className="text-xl font-semibold mt-8 mb-2">Đã Follow</h3>
          {followedStreams.length > 0 
            ? renderStreamList(followedStreams) 
            : <p className="text-gray-500">Chưa có stream nào hiện tại.</p>
          }
        </>
      )}

      <h3 className="text-xl font-semibold mt-8 mb-2">Chưa Follow</h3>
      {unfollowedStreams.length > 0 ? renderStreamList(unfollowedStreams) : <p className="text-gray-500">Chưa có stream nào hiện tại.</p>}
    </div>
  );
};

export default VideoList;