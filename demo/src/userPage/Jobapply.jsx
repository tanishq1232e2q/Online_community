import React from 'react'
import { useLocation } from 'react-router-dom';
import Mainnav from '../components/Mainnav';
import "../css/apply.css"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useadmin } from '../context/usercontext';
export default function Jobapply() {
    const { alljobs } = useadmin()

    const [selectedJob, setSelectedJob] = useState(null);
    
    const handle = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    
    
      }

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
    console.log(alljobs);


    return (
        <>



            <div>
                <Mainnav name="Apply for jobs" title="jobs" />
            </div>


            <div className='sh'>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
                    {Array.isArray(alljobs) && alljobs.length > 0 ? (
                        alljobs.map((ele) => (
                            <div key={ele._id} className="card" style={{ width: '18rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{ele.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{ele.companyname}</h6>
                                    <p className="card-text">{ele.description}</p>
                                    <p className="card-text"><strong>Type:</strong> {ele.employmentType}</p>
                                    <p className="card-text"><strong>Location:</strong> {ele.location}</p>
                                    <p className="card-text"><strong>Salary:</strong> ₹{ele.salary}</p>
                                    <p className="card-text">
                                        <strong>Experience Required:</strong> {ele.experience ? "Yes" : "No"}
                                    </p>
                                    {/* <a href={`mailto:${ele.companyEmail}`} className="btn btn-primary">Apply</a>
                                     */}
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => setSelectedJob(ele)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No job listings available.</p>
                    )}
                </div>
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
                                    <h3 style={{ textAlign: "center" }}>Applying for {selectedJob?.title}</h3>
                                    <h4 style={{ textAlign: "center" }}>{selectedJob?.companyname}</h4>

                                    <div className='heads'>
                                        <h3 style={{ textAlign: "center" }}>Your resume</h3>
                                        <button style={{ marginLeft: "13rem" }} className="btn btn-success" ><Link to="/resume">View</Link></button>

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
        

        </>    

            


        
    )
}
