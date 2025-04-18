import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

import "../css/home.css"
import { FaPhone } from "react-icons/fa6"
import Footer from './Footer'
import { MdEmail } from "react-icons/md"
import img1 from "../assets/ai-generated-8051238_1280.jpg"
import img2 from "../assets/ai-generated-8706674_1920.jpg"
import img3 from "../assets/man-6875466_1280.jpg"
import img4 from "../assets/young-4549901_1280.jpg"
import img5 from "../assets/m55.jpg"


import m88 from "../assets/m88.jpg"
import m77 from "../assets/m77.jpg"
import m99 from "../assets/m99.jpg"
import m4 from "../assets/m4.jpg"
import { useadmin } from '../context/usercontext'
export default function Home() {
  const { logout, userdata } = useadmin()

  return (

    <>

      <div>
        <Navbar url1={m77} url2={m88} url3={m99} url4={m4} name="Online Professional Commuinty" tag="" />
      </div>
      <div>
        <section className='home'>

          <div>
            <img src={img5} alt="" srcset="" />
            {/* <img src={gi} alt="" srcset="" /> */}
          </div>
          <div className='vv'>
            <h3>Welcome {userdata.name} to</h3>
            <h4>Professional Commuinty</h4>
            <p>Dear Esteemed Guests,

              On behalf of our entire team, it is our utmost pleasure to extend a warm welcome to you. As you step into Professional Community, we invite you to embark on a journey of growth, collaboration, and opportunity.</p>
            <p>At Professional Community, we believe in fostering more than just connections; we strive to create experiences that inspire and empower. From insightful discussions led by experts to valuable networking opportunities, our commitment to professional excellence is evident in every interaction.</p>
            <button style={{ width: "25%" }} className='btn btn-success'><Link to="/about" style={{ color: "white", textDecoration: "none" }}>About us</Link></button>
          </div>
        </section>

        <section className='screen mm'>
          <div>
            <h1>Connect and grow in the Professional Community of success</h1>
            {/* <h2 style={{ textAlign: "center", marginTop: "2rem" }}><GiMeal />From Fast food to Special meals<GiMeal /></h2> */}


          </div>

        </section>



        <section className='testo mm'>


          <h1>Our Testimonials</h1>
          <hr />
          <div className="conb" id='test'>
            <div className="ss">
              <img src={img1} alt="" />
              <h1>Denia Paul</h1>
              <p style={{ textAlign: "center" }}>"This platform exceeded all my expectations. The networking opportunities were top-notch, and every discussion I joined was insightful and engaging. The mentorship program was structured and highly beneficial. A must-join for anyone looking to grow professionally in a supportive environment."</p>


            </div>
            <div className="ss">
              <img src={img2} alt="" />
              <h1>Jack Anderson</h1>

              <p style={{ textAlign: "center" }}>"This community exceeded all my expectations. The user interface was seamless, and every feature was designed to enhance collaboration. The job postings were relevant and high-quality. A must-use for professionals looking to expand their career prospects and connections."

              </p>


            </div>
            <div className="ss">
              <img src={img3} alt="" srcset="" />
              <h1>Hannah James</h1>
              <p style={{ textAlign: "center" }}>"This site exceeded all my expectations. The expertise shared here was outstanding, and every webinar I attended was packed with valuable insights. The professional groups were active and resourceful. A must-visit for those serious about career growth and networking."</p>


            </div>
            <div className="ss">
              <img src={img4} alt="" srcset="" />
              <h1>Ayush jha</h1>
              <p style={{ textAlign: "center" }}>"This network exceeded all my expectations. The discussions were thought-provoking, and every connection I made was meaningful. The career resources were well-curated and incredibly useful. A must-explore for professionals aiming for success and industry insights."</p>


            </div>
            <div className="ss">
              <img src={img5} alt="" />
              <h1>Sweety</h1>
              <p style={{ textAlign: "center" }}>"This platform exceeded all my expectations. The engagement from industry experts was incredible, and every resource provided was insightful and actionable. The peer discussions were dynamic and informative. A must-join for professionals seeking growth, learning, and meaningful connections."</p>


            </div>
          </div>
        </section>

        <section className="call">
          <h2>Residence</h2>
          <p>King's parade ground, Nirmal road Agra Uttar Pradesh</p>
          <span><FaPhone />+91 6789724531</span>
          <p><MdEmail />-professionalCom900@gmail.com</p>
          <p>Having any query regarding our services contact us now</p>

          <Link to="/contact"><button className='btn btn-outline-warning'>Contact</button></Link>
        </section>

        <footer>
          <Footer />
        </footer>




      </div>


    </>
  )
}
