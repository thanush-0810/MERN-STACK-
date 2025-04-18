import React, {useContext, useState} from 'react';
import login from '../images/login.gif';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import phone from '../images/telephone.png';
import mail from '../images/email.png';
import address from '../images/address.png';
import './Login.css';

const Login = () => {
  const {state,dispatch} = useContext(UserContext);
  const history=useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const loginUser=async(e)=>{
     e.preventDefault();

     const res= await fetch('/signin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          'Accept': 'application/json'
        },
        
        body:JSON.stringify({
            email,password
        })
     });
     const data=await res.json();
     
     if(res.status===400 || !data){
       window.alert("Invalid Credentials");
     }else{
      dispatch({type:"USER",payload:true})
      window.alert("Login Successful");
      history.push("/");
     }
  }
  return(
    <>
      <section className="signup">
        <div className="signup-content">
          <div className="signup-form">
            <h2>Welcome Back</h2>
            <p className="text-muted mb-4">Please enter your credentials to continue</p>
            
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" 
                  name="email" 
                  id="email" 
                  autoComplete="off" 
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="form-control"/>
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" 
                  name="password" 
                  id="password" 
                  autoComplete="off" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="form-control"/>
              </div>

              <div className="mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="remember"/>
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>
              </div>

              <button type="submit" 
                className="btn btn-primary w-100 py-2"
                onClick={loginUser}>
                Sign In
              </button>
              
              <div className="divider">
                <span>OR</span>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <NavLink to="/AdminLogin" className="btn btn-outline-secondary">Admin Login</NavLink>
                <NavLink to="/signup" className="btn btn-outline-success">Create Account</NavLink>
              </div>
            </form>
          </div>
          <div className="signup-image">
            <img src={login} alt="Login illustration"/>
          </div>
        </div>
      </section>
      
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
               <img src={mail} alt="not found" height="50" width="50"/>
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
    </>
  )
}

export default Login;