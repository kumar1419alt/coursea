import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Login.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/djangoapp/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ userName, password }),
      });
      const result = await response.json();
      if (!response.ok || result.status !== "Authenticated") {
        throw new Error(result.message || "The username or password is incorrect.");
      }
      sessionStorage.setItem("username", result.userName);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message || "Could not reach the login service.");
    } finally {
      setBusy(false);
    }
  }

  return <><Header /><main className="page"><section className="panel form-panel login-panel">
    <p className="eyebrow">Welcome back</p><h1>Log in to Best Cars</h1>
    <p className="subheading">Sign in to post and manage your dealership reviews.</p>
    {error && <div className="status error" role="alert">{error}</div>}
    <form onSubmit={submit}>
      <label className="form-field"><span className="field-label">Username</span><input required autoComplete="username" value={userName} onChange={(e) => setUserName(e.target.value)} /></label>
      <label className="form-field"><span className="field-label">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <div className="form-actions"><button className="button" type="submit" disabled={busy}>{busy ? "Signing in…" : "Login"}</button><span>New here? <Link to="/register">Create account</Link></span></div>
    </form>
  </section></main></>;
}
