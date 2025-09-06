import { useParams } from "react-router-dom";
import axiosClient from "../../utility/axios-client";
import { useEffect, useRef, useState } from "react";

export default function UpdateUser({ }) {

  const { id } = useParams();


  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(id);

    axiosClient.get(`/user/${id}`).then((response) => {
      setUser(response.data.data);
      
      nameRef.current.value = response.data.data.name;
      emailRef.current.value = response.data.data.email;
      passwordRef.current.value = response.data.data.password;
      confirmPasswordRef.current.value = response.data.data.password;

    });
  }, []);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    };

    axiosClient
    setErrors(null)
      .put(`/user/${user.id}`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        const response = error.response;
        if (response?.status === 422) {
          // validation errors
          const errors = response.data.errors;
          setErrors(errors);
        }
      });
  };

  return (
    <div>
      <h1>Update User</h1>

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
        <button type="submit" className="btn btn-primary float-end">
          Update User
        </button>
      </form>
    </div>
  );
}
