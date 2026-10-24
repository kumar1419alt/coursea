import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";

export default function PostReview() {
  const { id } = useParams();
  const username = sessionStorage.getItem("username") || "";
  const [form, setForm] = useState({ review: "", purchase: false, purchase_date: "", car_make: "", car_model: "", car_year: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((old) => ({ ...old, [name]: type === "checkbox" ? checked : value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!username) { navigate("/login"); return; }
    setBusy(true);
    try {
      const response = await fetch("/djangoapp/add_review", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dealership: Number(id), name: username, car_year: form.car_year ? Number(form.car_year) : null }),
      });
      const result = await response.json();
      if (!response.ok || result.status < 200 || result.status >= 300) throw new Error(result.message || "Review could not be saved.");
      navigate("/dealer/" + id);
    } catch (err) { setError(err.message || "Could not submit review."); }
    finally { setBusy(false); }
  }

  if (!username) return <><Header /><main className="page"><section className="panel form-panel"><h1>Log in to post a review</h1><p>You must be signed in to share feedback.</p><Link className="button" to="/login">Login</Link></section></main></>;

  return <><Header /><main className="page"><section className="panel form-panel">
    <p className="eyebrow">Your experience matters</p><h1>Review dealership #{id}</h1>
    <p className="subheading">Be helpful and specific. Your review will be published for other customers.</p>
    {error && <p className="status error" role="alert">{error}</p>}
    <form onSubmit={submit}><div className="form-grid">
      <label className="full"><span className="field-label">Your review</span><textarea name="review" required minLength="5" rows="5" value={form.review} onChange={update} placeholder="Tell us about the service, staff, and your overall experience." /></label>
      <label><span className="field-label">Car make</span><input name="car_make" value={form.car_make} onChange={update} placeholder="e.g. Toyota" /></label>
      <label><span className="field-label">Car model</span><input name="car_model" value={form.car_model} onChange={update} placeholder="e.g. Camry" /></label>
      <label><span className="field-label">Car year</span><input name="car_year" type="number" min="1900" max="2035" value={form.car_year} onChange={update} /></label>
      <label><span className="field-label">Purchase date</span><input name="purchase_date" type="date" value={form.purchase_date} onChange={update} /></label>
      <label className="full"><input style={{width:"auto",marginRight:10}} name="purchase" type="checkbox" checked={form.purchase} onChange={update} /> I purchased a vehicle from this dealership.</label>
    </div><div className="form-actions"><button className="button" disabled={busy} type="submit">{busy ? "Submitting…" : "Post Review"}</button><Link className="button secondary" to={"/dealer/" + id}>Cancel</Link></div></form>
  </section></main></>;
}
