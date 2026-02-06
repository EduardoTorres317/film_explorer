import "./App.css";

import React from "react";
import MovieFinder from "./components/moviefinder/MovieFinder";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <MovieFinder />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Netflix Roulette</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="order">
        <p>First implementation of Film classifier for EPAM React Js Course</p>
      </div>
    </footer>
  );
}

export default App;
