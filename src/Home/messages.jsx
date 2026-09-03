import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./message.css";

let socket;

const getUserIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId; // matches the key your backend signs into the JWT
  } catch {
    return null;
  }
};

const Message = () => {
  const { friendId } = useParams();
  const location = useLocation();
  const friendName = location.state?.friendName || "User";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const myUserId = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    const userId = getUserIdFromToken(token);
    myUserId.current = userId;

    socket = io("https://barter-platform-backend.onrender.com");
    socket.emit("join", userId);

    socket.on("newMessage", (message) => {
      const sender = String(message.sender);
      const receiver = String(message.receiver);
      const uid = String(userId);
      const fid = String(friendId);

      if (sender === fid && receiver === uid) {
        setMessages((prev) => [...prev, message]);
      }
    });

    const fetchConversation = async () => {
      try {
        const res = await fetch(
          `https://barter-platform-backend.onrender.com/conversation/${friendId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Unable to load conversation.");
          return;
        }
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();

    return () => {
      socket.disconnect();
    };
  }, [friendId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    const messageData = {
      senderId: myUserId.current,
      receiverId: friendId,
      text: text.trim(),
    };

    socket.emit("sendMessage", messageData);

    // Show it immediately (outgoing) instead of waiting for the server
    setMessages((prev) => [
      ...prev,
      {
        _id: `temp-${Date.now()}`,
        sender: myUserId.current,
        receiver: friendId,
        text: text.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);

    setText("");
  };

  if (loading) return <h2>Loading conversation...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="message-page">
      <h2>Chat with {friendName}</h2>

      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={
              msg.sender === myUserId.current
                ? "message-bubble sent"
                : "message-bubble received"
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="message-input-area">
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
