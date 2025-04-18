import React, { useLayoutEffect } from 'react'
import Mainnav from '../components/Mainnav'
import { IoSearch } from "react-icons/io5";
import "../css/user.css"
import { useadmin } from '../context/usercontext';
import { useState, useEffect } from 'react';
import "../css/apply.css"
import ss from "../assets/11539820.png"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function UserJobs() {

  const { userdata, profile } = useadmin()
  const [searchQuery, setSearchQuery] = useState("")
  const [iscom,setiscom]=useState(false)
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    com: "",
    area: "",
    areacom: ""
  })

  const handle = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })


  }


  const fetchselectedJobs = async (e) => {
    e.preventDefault()
    if (!searchQuery) return;
    try {
      const response = await fetch(`http://localhost:8000/user/getuserjobs/${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        setJobs(data);
      } else {
        toast.error("No jobs found");
        setJobs([]);
      }
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  }

  console.log(jobs);

  console.log(formdata);
  console.log(profile);
  


  const postapply = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/user/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...formdata,recur:jobs[0].companyEmail,profile:profile}), 
    });

    if (response.ok) {
      toast.success("Job applied successfully!");
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      navigate("/user")
    } else {
      toast.error("Failed to apply job");
    }
  };





  console.log(userdata);

  return (
    <>
      <div>
        <Mainnav name="User Dashboard" title="jobs" />
      </div>
      <div style={{ marginTop: "5rem" }}>
        <div className="cont">

          <div className="profile">
            <img src={ss} alt="" srcset="" />
            <h3>{userdata.name}</h3>
            <h4>{userdata.email}</h4>


            <button onClick={()=>setiscom(true)} className='btn btn-primary'><Link to="/profile">Complete your Profile</Link></button>

          </div>

          <div className="search">
            <div className="for">
              <form onSubmit={fetchselectedJobs} action="">

                <span>{<IoSearch size={45} />}</span> <input onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search jobs here' id="inns" type="text" />
                <button type='submit'>submit</button>
              </form>

            </div>


            <div className='mains'>
              {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
              ) : (
                jobs.map((job, index) => (
                  <div key={job._id} className="job-card">

                    <h4>{job.title}</h4>
                    <p>{job.description}</p>
                    <p>{job.companyname}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                    <p><strong>Experience:</strong>{job.experience ? "Mandetory" : "No need"}</p>
                    <p><strong>Type:</strong> {job.employmentType}</p>
                    <p><strong>Contact: </strong>{job.companyEmail}</p>
                    {/* <button
                      onClick={() => navigate("/jobapply", { state: { job } })}
                    >
                      Apply
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setSelectedJob(job)}
                    >
                      Apply
                    </button>
                  </div>
                ))
              )}
            </div>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Apply here...</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className="prof">
                      <div className="apply">
                        <h3 style={{textAlign:"center"}}>Applying for {selectedJob?.title}</h3>
                        <h4 style={{textAlign:"center"}}>{selectedJob?.companyname}</h4>

                        <div className='heads'>
                          <h3 style={{textAlign:"center"}}>Your resume</h3>
                          <button style={{marginLeft:"13rem"}} className="btn btn-success" ><Link to="/resume">View</Link></button>

                        </div>

                        <form onSubmit={postapply} action="">

                          <div className="details" style={{ display: 'flex', flexDirection: "column", gap: '0rem' }}>
                            <h3 style={{ marginRight: '1rem' }}>Confirm your availability</h3>

                            <label>
                              <input onChange={handle} type="radio" name="com" value="Yes, I am available to join immediately" /> Yes, I am available to join immediately
                            </label>

                            <label>
                              <input onChange={handle} type="radio" name="com" value="No, I will be available to join after 1 week" /> No, I will be available to join after 1 week
                            </label>

                            <label>
                              <input onChange={handle} type="radio" name="com" value="No, I will join after getting the offer letter" /> No, I will join after getting the offer letter
                            </label>
                            <div className="cover">
                              <h3>Why should you be hired for this role?</h3>
                              <textarea onChange={handle} name="area" id="area" cols="10" rows="5"></textarea>
                            </div>
                            <div className="coverdetails">
                              <h3>Why you choose our company?</h3>
                              <textarea onChange={handle} name="areacom" id="areacom" cols="10" rows="5"></textarea>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                          </div>

                        </form>



                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="filter">

            
          </div>
        </div>
      </div>




    </>
  )
}
