import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, emailLogin, emailRegister, googleLogin } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './image.3fc60a5f8b56c35fe81e.webp';
import google from './google.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Login.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    //reload if path changes

    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="page">

  
    <div className="login ">
      <div className="login__container item1">
          <div className="login_component">
            
          <div className="input">
            <label>Name</label>
            <br></br>
            <input
          type="text"
          className=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E-mail Address"
        />
        </div>
      
        <div className="input">
            <label>Email</label>
            <br></br>
            <input
          type="text"
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        </div>
        <div className="input">
            <label>Password</label>
            <br></br>
            <input
            type="password"
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
        </div>
        <br></br>
        <button
          className="login_button "
          onClick={() => emailRegister(name,email, password)}
        >
          Signup
        </button>
        <br></br>
        <p>
             Or Sign in with Google 
        </p>
        <br></br>
        <button className="google_login" onClick={googleLogin}>
    <img src={google} className="google-icon"/>  Sign in with Google

        </button>
              <br></br>
            
                    <div>
                    Already  have an account? <Link to="/">Login</Link> now.
                  </div>
              
              
          </div>
      </div>
      <div className="image item2">
        <img src={image} alt="image" className="photo" />
      </div>
    </div>
    </div>
  );
}
export default Register;