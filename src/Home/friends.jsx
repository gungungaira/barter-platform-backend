import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./friends.css";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:4040/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Unable to load friends.");
          return;
        }
        setFriends(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  if (loading) return <h2>Loading friends...</h2>;
  if (error) return <h2>{error}</h2>;
  if (friends.length === 0) return <h2>No friends yet.</h2>;

  return (
    <div className="friends-page">
      <h1>My Friends</h1>
      <div className="friends-list">
        {friends.map((friend) => (
          <div className="friend-card" key={friend.friendId}>
            <h3>{friend.name}</h3>
            <div className="friend-actions">
              {/* <button
                type="button"
                onClick={() =>
                  navigate(`/profile/${friend.friendId}`, {
                    state: { profile: friend },
                  })
                }
              >
                Check Profile
              </button> */}
              <button
                type="button"
                onClick={() => navigate(`/profile/${friend.friendId}`)}
              >
                Check Profile
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate(`/messages/${friend.friendId}`, {
                    state: { friendName: friend.name },
                  })
                }
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
