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
        "https://barter-platform-backend.onrender.com/uploadFile",
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
useEffect(() => {
  return () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };
}, [previewUrl]);

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
      const server = await fetch("https://barter-platform-backend.onrender.com/myProfile", {
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

  
};

export default SkillAutocomplete;
