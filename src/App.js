import React from "react";
import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";
import ChatBox from "./components/ChatBox";
import StreamerInfo from "./components/StreamInfo";

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <VideoPlayer />
            <StreamerInfo /> {}
          </div>
          <div>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
