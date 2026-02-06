import "../../App.css";
import "../../index.css";

function MovieDetails({
  imageUrl,
  movieName,
  releaseYear,
  rating,
  duration,
  description,
}) {
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
export default MovieDetails;
