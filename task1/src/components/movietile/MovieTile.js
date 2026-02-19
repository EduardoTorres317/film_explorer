import "../../App.css";
import "../../index.css";

//asignar la funcion navigate desde el event handler del
//click
import {
  // existing code
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

function MovieTile({ movieId, posterUrl, movieTitle, overview, releaseDate }) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <ul>
          <li>
            <span className="flex-cell-movie-url">
              <img src={posterUrl} alt="Film Poster" />
            </span>
          </li>
        </ul>
        <ul className="filmdescription">
          <li>
            <div className="title-row">
              <span className="movie-title">{movieTitle}</span>
              <span className="movie-title">{releaseDate}</span>
              <span className="movie-title">{movieId}</span>
            </div>
          </li>
          <li>
            <Link to={`/moviedetails/${movieId}`}>More movie details</Link>
          </li>

          <li className="genre">{overview}</li>
        </ul>
      </div>
    </>
  );
}
export default MovieTile;
