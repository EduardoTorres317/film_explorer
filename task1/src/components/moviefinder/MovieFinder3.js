import "../../App.css";
import "../../index.css";

import React from "react";
import MovieForm from "../advanced/movieform/MovieForm";
import DeleteMovie from "../advanced/deletemovie/DeleteMovie";
import film2 from "../../images/film2.jpg";
import film1 from "../../images/film1.jpg";

import { createPortal } from "react-dom";
import { FocusTrap } from "focus-trap-react";

const moviesList = [
  {
    movieTitle: "Gone with the wind",
    releaseDate: "1934",
    movieUrl: film2,
    rating: "16+",
    genre: "Romance",
    runtime: "3H",
    overview:
      "narrates the crisis of a southern landowning family during the civil war",
  },
  {
    movieTitle: "Ben Hur",
    releaseDate: "1958",
    movieUrl: film1,
    rating: "R",
    genre: "HISTORICAL EPIC",
    runtime: "3H30M",
    overview: "Life of Juda Ben Hur during Tiberius Caesar's reign",
  },
];

const { useState } = React;

const newFilmRoot = document.getElementById("newFilmFormRoot");

function MovieFinder3() {
  const [filmsList, setFilmsList] = useState(moviesList);
  const [showModal, setShowModal] = useState(false);
  const [filmNameToDelete, setFilmNameToDelete] = useState("Moonraker");

  //submitMovieAction is to be called in parent,
  //should just add this element to the array
  function submitMovieAction(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newMovie = {
      movieTitle: formData.get("title"),
      releaseDate: formData.get("releaseDate"),
      movieUrl: formData.get("movieUrl"),
      rating: formData.get("rating"),
      genre: formData.get("genre"),
      runtime: formData.get("runtime"),
      overview: formData.get("overview"),
    };

    console.log("adding new film-->" + newMovie.movieTitle);

    setFilmsList((filmsList) => [...filmsList, newMovie]);

    //console.log("new films-->" + filmsList);
  }

  function deleteMovieAction(event) {
    console.log("movie to delete-->" + event);
    setFilmsList((filmsList) =>
      filmsList.filter((film) => film.movieTitle !== event),
    );
  }

  return (
    <main className="filmselector">
      <>
        <table>
          <tbody>
            <tr className="filmtypes">
              <td colSpan={5}>Films:</td>
            </tr>
            {
              //javascript mode
              filmsList.map((movie) => (
                <tr className="filmtypes" key={movie.movieTitle}>
                  <td className="flex-cell">{movie.movieTitle}</td>
                  <td className="flex-cell">{movie.releaseDate}</td>
                  <td className="flex-cell">{movie.genre}</td>
                  <td className="flex-cell">{movie.rating}</td>
                  <td className="flex-cell">{movie.runtime}</td>
                  <td className="flex-cell">{movie.overview}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>

      <div id="newFilmFormRoot">
        <MovieForm
          submitMovieAction={submitMovieAction}
          filmToUpdate={filmsList.at(1)}
        />
        <button onClick={() => setShowModal(true)}>
          Activate delete movie window
        </button>
        {showModal &&
          createPortal(
            <FocusTrap>
              <DeleteMovie
                deleteMovieAction={deleteMovieAction}
                filmNameToDelete={filmNameToDelete}
              />
            </FocusTrap>,
            document.body,
          )}
      </div>
    </main>
  );
}

export default MovieFinder3;
