import React from 'react'
import { useadmin } from '../context/usercontext'
import "../css/apply.css"
import { useEffect } from 'react';
export default function Resume() {
    const {profile}=useadmin()

    // console.log(profile[0].name);
    if (!profile || Object.keys(profile).length === 0) {
        return <div className="">Loading profile...</div>;
      }

      
    const pp=profile[profile.length-1]
    
  return (
    <div className="bnn">
      <h3 style={{position:"absolute",top:"12rem",left:"4rem"}}>Generated Resume...</h3>

    <div className='resume'>
       <div className="">
      <h1 className="">{pp.name}</h1>

      <div className="mb-4">
        <h2 className="">Contact Info</h2>
        <p><strong>Email:</strong> {pp.email}</p>
        <p><strong>Phone:</strong> {pp.contact}</p>
        <p><strong>Address:</strong> {pp.address}</p>
      </div>

      <div className="mb-4">
        <h2 className="">Qualification</h2>
        <p>{pp.qualification}</p>
      </div>

      <div className="mb-4">
        <h2 className="">Skills</h2>
        <ul className="">
          {pp.skills.split(',').map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="">Experience</h2>
        <p>{pp.experience}</p>
      </div>
    </div>
    </div>

    </div>
  )
}
