import React, { useState, useEffect } from "react";
import "./../styles/StreamInfo.css";
import api from "../axiosInstance";

const StreamerInfo = ({ streamerData }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(streamerData?.followers || 0);

  useEffect(() => {
    if (streamerData) {
      setFollowerCount(streamerData.followers);
    }
  }, [streamerData]);

  if (!streamerData) {
    return <p className="text-red-500 text-center">Không có dữ liệu streamer!</p>;
  }

  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Streamer Information</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-600 mr-4"></div>
          <div>
            <h3 className="text-xl font-bold">{streamerData.name}</h3>
            <p className="text-gray-400">{streamerData.bio || "No bio available"}</p>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <strong>Followers:</strong> {followerCount || "0"}
      </div>
      
      <div>
        <strong>Notes:</strong>
        <p className="text-gray-300">{streamerData.description || "No additional notes"}</p>
      </div>
    </div>
  );
};

export default StreamerInfo;
