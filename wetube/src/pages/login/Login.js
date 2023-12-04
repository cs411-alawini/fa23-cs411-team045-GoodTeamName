import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8080/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        // Redirect to the home page
        navigate("/app");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to login");
        toast.error("Failed to login");
      }
    } catch (error) {
      setError("Failed to login");
      toast.error("Failed to login");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="login-main">
      <form className="login-auth-form" onSubmit={handleFormSubmit}>
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

        <button type="submit" className="btn login-btn-1" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
