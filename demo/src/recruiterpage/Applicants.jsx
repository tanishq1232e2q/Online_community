import React, { useEffect, useState } from 'react';
import { useadmin } from '../context/usercontext';
import Mainnav from '../components/Mainnav';
import "../css/apply.css";

export default function Applicants() {
  const { apply } = useadmin();

  // Local state to track approval statuses
  const [approvedStatus, setApprovedStatus] = useState({});

  // Load approval statuses from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("approvedApplicants");
    if (stored) {
      setApprovedStatus(JSON.parse(stored));
    }
  }, []);

  // Handle approve button click
  const handleApprove = (id) => {
    const updatedStatus = { ...approvedStatus, [id]: true };
    setApprovedStatus(updatedStatus);
    localStorage.setItem("approvedApplicants", JSON.stringify(updatedStatus));
  };

  return (
    <>
      <div>
        <Mainnav name="Applicants List"  />
      </div>

      <div className='vbb'>
        <h3 style={{ textAlign: "center", margin: "3rem 0rem" }}>List of Applicants</h3>
        <div className="prom">
          {Array.isArray(apply) && apply.length > 0 ? (
            apply.map((ele, index) => {
              const id = ele._id || `index-${index}`;
              const isApproved = approvedStatus[id];

              return (
                <div className="card" key={id}>
                  <div className="card-body">
                    <div className='profile'>
                      {/* {Array.isArray(ele.profile) && ele.profile.length > 0 ? (
                        ele.profile.map((elem, i) => (
                          <ul key={i}>
                            <li><strong>Name:</strong> {elem.name}</li>
                            <li><strong>Email:</strong> {elem.email}</li>
                            <li><strong>Contact:</strong> {elem.contact}</li>
                            <li><strong>Address:</strong> {elem.address}</li>
                            <li><strong>Qualification:</strong> {elem.qualification}</li>
                            <li><strong>Skills:</strong> {elem.skills}</li>
                            <li><strong>Experience:</strong> {elem.experience}</li>
                          </ul>
                        ))
                      ) : (
                        <p>No profile data</p>
                      )} */}
                      {
                        <ul >
                        <li><strong>Name:</strong> {ele.profile[ele.profile.length-1].name}</li>
                        <li><strong>Email:</strong> {ele.profile[ele.profile.length-1].email}</li>
                        <li><strong>Contact:</strong> {ele.profile[ele.profile.length-1].contact}</li>
                        <li><strong>Address:</strong> {ele.profile[ele.profile.length-1].address}</li>
                        <li><strong>Qualification:</strong> {ele.profile[ele.profile.length-1].qualification}</li>
                        <li><strong>Skills:</strong> {ele.profile[ele.profile.length-1].skills}</li>
                        <li><strong>Experience:</strong> {ele.profile[ele.profile.length-1].experience}</li>
                      </ul> 
                      }
                    </div>

                    <div>
                      <span style={{ fontWeight: "700" }}>Availability: </span>
                      <span className="card-title">{ele.com}</span>
                    </div>

                    <div>
                      <span style={{ fontWeight: "700" }}>Why should you be hired?: </span>
                      <span className="card-text">{ele.area}</span>
                    </div>

                    <div>
                      <span style={{ fontWeight: "700" }}>Why do you want to join this company?: </span>
                      <span className="card-text">{ele.areacom}</span>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => handleApprove(id)}
                      disabled={isApproved}
                    >
                      {isApproved ? "Approved" : "Approve"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No applicants found.</p>
          )}
        </div>
      </div>
    </>
  );
}
