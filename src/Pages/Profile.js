import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    title: "",
    description: "",
    following: [],
    followingStreamId: [],
  });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch dữ liệu Profile từ server
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `https://csbu-software-design-be.onrender.com/api/account?name=${name}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data); // Debug API response

        setProfile({
          ...response.data,
          following: response.data.following || [], // Fallback tránh undefined
          followingStreamId: response.data.followingStreamId || [],
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Xử lý cập nhật thông tin
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");
      await axios.put(
        `https://csbu-software-design-be.onrender.com/api/account?name=${name}`,
        { title: profile.title, description: profile.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <p>
          <strong>Username:</strong> {profile?.name || "N/A"}
        </p>
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
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              className="bg-gray-700 p-2 rounded ml-2 w-full"
            />
          ) : (
            ` ${profile.description || "No description"}`
          )}
        </p>
      </div>

      {isEditing ? (
        <button
          onClick={handleUpdate}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 mr-2"
        >
          Edit Profile
        </button>
      )}

      {/* Danh sách Following */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Following Users:</h3>
        <ul>
          {profile?.following?.length > 0 ? (
            profile.following.map((user, index) => (
              <li key={index} className="text-gray-400">
                {user}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No users followed.</li>
          )}
        </ul>
      </div>

      {/* Danh sách Following Stream ID */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Following Streams:</h3>
        <ul>
          {profile?.followingStreamId?.length > 0 ? (
            profile.followingStreamId.map((streamId, index) => (
              <li key={index} className="text-gray-400">
                Stream ID: {streamId}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No streams followed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;