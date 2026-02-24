import { Outlet, Link } from "react-router-dom";

export async function MovieDetailsLoader({ params }) {
  const { filmId } = params;

  console.log("filmId param at MovieDetailsLoader()-->" + filmId);
  try {
    //curl -X GET "http://localhost:4000/movies/313369" -H "accept: application/json"
    const filmDetailsHttpQuery = "http://localhost:4000/movies/" + filmId;
    console.log("httpQuery used to get film details-->" + filmDetailsHttpQuery);
    const response = await fetch(filmDetailsHttpQuery);

    if (!response.ok) {
      throw new Error("error thrown retrieving movies!");
    }

    const responseJson = await response.json();

    const movieDetails = {
      id: filmId,
      poster_path: responseJson.poster_path,
      title: responseJson.title,
      genre: responseJson.genres[0],
      releaseYear: responseJson.release_date,
      description: responseJson.overview,
      revenue: responseJson.revenue,
      runtime: responseJson.runtime,
    };
    console.log("response-->");
    console.log(movieDetails);
    return movieDetails;
  } catch (error) {
    console.error("Error fetching films list:", error);
  }
}

/**  {
  "id": 313369,
  "title": "La La Land",
  "tagline": "Here's to the fools who dream.",
  "vote_average": 7.9,
  "vote_count": 6782,
  "release_date": "2016-11-29",
  "poster_path": "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
  "overview": "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
  "budget": 30000000,
  "revenue": 445435700,
  "genres": [
    "Comedy",
    "Drama",
    "Romance"
  ],
  "runtime": 128
     */
