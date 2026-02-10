import MovieForm from "./MovieForm";

export default {
  component: MovieForm,
};

//{ imageUrl, movieName, genre, releaseYear, description }

export const MovieFormSample = {
  args: {
    submitMovieAction: "submitMovieAction",
    filmToUpdate: {
      movieTitle: "The spy who loved me",
      releaseDate: "03/07/1978",
      movieUrl: "http://images.com/spywholovedme.jpg",
      rating: "PG13",
      genre: "Action/Thriller",
      runtime: "2h20m",
      overview:
        "James Bond has to recover a satellite transponder from an amoral arms dealer",
    },
  },
};
