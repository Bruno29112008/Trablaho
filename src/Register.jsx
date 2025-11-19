import React, { useState } from "react";
import "./Register.css";

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isPasswordValid = (v) => v.length >= 8;
  const isNameValid = (v) => v.trim().length >= 3;

  const formValid = isEmailValid(email) && isPasswordValid(password) && isNameValid(name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formValid) {
      setError("Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 900));
      const newUser = { name, email, token: "fake-token" };
      localStorage.setItem("user", JSON.stringify(newUser));
      onRegisterSuccess(newUser);
    } catch {
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>

        <label>Nome</label>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>E-mail</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <div className="password-row">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="show-pass-btn"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={!formValid || loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="extra-text">
          Já tem conta?{" "}
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToLogin}
          >
            Faça login
          </button>
        </p>
      </form>
    </div>
  );
}
