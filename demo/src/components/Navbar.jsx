import React from 'react'
import { useState,useEffect } from 'react'
// import "../App.css"
import "../css/home.css"

import logo from "../assets/istockphoto-1171963676-612x612.jpg"
import { Link } from 'react-router-dom'
import { useadmin } from '../context/usercontext'
export default function Navbar(props) {

    const {logout,userlogout,userdata}=useadmin()
    const [text, settext] = useState("")

    console.log(text);
    console.log(userdata);
    
    


    useEffect(() => {
      if(userdata.role==null){
        settext("")
      }
        else if(userdata.role=="user"){
            settext("UserInfo")
        }
        else{
            settext("RecurtierInfo")
        }
      
    }, [userdata.role])
    


  return (
    <div>
            
    <nav class="navbar navbar-expand-lg  bg-li fixed-top">
        <div class="container-fluid">
            <div>

                <h3><Link style={{ color: "white", textDecoration: "none" }} to="/">Professional Commuinty</Link></h3>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav justify-content-center align-items-center mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link" to="/about">About us</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/contact">Contact us</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/joinus">Join us</Link>
                    </li>

                    
                    

                    {
                        logout?<li class="nav-item">
                        <Link class="nav-link" onClick={userlogout}>Logout</Link>
                    </li>:
                    <li>
                    <li class="nav-item">
                        <Link class="nav-link" to={userdata.role=="user"?"/user":"/recrutier"}>{text}</Link>
                    </li>

                    <li style={{marginTop:"-1.1rem"}} class="nav-item">
                        <Link class="nav-link" to="/login">Login</Link>
                    </li>

                    </li>
                    
                    }
                    
  

                </ul>

            </div>
       </div>
    </nav>

    <div data-bs-ride="carousel" id="carouselExampleFade" class="carousel slide carousel-fade">
        <div className='gan'>
            <h2 >
                <h2 className='hw' style={{ transform: "rotate(-45deg)" }}>
                    {/* <img src={logo} alt="" srcset="" /> */}
                  <p style={{padding:"4rem",textAlign:"center"}}> {props.name}</p> 

                    <br />
                    <h5 style={{ marginTop: "-3rem" }}>{props.tag}</h5>
                </h2>
            </h2>

        </div>
        <div class="carousel-inner">
            <div class="carousel-item active ">
                <img src={props.url1} class="d-block w-100" alt="..." />
            </div>

            <div class="carousel-item">
                <img src={props.url2} class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
                <img src={props.url3} class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
                <img src={props.url4} class="d-block w-100" alt="..." />
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
        </div>
  )
}
