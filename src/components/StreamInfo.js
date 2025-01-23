import React, { useState, useEffect, useContext } from "react";
import "./../styles/StreamInfo.css";
import api from "../axiosInstance";
import { AuthContext } from "../components/AuthContext";

const StreamerInfo = ({ streamerData }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(streamerData.data || 0);
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  // Cập nhật followerCount khi streamerData thay đổi
  useEffect(() => {
    console.log("Streamer Data:", streamerData);
    if (streamerData?.data !== undefined) {
      setFollowerCount(streamerData.data);
    }
  }, [streamerData]);

  // **Thêm kiểm tra trạng thái follow**
  const fetchFollowStatus = async () => {
    try {
      const followingResponse = await api.get(`/account/auth/isfollowing/${streamerData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Following List:", followingResponse.data);

      // Kiểm tra nếu user hiện tại có follow streamer không
      const isCurrentlyFollowing = (followingResponse.data.data === "true");
      setIsFollowing(isCurrentlyFollowing);
    } catch (error) {
      console.error("Error fetching follow status:", error);
    }
  };

  useEffect(() => {
    fetchFollowStatus();
  }, [streamerData, token]);

  const handleFollowToggle = async () => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để follow!");
      return;
    }

    if (!streamerData?.id) {
      console.warn("Không thể follow - streamId không hợp lệ.");
      return;
    }

    try {
      console.log(`🔹 Gửi yêu cầu follow đến: /account/auth/follow/${streamerData.id}`);
      const response = await api.put(
        `/account/auth/follow/${streamerData.id}`,
        { name: `${name}`, data: "follow-action" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Server Response:", response.data);

      // Gọi lại API để cập nhật trạng thái followers
      const updatedFollowerResponse = await api.get(`/account/follower/${streamerData.id}`);
      console.log("Updated Follower Data:", updatedFollowerResponse.data);

      const isNowFollowing = updatedFollowerResponse.data.data !== "0" && updatedFollowerResponse.data.data !== 0;

      setIsFollowing(isNowFollowing);
      setFollowerCount(parseInt(updatedFollowerResponse.data.data, 10) || 0);
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-600 mr-4"></div>
        <div>
          <h3 className="text-xl font-bold">{streamerData?.name || "Unknown Streamer"}</h3>
          <p className="text-gray-400">{streamerData?.bio || "No bio available"}</p>
        </div>
      </div>

      <div className="flex-1 px-6">
        <p><strong>Followers:</strong> {followerCount}</p>
        <p><strong>Notes:</strong> {streamerData?.description || "No additional notes"}</p>
      </div>

      <button
        className={`follow-btn ${isFollowing ? "following" : ""}`}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default StreamerInfo;