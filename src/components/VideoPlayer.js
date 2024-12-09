import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import "../styles/VideoPlayer.css"

const VideoPlayer = ({ videoSrc, title = '', description = '', autoplay = false }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS manifest loaded.');
          setError(null); // Reset lỗi khi tải thành công
          if (autoplay) {
            videoRef.current
              .play()
              .catch((error) => console.error('Autoplay failed:', error));
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS.js Error:', data);
          if (data.fatal) {
            setError('Failed to load the livestream. Please check the stream URL.');
            hls.destroy();
          }
        });

        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoSrc;
        videoRef.current
          .play()
          .catch((error) => console.error('Autoplay failed:', error));
      } else {
        setError('HLS is not supported in this browser.');
      }
    }
  }, [videoSrc, autoplay]);

  return (
    <div style={{ backgroundColor: 'black', borderRadius: '8px', padding: '10px', color: 'white' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        {!error && (
          <video
            ref={videoRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            controls
          />
        )}
        {error && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'red',
              fontSize: '18px',
            }}
          >
            {error}
          </div>
        )}
      </div>
      {title && <h3 style={{ marginTop: '10px' }}>{title}</h3>}
      {description && <p style={{ color: 'gray' }}>{description}</p>}
    </div>
  );
};

export default VideoPlayer;
