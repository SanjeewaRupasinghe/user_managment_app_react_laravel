import { Link } from "react-router-dom";

export default function Signup() {

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log("submit");
    };

    return (
        <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
        <h1 className="title">Signup</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
    )
}