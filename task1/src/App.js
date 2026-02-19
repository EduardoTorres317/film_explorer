import "./App.css";

import React from "react";
import MovieFinder3 from "./components/moviefinder/MovieFinder3";
import "./index.css";
import MovieFinderWithUseEffects from "./components/moviefinder/MovieFinderWithUseEffects";

function App() {
  return (
    <div className="container">
      <Header />
      <MovieFinderWithUseEffects />
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
        <p>
          Fifth version of Film explorer for EPAM React Js Course using effect
          to bring film list from backend as well as router framework to show
          film details.
        </p>
      </div>
    </footer>
  );
}

export default App;
