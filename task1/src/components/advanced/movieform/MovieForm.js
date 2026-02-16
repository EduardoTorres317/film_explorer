import "../../../App.css";
import "../../../index.css";

function MovieForm({ submitMovieAction, updateMovieAction, filmToUpdate }) {
  return (
    <form onSubmit={submitMovieAction}>
      <table height="300px">
        <tbody>
          <tr>
            <td className="flex-cell">
              <label htmlFor="filmtitle">Film title: </label>
              <input
                type="text"
                id="filmtitle"
                name="title"
                defaultValue={filmToUpdate.movieTitle}
              />
            </td>
            <td className="flex-cell">
              <label htmlFor="filmdate">Release date: </label>
              <input
                type="date"
                id="filmdate"
                name="releaseDate"
                defaultValue={filmToUpdate.releaseDate}
              />
            </td>
          </tr>
          <tr>
            <td className="flex-cell">
              <label htmlFor="filmurl">Url: </label>
              <input
                type="text"
                id="filmurl"
                name="movieUrl"
                defaultValue={filmToUpdate.movieUrl}
              />
            </td>
            <td className="flex-cell">
              <label htmlFor="filmrating">Rating: </label>
              <input
                type="text"
                id="filmrating"
                name="rating"
                defaultValue={filmToUpdate.rating}
              />
            </td>
          </tr>
          <tr>
            <td className="flex-cell">
              <label htmlFor="filmgenre">Genre: </label>
              <input
                type="text"
                id="filmgenre"
                name="genre"
                defaultValue={filmToUpdate.genre}
              />
            </td>
            <td className="flex-cell">
              <label htmlFor="filmruntime">Run time: </label>
              <input
                type="text"
                id="filmruntime"
                name="runtime"
                defaultValue={filmToUpdate.runtime}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <label htmlFor="filmoverview">Overview: </label>
              <input
                type="text"
                id="filmoverview"
                name="overview"
                defaultValue={filmToUpdate.overview}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={1}>
              <button>Add Movie to List</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
export default MovieForm;
