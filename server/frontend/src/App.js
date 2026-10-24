import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dealers from "./components/Dealers/Dealers";
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.css";

export default function App() {
  return <Routes>
    <Route path="/" element={<Dealers />} />
    <Route path="/dealers" element={<Dealers />} />
    <Route path="/dealer/:id" element={<Dealer />} />
    <Route path="/postreview/:id" element={<PostReview />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
