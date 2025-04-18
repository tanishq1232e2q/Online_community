import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../css/joinus.css";
import backgroundImage from "../assets/back.avif"
import m88 from "../assets/ai-generated-8706674_1920.jpg";
import m99 from "../assets/m2.jpg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Joinus = () => {
  const navigate = useNavigate();  

  const [role, setRole] = useState("");
  const [data, setData] = useState({
    name: "",  
    email: "",
    password: "", 
    role: "",
  });
  const mystyle={
    backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "180vh",
  paddingTop: "3rem",
  marginTop:"-43rem"
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle role selection
  const selectRole = (role) => {
    setRole(role);
    setData({ ...data, role });
  };

  console.log(data);
  console.log("role is " + role);

  const func = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/user/joinuser", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const resData = await response.json();
      localStorage.setItem("token", resData.token);
      console.log(resData);

      toast.success("User logged in", { position: "top-center" });

      if (role === "user") {
        navigate("/user");
        window.location.reload()
      } else {
        navigate("/recruiter");
        window.location.reload()
      }
    } else {
      toast.error("User already exist", { position: "top-center" });
    }
  };

  return (
    <>
      <Navbar />
      <div style={mystyle} className="bg-hos">
        <h2 style={{ textAlign: "center", position: "absolute", top: "15rem", left: "5rem" }}>
          Join Us
        </h2>
        <h3 style={{ textAlign: "center", position: "absolute", top: "18rem", left: "5rem" }}>
          Be a part of us
        </h3>
        <div className="col bkk">
          <div className="joinus-container">
            <form className="joinus-form">
              <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input type="text" id="name" name="name" onChange={handleChange} placeholder="Enter your username" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleChange} placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={handleChange} placeholder="Enter your password" />
              </div>

              <h3>Select Your Role</h3>
              <div className="role-cards">
                <div className={`role-card ${data.role === "Recruiter" ? "selected" : ""}`} onClick={() => selectRole("Recruiter")}>
                  <h2>Recruiter</h2>
                  <img src={m88} alt="Recruiter" />
                  <p>Post jobs and find the best candidates for your company.</p>
                </div>
                <div className={`role-card ${data.role === "user" ? "selected" : ""}`} onClick={() => selectRole("user")}>
                  <h2>Normal User</h2>
                  <img src={m99} alt="Normal User" />
                  <p>Search for jobs and apply to your dream positions.</p>
                </div>
              </div>

              <button onClick={func} style={{ float: "right", marginTop: "1.1rem" }} className="btn btn-primary" type="submit">
                Next
              </button>
              <span>Already a member Login here---<Link style={{color:"blue"}} to={"/login"}>Login</Link></span>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Joinus;
