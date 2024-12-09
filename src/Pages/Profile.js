import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("https://marmoset-unbiased-logically.ngrok-free.app/api/user");
        if (!response.ok) throw new Error("Failed to fetch user info");
        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleGenerateKey = async () => {
    try {
      const response = await fetch("https://marmoset-unbiased-logically.ngrok-free.app/api/user/streaming-key", {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to generate new streaming key");
      const data = await response.json();
      setUserInfo((prev) => ({ ...prev, streamingKey: data.streamingKey }));
    } catch (err) {
      alert("Error generating new key: " + err.message);
    }
  };

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={userInfo.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{userInfo.username}</h1>
            <p className="text-gray-400">{userInfo.email}</p>
            <p className="text-gray-400">{userInfo.followers} followers</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Streaming Key</h2>
          <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
            <span>
              {showKey ? userInfo.streamingKey : "************"}
            </span>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleGenerateKey}
          >
            Generate New Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
