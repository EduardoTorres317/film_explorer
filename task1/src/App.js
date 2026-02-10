import "./App.css";

import React from "react";
import MovieFinder3 from "./components/moviefinder/MovieFinder3";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <MovieFinder3 />
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
          Second implementation of Film classifier for EPAM React Js Course
          adding film on model component.
        </p>
      </div>
    </footer>
  );
}

export default App;
