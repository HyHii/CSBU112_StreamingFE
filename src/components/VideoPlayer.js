import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoSrc, title, description, autoplay = false }) => {
  // Tham chiếu đến phần tử video trong DOM
  const videoRef = useRef(null);
  
  // Tham chiếu đến player của Video.js để quản lý lifecycle của nó
  const playerRef = useRef(null);

  // State để lưu trữ độ dài của video
  const [duration, setDuration] = useState(null);

  // useEffect để khởi tạo Video.js và quản lý lifecycle của player
  useEffect(() => {
    // Kiểm tra nếu player chưa được khởi tạo
    if (!playerRef.current) {
      // Khởi tạo player với các cấu hình từ Video.js
      playerRef.current = videojs(videoRef.current, {
        controls: true, // Hiển thị các điều khiển video như play/pause, volume,...
        autoplay: autoplay, // Tự động phát video nếu props autoplay là true
        responsive: true, // Làm cho video responsive với kích thước màn hình
        fluid: true, // Tự động điều chỉnh kích thước video
        fullscreen: true, // Cho phép người dùng xem video toàn màn hình
        loop: true, // Lặp lại video khi kết thúc
        controlBar: {
          fullscreenToggle: true, // Cho phép nút fullscreen
          muteToggle: true, // Cho phép nút tắt tiếng
          volumeControl: true // Cho phép điều chỉnh âm lượng
        }
      });

      // Đăng ký sự kiện 'loadedmetadata' để lấy độ dài video sau khi video được tải xong
      playerRef.current.on('loadedmetadata', () => {
        setDuration(playerRef.current.duration());  // Cập nhật độ dài video vào state
      });
    }

    // Cleanup khi component unmount hoặc khi autoplay thay đổi
    return () => {
      // Dispose player nếu đã khởi tạo để tránh rò rỉ bộ nhớ
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [autoplay]); // useEffect sẽ chạy lại khi prop autoplay thay đổi

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {/* Phần video player, sử dụng tỷ lệ 16:9 để đảm bảo video có tỷ lệ đúng */}
      <div className="relative w-full pb-[56.25%]">
        <video
          ref={videoRef}  // Liên kết phần tử video với videoRef để Video.js có thể điều khiển
          className="absolute top-0 left-0 w-full h-full"
          data-setup="{}"
          //onError={() => alert("Sorry, the video couldn't be loaded.")}  // Thông báo lỗi nếu video không thể tải
        >
          {/* Định dạng video, có thể bổ sung thêm các nguồn khác như webm, ogg */}
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Tiêu đề video */}
      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>

      {/* Hiển thị độ dài video nếu có */}
      {duration && (
        <p className="text-sm text-gray-400">
          Video Length: {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
        </p>
      )}
    </div>
  );
};

export default VideoPlayer;
