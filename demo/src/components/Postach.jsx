import React, { useState } from 'react';
import Mainnav from './Mainnav';
import { useadmin } from '../context/usercontext';
import "../css/com.css";
import yy from "../assets/ais.png"
export default function Postach() {
    const { alluser } = useadmin();
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !message.trim()) return;

        const data = {
            name: selectedUser.name,
            email: selectedUser.email,
            message
        };

        try {
            const res = await fetch('http://localhost:8000/user/achievement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setSuccess(true);
                setMessage('');
                setSelectedUser(null);
            }
        } catch (error) {
            console.error('Error posting the achievement:', error);
        }
    };

    return (
        <>
            <Mainnav name="Dive into anything" />
           

            <div className="mainuser">
                <div className='users'>
                    {
                        Array.isArray(alluser) && alluser.map((ele, index) => (
                            <div key={index}>
                                <button
                                    style={{ width: "8rem", margin: "1.4rem 0rem" }}
                                    className='btn btn-outline-primary'
                                    onClick={() => {
                                        setSelectedUser(ele);
                                        setMessage('');
                                        setSuccess(false);
                                    }}
                                >
                                    {ele.name}
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div className='boon'>
                    {!selectedUser && <img src={yy} alt="No user selected" style={{ width: "20rem" }} />}

                    {selectedUser && (
                        <form onSubmit={handleSubmit} className="achievement-form">
                            <h4>Post Achievement for {selectedUser.name}</h4>
                            <div className="form-group">
                                <label><strong>Name: </strong>  {selectedUser.name}</label>
                                {/* <input type="text" value={selectedUser.name} readOnly className="form-control" /> */}
                            </div>
                            <div className="form-group">
                                <label><strong>Email: </strong> {selectedUser.email}</label>
                                {/* <input type="email" value={selectedUser.email} readOnly className="form-control" /> */}
                            </div>
                            <div className="form-group">
                                <label>Achievement Message:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Submit</button>

                            {success && <p className="text-success mt-2">Achievement posted successfully!</p>}
                        </form>
                    )}
                </div>
            </div>
            <div style={{marginTop:"-12rem"}} className="curve-bg">
                <svg viewBox="0 0 1440 320">
                    <path
                        fill="#e3f2fd"
                        fillOpacity="1"
                        d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,122.7C840,128,960,160,1080,154.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </>
    );
}
