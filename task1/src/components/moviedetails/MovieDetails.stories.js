import MovieDetails from "./MovieDetails";
import film2 from "../../images/film2.jpg";

export default {
  component: MovieDetails,
};

//{ imageUrl, movieName, genre, releaseYear, description }

export const MovieDetailsSample = {
  args: {
    imageUrl: film2,
    movieName: "Heat",
    genre: "Heist/Action",
    releaseYear: "1995",
    description:
      "Heist film describing the struggle between an ace detective and a professional bank robber in 1990s Los Angeles",
  },
};
