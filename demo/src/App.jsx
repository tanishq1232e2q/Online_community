import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
// import "./App.css";
import Home from "./components/Home"
import Joinus from "./components/Joinus";
import RecuiterJobs from "./recruiterpage/RecuiterJobs";
import UserJobs from "./userPage/UserJobs";
import PostJobs from "./components/PostJobs";
import TotalJobpost from "./components/TotalJobpost";
import About from "./components/About";
import Profile from "./components/Profile";
import Jobapply from "./userPage/Jobapply";
import Resume from "./components/Resume"
;
import Contact from "./components/Contact";
import Applicants from "./recruiterpage/Applicants";
import Community from "./components/Community";
import Postach from "./components/Postach";
function App() {

  return (
    <Router>
     

        <Routes>
         
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/joinus" element={<Joinus/>}/>
          <Route path="/recruiter" element={<RecuiterJobs/>}/>
          <Route path="/user" element={<UserJobs/>}/>
          <Route path="/postjob" element={<PostJobs/>}/>
          <Route path="/getjobs" element={<TotalJobpost/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/jobapply" element={<Jobapply/>}></Route>
          <Route path="/resume" element={<Resume/>}></Route>
          <Route path="/applicant" element={<Applicants/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/jobs" element={<Jobapply/>}></Route>
          <Route path="/com" element={<Community/>}></Route>
          <Route path="/postah" element={<Postach/>}></Route>
          {/* <Route path="/" component={Homepage} exact />
          <Route path="/chats" component={Chatpage} /> */}

        </Routes>
      
    </Router>
  );
}

export default App;
