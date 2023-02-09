import axios from 'axios';
import './loginPage.css';
import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function LoginPage() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/api/v1/login", {
      email: email, password: password,
    }, { withCredentials: true }).then(
      (response) => {
        if (response.status === 200) { Navigate("/") }
      }
    )
      .catch((error) => {
        console.log(error);
        alert("retry login");
      })
  }

  return (
    <>
      <div className="center">
        <h1>Login</h1>
        <form method="post">
          <div className="txt_field">
            <input type="text" required onChange={e => setEmail(e.target.value)}></input>
            <span></span>
            <label>email</label>
          </div>
          <div className="txt_field">
            <input type="password" required onChange={e => setPassword(e.target.value)}></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass">Forgot Password?</div>
          <button type="submit" value="Login" onClick={login}>Login</button>
          <div class="signup_link">
            Not a member? <a href="/signup">Signup</a>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage;