import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './Api';

function SignupPage() {
  
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  function signup(e){
    e.preventDefault();
    if(confirmPassword!==password){
      alert("password not match")
      return;
    }
    axios.post("/api/v1/signup",{
      email:email,password:password,
    }).then(
      (response) => {
        if(response.status === 200){Navigate("/")}
      }
    ).catch((error) =>{
      alert("retry signup");
    })
  }
  
  return (
    <>
      <div class="center">
        <h1>Signup</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text"required  onChange={ e =>setEmail(e.target.value)} ></input>
            <span></span>
            <label>Username</label>
          </div>
          <div class="txt_field">
            <input type="password" required onChange={ e =>setPassword(e.target.value)}></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="txt_field">
            <input type="password" required onChange={ e =>setconfirmPassword(e.target.value)}></input>
            <span></span>
            <label>confirm Password?</label>
          </div>
          <button type="submit" value="Signup" onClick={signup}>Signup</button>
          <div class="login_link">
            Already signed up? <a href="/login">Login</a>
          </div>
        </form>
      </div>

    </>
  )
}

export default SignupPage;