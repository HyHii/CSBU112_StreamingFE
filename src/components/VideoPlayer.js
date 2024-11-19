import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoSrc, title, description, autoplay = false }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: autoplay,
        responsive: true,
        fluid: true,
        fullscreen: true,
        loop: true,
        controlBar: {
          fullscreenToggle: true,
          muteToggle: true,
          volumeControl: true
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [autoplay]); // Thêm autoplay vào dependencies để thay đổi khi prop thay đổi

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative w-full pb-[56.25%]">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full"
          data-setup="{}"
          onError={() => alert("Sorry, the video couldn't be loaded.")}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-gray-400">
        Video Length: {Math.floor(playerRef.current.duration() / 60)}:{Math.floor(playerRef.current.duration() % 60)}
      </p>

    </div>
  );
};

export default VideoPlayer;
