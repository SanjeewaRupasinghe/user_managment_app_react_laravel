import axiosClient from "../../utility/axios-client";
import { useRef, useState } from "react";

export default function CreateUser() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();

    setLoading(true);

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    };

    axiosClient
      .post("/user", payload)
      .then((response) => {
        console.log(response);
        // TODO: success notification
      })
      .catch((error) => {
        const response = error.response;
        if (response?.status === 422) {
          // validation errors
          const errors = response.data.errors;
          setErrors(errors);
        }
      });

    setLoading(false);
  };

  return (
    <div>
      <h1>Create User</h1>

      <form onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary float-end btn-loading">
        {loading ? <span className="spinner"></span> : ""}
          Create User
        </button>
      </form>
    </div>
  );
}
