import React from "react";

const VideoList = () => {
  const videos = [
    { id: 1, title: "Video 1", thumbnail: "https://via.placeholder.com/150" },
    { id: 2, title: "Video 2", thumbnail: "https://via.placeholder.com/150" },
    { id: 3, title: "Video 3", thumbnail: "https://via.placeholder.com/150" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recommended Videos</h2>
      <ul>
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
              <h3 className="text-sm font-semibold">{video.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
