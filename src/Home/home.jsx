// import React from 'react'
// import './home.css'
// import Navbar from '../NAVBAR/navbar'
// import Footer from '../Footer/footer'

// const home = () => {
//   return (
//     <div className="home-page">
//   <Navbar />

//   <section className="hero">

//     {/* Background effects */}
//     <div className="glow glow-1"></div>
//     <div className="glow glow-2"></div>
//     <div className="glow glow-3"></div>

//     {/* Floating skill cards */}
//     <div className="skill-card skill-card-left">
//       <span>🎸</span>
//       <div>
//         <strong>Guitar</strong>
//         <small>Can teach</small>
//       </div>
//     </div>

//     <div className="skill-card skill-card-right">
//       <span>💻</span>
//       <div>
//         <strong>React JS</strong>
//         <small>Wants to learn</small>
//       </div>
//     </div>

//     <div className="skill-card skill-card-bottom">
//       <span>🎨</span>
//       <div>
//         <strong>UI Design</strong>
//         <small>Skill exchange</small>
//       </div>
//     </div>

//     {/* Main content */}
//     <div className="hero-content">

//       <div className="hero-tag">
//         ✦ Skill Exchange Community
//       </div>

//       <h1>
//         Exchange Skills,
//         <span>Build Connections</span>
//       </h1>

//       <p>
//         Share what you know. Learn what you love.
//         Find people who can teach you the skills
//         you've always wanted to learn.
//       </p>

//       <div className="hero-buttons">
//         <button className="primary-btn">
//           Find My Match
//           <span>→</span>
//         </button>

//         <button className="secondary-btn">
//           Explore Skills
//         </button>
//       </div>

//       <div className="hero-stats">
//         <div>
//           <strong>10K+</strong>
//           <span>Skills</span>
//         </div>

//         <div>
//           <strong>5K+</strong>
//           <span>Members</span>
//         </div>

//         <div>
//           <strong>2K+</strong>
//           <span>Exchanges</span>
//         </div>
//       </div>

//     </div>

//   </section>
//    <Footer />
// </div>
//   )
// }

// export default home

import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../NAVBAR/navbar";
import Footer from "../Footer/footer";
import WelcomeBanner from "../Home/welcome";

const Home = () => {
  const [profileCreated, setProfileCreated] = useState(
    localStorage.getItem("profileCreated") === "true"
  );

 useEffect(() => {
  const checkProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("https://barter-platform-backend.onrender.com/getMyProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfileCreated(!!data && !data.message); // adjust based on what your API returns when no profile exists
    } catch (err) {
      console.error(err);
    }
  };

  checkProfile();
}, []);

  return (
    <div className="home-page">
      <Navbar />

      {profileCreated ? (
        <WelcomeBanner />
      ) : (
        <section className="hero">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
          <div className="glow glow-3"></div>

          <div className="skill-card skill-card-left">
            <span>🎸</span>
            <div>
              <strong>Guitar</strong>
              <small>Can teach</small>
            </div>
          </div>

          <div className="skill-card skill-card-right">
            <span>💻</span>
            <div>
              <strong>React JS</strong>
              <small>Wants to learn</small>
            </div>
          </div>

          <div className="skill-card skill-card-bottom">
            <span>🎨</span>
            <div>
              <strong>UI Design</strong>
              <small>Skill exchange</small>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-tag">
              ✦ Skill Exchange Community
            </div>

            <h1>
              Exchange Skills,
              <span>Build Connections</span>
            </h1>

            <p>
              Share what you know. Learn what you love. Find people who can
              teach you the skills you've always wanted to learn.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Find My Match
                <span>→</span>
              </button>

              <button className="secondary-btn">
                Explore Skills
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>10K+</strong>
                <span>Skills</span>
              </div>

              <div>
                <strong>5K+</strong>
                <span>Members</span>
              </div>

              <div>
                <strong>2K+</strong>
                <span>Exchanges</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;