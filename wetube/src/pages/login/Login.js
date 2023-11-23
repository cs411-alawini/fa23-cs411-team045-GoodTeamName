import React from "react";
import { useState } from "react";
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
    <div className="main">
      <form className="auth-form">
        <h2 className="title">Login</h2>

        <label>
          <span>username:</span>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>

        <label>
          <span>password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
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
