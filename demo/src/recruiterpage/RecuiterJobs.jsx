import React from 'react'
import Mainnav from '../components/Mainnav'
import { IoSearch } from "react-icons/io5";
import "../css/user.css"
import { useState } from 'react';
import { useadmin } from '../context/usercontext';
import { Link } from 'react-router-dom';
import ss from "../assets/11539820.png"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import backgroundImage from "../assets/b2 (1).png"
import "../css/joinus.css"
export default function RecuiterJobs() {

  const { userdata,getcompany } = useadmin()

  const [status, setstatus] = useState("Not Registered yet")

  const [data, setData] = useState({
    name: "",
    email: "",
    companytype:"IT",
    comsize: "",
    aboutcom:""

  });

  const mystyle = {
    display: "none",
    marginRight: "12rem",

  }
  const myst={
        backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "110vh",
      paddingTop: "3rem",
      marginTop:"-43rem"
      }

  const hide = () => {
    const registerrec = document.getElementById("registerrec")
    const rectypes = document.querySelector(".rectypes")
    registerrec.style.display = "block"
    rectypes.style.display = "none"

  }


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  

  const func = async(e) => {
     e.preventDefault();
    
        const response = await fetch("http://localhost:8000/recruiter/addcompany", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json"
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          const resData = await response.json();
          setstatus("Registered successfull")
          console.log(resData);
    
          toast.success("Company Registered", { position: "top-center" });
          setTimeout(() => {
            window.location.reload()
          }, 2000);
    
         
        } else {
          toast.error("Company already exist", { position: "top-center" });
        }

  }


 


  console.log(data);
  console.log(userdata);
  


  return (
    <>
      <div>
        <Mainnav name="Recuiter Dashboard"  />
      </div>
      <div style={{ marginTop: "5rem" }}>
        <div className="isre">

        </div>
        <div className="reccont">

          <div className="profile">
            <img src={ss} alt="" srcset="" />
            <h3>{userdata.name}</h3>
            <h4>{userdata.email}</h4>


            <button style={{ margin: "1.2rem 0rem" }} onClick={hide} className='btn'>Register your company</button>
            {/* <h4>Status: {status}</h4> */}

          </div>

          <div className="rectypes">

            <div className="show">
              <img src="" alt="" />
              <Link to="/postjob" >Post a new Job</Link>
            </div>
            <div className="show">
              <img src="" alt="" srcset="" />
              <Link to="/getjobs">Total Job Posts</Link>
            </div>
            <div className="show">
              <img src="" alt="" srcset="" />
              <Link to="/applicant">Total Applicants</Link>
            </div>

          </div>

          <div style={mystyle} id='registerrec'>
            <div className="col">
              <div className="joinus-container">
                <form onSubmit={func} className="joinus-form">
                  <div className="form-group">
                    <label htmlFor="name">Comany Name:</label>
                    <input type="text" required id="name" name="name" onChange={handleChange} placeholder="Enter your username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Recruiter Email:</label>
                    <input type="email" required id="email" name="email" onChange={handleChange} placeholder="Enter your email" />
                  </div>

                  <div style={{marginBottom:"1.2rem"}}>
                    <h4 className='h5'>Company Type:</h4>
                    <select onChange={handleChange} required  name="companytype" id="companytype">
                      <option value="IT">Information Technology</option>
                      <option value="Healthcare">HealthCare</option>
                      <option value="Finance">Finance</option>
                      <option value="Testing">Testing</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="companysize">Comapny Size:</label>
                    <input onChange={handleChange} required type="number" id="comsize" name="comsize"  placeholder="Enter your company size" />
                  </div>
                  <div>
                    <label>About Company</label>
                    <textarea onChange={handleChange} required  name="aboutcom" id="aboutcom" rows={4}></textarea>
                  </div>

                 



                  <button style={{ float: "right", marginTop: "1.1rem",width:"5rem" }} className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>

    </>
  )
}