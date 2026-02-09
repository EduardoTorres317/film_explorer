import "../../App.css";
import "../../index.css";

function MovieDetails({
  imageUrl,
  movieName,
  genre,
  releaseYear,
  description,
}) {
  return (
    <>
      <table height="300px">
        <tbody>
          <tr>
            <td class="flex-cell">
              <img src={imageUrl} alt="Film Poster" />
            </td>
            <td>
              <div class="filmdescription">
                <span>{movieName}</span>
                <span>{genre}</span>
                <span>{releaseYear}</span>
                <span>{description}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default MovieDetails;
