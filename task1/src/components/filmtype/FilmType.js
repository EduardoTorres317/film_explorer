import "../../App.css";
import "../../index.css";

function FilmType({ name, clickedFilmType, handleFilmTypeClick }) {
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
export default FilmType;
