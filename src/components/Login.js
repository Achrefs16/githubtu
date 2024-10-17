import React, { useState } from "react";
import axios from "axios";
import "../App.css";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      const { token } = response.data;
      onLogin(token);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="modal">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
