import React, { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import "./App.css";
function App() {
  const [token, setToken] = useState("");

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="App">
      {!token ? <Login onLogin={handleLogin} /> : <TaskList token={token} />}
    </div>
  );
}

export default App;
