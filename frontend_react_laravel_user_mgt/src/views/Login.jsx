import { Link } from "react-router-dom";
import axiosClient from "../utility/axios-client";
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    
    axiosClient.post('/login', {
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
    .then((response)=>{
      setUser(response.data.user);
      setToken(response.data.token);
    })
    .catch((error)=>{
      const response = error.response;
      if (response?.status === 422 || response?.status === 401 || response?.status === 404) {
        // validation errors
        console.log(error);
        
        const errors = response.data.errors;
        setErrors(errors);
      }
    })
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
        <h1 className="title">Login</h1>

          {/* validation errors */}
          {Object.keys(errors).length > 0 && (
            <div className="alert animated fadeInDown">
              {Object.keys(errors).map((key, index) => (
                <p key={index}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          {/* END validation errors */}

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
