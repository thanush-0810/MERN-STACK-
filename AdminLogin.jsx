import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    
    const getAccess = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if(email==="admin@gmail.com" && password==="admin"){
                window.alert("Login Successful");
                localStorage.setItem('adminDepartment', 'all');
                history.push("/aAbBcC");
            }
            else if(email==="admin.cse@gmail.com" && password==="ComputerScience"){
                window.alert("Login Successful");
                localStorage.setItem('adminDepartment', 'Computer Science');
                history.push("/aAbBcC");
            }
            else if(email==="admin.mechanical@gmail.com" && password==="Mechanical"){
                window.alert("Login Successful");
                localStorage.setItem('adminDepartment', 'Mechanical');
                history.push("/aAbBcC"); 
            }
            else if(email==="admin.ece@gmail.com" && password==="ECE"){
                window.alert("Login Successful");
                localStorage.setItem('adminDepartment', 'ECE');
                history.push("/aAbBcC"); 
            }
            else {
                window.alert("Invalid credentials");
            }
        } catch (error) {
            console.error('Login error:', error);
            window.alert("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <div className="admin-login-header">
                    <h1>Admin Login</h1>
                    <p className="text-muted">Access your administrative dashboard</p>
                </div>

                <form method="GET" className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="form-control"
                            autoComplete="off" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your admin email"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="form-control"
                            autoComplete="off" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        onClick={getAccess}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
} 

export default AdminLogin;