import React from 'react'
import m88 from "../assets/m88.jpg"
import m77 from "../assets/m77.jpg"
import m99 from "../assets/m99.jpg"
import m4 from "../assets/m4.jpg"
import Navbar from './Navbar'

import "../css/home.css"
export default function About() {
    return (

        <>

            <div>
                <Navbar url1={m77} url2={m88} url3={m99} url4={m4} name="About us" />
            </div>


            <div className='about'>
                <img src={m4} alt="" />
                <div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quam at doloremque veniam laborum sapiente iusto repellendus officiis ea odio itaque omnis officia earum animi, pariatur tempore accusantium adipisci nemo?</p>
                </div>
            </div>

        </>
    )

}
