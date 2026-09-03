import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./findMatch.css";

const FindMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const server = await fetch("https://barter-platform-backend.onrender.com/findMatch", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await server.json();

        if (!server.ok) {
          setError(data.message || "Unable to find matches.");
          return;
        }

        setMatches(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleSendRequest = async (receiverId) => {
    const token = localStorage.getItem("token");

    try {
      const server = await fetch("https://barter-platform-backend.onrender.com/sendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId }),
      });

      const data = await server.json();

      if (!server.ok) {
        alert(data.message || "Could not send request.");
        return;
      }

      // mark this person's button as "Sent" without re-fetching everything
      setSentRequests([...sentRequests, receiverId]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <h2>Finding matches...</h2>;
  if (error) return <h2>{error}</h2>;
  if (matches.length === 0) return <h2>No matches found yet.</h2>;

  return (
    <div className="find-match-page">
      <h1>Find a Match</h1>

      <div className="match-list">
        {matches.map((match) => {
          const receiverUserId = match.profile.userId?._id;

          return (
            <div className="match-card" key={match.profile._id}>
              <h3>{match.profile.userId?.name || "Unknown"}</h3>

              <p>
                <strong>They can teach:</strong> {match.matchedTeach.join(", ")}
              </p>
              <p>
                <strong>They want to learn:</strong>{" "}
                {match.matchedLearn.join(", ")}
              </p>

              <div className="match-actions">
                {/* <button
                  type="button"
                  onClick={() => alert(JSON.stringify(match.profile, null, 2))}
                >
                  Check Profile
                </button> */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/profile/${receiverUserId}`, {
                      state: { profile: match.profile },
                    })
                  }
                >
                  Check Profile
                </button>

                <button
                  type="button"
                  disabled={
                    !receiverUserId || sentRequests.includes(receiverUserId)
                  }
                  onClick={() => handleSendRequest(receiverUserId)}
                >
                  {sentRequests.includes(receiverUserId)
                    ? "Request Sent"
                    : "Send Request"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FindMatch;
