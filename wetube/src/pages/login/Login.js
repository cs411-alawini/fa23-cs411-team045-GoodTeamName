import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

// import { login, isPending, error, useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { login, isPending, error } = useLogin();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login(email, password);
  // };

  return (
    <div className="login-main">
      <form className="login-auth-form">
        <h2 className="login-title">Login</h2>

        <label className="login-name">
          <span>username:</span>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>

        <label className="login-password">
          <span>password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <Link to="app" className="listItem">
          <button className="btn login-btn-1">Login</button>
        </Link>

        <Link to="signup" className="listItem">
          <button className="btn">Sign up</button>
        </Link>

        {/* 
      {!isPending ? (
        <button className="btn">Login</button>
      ) : (
        <button className="btn" disabled>
          loading
        </button>
      )}

      {error && <div className="error">{error} </div>} */}
      </form>
    </div>
  );
};

export default Login;
