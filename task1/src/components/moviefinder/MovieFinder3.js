import "../../App.css";
import "../../index.css";

import React from "react";
import FilmType from "../filmtype/FilmType";

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

const { useState } = React;

function MovieFinder3() {
  const filmTypes = filmTypesList;

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

export default MovieFinder3;
