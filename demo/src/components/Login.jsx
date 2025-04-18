import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../css/joinus.css";
import backgroundImage from "../assets/back.avif"

import m88 from "../assets/ai-generated-8706674_1920.jpg";
import m99 from "../assets/m2.jpg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useadmin } from "../context/usercontext";
import jj from "../assets/back.avif"
const Login = () => {

  const {userdata,setuserdata}=useadmin()
  const navigate = useNavigate();  

  const [data, setData] = useState({ 
    email: "",
    password: "", 
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  console.log(data);
  

  const func = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/user/loginuser", {
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
      console.log(resData.role);
      setuserdata(resData)
      
      console.log(userdata);
      
      
      
      
      
      toast.success("User logged in", { position: "top-center" });
      
      if (resData.userdata.role === "user") {
        navigate("/user");
        window.location.reload()
      } else {
        
        navigate("/recruiter");
        window.location.reload()
      }
    } else {
      toast.error("Invalid Credentials", { position: "top-center" });
    }
  };
  const mystyle={
      backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "110vh",
    paddingTop: "3rem",
    marginTop:"-43rem"
    }

  return (
    <>
      <Navbar />
      <div style={mystyle} className="hos">
        <h2 style={{ textAlign: "center", position: "absolute", top: "15rem", left: "5rem" }}>
          Login in the system
        </h2>
        
        <div className="col">
          <div className="joinus-container">
            <form className="joinus-form">
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleChange} placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={handleChange} placeholder="Enter your password" />
              </div>

            

              <button onClick={func} style={{ float: "right",width:"5rem", marginTop: "1.1rem" }} className="btn btn-outline-success" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
