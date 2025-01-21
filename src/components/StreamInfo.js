import React, { useState, useEffect, useContext } from "react";
import "./../styles/StreamInfo.css";
import api from "../axiosInstance";
import { AuthContext } from "../components/AuthContext";

const StreamerInfo = ({ streamerData }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");


  useEffect(() => {
    if (streamerData) {
      setFollowerCount(streamerData.followers);
    }
  }, [streamerData]);

  const fetchFollowStatus = async () => {
    try {
      console.log(`Fetching follow status for Stream ID: ${streamerData.id}`);
      const response = await api.get(`/account/auth/follower?name=${streamerData.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📊 API Follow Status Response:", response.data);

      const isNowFollowing = response.data.data === "1" || response.data.data === 1;
      setIsFollowing(isNowFollowing);
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
      console.log(`Gửi yêu cầu follow đến: /account/auth/follow/${streamerData.id}`);
      console.log("Token từ localStorage:", token);

      const response = await api.put(
        `/account/auth/follow/${streamerData.id}`,
        {
          "name": name,
          "data": "follow-action"
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      console.log("Server Response:", response.data);

      // Cập nhật trạng thái UI sau khi nhận phản hồi từ server
      if (response.data === "Followed") {
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      } else if (response.data === "Unfollowed") {
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      }

    } catch (err) {
      console.error("Error following user:", err);
      console.error("Response data:", err.response?.data);
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
        <p><strong>Followers:</strong> {followerCount || "0"}</p>
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
