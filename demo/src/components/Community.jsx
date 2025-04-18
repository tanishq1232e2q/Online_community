import React from 'react'
import aa from "../assets/bnn.avif"
import bb from "../assets/chat.jpg"
import Mainnav from './Mainnav'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import "../css/com.css"
export default function Community() {

     const [achievements, setAchievements] = useState([]);
    
      const fetchAchievements = async () => {
        try {
          const res = await fetch('http://localhost:8000/user/getah');
          const data = await res.json();
          setAchievements(data);
        } catch (error) {
          console.error('Error fetching achievements:', error);
        }
      };
    
      useEffect(() => {
        fetchAchievements();
      }, []);
    
      const handleLike = async (id) => {
        try {
          // Update like count locally
          setAchievements(prev =>
            prev.map(item =>
              item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
            )
          );
    
          // Optionally update in backend
          await fetch(`http://localhost:8000/user/achievement/${id}`, {
            method: 'POST',
          });
        } catch (error) {
          console.error('Error liking achievement:', error);
        }
      };
      console.log(achievements);
      
    
  return (
    <>
    <div>
        <Mainnav name="Community Group" />

      
    </div>

    <div style={{marginTop:"5rem"}} className="conts">
        <div>
            <img style={{marginLeft:"7rem",width:"30rem",marginRight:"8rem"}} src={aa} alt="" srcset="" />
            <button className='btn btn-outline-info' style={{marginLeft:"3rem"}}><Link style={{color:"coral"}} to="/postah">POST/LIKES ACHIEVEMENTS</Link></button>
        </div>
        <div>
            <img style={{width:"30rem"}} src={bb} alt="" srcset="" />
            <button className='btn btn-outline-info'><Link style={{color:"coral"}} to="http://localhost:3000">GROUP CHAT</Link></button>
        </div>
    </div>
    <div>
    {/* <button className='btn btn-outline-info' style={{marginLeft:"47rem"}}><Link style={{color:"coral"}} to="/viewah">VIEW ACHIEVEMENTS</Link></button> */}
    <p class="d-inline-flex gap-1">
  
  <button class="btn btn-outline-success" style={{marginLeft:"47rem"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    VIEW ACHIEVEMENTS
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
  <div className="achievement-wall">
        {achievements.length === 0 ? (
          <p>No achievements posted yet....</p>
        ) : (
          achievements.map((item) => (
            <div className="achievement-card" key={item._id}>
              <h5>{item.name}</h5>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Achievement:</strong> {item.message}</p>
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => handleLike(item._id)}
              >
                Like ({item.likes || 0})
              </button>
            </div>
          ))
        )}
      </div>
  </div>
</div>
    </div>
    
    </>
  )
}
