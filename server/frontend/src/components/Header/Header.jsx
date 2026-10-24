import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "";

  async function handleLogout() {
    try {
      await fetch("/djangoapp/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      sessionStorage.removeItem("username");
      navigate("/");
      window.location.reload();
    }
  }

  return <header className="site-header">
    <Link to="/" className="brand">BEST CARS<small>Dealerships & customer reviews</small></Link>
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/">Dealers</Link><a href="/about/">About Us</a><a href="/contact/">Contact Us</a>
      {username ? <><span className="nav-user">{username}</span><button type="button" onClick={handleLogout}>Logout</button></> :
        <><Link to="/login">Login</Link><Link className="button" to="/register">Sign up</Link></>}
    </nav>
  </header>;
}
