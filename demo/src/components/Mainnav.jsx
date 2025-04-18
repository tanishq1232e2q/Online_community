import React from 'react'
import { useState,useEffect } from 'react'
// import "../App.css"
import "../css/home.css"

import logo from "../assets/istockphoto-1171963676-612x612.jpg"
import { Link } from 'react-router-dom'
import { useadmin } from '../context/usercontext'
export default function Mainnav(props) {

     const{userdata}=useadmin()
   

    

    


  return (
    <div>
            
    <nav style={{backgroundColor:"white",boxShadow:"2px 1px 5px 4px black"}} class="navbar navbar-expand-lg  bg-li fixed-top">
        <div class="container-fluid">
            <div>

                <h3><Link style={{ textDecoration: "none",color:"#1F51FF" }} to="/">{props.name}</Link></h3>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul  class="navbar-nav justify-content-center align-items-center mb-2 mb-lg-0">
                    <li  class="nav-item">
                        <Link class="nav-link active" style={{color:"#1F51FF"}} aria-current="page" to={userdata.role=="user"?"/user":"/recruiter"}>Home</Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link" style={{color:"#1F51FF"}} to="/com">Community</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" style={{color:"#1F51FF"}} to={userdata.role=="user"?"/jobs":"/news"}>{props.title}</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" style={{color:"#1F51FF"}} to="/contact">Contact us</Link>
                    </li>

                </ul>

            </div>
       </div>
    </nav>

   
</div>
  )
}
