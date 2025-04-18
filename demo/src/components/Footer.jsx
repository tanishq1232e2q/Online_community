import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
export default function Footer() {
  return (
    <div>
      <div className='footers'>
        <h2>Professional Community</h2>
        <ul>
           <Link className='n' to="/"><li>Home</li></Link> 
           <Link className='n' to="/about"><li>Aboutus</li></Link> 
           <Link className='n' to="/joinus"><li>Join us</li></Link> 
           <Link className='n' to="/contact"><li>Contact us</li></Link> 
           <Link className='n' to="/com"><li>Community</li></Link> 
        </ul>
        <p>www.ProfessionalCommunity.com all rights reserved</p>
      </div>
    </div>
  )
}