import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../utility/axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState({});

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    };

    axiosClient
      .post("/register", payload)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
      })
      .catch((error) => {
        const response = error.response;
        if (response?.status === 422) {
          // validation errors
          const errors = response.data.errors;
          setErrors(errors);
        }
      });

    console.log(payload);
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup</h1>

          {/* validation errors */}
          {Object.keys(errors).length > 0 && (
            <div className="alert animated fadeInDown">
              {Object.keys(errors).map((key, index) => (
                <p key={index}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          {/* END validation errors */}

          <input ref={nameRef} type="text" placeholder="Name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
