import React from "react";

const VideoPlayer = () => {
  return (
    <div className="bg-black rounded-lg p-4">
      <video
        controls
        className="w-full h-64 rounded-lg"
        src="https://www.youtube.com/watch?v=PjlzEXoLFHM&t=5921s"
      ></video>
      <h2 className="mt-4 text-lg font-semibold">Video Title</h2>
      <p className="text-sm text-gray-400">Description of the video...</p>
    </div>
  );
};

export default VideoPlayer;
