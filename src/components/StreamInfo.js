import React, { useState } from "react";
import "./../styles/StreamInfo.css";

const StreamerInfo = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const streamer = {
    name: "Nguyễn Gia Hy",
    bio: "Pro gamer and content creator specializing in FPS games.",
    followers: 12000,
    notes: "Streaming daily at 8 PM PST. Join to watch exciting matches!"
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Streamer Information</h2>
      <div className="flex items-center justify-between mb-4">
        {/*avatar and streamer info*/}
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-600 mr-4"></div>
          <div>
            <h3 className="text-xl font-bold">{streamer.name}</h3>
            <p className="text-gray-400">{streamer.bio}</p>
          </div>
        </div>
        {/* follow button */}
        <button
          className={`follow-btn ${isFollowing ? "following" : ""}`}
          onClick={handleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
      <div className="mb-2">
        <strong>Followers:</strong> {streamer.followers}
      </div>
      <div>
        <strong>Notes:</strong>
        <p className="text-gray-300">{streamer.notes}</p>
      </div>
    </div>
  );
};

export default StreamerInfo;