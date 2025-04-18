import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GrievanceStatus.css';

const GrievanceStatus = () => {
    const [Array, setArray] = useState([{ 
        date: "", 
        dept: "", 
        email: "", 
        feedback: "", 
        grievance: "", 
        name: "", 
        phone: "", 
        status: "", 
        priority: "", 
        userType: "", // Ensure userType is included
        _id: "" 
    }]);
    const [filteredArray, setFilteredArray] = useState([]);
    const [modalImage, setModalImage] = useState(null);
    const priorityOrder = {
        'compulsory': 1,
        'necessary': 2,
        'suggested': 3
    };

    const getData = async () => {
        try {
            const res = await fetch("/grievancelist", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            const arr = getlist(data);
            setArray(arr);
            
            // Filter based on admin's department and sort by priority
            const adminDepartment = localStorage.getItem('adminDepartment');
            let filteredData = adminDepartment === 'all' ? arr : arr.filter(g => g.dept === adminDepartment);
            
            // Sort the filtered data by priority
            filteredData.sort((a, b) => {
                const priorityA = priorityOrder[a.priority.toLowerCase()] || 999;
                const priorityB = priorityOrder[b.priority.toLowerCase()] || 999;
                return priorityA - priorityB;
            });

            setFilteredArray(filteredData);

            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const getlist = (d) => {
        let a = 0;
        let Gdata = [];
        for (let i = 0; i < d.length; i++) {
            for (let j = 0; j < d[i].grievances.length; j++) {
                Gdata[a] = {
                    ...d[i].grievances[j],
                    userType: d[i].userType // Ensure userType is mapped correctly
                };
                a++;
            }
        }
        return Gdata;
    }

    // Update the map function to use filteredArray instead of Array
    return (
        <div className="grievance-status-container">
            <div className="cards-grid">
                {filteredArray.map((cval) => (
                    <div key={cval._id} className="grievance-card">
                        <div className="card-header">
                            <h3>Grievance #{cval._id}</h3>
                            <div className="status-container">
                                <span className={`priority-badge ${cval.priority.toLowerCase()}`}>
                                    {cval.priority || 'No Priority'}
                                </span>
                                <span className={`status-badge ${cval.status.toLowerCase()}`}>
                                    {cval.status}
                                </span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <label>Name:</label>
                                <p>{cval.name}</p>
                            </div>
                            <div className="info-group">
                                <label>Email:</label>
                                <p>{cval.email}</p>
                            </div>
                            <div className="info-group">
                                <label>Phone:</label>
                                <p>{cval.phone}</p>
                            </div>
                            <div className="info-group">
                                <label>Department:</label>
                                <p>{cval.dept}</p>
                            </div>
                            <div className="info-group">
                                <label>User Type:</label> {/* Display user type */}
                                <p>{cval.userType}</p>
                            </div>
                            <div className="info-group full-width">
                                <label>Grievance:</label>
                                <p>{cval.grievance}</p>
                            </div>
                            <div className="info-group full-width">
                                <label>Feedback:</label>
                                <p>{cval.feedback || 'No feedback yet'}</p>
                            </div>
                            <div className="info-group full-width">
                                <label>Supporting Document:</label>
                                {cval.supportingDocument ? (
                                    <div className="document-preview">
                                        <img 
                                            src={`/grievance/document/${cval._id}`}
                                            alt="Supporting document"
                                            className="support-image"
                                            onClick={() => setModalImage(`/grievance/document/${cval._id}`)}
                                        />
                                    </div>
                                ) : (
                                    <p>No document attached</p>
                                )}
                            </div>
                            <div className="card-footer">
                                <span className="date">{cval.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Image Modal */}
            {modalImage && (
                <div className="image-modal" onClick={() => setModalImage(null)}>
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setModalImage(null)}>&times;</span>
                        <img src={modalImage} alt="Full size document" />
                    </div>
                </div>
            )}

            <div className="admin-controls">
                <Link to="/aAbBcC/updatedocs" className="btn btn-primary">Update Documents</Link>
                <Link to="/login" className="btn btn-warning">Logout as Admin</Link>
                <p className="note">Note: Copy the grievance ID to update.</p>
            </div>
        </div>
    );
}

export default GrievanceStatus;