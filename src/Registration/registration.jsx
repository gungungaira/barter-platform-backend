import React, { useState, useEffect } from "react";
import "./registration.css";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [myRegistration, setMyRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(()=>{
      console.log('timerOut working successfully')
    }, 500);
    return () => clearTimeout(timer);
  }, [myRegistration.name, myRegistration.email, myRegistration.password]);

  const handleChange = async (e) => {
    setMyRegistration({
      ...myRegistration,
      [e.target.name]: e.target.value,
    });
  };

  const getRegistration = async () => {
    const token =localStorage.getItem('token')
    const myServer = await fetch("https://barter-platform-backend.onrender.com/profile", {
      method: "GET",
      headers: {
        'authorization':`Bearer ${token}`
      },

    });
    const data = await myServer.json();
    console.log('get registration ',data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myServer = await fetch("https://barter-platform-backend.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myRegistration),
    });
    const myData = await myServer.json();
    if (myData.userId) {
      await getRegistration();
      navigate("/");
    } else if (!myData.userId) {
      navigate("/registration");
    }
  };

  return (
    <div className="register-main-div">
      <div className="head-of-login">
        <div className="in-head-1">
          <div className="login-text">Register here </div>
          <div style={{ marginTop: "43px" }}>
            <form className="inner-comp" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Enter your name "
                className="inner-comp-input"
                onChange={handleChange}
                value={myRegistration.name}
              />

              <input
                name="email"
                type="email"
                placeholder="Enter your Email "
                className="inner-comp-input"
                onChange={handleChange}
                value={myRegistration.email}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter password "
                className="inner-comp-input"
                onChange={handleChange}
                value={myRegistration.password}
              />
              <button type="submit" className="inner-comp-input-button">
                REGISTER HERE
              </button>
              <Link to="/" style={{ fontSize: "16px" }}>
                Back
              </Link>
            </form>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
