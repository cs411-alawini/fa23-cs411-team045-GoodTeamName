import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

// import { login, isPending, error, useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");
  // const { login, isPending, error } = useLogin();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login(email, password);
  // };

  return (
    <div className="signup-main">
      <form className="sign-auth-form">
        <h2 className="signup-title">Sign up</h2>

        <label className="signup-name">
          <span>username:</span>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>

        <label className="signup-region">
          <span>region:</span>
          <select
            name="region"
            id="select-signup-region"
            onChange={(e) => setRegion(e.target.value)}
            value={region}
          >
            <option value="BR">Brazil</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="GB">United Kingdom</option>
            <option value="IND">India</option>
            <option value="JP">Japan</option>
            <option value="KR">Korea</option>
            <option value="MX">Maxico</option>
            <option value="RU">Russia</option>
            <option value="US">United States</option>
          </select>
        </label>

        <label className="signup-password">
          <span>password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <Link to="/app" className="listItem">
          <button className="btn">Signup</button>
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
