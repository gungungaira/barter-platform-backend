import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);

  const navigate = useNavigate();

  const checkProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setProfileCreated(false);
      return;
    }

    try {
      const server = await fetch(
        "http://localhost:4040/getMyProfile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (server.ok) {
  
        setProfileCreated(true);
      } else {
  
        setProfileCreated(false);
      }
    } catch (error) {
      console.log("Profile check error:", error);
      setProfileCreated(false);
    }
  };

  useEffect(() => {
   
    checkProfile();

    const handleProfileCreated = () => {
      setProfileCreated(true);
    };

    window.addEventListener(
      "profileCreated",
      handleProfileCreated
    );

    return () => {
      window.removeEventListener(
        "profileCreated",
        handleProfileCreated
      );
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileCreated");

    setProfileCreated(false);
    setProfileOpen(false);
    

    navigate("/");
  };

  return (
    <nav className="navbar">


      <div className="navbar-logo">
        <Link to="/home">
          SkillSwap &nbsp;<span> YOUR  BEST's</span>
        </Link>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search people or skills..."
        />

        <button
          type="button"
          className="search-button"
        >
          🔍
        </button>
      </div>

   
      <div
        className={`navbar-links ${
          menuOpen ? "active" : ""
        }`}
      >

        <Link
          to="/findMatch"
          className="find-match"
        >
          Find Match
        </Link>

        <Link
          to= '/inbox'
          className="message-link"
        >
          Messages
          <span className="message-badge">
            
          </span>
        </Link>

        <Link
          to="/requests"
          className="message-link"
        >
          Requests
          <span className="message-badge"></span>
        </Link>

        {!profileCreated && (
          <div>
            <Link to="/setProfile">
              Create Profile
            </Link>
          </div>
        )}
        {profileCreated && (
          <div className="profile-container">

            <button
              type="button"
              className="profile-button"
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
            >

              <div className="profile-avatar">
                G
              </div>

              <span>
                Profile
              </span>

              <span className="arrow">
                {profileOpen ? "▲" : "▼"}
              </span>

            </button>

            {profileOpen && (
              <div className="profile-dropdown">

                <Link
                  to="/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  My Profile
                </Link>

                <Link
                  to="/mySkill"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  My Skills
                </Link>

                <Link
                  to="/requests"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  My Requests
                </Link>

                <Link
                  to="/friends"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                >
                  Your Connection
                </Link>

                <hr />

                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Log Out
                </button>

              </div>
            )}

          </div>
        )}

      </div>

      <button
        type="button"
        className="mobile-menu"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        ☰
      </button>

    </nav>
  );
};

export default Navbar;