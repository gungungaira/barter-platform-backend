import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inbox.css";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
};

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInbox = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("https://barter-platform-backend.onrender.com/inbox", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Unable to load messages.");
          return;
        }
        setConversations(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, []);

  if (loading) return <h2 className="inbox-status">Loading messages...</h2>;
  if (error) return <h2 className="inbox-status">{error}</h2>;
  if (conversations.length === 0)
    return <h2 className="inbox-status">No conversations yet.</h2>;

  return (
    <div className="inbox-page">
      <h1>Chats</h1>
      <div className="inbox-list">
        {conversations.map((conv) => (
          <div
            key={conv.friendId}
            className="inbox-item"
            onClick={() =>
              navigate(`/messages/${conv.friendId}`, { state: { friendName: conv.name } })
            }
          >
            <div className="inbox-avatar">{conv.name?.charAt(0).toUpperCase()}</div>
            <div className="inbox-content">
              <div className="inbox-top-row">
                <h3>{conv.name}</h3>
                <span className="inbox-time">{formatTime(conv.lastMessageAt)}</span>
              </div>
              <p className="last-message">{conv.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;