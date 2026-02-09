import "../../App.css";
import "../../index.css";

function MovieTile({ imageUrl, movieName, genre, releaseYear }) {
  return (
    <>
      <table height="300px">
        <tbody>
          <tr>
            <td class="flex-cell">
              <img src={imageUrl} alt="Film Poster" />
            </td>
          </tr>
          <tr>
            <td>
              <div class="filmdescription">
                <span>{movieName}</span>
                <span>{genre}</span>
              </div>
            </td>
            <td>{releaseYear}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default MovieTile;
