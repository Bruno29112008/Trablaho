import React, { useState } from "react";
import "./Login.css";


export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isPasswordValid = (value) => value.length >= 8;

  const formValid = isEmailValid(email) && isPasswordValid(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formValid) {
      setError("Verifique e-mail e senha (mínimo 8 caracteres).");
      return;
    }

    setLoading(true);
    try {
     
      await new Promise((res) => setTimeout(res, 900));
      const fakeToken = "fake-token";
      localStorage.setItem("token", fakeToken);
      onLoginSuccess({ email, token: fakeToken });
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <div className="password-row">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="show-pass-btn"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={!formValid || loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="extra-text">
          Não tem conta?{" "}
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToRegister}
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  );
}
