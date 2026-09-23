import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createProfile.css";

const CreateProfile = () => {
  const [inputData, setInputData] = useState({
    name: "",
    address: "",
    language: "",
    experience: "",
    availability: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const neErr = {};
    if (!inputData.name.trim()) {
      neErr.name = "name field is required ";
    }
    if (!inputData.address.trim()) {
      neErr.address = "address field is required ";
    }
    if (!inputData.language.trim()) {
      neErr.language = "language field is required ";
    }
    if (!inputData.experience.trim()) {
      neErr.experience = "experience field is required ";
    }
    if (!inputData.availability.trim()) {
      neErr.availability = "availability field is required ";
    }
    setError(neErr);
    if (Object.keys(neErr)) {
      return;
    }
    navigate("/addSkills", { state: { profileData: inputData } });
  };
  return (
    <div className="profile_head">
      <div className="profile_head2">
        <div className="profile_head3">
          <div className="create-text">Create Profile here </div>
          <div className="profile-form-wrapper">
            <form className="inner-comp" onSubmit={handleNext}>
              <input
                name="name"
                type="text"
                placeholder="Enter your name "
                className="inner-comp-input"
                value={inputData.name}
                onChange={handleChange}
              />
              {error.name && <p>{error.name}</p>}
              <textarea
                name="address"
                placeholder="Enter your address"
                className="inner-comp-input"
                value={inputData.address}
                onChange={handleChange}
              />
              {error.address && <p>{error.address}</p>}
              <select
                name="language"
                value={inputData.language}
                onChange={handleChange}
              >
                <option value="">Select language</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="punjabi">Punjabi</option>
                <option value="bengali">Bengali</option>
                <option value="marathi">Marathi</option>
                <option value="gujarati">Gujarati</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="kannada">Kannada</option>
                <option value="malayalam">Malayalam</option>
                <option value="odia">Odia</option>
                <option value="assamese">Assamese</option>
                <option value="urdu">Urdu</option>
                <option value="nepali">Nepali</option>
                <option value="sanskrit">Sanskrit</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="spanish">Spanish</option>
                <option value="italian">Italian</option>
                <option value="portuguese">Portuguese</option>
                <option value="russian">Russian</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="chinese">Chinese</option>
              </select>
              {error.language && <p>{error.language}</p>}
              <input
                name="experience"
                type="text"
                placeholder="Enter your experience "
                className="inner-comp-input"
                value={inputData.experience}
                onChange={handleChange}
              />
              {error.experience && <p>{error.experience}</p>}
              <input
                name="availability"
                type="text"
                placeholder="Enter your  Availability "
                className="inner-comp-input"
                value={inputData.availability}
                onChange={handleChange}
              />
              {error.availability && <p>{error.availability}</p>}
              

              <button
                type="submit"
                style={{
                  fontSize: "16px",
                  padding: "10px 25px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
              <Link to="/home" style={{ fontSize: "16px" }}>
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

export default CreateProfile;


