import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to FinEd</h1>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username or Email</label>
            <input type="text" id="username" className="form-input" placeholder="Username or Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-input" placeholder="Password" />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>

       

        <div className="signup-link">
          Don't have an account? <a href="#">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;