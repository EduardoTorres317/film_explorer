import "../../App.css";
import "../../index.css";

function FilmType({ name, clickedFilmType, handleFilmTypeClick }) {
  return (
    <>
      <li>
        <button
          //className="film-type-btn"
          className={`film-type-btn ${clickedFilmType === name ? "active-btn" : ""}`}
          onClick={() => handleFilmTypeClick(name)}
        >
          {name}
        </button>
      </li>
    </>
  );
}
export default FilmType;
