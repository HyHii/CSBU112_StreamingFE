import React from "react";
import Navbar from './Navbar';
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";

const App = () => {
  return (
    <div className="bg text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <VideoPlayer />
          </div>
          <div>
            <VideoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
