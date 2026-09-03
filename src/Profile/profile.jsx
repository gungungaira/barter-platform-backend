import React, { useEffect, useState } from "react";
import './profile.css'
import { Link, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMyProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const server = await fetch(
          "https://barter-platform-backend.onrender.com/getMyProfile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await server.json();

        console.log("API RESPONSE:", data);

        if (!server.ok) {
          setError(
            data.message || "Unable to get profile"
          );
          return;
        }

        setProfile(data);

      } catch (error) {
        console.log("Error:", error);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    getMyProfile();
  }, []);

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!profile) {
    return <h2>No profile found.</h2>;
  }

  const photoUrl = profile.photo
    ? profile.photo.startsWith("http")
      ? profile.photo
      : `https://barter-platform-backend.onrender.com${profile.photo}`
    : null;

  return (
    <div className="my-profile-page">
      <div style={{display:"flex"}}>
       <p >
        <Link to ='/home'style={{color:"white",textDecoration:"none",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}}>Back</Link>
        </p> 
      </div>

      <h1>My Profile</h1>

      <div className="profile-card">

        {/* PROFILE PHOTO */}
        <div className="profile-photo-wrapper">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="profile-photo-img"
            />
          ) : (
            <svg
              className="profile-photo-default"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
            </svg>
          )}
        </div>

        {/* NAME */}
        <div className="profile-item">
          <h3>Name</h3>
          <p>{profile.userId?.name || "No name"}</p>
        </div>

        {/* ADDRESS */}
        <div className="profile-item">
          <h3>Address</h3>
          <p>{profile.address || "No address"}</p>
        </div>

        {/* LANGUAGE */}
        <div className="profile-item">
          <h3>Language</h3>
          <p>
            {Array.isArray(profile.language)
              ? profile.language.join(", ")
              : profile.language || "No language"}
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="profile-item">
          <h3>Experience</h3>
          <p>{profile.experience || "No experience"}</p>
        </div>

        {/* AVAILABILITY */}
        <div className="profile-item">
          <h3>Availability</h3>
          <p>{profile.availability || "No availability"}</p>
        </div>

      </div>

      {/* CAN TEACH */}
      <div className="skills-container">
        <h2>Skills I Can Teach</h2>

        {profile.teach && profile.teach.length > 0 ? (
          <div className="skills-list">
            {profile.teach.map((skill, index) => (
              <div className="skill-tag" key={index}>
                {skill}
              </div>
            ))}
          </div>
        ) : (
          <p>No teaching skills added.</p>
        )}
      </div>

      {/* WANT TO LEARN */}
      <div className="skills-container">
        <h2>Skills I Want To Learn</h2>

        {profile.learn && profile.learn.length > 0 ? (
          <div className="skills-list">
            {profile.learn.map((skill, index) => (
              <div className="skill-tag" key={index}>
                {skill}
              </div>
            ))}
          </div>
        ) : (
          <p>No learning skills added.</p>
        )}
      </div>

    </div>
  );
};

export default MyProfile;