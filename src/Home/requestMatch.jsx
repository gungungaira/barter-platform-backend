import React, { useEffect, useState } from "react";
import "./request.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const server = await fetch("https://barter-platform-backend.onrender.com/myRequests", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await server.json();

      if (!server.ok) {
        setError(data.message || "Unable to fetch requests.");
        return;
      }

      setRequests(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    const token = localStorage.getItem("token");

    try {
      const server = await fetch(
        `https://barter-platform-backend.onrender.com/request/${requestId}/accept`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await server.json();

      if (!server.ok) {
        alert(data.message || "Could not accept request.");
        return;
      }

      // remove it from the pending list immediately
      setRequests(requests.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async (requestId) => {
    const token = localStorage.getItem("token");

    try {
      const server = await fetch(
        `https://barter-platform-backend.onrender.com/request/${requestId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await server.json();

      if (!server.ok) {
        alert(data.message || "Could not delete request.");
        return;
      }

      setRequests(requests.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <h2>Loading requests...</h2>;
  if (error) return <h2>{error}</h2>;
  if (requests.length === 0) return <h2>No pending requests.</h2>;

  return (
    <div className="requests-page">
      <h1>Requests</h1>

      <div className="request-list">
        {requests.map((req) => (
          <div className="request-card" key={req._id}>
            <p>
              <strong>{req.sender?.name || "Unknown"}</strong> sent you a
              request.
            </p>

            <div className="request-actions">
              <button type="button" onClick={() => handleAccept(req._id)}>
                Accept
              </button>
              <button type="button" onClick={() => handleDelete(req._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;