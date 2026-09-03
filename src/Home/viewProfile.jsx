// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../Profile/profile.css";

// const ViewProfile = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const profile = location.state?.profile;

//   if (!profile) {
//     return (
//       <div className="my-profile-page">
//         <h2>No profile data found.</h2>
//         <button
//           type="button"
//           className="continue-btn"
//           onClick={() => navigate(-1)}
//           style={{ maxWidth: "200px", margin: "20px auto" }}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const photoUrl = profile.photo
//     ? profile.photo.startsWith("http")
//       ? profile.photo
//       : `http://localhost:4040${profile.photo}`
//     : null;

//   return (
//     <div className="my-profile-page">

//       <h1 style={{fontSize:"25px"}}>{profile.userId?.name || "User"}'s Profile</h1>

//       <div className="profile-card">

//         {/* PROFILE PHOTO */}
//         <div className="profile-photo-wrapper">
//           {photoUrl ? (
//             <img
//               src={photoUrl}
//               alt="Profile"
//               className="profile-photo-img"
//             />
//           ) : (
//             <svg
//               className="profile-photo-default"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
//             </svg>
//           )}
//         </div>

//         {/* NAME */}
//         <div className="profile-item">
//           <h3>Name</h3>
//           <p>{profile.userId?.name || "No name"}</p>
//         </div>

//         {/* ADDRESS */}
//         <div className="profile-item">
//           <h3>Address</h3>
//           <p>{profile.address || "No address"}</p>
//         </div>

//         {/* LANGUAGE */}
//         <div className="profile-item">
//           <h3>Language</h3>
//           <p>
//             {Array.isArray(profile.language)
//               ? profile.language.join(", ")
//               : profile.language || "No language"}
//           </p>
//         </div>

//         {/* EXPERIENCE */}
//         <div className="profile-item">
//           <h3>Experience</h3>
//           <p>{profile.experience || "No experience"}</p>
//         </div>

//         {/* AVAILABILITY */}
//         <div className="profile-item">
//           <h3>Availability</h3>
//           <p>{profile.availability || "No availability"}</p>
//         </div>

//       </div>

//       {/* CAN TEACH */}
//       <div className="skills-container">
//         <h2>Can Teach</h2>
//         {profile.teach && profile.teach.length > 0 ? (
//           <div className="skills-list">
//             {profile.teach.map((skill, index) => (
//               <div className="skill-tag" key={index}>
//                 {skill}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No teaching skills added.</p>
//         )}
//       </div>

//       {/* WANT TO LEARN */}
//       <div className="skills-container">
//         <h2>Wants to Learn</h2>
//         {profile.learn && profile.learn.length > 0 ? (
//           <div className="skills-list">
//             {profile.learn.map((skill, index) => (
//               <div className="skill-tag" key={index}>
//                 {skill}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No learning skills added.</p>
//         )}
//       </div>

//       <button
//         type="button"
//         className="continue-btn"
//         onClick={() => navigate(-1)}
//         style={{ maxWidth: "200px", margin: "24px auto", display: "block" }}
//       >
//         Back
//       </button>

//     </div>
//   );
// };

// export default ViewProfile;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Profile/profile.css";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:4040/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "No profile data found.");
          return;
        }
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <h2>Loading profile...</h2>;

  if (error || !profile) {
    return (
      <div className="my-profile-page">
        <h2>{error || "No profile data found."}</h2>
        <button type="button" className="continue-btn" onClick={() => navigate(-1)} style={{ maxWidth: "200px", margin: "20px auto" }}>
          Go Back
        </button>
      </div>
    );
  }

  const photoUrl = profile.photo
    ? profile.photo.startsWith("http")
      ? profile.photo
      : `http://localhost:4040${profile.photo}`
    : null;

  return (
    <div className="my-profile-page">
      <h1 style={{fontSize:"25px"}}>{profile.userId?.name || "User"}'s Profile</h1>

      <div className="profile-card">
        <div className="profile-photo-wrapper">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="profile-photo-img" />
          ) : (
            <svg className="profile-photo-default" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
            </svg>
          )}
        </div>

        <div className="profile-item">
          <h3>Name</h3>
          <p>{profile.userId?.name || "No name"}</p>
        </div>
        <div className="profile-item">
          <h3>Address</h3>
          <p>{profile.address || "No address"}</p>
        </div>
        <div className="profile-item">
          <h3>Language</h3>
          <p>{Array.isArray(profile.language) ? profile.language.join(", ") : profile.language || "No language"}</p>
        </div>
        <div className="profile-item">
          <h3>Experience</h3>
          <p>{profile.experience || "No experience"}</p>
        </div>
        <div className="profile-item">
          <h3>Availability</h3>
          <p>{profile.availability || "No availability"}</p>
        </div>
      </div>

      <div className="skills-container">
        <h2>Can Teach</h2>
        {profile.teach && profile.teach.length > 0 ? (
          <div className="skills-list">
            {profile.teach.map((skill, index) => (
              <div className="skill-tag" key={index}>{skill}</div>
            ))}
          </div>
        ) : (
          <p>No teaching skills added.</p>
        )}
      </div>

      <div className="skills-container">
        <h2>Wants to Learn</h2>
        {profile.learn && profile.learn.length > 0 ? (
          <div className="skills-list">
            {profile.learn.map((skill, index) => (
              <div className="skill-tag" key={index}>{skill}</div>
            ))}
          </div>
        ) : (
          <p>No learning skills added.</p>
        )}
      </div>

      <button type="button" className="continue-btn" onClick={() => navigate(-1)} style={{ maxWidth: "200px", margin: "24px auto", display: "block" }}>
        Back
      </button>
    </div>
  );
};

export default ViewProfile;
