import "../../App.css";
import "../../index.css";

import { useLoaderData } from "react-router-dom";

//reciba un elemento {movieDetail}
/** */

function MovieDetails() {
  const movieDetails = useLoaderData();

  console.log(movieDetails);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // minimumFractionDigits: 2, // Optional: defaults to 2 for USD
  });

  return (
    <>
      <div height="300px">
        <ul>
          <li className="flex-cell-movie-url">
            <img src={movieDetails.imageUrl} alt="Film Poster" />
          </li>
          <li>
            <div className="filmdescription">
              <span>{movieDetails.movieName}</span>
              <span>{movieDetails.genre}</span>
              <span>{movieDetails.releaseYear}</span>
            </div>
          </li>
          <li>
            <div className="filmdescription">
              <span>Revenue: {formatter.format(movieDetails.revenue)}</span>
              <span>Runtime: {movieDetails.runtime}</span>
              <span>{movieDetails.description}</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
export default MovieDetails;
