import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

import OutraTela from "./OutraTela";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = ({ email }) => {
    setUser({ email });
  };

  const handleRegisterSuccess = (newUser) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  if (user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <OutraTela />
      </div>
    );
  }

  return (
    <>
      {page === "login" ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setPage("register")}
        />
      ) : (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setPage("login")}
        />
      )}
    </>
  );
}
