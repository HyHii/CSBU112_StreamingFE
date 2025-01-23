import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import api from "../axiosInstance";

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    title: "",
    description: "",
  });
  const [followerCount, setFollowerCount] = useState(0);
  const [streamKey, setStreamKey] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleApiError = (err) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get(`/account?name=${name}`);
        setProfile({ ...response.data });
        // console.log(response.data);

        const followerResponse = await api.get(`/account/follower/${response.data.id}`);

        setFollowerCount(parseInt(followerResponse.data.data, 10) || 0);
      } catch (err) {
        handleApiError(err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");

      const updateTitle = { name, data: profile.title };
      const updateDescription = { name, data: profile.description };

      await api.put(`/account/auth/update/title`, updateTitle, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await api.put(`/account/auth/update/description`, updateDescription, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 1000);
      setIsEditing(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  const fetchStreamKey = async () => {
    try {
      const token = localStorage.getItem("token");

      const streamKeyResponse = await api.get(`/account/auth/streamkey`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStreamKey(streamKeyResponse.data.data);
      setSuccessMessage("Stream Key loaded!");
      setTimeout(() => setSuccessMessage(""), 1000);
    } catch (err) {
      handleApiError(err);
    }
  };

  const updateStreamKey = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(`/account/auth/update/streamkey`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const streamKeyResponse = await api.get(`/account/auth/streamkey`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStreamKey(streamKeyResponse.data.data);
      setSuccessMessage("Stream Key updated successfully!");
      setTimeout(() => setSuccessMessage(""), 1000);
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <p><strong>Username:</strong> {profile?.name || "N/A"}</p>
        <p>
          <strong>Title:</strong>
          {isEditing ? (
            <input
              type="text"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="bg-gray-700 p-2 rounded ml-2"
            />
          ) : (
            ` ${profile.title || "No title"}`
          )}
        </p>
        <p>
          <strong>Description:</strong>
          {isEditing ? (
            <textarea
              value={profile.description || ""}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              className="bg-gray-700 p-2 rounded ml-2 w-full"
            />
          ) : (
            ` ${profile.description || "No description"}`
          )}
        </p>
        <p><strong>Followers:</strong> {followerCount} người theo dõi</p>
        <p><strong>Stream Key: </strong><span className="text-green-400">{streamKey}</span></p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={fetchStreamKey}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Lấy Stream Key
        </button>
        <button
          onClick={updateStreamKey}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Cập Nhật Stream Key
        </button>
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
