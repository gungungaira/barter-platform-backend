import React, { useState,useEffect } from "react";
import "./addSkills.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import axios from "axios";

const skills = [
  "Cooking",
  "Baking",
  "Indian Cooking",
  "Chinese Cooking",
  "Italian Cooking",
  "Healthy Cooking",
  "Meal Preparation",
  "Photography",
  "Photo Editing",
  "Videography",
  "Video Editing",
  "Graphic Design",
  "UI Design",
  "UX Design",
  "Web Design",
  "Drawing",
  "Sketching",
  "Painting",
  "Watercolor Painting",
  "Digital Art",
  "Calligraphy",
  "Crafting",
  "Sewing",
  "Stitching",
  "Embroidery",
  "Knitting",
  "Crochet",
  "Woodworking",
  "Gardening",
  "Home Gardening",
  "Interior Design",
  "Dancing",
  "Singing",
  "Guitar",
  "Piano",
  "Keyboard",
  "Drums",
  "Violin",
  "Music Production",
  "Music Theory",
  "Acting",
  "Public Speaking",
  "Storytelling",
  "Creative Writing",
  "Blogging",
  "Poetry",
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Yoga",
  "Meditation",
  "Fitness",
  "Workout Training",
  "Running",
  "Cycling",
  "Chess",
  "Badminton",
  "Football",
  "Cricket",
  "Table Tennis",
  "Swimming",
  "Programming",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Python",
  "Java",
  "C",
  "C++",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "Data Structures",
  "Algorithms",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Analysis",
  "Excel",
  "Microsoft Word",
  "PowerPoint",
  "Digital Marketing",
  "SEO",
  "Social Media Marketing",
  "Content Creation",
  "Copywriting",
  "Business",
  "Entrepreneurship",
  "Sales",
  "Communication",
  "Leadership",
  "Time Management",
  "Personal Finance",
  "Investing",
  "Budgeting",
  "Makeup",
  "Hair Styling",
  "Fashion Design",
  "First Aid",
  "Driving",
  "Travel Planning",
  "Teaching",
  "Tutoring",
  "Career Guidance",
  "Resume Writing",
  "Interview Preparation",
];

const fuse = new Fuse(skills, {
  threshold: 0.3,
  distance: 100,
});

