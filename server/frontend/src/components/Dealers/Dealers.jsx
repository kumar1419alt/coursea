import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

export default function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [state, setState] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = sessionStorage.getItem("username") || "";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const path = state === "All" ? "/djangoapp/get_dealers" : "/djangoapp/get_dealers/" + encodeURIComponent(state);
        const response = await fetch(path, { credentials: "same-origin" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Dealer service is unavailable.");
        if (!cancelled) setDealers(Array.isArray(result.dealers) ? result.dealers : []);
      } catch (err) {
        if (!cancelled) { setDealers([]); setError(err.message || "Could not load dealers."); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [state]);

  const stateNames = ["All", "Arizona", "California", "Colorado", "Florida", "Kansas", "Minnesota", "New York", "Texas", "Washington"];
  return <><Header /><main className="page">
    <section className="hero">
      <h1>Find your next great dealership.</h1>
      <p>Explore dealer locations, learn about their services, and read customer reviews before you visit.</p>
      <div className="card-actions">
        <a href="#dealer-list" className="button">Explore dealerships</a>
        {!username && <Link className="button secondary" to="/register">Join the community</Link>}
      </div>
    </section>
    <section id="dealer-list">
      <div className="toolbar"><div><p className="eyebrow">Trusted local service</p><h2>Dealership directory</h2></div>
        <label className="filter"><span className="field-label">Filter by state</span><select value={state} onChange={(e) => setState(e.target.value)}>{stateNames.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      {loading && <p className="status">Loading dealerships…</p>}
      {error && <p className="status error" role="alert">{error} Make sure the Express/Mongo service is running.</p>}
      {!loading && !error && dealers.length === 0 && <div className="empty-state">No dealerships were found for this state.</div>}
      <div className="dealer-grid">{dealers.map((dealer) => <article className="dealer-card" key={dealer.id}>
        <p className="eyebrow">{dealer.state || "United States"} · Dealer #{dealer.id}</p>
        <h3>{dealer.full_name || dealer.short_name || "Best Cars Dealership"}</h3>
        <p className="meta">📍 {dealer.city}, {dealer.state} {dealer.zip ? " " + dealer.zip : ""}<br />{dealer.address || ""}</p>
        <div className="card-actions"><Link className="button" to={"/dealer/" + dealer.id}>View details & reviews</Link>
          {username && <Link className="button secondary" to={"/postreview/" + dealer.id}>Review Dealer</Link>}</div>
      </article>)}</div>
    </section>
  </main><footer className="site-footer">Best Cars · Real experiences help everyone choose with confidence.</footer></>;
}
