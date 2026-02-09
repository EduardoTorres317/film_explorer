import MovieTile from "./MovieTile";
import film1 from "../../images/film1.jpg";

export default {
  component: MovieTile,
};

//imageUrl, movieName, genre, releaseYear

export const MovieTileSample = {
  args: {
    imageUrl: film1,
    movieName: "Barry Lyndon",
    genre: "Historical Fiction",
    releaseYear: "1974",
  },
};
