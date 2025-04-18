import React from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';
import { useEffect, useState } from 'react';
import './Grievance.css';
import { getChatResponse } from '../utils/openai';

const Grievance = () => {
    const [userData, setUserData] = useState({
        name: "", 
        email: "", 
        phone: "", 
        dept: "", 
        grievance: "",
        priority: "",
        file: null  // Add file to state
    });
    const [fileError, setFileError] = useState("");
    const [fileSelected, setFileSelected] = useState(false);
    const [aiResponse, setAiResponse] = useState("");

    const userContact=async()=>{
       try{
         const res = await fetch("/getdata",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
         });
         const data=await res.json();
         setUserData({ ...userData,name:data.name,email:data.email,
          phone:data.phone});
         if(!res.status===200){
             const error=new Error(res.err);
             throw error;
         }
       }catch(err){
           console.log(err);
       }
    }
    useEffect(()=>{
       userContact();
    },[])

    const handleInputs=(event)=>{
      const name=event.target.name;
      const value=event.target.value;

      setUserData({ ...userData,[name]:value});
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileSelected(true);
            if (file.size > 10 * 1024 * 1024) {
                setFileError("File size exceeds 10MB limit");
            } else {
                setFileError("");
                setUserData({ ...userData, file: file }); // Update file in state
            }
        } else {
            setFileSelected(false);
            setFileError("");
            setUserData({ ...userData, file: null });
        }
    };

    const handleAIAssistance = async () => {
        try {
            const response = await getChatResponse(userData.grievance);
            setAiResponse(response);
        } catch (error) {
            console.error('Error getting AI response:', error);
        }
    };

    const fileGrievance = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('dept', userData.dept);
        formData.append('grievance', userData.grievance);
        formData.append('priority', userData.priority);
        if (userData.file) {
            formData.append('supportingDocument', userData.file);
        }

        try {
            const response = await fetch('/grievance', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                alert(data.error);
            } else {
                alert("Grievance Filed Successfully!! We'll inform you when there will be a response");
                setUserData({ 
                    ...userData, 
                    grievance: "",
                    file: null 
                });
                setFileSelected(false);
            }
        } catch (err) {
            console.error("Error filing grievance:", err);
            alert("Failed to file grievance. Please try again later.");
        }
    };
    
    return (
        <>
            <div className="grievance-container">
                <div className="contact_form mx-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="contact_form_container py-5">
                                    <div className="contact_form_title mb-4">
                                        <h2 className="text-center">File a Grievance</h2>
                                        <p className="text-center text-muted mb-4">We're here to help resolve your concerns</p>
                                    </div>

                                    <form method="POST" className="grievance-form shadow-lg rounded p-4">
                                        <div className="form-row mb-4">
                                            <div className="col-md-4 mb-3">
                                                <input type="text" 
                                                    className="form-control"
                                                    name="name"
                                                    value={userData? userData.name : ""}
                                                    onChange={handleInputs}
                                                    placeholder="Your Name" 
                                                    required="true"/>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={userData? userData.email : ""}
                                                    onChange={handleInputs}
                                                    placeholder="Your Email" 
                                                    required="true"/>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text"
                                                    className="form-control"
                                                    name="phone"
                                                    value={userData? userData.phone : ""}
                                                    onChange={handleInputs}
                                                    placeholder="Your Phone Number" 
                                                    required="true"/>
                                            </div>
                                        </div>

                                        <div className="form-group mb-4">
                                            <label className="form-label">Choose a department:</label>
                                            <select 
                                                name="dept" 
                                                className="form-control" 
                                                onChange={handleInputs}>
                                                <option value="">--Select department--</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="ECE">ECE</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>

                                        <div className="form-group mb-4">
                                            <label className="form-label">Priority Level:</label>
                                            <select 
                                                name="priority" 
                                                className="form-control priority-select" 
                                                onChange={handleInputs}
                                                required>
                                                <option value="">--Select priority--</option>
                                                <option value="compulsory">Compulsory</option>
                                                <option value="necessary">Necessary</option>
                                                <option value="suggested">Suggested</option>
                                            </select>
                                        </div>

                                        <div className="form-group mb-4">
                                            <textarea 
                                                className="form-control" 
                                                rows="5" 
                                                placeholder="Describe your grievance here..." 
                                                name="grievance"
                                                onChange={handleInputs} 
                                                value={userData.grievance}></textarea>
                                        </div>
                                        
                                        <div className="form-group mb-4">
                                            <label className="form-label">Supporting Documents:</label>
                                            <div className="custom-file">
                                                <input 
                                                    type="file" 
                                                    className="custom-file-input" 
                                                    id="myFile" 
                                                    name="supportingDocument"
                                                    onChange={handleFileChange} 
                                                    accept="image/*,.pdf"
                                                />
                                                <label className="custom-file-label" htmlFor="myFile">
                                                    {fileSelected ? "File selected" : "Choose file (max 10MB)"}
                                                </label>
                                                {fileError && <div className="text-danger mt-2">{fileError}</div>}
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" 
                                                className="btn-primary"
                                                onClick={fileGrievance}>
                                                <span>Submit</span>
                                                <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" alt="check" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact_info bg-dark text-white mt-5">
                    <div className="container-fluid">
                    <br />
                     <div className="row">
                       <div className="col-lg-12 row">   
                         <div className="contact_info_item col-1 abc">
                           <img src={phone} alt="not found" height="50" width="50"/>
                         </div>
                         <div className="contact_info_item col-2 abc">
                           <h6>Phone</h6>
                           <p>044 6718 1600</p>
                         </div>

                         <div className="col-1"></div>
                         
                         <div className="contact_info_item col-1 abc">
                           <img src={email} alt="not found" height="50" width="50"/>
                         </div>
                         <div className="contact_info_item col-3 abc">
                           <h6>Email</h6>
                           <p>mail@ritchennai.edu.in</p>
                         </div>
                         
                         <div className="col-1"></div>
                         <div className="contact_info_item col-1 abc">
                           <img src={address} alt="not found" height="50" width="50"/>
                         </div>
                         <div className="contact_info_item col-2 abc">
                           <h6>Address</h6>
                           <p>Kuthambakkam, Post, Chembarambakkam, Tamil Nadu 600124</p>
                         </div>
                       </div>
                     </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Grievance;