const SkillAutocomplete = () => {
  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");

  const [teachSuggestions, setTeachSuggestions] = useState([]);
  const [learnSuggestions, setLearnSuggestions] = useState([]);

  const [teachingSkills, setTeachingSkills] = useState([]);
  const [learningSkills, setLearningSkills] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // local preview before upload
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null); // server URL after upload
  const [uploading, setUploading] = useState(false);

  const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setSelectedFile(file);
  setUploadedPhotoUrl(null); // reset old upload if user picks a new file

  const localUrl = URL.createObjectURL(file);
  setPreviewUrl(localUrl);
};
  const navigate = useNavigate();

  const location = useLocation();
  const profileFromStep1 = location.state?.profileData || {};

  const handleTeachChange = (e) => {
    const value = e.target.value;
    setTeachInput(value);

    if (value.trim() === "") {
      setTeachSuggestions([]);
      return;
    }

    const result = fuse.search(value);
    const suggestions = result.slice(0, 6).map((item) => item.item);
    setTeachSuggestions(suggestions);
  };

  const handleLearnChange = (e) => {
    const value = e.target.value;
    setLearnInput(value);

    if (value.trim() === "") {
      setLearnSuggestions([]);
      return;
    }

    const result = fuse.search(value);
    const suggestions = result.slice(0, 6).map((item) => item.item);
    setLearnSuggestions(suggestions);
  };

  const selectTeachSkill = (skill) => {
    if (!teachingSkills.includes(skill)) {
      setTeachingSkills([...teachingSkills, skill]);
    }
    setTeachInput("");
    setTeachSuggestions([]);
  };

  const selectLearnSkill = (skill) => {
    if (!learningSkills.includes(skill)) {
      setLearningSkills([...learningSkills, skill]);
    }
    setLearnInput("");
    setLearnSuggestions([]);
  };

  const removeTeachSkill = (skill) => {
    setTeachingSkills(teachingSkills.filter((item) => item !== skill));
  };

  const removeLearnSkill = (skill) => {
    setLearningSkills(learningSkills.filter((item) => item !== skill));
  };

  
    const onFileUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a photo first.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);

    setUploading(true);
    try {
      const res = await axios.post(
        "http://localhost:4040/uploadFile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // adjust this depending on what your backend actually returns
      const serverUrl = res.data.fileUrl || res.data.url || res.data.path;
      setUploadedPhotoUrl(serverUrl);
    } catch (err) {
      console.error(err);
      alert("Photo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified: {new Date(selectedFile.lastModified).toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
useEffect(() => {
  return () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };
}, [previewUrl]);
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const server = await fetch("http://localhost:4040/getMyProfile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await server.json();
    console.log(data);
  };

    const handleSubmit = async () => {
    if (teachingSkills.length === 0) {
      alert("Please select at least one skill you can teach.");
      return;
    }
    if (learningSkills.length === 0) {
      alert("Please select at least one skill you want to learn.");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/");
      return;
    }

    const profileData = {
      ...profileFromStep1,
      teach: teachingSkills,
      learn: learningSkills,
      photo: uploadedPhotoUrl || null, // include the uploaded photo URL if present
    };

    try {
      const server = await fetch("http://localhost:4040/myProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await server.json();

      if (!server.ok) {
        alert(data.message || "Failed to save skills.");
        return;
      }
      localStorage.setItem("profileCreated", "true");
    
      window.dispatchEvent(new Event("profileCreated"));

      navigate("/home");
    } catch (error) {
      console.error("Error submitting skills:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="skill-page">
      <div className="skill-card">
        <div className="photo-upload-wrapper">
          <label htmlFor="profilePhotoInput" className="photo-preview">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="photo-img"
              />
            ) : (
              <svg
                className="default-user-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
              </svg>
            )}
            <span className="photo-edit-badge">✎</span>
          </label>

          <input
            id="profilePhotoInput"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          {selectedFile && !uploadedPhotoUrl && (
            <button
              type="button"
              className="upload-photo-btn"
              onClick={onFileUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          )}

          {uploadedPhotoUrl && (
            <p className="upload-success-text">Photo uploaded ✓</p>
          )}
        </div>

        <h1 className="skill-title">Exchange Your Skills</h1>
        <p className="skill-subtitle">
          Tell us what you can teach and what you want to learn.
        </p>

        <div className="skill-section">
          <div className="section-title">
            <span className="section-icon">↑</span>
            <div>
              <h2>CAN TEACH</h2>
              <p>Skills you can share with others</p>
            </div>
          </div>
          <div className="skill-input-wrapper">
            <input
              type="text"
              value={teachInput}
              placeholder="Search a skill you can teach..."
              className="skill-input"
              onChange={handleTeachChange}
            />
            {teachSuggestions.length > 0 && (
              <div
                className="suggestions"
                style={{ color: "white", cursor: "pointer" }}
              >
                {teachSuggestions.map((skill) => (
                  <div
                    key={skill}
                    className="suggestion-item"
                    onClick={() => selectTeachSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selected-area">
            {teachingSkills.length === 0 ? (
              <p className="empty-text">No teaching skills selected yet</p>
            ) : (
              teachingSkills.map((skill) => (
                <div className="skill-tag" key={skill}>
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeTeachSkill(skill)}>
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="skill-section">
          <div className="section-title">
            <span className="section-icon learn-icon">↓</span>
            <div>
              <h2>WANT TO LEARN</h2>
              <p>Skills you want to learn from others</p>
            </div>
          </div>
          <div className="skill-input-wrapper">
            <input
              type="text"
              value={learnInput}
              placeholder="Search a skill you want to learn..."
              className="skill-input"
              onChange={handleLearnChange}
            />
            {learnSuggestions.length > 0 && (
              <div
                className="suggestions"
                style={{ color: "white", cursor: "pointer" }}
              >
                {learnSuggestions.map((skill) => (
                  <div
                    key={skill}
                    className="suggestion-item"
                    onClick={() => selectLearnSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selected-area">
            {learningSkills.length === 0 ? (
              <p className="empty-text">No learning skills selected yet</p>
            ) : (
              learningSkills.map((skill) => (
                <div className="skill-tag" key={skill}>
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeLearnSkill(skill)}>
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="button-area">
          <button type="button" className="continue-btn" onClick={handleSubmit}>
            Continue
            <span>→</span>
          </button>
          <Link to="/home" className="continue-btn">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillAutocomplete;




// import React, { useState } from "react";
// import "./addSkills.css";
// import { Link, useNavigate } from "react-router-dom";
// import Fuse from "fuse.js";

// const skills = [
//   "Cooking",
//   "Baking",
//   "Indian Cooking",
//   "Chinese Cooking",
//   "Italian Cooking",
//   "Healthy Cooking",
//   "Meal Preparation",
//   "Photography",
//   "Photo Editing",
//   "Videography",
//   "Video Editing",
//   "Graphic Design",
//   "UI Design",
//   "UX Design",
//   "Web Design",
//   "Drawing",
//   "Sketching",
//   "Painting",
//   "Watercolor Painting",
//   "Digital Art",
//   "Calligraphy",
//   "Crafting",
//   "Sewing",
//   "Stitching",
//   "Embroidery",
//   "Knitting",
//   "Crochet",
//   "Woodworking",
//   "Gardening",
//   "Home Gardening",
//   "Interior Design",
//   "Dancing",
//   "Singing",
//   "Guitar",
//   "Piano",
//   "Keyboard",
//   "Drums",
//   "Violin",
//   "Music Production",
//   "Music Theory",
//   "Acting",
//   "Public Speaking",
//   "Storytelling",
//   "Creative Writing",
//   "Blogging",
//   "Poetry",
//   "English",
//   "Hindi",
//   "Spanish",
//   "French",
//   "German",
//   "Japanese",
//   "Korean",
//   "Yoga",
//   "Meditation",
//   "Fitness",
//   "Workout Training",
//   "Running",
//   "Cycling",
//   "Chess",
//   "Badminton",
//   "Football",
//   "Cricket",
//   "Table Tennis",
//   "Swimming",
//   "Programming",
//   "JavaScript",
//   "React",
//   "Node.js",
//   "Express.js",
//   "MongoDB",
//   "Python",
//   "Java",
//   "C",
//   "C++",
//   "HTML",
//   "CSS",
//   "Git",
//   "GitHub",
//   "Data Structures",
//   "Algorithms",
//   "Machine Learning",
//   "Artificial Intelligence",
//   "Data Analysis",
//   "Excel",
//   "Microsoft Word",
//   "PowerPoint",
//   "Digital Marketing",
//   "SEO",
//   "Social Media Marketing",
//   "Content Creation",
//   "Copywriting",
//   "Business",
//   "Entrepreneurship",
//   "Sales",
//   "Communication",
//   "Leadership",
//   "Time Management",
//   "Personal Finance",
//   "Investing",
//   "Budgeting",
//   "Makeup",
//   "Hair Styling",
//   "Fashion Design",
//   "First Aid",
//   "Driving",
//   "Travel Planning",
//   "Teaching",
//   "Tutoring",
//   "Career Guidance",
//   "Resume Writing",
//   "Interview Preparation",
// ];
// const fuse = new Fuse(skills, {
//   threshold: 0.3,
//   distance: 100,
// });

// const SkillAutocomplete = () => {
//   // Input states
//   const [teachInput, setTeachInput] = useState("");
//   const [learnInput, setLearnInput] = useState("");

//   // Suggestion states
//   const [teachSuggestions, setTeachSuggestions] = useState([]);
//   const [learnSuggestions, setLearnSuggestions] = useState([]);

//   // Selected skills
//   const [teachingSkills, setTeachingSkills] = useState([]);
//   const [learningSkills, setLearningSkills] = useState([]);
//   const navigate = useNavigate();

//   const handleTeachChange = (e) => {
//     const value = e.target.value;

//     setTeachInput(value);

//     if (value.trim() === "") {
//       setTeachSuggestions([]);

//       return;
//     }

//     const result = fuse.search(value);

//     const suggestions = result.slice(0, 6).map((item) => item.item);

//     setTeachSuggestions(suggestions);
//   };

//   const handleLearnChange = (e) => {
//     const value = e.target.value;

//     setLearnInput(value);

//     if (value.trim() === "") {
//       setLearnSuggestions([]);

//       return;
//     }

//     const result = fuse.search(value);

//     const suggestions = result.slice(0, 6).map((item) => item.item);

//     setLearnSuggestions(suggestions);
//   };

//   const selectTeachSkill = (skill) => {
//     if (!teachingSkills.includes(skill)) {
//       setTeachingSkills([...teachingSkills, skill]);
//     }

//     setTeachInput("");

//     setTeachSuggestions([]);
//   };

//   const selectLearnSkill = (skill) => {
//     if (!learningSkills.includes(skill)) {
//       setLearningSkills([...learningSkills, skill]);
//     }

//     setLearnInput("");

//     setLearnSuggestions([]);
//   };

//   const removeTeachSkill = (skill) => {
//     setTeachingSkills(teachingSkills.filter((item) => item !== skill));
//   };

//   const removeLearnSkill = (skill) => {
//     setLearningSkills(learningSkills.filter((item) => item !== skill));
//   };
//   const getProfile = async (req, res) => {
//     const token = localStorage.getItem("token");
//     const server = await fetch("http://localhost:4040/getMyProfile", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await server.json();
//     console.log(data);
//   };
//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token");
//     const profileData = {
//       teach: teachingSkills,
//       learn: learningSkills,
//     };
//     console.log(profileData);
//     try {
//       const server = await fetch("http://localhost:4040/myProfile", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profileData),
//       });
//       const data = await server.json();
//       if (data._id) {
//         localStorage.setItem("profileCreated", "true");
//         window.dispatchEvent(new Event("profileCreated"));
//         await getProfile();
//         navigate("/home");
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="skill-page">
//       <div className="skill-card">
//         <h1 className="skill-title">Exchange Your Skills</h1>
//         <p className="skill-subtitle">
//           Tell us what you can teach and what you want to learn.
//         </p>
//         <div className="skill-section">
//           <div className="section-title">
//             <span className="section-icon">↑</span>
//             <div>
//               <h2>CAN TEACH</h2>
//               <p>Skills you can share with others</p>
//             </div>
//           </div>
//           <div className="skill-input-wrapper">
//             <input
//               type="text"
//               value={teachInput}
//               placeholder="Search a skill you can teach..."
//               className="skill-input"
//               onChange={handleTeachChange}
//             />
//             {teachSuggestions.length > 0 && (
//               <div
//                 className="suggestions"
//                 style={{ color: "white", cursor: "pointer" }}
//               >
//                 {teachSuggestions.map((skill) => (
//                   <div
//                     key={skill}
//                     className="suggestion-item"
//                     onClick={() => selectTeachSkill(skill)}
//                   >
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="selected-area">
//             {teachingSkills.length === 0 ? (
//               <p className="empty-text">No teaching skills selected yet</p>
//             ) : (
//               teachingSkills.map((skill) => (
//                 <div className="skill-tag" key={skill}>
//                   <span>{skill}</span>

//                   <button type="button" onClick={() => removeTeachSkill(skill)}>
//                     ×
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="skill-section">
//           <div className="section-title">
//             <span className="section-icon learn-icon">↓</span>
//             <div>
//               <h2>WANT TO LEARN</h2>
//               <p>Skills you want to learn from others</p>
//             </div>
//           </div>
//           <div className="skill-input-wrapper">
//             <input
//               type="text"
//               value={learnInput}
//               placeholder="Search a skill you want to learn..."
//               className="skill-input"
//               onChange={handleLearnChange}
//             />
//             {learnSuggestions.length > 0 && (
//               <div
//                 className="suggestions"
//                 style={{ color: "white", cursor: "pointer" }}
//               >
//                 {learnSuggestions.map((skill) => (
//                   <div
//                     key={skill}
//                     className="suggestion-item"
//                     onClick={() => selectLearnSkill(skill)}
//                   >
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="selected-area">
//             {learningSkills.length === 0 ? (
//               <p className="empty-text">No learning skills selected yet</p>
//             ) : (
//               learningSkills.map((skill) => (
//                 <div className="skill-tag" key={skill}>
//                   <span>{skill}</span>
//                   <button type="button" onClick={() => removeLearnSkill(skill)}>
//                     ×
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="button-area">
//           <button type="button" className="continue-btn" onClick={handleSubmit}>
//             Continue
//             <span>→</span>
//           </button>
//           <Link to="/home" className="continue-btn">
//             Back
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkillAutocomplete;

