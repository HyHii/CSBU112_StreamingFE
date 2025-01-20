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
  const { logout } = useContext(AuthContext);
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

        const response = await api.get(`/account?name=${name}`);

        console.log("Profile API Response:", response.data);

        setProfile({ ...response.data });

        const followerResponse = await api.get(`/account/auth/follower?name=${name}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Follower API Response:", followerResponse.data);

        const count = parseInt(followerResponse.data.data, 10) || 0;
        setFollowerCount(count);
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
      // const token = localStorage.getItem("token");
      // const name = localStorage.getItem("name");

      // await axios.put(
      //   `https://csbu-software-design-be.onrender.com/api/account?name=${name}`,
      //   { title: profile.title, description: profile.description },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

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
        <p>
          <strong>Followers:</strong> {followerCount} người theo dõi
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
    </div>
  );
};

export default Profile;