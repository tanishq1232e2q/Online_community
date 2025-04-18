import React from 'react'

import Mainnav from './Mainnav';
import { useadmin } from '../context/usercontext'

import "../css/home.css"
export default function TotalJobpost() {

    const { getjobs } = useadmin()



    return (

        <>

            <div>
                <Mainnav name="Company's Job Posts" title="news" />
            </div>

            <h3 style={{ marginTop: "6rem", textAlign: "center" }}>Your Job Listings</h3>
            <div className='moon'>
                {getjobs.length === 0 ? (
                    <p>No jobs posted yet.</p>
                ) : (
                    getjobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <h4 style={{textAlign:"center"}}>{job.title}</h4>
                            <p style={{textAlign:"center"}}>{job.description}</p>
                            <p style={{fontWeight:"700"}}>{job.companyname}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> ${job.salary}</p>
                            <p><strong>Experience:</strong>{job.experience ? "Mandetory" : "No need"}</p>
                            <p><strong>Type:</strong> {job.employmentType}</p>
                            <p><strong>Contact: </strong> {job.companyEmail}</p>
                        </div>
                    ))
                )}
            </div>

        </>
    )
}
