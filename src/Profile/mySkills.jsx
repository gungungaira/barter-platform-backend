import React, { useEffect, useState } from "react";
import './mySkill.css'
import { Link } from "react-router-dom";
const MySkills = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMySkills = async () => {
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

        console.log("Profile data:", data);

        if (!server.ok) {
          setError(
            data.message || "Unable to get profile"
          );
          return;
        }

        setProfile(data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    getMySkills();
  }, []);

  if (loading) {
    return <h2>Loading skills...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!profile) {
    return <h2>No profile found.</h2>;
  }

  return (
    <div className="my-skills-page">
       <div style={{display:"flex"}}>
             <p >
              <Link to ='/home'style={{color:"white",textDecoration:"none",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}}>Back</Link>
              </p> 
            </div>

      <h1>My Skills</h1>

      {/* CAN TEACH */}

      <div className="skills-container">

        <h2>Skills I Can Teach</h2>

        {profile.teach && profile.teach.length > 0 ? (
          <div className="skills-list">

            {profile.teach.map((skill, index) => (
              <div
                className="skill-tag"
                key={index}
              >
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
              <div
                className="skill-tag"
                key={index}
              >
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

export default MySkills;