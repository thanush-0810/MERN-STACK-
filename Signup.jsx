import React, { useState } from 'react';
import signpic from '../images/signup.gif';
import { NavLink, useHistory } from 'react-router-dom';
import phone from '../images/telephone.png';
import mail from '../images/email.png';
import address from '../images/address.png';
import './Signup.css';

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: "", phone: "", address: "", userType: "student"
  });
  let name, value;
  const handleInputs = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, password, cpassword, phone, address, userType } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        name, email, password, cpassword, phone, address, userType
      })
    });
    const data = await res.json();

    if (data.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");

      history.push("/login");
    }
  }

  return (
    <>
      <section className="signup">
        <div className="signup-content">
          <div className="signup-form">
            <h2>Create Account</h2>
            <p className="text-muted mb-4">Please fill in the details to register</p>

            <div className="requirements-box mb-4">
              <h6 className="requirements-title">Password Requirements:</h6>
              <ul className="requirements-list">
                <li>At least 8 characters long</li>
                <li>Must contain at least one uppercase letter</li>
                <li>Must contain at least one number</li>
                <li>Must contain at least one special character</li>
              </ul>
            </div>

            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <i className="fa fa-user"></i>
                <div className="input-wrapper">
                  <input type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Full Name"
                    className="form-control" />
                  <span className="input-info">Enter your full name as per official documents</span>
                </div>
              </div>

              <div className="form-group">
                <i className="fa fa-envelope"></i>
                <div className="input-wrapper">
                  <input type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Email Address"
                    className="form-control" />
                  <span className="input-info">You'll use this email to login to your account</span>
                </div>
              </div>

              <div className="form-group">
                <i className="fa fa-lock"></i>
                <input type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                  className="form-control" />
              </div>

              <div className="form-group">
                <i className="fa fa-lock"></i>
                <input type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                  className="form-control" />
              </div>

              <div className="form-group">
                <i className="fa fa-phone"></i>
                <input type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Phone Number"
                  className="form-control" />
              </div>

              <div className="form-group">
                <i className="fa fa-map-marker"></i>
                <input type="text"
                  name="address"
                  id="address"
                  autoComplete="off"
                  value={user.address}
                  onChange={handleInputs}
                  placeholder="Address"
                  className="form-control" />
              </div>

              <div className="form-group">
                <i className="fa fa-users"></i>
                <div className="input-wrapper">
                  <select
                    name="userType"
                    id="userType"
                    value={user.userType}
                    onChange={handleInputs}
                    className="form-control"
                  >
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </select>
                  <span className="input-info">Select your role</span>
                </div>
              </div>

              <button type="submit"
                className="btn btn-primary w-100 mb-4"
                onClick={PostData}>
                Create Account
              </button>

              <div className="text-center mt-3">
                <NavLink to="/login" className="login-link">Already have an account? Login</NavLink>
              </div>
            </form>
          </div>
          <div className="signup-image">
            <img src={signpic} alt="Registration illustration" />
          </div>
        </div>
      </section>
      <div className="contact_info bg-dark text-white mt-5">
        <div className="container-fluid">
          <br />
          <div className="row">
            <div className="col-lg-12 row">
              <div className="contact_info_item col-1 abc">
                <img src={phone} alt="not found" height="50" width="50" />
              </div>
              <div className="contact_info_item col-2 abc">
                <h6>Phone</h6>
                <p>044 6718 1600</p>
              </div>

              <div className="col-1"></div>

              <div className="contact_info_item col-1 abc">
                <img src={mail} alt="not found" height="50" width="50" />
              </div>
              <div className="contact_info_item col-3 abc">
                <h6>Email</h6>
                <p>mail@ritchennai.edu.in</p>
              </div>

              <div className="col-1"></div>
              <div className="contact_info_item col-1 abc">
                <img src={address} alt="not found" height="50" width="50" />
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

export default Signup;