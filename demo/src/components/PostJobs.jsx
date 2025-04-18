import React from 'react'
import Mainnav from './Mainnav'
import { useadmin } from '../context/usercontext'
import { useState } from 'react'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "../css/home.css"
import { useNavigate } from 'react-router-dom';
export default function PostJobs() {

    const { getcompany,userdata } = useadmin()
    const navigate=useNavigate()

    console.log(getcompany.name);

    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: false,
        employmentType: "Full-time",
    });

    // const handleJobChange = (e) => {
    //     setJobData({ ...jobData, [e.target.name]: e.target.value });
    // };


    const handleJobChange = (e) => {
        const { name, type, checked, value } = e.target;
    
        setJobData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value, 
        }));
    };

    console.log(jobData);
    

    const postJob = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/recruiter/postjob", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...jobData, companyEmail: userdata.email,companyname:getcompany.name }), // Using here recruiter email
        });

        if (response.ok) {
            toast.success("Job posted successfully!");
            setTimeout(() => {
                window.location.reload()
            }, 2000);
            navigate("/recruiter")
            setJobData({ title: "", description: "", location: "", salary: "", experience: "", employmentType: "Full-time" });
        } else {
            toast.error("Failed to post job");
        }
    };


    return (

        <>

            <div>
                <Mainnav name="Post Jobs here..." />
            </div>


            <div className='jobbs'>

                <div>
                    <h3>{getcompany.name}</h3>
                    <h3>Company Type: {getcompany.companytype}</h3>
                    <h3>Members Size: {getcompany.comsize}</h3>
                    <img src="" alt="" />
                </div>
                <div className="job-post-container">
                    <h3>Post a New Job</h3>
                    <form onSubmit={postJob}>
                        <div>
                            <label htmlFor="tutle">Job Title</label>

                            <input type="text" name="title" placeholder="Job Title" onChange={handleJobChange} required />
                        </div>

                        <div>
                            <label htmlFor="location">Company's Location</label>
                            <input type="text" name="location" placeholder="Location" onChange={handleJobChange} required />

                        </div>
                        

                        <div>
                            <label htmlFor="salary">Salary </label>
                            <input type="number" name="salary" placeholder="Salary" onChange={handleJobChange} required />
                        </div>

                        <div>

                            <span >Experience Required  </span>
                            <input style={{width:"10%"}} type="checkbox" name="experience" onChange={handleJobChange} />
                        </div>

                        <div>
                            <span>Job Type         </span>
                            <select name="employmentType" onChange={handleJobChange} required>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                            </select>

                        </div>


                        <div>
                            <label htmlFor="desc">Description</label>
                            <textarea name="description" rows={4} placeholder="Job Description" onChange={handleJobChange} required />
                        </div>

                        <button className='btn btn-primary' type="submit">Post Job</button>
                    </form>
                </div>
                <ToastContainer />
                

            </div>

        </>
    )
}
