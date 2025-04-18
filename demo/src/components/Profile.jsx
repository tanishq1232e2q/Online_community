import React from 'react'
import { useadmin } from '../context/usercontext'
import Mainnav from './Mainnav'
import "../css/user.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect } from 'react'
import uu from "../assets/pexels-vsdigitalagency-5176998.jpg"
import { useNavigate } from 'react-router-dom'
export default function Profile() {
    const { userdata } = useadmin()

    const navigate=useNavigate()


    const [formData, setFormData] = useState({
        name: "" ,
        email: "",
        address: "",
        qualification: "",
        contact: "",
        skills: "",
        experience: ""
    });
    useEffect(() => {
        if (userdata?.name && userdata?.email) {
            setFormData(prev => ({
                ...prev,
                name: userdata.name,
                email: userdata.email
            }));
        }
    }, [userdata]);


        const handleJobChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        console.log(formData);


        const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
                const res = await fetch("http://localhost:8000/user/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
        
                const data = await res.json();
                console.log(data);
                
                toast.success("Job posted successfully!");
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000);
                            navigate("/user")
            } catch (error) {
                console.error("Error:", error);
                toast.error("An error occurred while saving.");
            }
        };
        

    return (
        <>
            <div>
                <div>
                    <Mainnav name="User Profile" title="jobs" />
                </div>

            </div>

            <div className="mn">
                <div className='userprofile'>
                    <h3>Complete your Profile</h3>

                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="name">Name</label>

                            <input type="text" name="name" value={userdata.name}  placeholder="Job Title" onChange={handleJobChange} required />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email"  placeholder="email" value={userdata.email} onChange={handleJobChange} required />
                        </div>


                        <div>
                            <label htmlFor="address">Address</label>
                            <textarea  onChange={handleJobChange} name="address" id=""></textarea>
                        </div>

                        <div>

                            <span >Qualification</span>
                            <input type="text" onChange={handleJobChange}  name="qualification" />
                        </div>
                        <div>
                            <label htmlFor="contact">Contact Number</label>
                            <input type="number" onChange={handleJobChange}  name="contact" id=""></input>
                        </div>

                        <div>
                            <label htmlFor="skill">Skills Set</label>
                            <input type="text" onChange={handleJobChange}  name="skills" id=""></input>
                        </div>

                        <div>
                            <label htmlFor="ex">Experiance(if any)</label>
                            <textarea style={{border:"2px solid coral"}} type="text" onChange={handleJobChange} name="experience" id=""></textarea>
                        </div>
                        <button style={{marginTop:"2rem"}} className='btn btn-primary' type="submit">Save Information</button>
                    </form>



                </div>

                <div className="sec">
                    <img src={uu} alt="" srcset="" />
                </div>

            <ToastContainer />
                

            </div>

        </>
    )
}
