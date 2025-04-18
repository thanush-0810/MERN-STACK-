import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import './Navbar.css';
import img from '../images/rit-logo.png.png';


const Navbar = () => {
  const {state,dispatch} = useContext(UserContext);
  
  const RenderMenu = () => {
     if(state) {
       return(
         <>
           <NavLink className="nav-item nav-link" to="/">
             <i className="fas fa-home me-1"></i> Home
           </NavLink>
           <NavLink className="nav-item nav-link neon-button" to="/grievance">
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <i className="fas fa-file-alt me-1"></i> Grievance
           </NavLink>
           <NavLink className="nav-item nav-link neon-button" to="/about">
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <i className="fas fa-info-circle me-1"></i> About
           </NavLink>
           <NavLink className="nav-item nav-link ping-button" to="/logout">
             <div className="ping-wrapper">
               <i className="fas fa-sign-out-alt me-1"></i> Logout
             </div>
           </NavLink>
         </>
       )
     } else {
       return(
         <>
           <NavLink className="nav-item nav-link" to="/">
             <i className="fas fa-home me-1"></i> Home
           </NavLink>
           <NavLink className="nav-item nav-link" to="/grievance">
             <i className="fas fa-file-alt me-1"></i> Grievance
           </NavLink>
           <NavLink className="nav-item nav-link" to="/about">
             <i className="fas fa-info-circle me-1"></i> About
           </NavLink>
           <NavLink className="nav-item nav-link" to="/login">
             <i className="fas fa-sign-in-alt me-1"></i> Login
           </NavLink>
           <NavLink className="nav-item nav-link" to="/signup">
             <i className="fas fa-user-plus me-1"></i> Signup
           </NavLink>
         </>
       )
     }
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
            <img src={img} alt="RIT Logo" />
            <span className="brand-text">Grievance Portal</span>
        </NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <RenderMenu />
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
