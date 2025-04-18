import React, { useEffect, useState } from 'react';
import './About.css';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';

const About = () => {
    const [userData, setUserData] = useState();

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);

            console.log(`this is useState data: ${userData.name}`);
            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }
        } catch (err) {
            console.log(err);
            //history.push("/login");
        }
    }
    useEffect(() => {
        callAboutPage();
    }, [])

    if (userData) {
        return (
            <div className="about-container">
                <div className="profile-card">
                    <div className="profile-card-header">
                        <div className="profile-avatar">
                            <span className="profile-initial">{userData.name.charAt(0)}</span>
                        </div>
                        <h2 className="profile-name">{userData.name}</h2>
                        <p className="profile-email">{userData.email}</p>
                        <p className="profile-user-type">{userData.userType}</p> {/* Add user type */}
                    </div>
                    <div className="profile-card-stats">
                        <div className="stat-item">
                            <span className="stat-value">{userData.grievances.length}</span>
                            <span className="stat-label">Grievances</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{userData.phone}</span>
                            <span className="stat-label">Contact</span>
                        </div>
                    </div>
                </div>
                <div className="profile-section">
                    <h1 className="section-title">My Profile</h1>
                    
                    <div className="info-section">
                        <h3>Personal Information</h3>
                        <div className="info-item">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{userData.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Address:</span>
                            <span className="info-value">{userData.address}</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Contact Information</h3>
                        <div className="info-item">
                            <span className="info-label">Phone:</span>
                            <span className="info-value">{userData.phone}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{userData.email}</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Grievances</h3>
                        <table className="grievance-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Department</th>
                                    <th>Grievance</th>
                                    <th>Status</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.grievances.map((cval, index) => (
                                    <tr key={index}>
                                        <td>{cval.date}</td>
                                        <td>{cval.dept}</td>
                                        <td>{cval.grievance}</td>
                                        <td>{cval.status}</td>
                                        <td>{cval.feedback}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="contact-section">
                    <div className="container">
                        <div className="row justify-content-around">
                            <div className="col-md-3">
                                <div className="contact-item">
                                    <img src={phone} alt="phone" className="contact-icon" height="40" width="40"/>
                                    <div className="contact-info">
                                        <h6>Phone</h6>
                                        <p>044 6718 1600</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-item">
                                    <img src={email} alt="email" className="contact-icon" height="40" width="40"/>
                                    <div className="contact-info">
                                        <h6>Email</h6>
                                        <p>mail@ritchennai.edu.in</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-item">
                                    <img src={address} alt="address" className="contact-icon" height="40" width="40"/>
                                    <div className="contact-info">
                                        <h6>Address</h6>
                                        <p>Kuthambakkam, Post, Chembarambakkam, Tamil Nadu 600124</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="about-container">
                <div className="profile-section">
                    <p className="text-center">Unable to load data. Try to refresh or relogin.</p>
                </div>
            </div>
        );
    }
}

export default About;