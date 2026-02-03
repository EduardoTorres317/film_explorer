import "./App.css";

import React from "react";
import "./index.css";

const filmTypesList = [
  {
    name: "All",
    clicked: false,
  },
  {
    name: "Documentary",
    clicked: false,
  },
  {
    name: "Horror",
    clicked: false,
  },
  {
    name: "Romantic Comedies",
    clicked: false,
  },
  {
    name: "Crime",
    clicked: false,
  },
  {
    name: "Action Movies",
    clicked: false,
  },
  {
    name: "Marvel Movies",
    clicked: false,
  },
  {
    name: "Narcos Movies",
    clicked: false,
  },
];

const { useRef, useState } = React;

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

function MovieFinder() {
  const filmTypes = filmTypesList;
  const inputRef = useRef(null);

  const [writtenfilmType, setWrittenFilmType] = useState("");

  const [clickedFilmType, setClickedFilmType] = useState("");

  const handleClick = () => {
    console.log("written film type-->" + writtenfilmType);
  };

  const handleFilmTypeClick = (filmType) => {
    setClickedFilmType(filmType);

    console.log("clicked film type-->" + filmType);
  };

  return (
    <main className="filmselector">
      <div>
        <>
          <input
            value={writtenfilmType}
            onChange={(e) => setWrittenFilmType(e.target.value)}
            type="text"
            placeholder="Write the film type"
          />
          <button onClick={handleClick}>Set your film type</button>
        </>
      </div>

      <React.Fragment>
        <table>
          <tbody>
            <tr className="filmtypes">
              {
                //javascript mode
                filmTypes.map((filmtype) => (
                  <FilmType
                    name={filmtype.name}
                    key={filmtype.name}
                    handleFilmTypeClick={handleFilmTypeClick}
                    clickedFilmType={clickedFilmType}
                  />
                ))
              }
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    </main>
  );
}

//with{filmTypeObj} we extract filmTypeObj from the props array
function FilmType({ name, clickedFilmType, handleFilmTypeClick }) {
  //console.log(filmTypeObj);

  //const [clickedFilmType, setClickedFilmType] = useState("");

  return (
    <>
      <td className={`filmtype`}>
        <button
          //className="film-type-btn"
          className={`film-type-btn ${clickedFilmType === name ? "active-btn" : ""}`}
          onClick={() => handleFilmTypeClick(name)}
        >
          {name}
        </button>
      </td>
    </>
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
