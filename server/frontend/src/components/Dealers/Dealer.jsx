import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";

export default function Dealer() {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const username = sessionStorage.getItem("username") || "";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError("");
      try {
        const [dealerResponse, reviewResponse] = await Promise.all([
          fetch("/djangoapp/dealer/" + encodeURIComponent(id)),
          fetch("/djangoapp/reviews/dealer/" + encodeURIComponent(id)),
        ]);
        const dealerJson = await dealerResponse.json();
        const reviewJson = await reviewResponse.json();
        if (!dealerResponse.ok) throw new Error(dealerJson.message || "Dealer could not be loaded.");
        if (!reviewResponse.ok) throw new Error(reviewJson.message || "Reviews could not be loaded.");
        if (!cancelled) { setDealer(dealerJson.dealer); setReviews(Array.isArray(reviewJson.reviews) ? reviewJson.reviews : []); }
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load this dealer.");
      } finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  return <><Header /><main className="page">
    <p><Link to="/">← Back to all dealerships</Link></p>
    {loading && <p className="status">Loading dealer details…</p>}
    {error && <p className="status error" role="alert">{error}</p>}
    {dealer && <><section className="hero"><p className="eyebrow">Dealership #{dealer.id}</p><h1>{dealer.full_name || dealer.short_name}</h1><p>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</p>
      <div className="card-actions">{username ? <Link className="button" to={"/postreview/" + id}>Review Dealer</Link> : <Link className="button" to="/login">Log in to review</Link>}</div>
    </section>
    <section className="panel" style={{marginTop:24}}><div className="toolbar"><div><p className="eyebrow">Community feedback</p><h2>Customer reviews ({reviews.length})</h2></div></div>
      {reviews.length === 0 && <p className="empty-state">No reviews yet. Be the first to share your experience.</p>}
      {reviews.map((review) => <article className="review" key={review.id}><h4>{review.name || "Customer"} <span className="sentiment">{review.sentiment || "unscored"}</span></h4><p>{review.review}</p><p className="meta">{review.purchase ? "Purchased here" : "Visitor review"}{review.purchase_date ? " · " + review.purchase_date : ""}{review.car_make ? " · " + review.car_make + " " + (review.car_model || "") : ""}</p></article>)}
    </section></>}
  </main></>;
}
