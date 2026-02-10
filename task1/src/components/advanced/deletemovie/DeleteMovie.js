import "../../../App.css";
import "../../../index.css";

function DeleteMovie({ deleteMovieAction, filmNameToDelete }) {
  return (
    <div className="modal">
      <h1>Delete Movie</h1>
      <h2>Are you sure you want to delete this movie?</h2>
      <h3>{filmNameToDelete}</h3>

      <table>
        <tbody>
          <tr>
            <td className={`filmtype`}>
              <button
                className={`film-type-btn`}
                onClick={() => deleteMovieAction(filmNameToDelete)}
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default DeleteMovie;
