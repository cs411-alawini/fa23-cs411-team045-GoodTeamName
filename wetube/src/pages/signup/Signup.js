import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./signup.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("BR");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const response = await fetch(`http://35.239.242.245:8080/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, region }),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        // Redirect to the home page
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to sign up");
        toast.error("Failed to sign up");
      }
    } catch (error) {
      setError("Failed to sign up");
      toast.error("Failed to sign up");
    } finally {
      setIsPending(false);
    }
  };

  const handlechange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <div className="signup-main">
      <form className="sign-auth-form" onSubmit={handleFormSubmit}>
        <h2 className="signup-title">Sign up</h2>

        <label className="signup-region">
          <span>region:</span>
          <select
            name="region"
            id="select-signup-region"
            onChange={handlechange}
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
            <option value="MX">Mexico</option>
            <option value="RU">Russia</option>
            <option value="US">United States</option>
          </select>
        </label>

        <label className="signup-name">
          <span>username:</span>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
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

        <button type="submit" className="btn login-btn-1" disabled={isPending}>
          {isPending ? "Signning up..." : "Sign up"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
