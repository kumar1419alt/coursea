import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ userName: "", firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function update(event) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || result.status !== "Authenticated") {
        throw new Error(result.message || result.error || "Registration failed. Check your details and try again.");
      }
      sessionStorage.setItem("username", result.userName);
      navigate("/");
    } catch (err) {
      setError(err.message || "Could not reach the registration service.");
    } finally {
      setBusy(false);
    }
  }

  return <><Header /><main className="page"><section className="panel form-panel register-panel">
    <p className="eyebrow">Create an account</p>
    <h1>Join the Best Cars community</h1>
    <p className="subheading">Sign up to share a review of your dealership experience.</p>
    {error && <div className="status error" role="alert">{error}</div>}
    <form onSubmit={submit}>
      <div className="form-grid">
        <label><span className="field-label">Username</span><input required autoComplete="username" name="userName" value={form.userName} onChange={update} placeholder="Choose a username" /></label>
        <label><span className="field-label">First Name</span><input required autoComplete="given-name" name="firstName" value={form.firstName} onChange={update} placeholder="First name" /></label>
        <label><span className="field-label">Last Name</span><input required autoComplete="family-name" name="lastName" value={form.lastName} onChange={update} placeholder="Last name" /></label>
        <label><span className="field-label">Email</span><input required type="email" autoComplete="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
        <label className="full"><span className="field-label">Password</span><input required type="password" minLength="8" autoComplete="new-password" name="password" value={form.password} onChange={update} placeholder="At least 8 characters" /></label>
      </div>
      <div className="form-actions"><button className="button" type="submit" disabled={busy}>{busy ? "Creating account…" : "Register"}</button><span>Already registered? <Link to="/login">Log in</Link></span></div>
    </form>
  </section></main></>;
}
