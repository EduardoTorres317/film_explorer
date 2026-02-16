import "../../App.css";
import "../../index.css";

function MovieTile({ posterUrl, movieTitle, overview, releaseDate }) {
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
            </div>
          </li>
          <li className="genre">{overview}</li>
        </ul>
      </div>
    </>
  );
}
export default MovieTile;
