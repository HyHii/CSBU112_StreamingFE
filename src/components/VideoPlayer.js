import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoSrc, title, description }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialize Video.js
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        responsive: true,
        fluid: true,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="aspect-video">
        <video
          ref={videoRef}
          className="video-js w-full h-full"
          data-setup="{}"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default VideoPlayer;
