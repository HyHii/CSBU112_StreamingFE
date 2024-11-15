import React from "react";

const VideoPlayer = () => {
  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="aspect-video">
        <video
          controls
          className="w-full h-full"
          src=""
        ></video>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">Video Title</h2>
      <p className="text-sm text-gray-400">Description of the video...</p>
    </div>
  );
};

export default VideoPlayer;
