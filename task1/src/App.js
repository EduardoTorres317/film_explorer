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

  const handleClick = () => {
    const newValue = inputRef.current.value;
    setWrittenFilmType(newValue);
    console.log("written film type-->" + newValue);
  };

  return (
    <main className="filmselector">
      <div>
        <>
          <input ref={inputRef} type="text" placeholder="Write the film type" />
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
                  <FilmType filmTypeObj={filmtype} key={filmtype.name} />
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
function FilmType({ filmTypeObj }) {
  //console.log(filmTypeObj);

  const [clickedFilmType, setClickedFilmType] = useState("");
  const [selected, setSelected] = useState(false);

  const handleFilmTypeClick = (filmType) => {
    setClickedFilmType(filmType);
    setSelected(true);
    console.log("clicked film type-->" + filmType);
  };

  return (
    <>
      <td className={`filmtype`}>
        <button
          //className="film-type-btn"
          className={`film-type-btn ${selected === true ? "active-btn" : ""}`}
          onClick={() => handleFilmTypeClick(filmTypeObj.name)}
        >
          {filmTypeObj.name}
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
