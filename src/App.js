import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes và Route
import Navbar from './components/Navbar';
import VideoList from './components/VideoList'; // Import VideoList
import Login from './components/login'; // Import Login
import SignUp from './components/signup'; // Import SignUp
import VideoPlayer from "./components/VideoPlayer";
import './styles/App.css';

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
        <Routes>
          <Route path="/" element={<VideoList />} />
          {/* <Route path="/stream/:id" element={<VideoPlayer />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      {/* <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <VideoPlayer 
              videoSrc="https://marmoset-unbiased-logically.ngrok-free.app/api/stream/watch?streamId=KayGV" // URL video HLS
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
      </div> */}
    </div>
  );
}

export default App;
