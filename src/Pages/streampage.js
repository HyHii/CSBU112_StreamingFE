import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import ChatBox from "../components/ChatBox";
import StreamerInfo from "../components/StreamInfo";

const Streampage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <VideoPlayer 
              videoSrc="https://marmoset-unbiased-logically.ngrok-free.app/api/stream/watch?streamId=KayGV" // URL video HLS
              // videoSrc="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
              title="Livestream Demo"
              description="Đây là một video livestream mẫu."
              autoplay={true}
            />
            <StreamerInfo />
          </div>
          <div>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streampage;