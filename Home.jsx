import React from 'react';
import { useEffect, useState } from 'react';
import convo from '../images/convo.png';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [userName, setUserName] = useState();
    const [show, setShow] = useState(false);

    const userHome = async () => {
       try{
         const res = await fetch("/getdata",{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
         });
         const data=await res.json();
         setUserName(data.name);
         setShow(true);
         if(!res.status===200){
             const error=new Error(res.err);
             throw error;
         }
       }catch(err){
           console.log(err);
       }
    }
    useEffect(() => {
        userHome();
    }, []);

    return (
        <div className="container">
            <div className="hero-section row align-items-center my-5">
                <div className="col-md-6">
                    <h1 className="mb-4">
                        {!show ? (
                            <>Welcome to<br />Grievance Portal</>
                        ) : (
                            <>Welcome, {userName}!<br />to Grievance Portal</>
                        )}
                    </h1>
                    <p className="text-muted mb-4">Your voice matters. We're here to help resolve your concerns.</p>
                    <div className="d-flex gap-3">
                        {!show ? (
                            <>
                                <NavLink to="/login" className="btn btn-primary btn-lg">Login</NavLink>
                                <NavLink to="/signup" className="btn btn-outline-primary btn-lg">Sign Up</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/grievance" className="btn btn-primary btn-lg">File a Grievance</NavLink>
                                <NavLink to="/about" className="btn btn-outline-primary btn-lg">Track Grievances</NavLink>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <img src={convo} alt="Grievance Portal" className="img-fluid" />
                </div>
            </div>

            <div className="dashboard-section my-5">
                <h2 className="text-center mb-4">Grievance Dashboard</h2>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-md-4">
                                        <div className="dashboard-stat">
                                            <h3 className="text-success">1,245</h3>
                                            <p>Grievances Solved</p>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: "85%"}} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <small>85% success rate</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="dashboard-stat">
                                            <h3 className="text-warning">218</h3>
                                            <p>In Progress</p>
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "15%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <small>15% of total</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="dashboard-stat">
                                            <h3 className="text-primary">3.5</h3>
                                            <p>Avg. Resolution Days</p>
                                            <div className="progress">
                                                <div className="progress-bar bg-primary" role="progressbar" style={{width: "70%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <small>Target: 5 days</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="department-stats mt-4">
                                    <h5 className="text-center mb-3">Department-wise Resolution</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="dept-stat d-flex justify-content-between align-items-center mb-2">
                                                <span>Computer Science</span>
                                                <div className="progress flex-grow-1 mx-2">
                                                    <div className="progress-bar bg-info" role="progressbar" style={{width: "92%"}} aria-valuenow="92" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>92%</span>
                                            </div>
                                            <div className="dept-stat d-flex justify-content-between align-items-center mb-2">
                                                <span>Mechanical</span>
                                                <div className="progress flex-grow-1 mx-2">
                                                    <div className="progress-bar bg-info" role="progressbar" style={{width: "88%"}} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>88%</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="dept-stat d-flex justify-content-between align-items-center mb-2">
                                                <span>ECE</span>
                                                <div className="progress flex-grow-1 mx-2">
                                                    <div className="progress-bar bg-info" role="progressbar" style={{width: "85%"}} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>85%</span>
                                            </div>
                                            <div className="dept-stat d-flex justify-content-between align-items-center mb-2">
                                                <span>Others</span>
                                                <div className="progress flex-grow-1 mx-2">
                                                    <div className="progress-bar bg-info" role="progressbar" style={{width: "78%"}} aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <span>78%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="statistics row text-center my-5">
                <div className="col-md-4">
                    <div className="card p-4">
                        <h2 className="text-primary">98%</h2>
                        <p>Resolution Rate</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4">
                        <h2 className="text-primary">24hrs</h2>
                        <p>Average Response Time</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4">
                        <h2 className="text-primary">10k+</h2>
                        <p>Happy Users</p>
                    </div>
                </div>
            </div>

            <div className="features my-5">
                <h2 className="text-center mb-4">How We Can Help</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card p-4">
                            <h4>File Grievances</h4>
                            <p>Submit your concerns easily through our user-friendly platform</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-4">
                            <h4>Track Status</h4>
                            <p>Monitor the progress of your grievances in real-time</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-4">
                            <h4>Secure Platform</h4>
                            <p>Your data is protected with industry-standard security</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-4">
                            <NavLink to="/chatbot" className="text-decoration-none">
                                <h4>AI Assistant</h4>
                                <p>Get instant help with our AI-powered chatbot</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add this new parallax section */}
            <div 
                className="parallax-section" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
            >
                <div className="parallax-overlay">
                    <div className="parallax-content">
                        <h2>Excellence in Education</h2>
                        <p>At RIT, we believe in nurturing talent and fostering innovation. Our state-of-the-art facilities and dedicated faculty ensure that students receive the best possible education to prepare them for their future careers.</p>
                    </div>
                </div>
            </div>

            <div className="process my-5">
                <h2 className="text-center mb-4">How It Works</h2>
                <div className="row text-center">
                    <div className="col-md-3">
                        <div className="process-step">
                            <div className="circle mb-3">1</div>
                            <h5>Register</h5>
                            <p>Create your account in minutes</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="process-step">
                            <div className="circle mb-3">2</div>
                            <h5>Submit</h5>
                            <p>File your grievance</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="process-step">
                            <div className="circle mb-3">3</div>
                            <h5>Track</h5>
                            <p>Monitor the progress</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="process-step">
                            <div className="circle mb-3">4</div>
                            <h5>Resolve</h5>
                            <p>Get your solution</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonials my-5">
                <h2 className="text-center mb-4">What Our Users Say</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card testimonial-card">
                            <div className="card-body">
                                <div className="text-warning mb-3">
                                    ★★★★★
                                </div>
                                <p className="card-text">"The grievance portal helped me resolve my academic issues within days. Excellent support!"</p>
                                <footer className="blockquote-footer">Rahul M, Computer Science</footer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card testimonial-card">
                            <div className="card-body">
                                <div className="text-warning mb-3">
                                    ★★★★★
                                </div>
                                <p className="card-text">"Very efficient system. I could track my complaint status in real-time."</p>
                                <footer className="blockquote-footer">Priya K, Mechanical</footer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card testimonial-card">
                            <div className="card-body">
                                <div className="text-warning mb-3">
                                    ★★★★★
                                </div>
                                <p className="card-text">"The best part is how quickly they respond to urgent matters."</p>
                                <footer className="blockquote-footer">Amit S, ECE</footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="faq my-5">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="accordion" id="faqAccordion">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne">
                                            How long does it take to resolve a grievance?
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseOne" className="collapse show" data-parent="#faqAccordion">
                                    <div className="card-body">
                                        Most grievances are resolved within 3-5 working days. Urgent matters are addressed within 24 hours.
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo">
                                            Can I track my grievance status?
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#faqAccordion">
                                    <div className="card-body">
                                        Yes, you can track your grievance status in real-time through your dashboard once you're logged in.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced About Us section */}
            <div className="about-us my-5" id="about">
                <h2 className="text-center mb-4">About Us</h2>
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="card about-card">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h3 className="mb-3">Rajalakshmi Institute of Technology (RIT)</h3>
                                    <div className="badge bg-primary mb-3">An Autonomous Institution</div>
                                </div>
                                
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="achievement-box">
                                            <i className="fas fa-award text-primary mb-3"></i>
                                            <h5>Excellence in Education</h5>
                                            <p className="text-muted">
                                                One of the best engineering colleges in Chennai, providing quality education since 2008.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="achievement-box">
                                            <i className="fas fa-star text-primary mb-3"></i>
                                            <h5>Top Accreditations</h5>
                                            <p className="text-muted">
                                                Proudly accredited with A++ grade by NAAC
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-content">
                                    <p className="text-muted">
                                        Rajalakshmi Institute of Technology is part of Rajalakshmi Institutions, 
                                        which has been synonymous with providing excellence in higher education 
                                        to students for many years. Since its establishment in 2008, RIT has 
                                        maintained high standards in education and continues to evolve with 
                                        modern technological advancements.
                                    </p>
                                    
                                    <div className="highlights mt-4">
                                        <h5 className="mb-3">Key Features</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="feature-list">
                                                    <li><i className="fas fa-check-circle text-success"></i> NAAC A++ Accreditation</li>
                                                    <li><i className="fas fa-check-circle text-success"></i> Anna University Affiliation</li>
                                                    <li><i className="fas fa-check-circle text-success"></i> AICTE Approved</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="feature-list">
                                                    <li><i className="fas fa-check-circle text-success"></i> NBA Approved Courses</li>
                                                    <li><i className="fas fa-check-circle text-success"></i> State-of-the-art Infrastructure</li>
                                                    <li><i className="fas fa-check-circle text-success"></i> Industry Partnerships</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Remove the entire footer section and close the container div */}
        </div>
    );
};

export default Home;
