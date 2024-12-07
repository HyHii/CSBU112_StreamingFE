import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StreamPage from "./Pages/streampage";
import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import VideoList from "./components/VideoList";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/streampage" element={<StreamPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
