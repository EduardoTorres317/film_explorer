import "../../App.css";
import "../../index.css";

import React from "react";
import FilmType from "../filmtype/FilmType";
import MovieTile from "../movietile/MovieTile";
import SearchTypeControl from "../sortcontrol/SearchTypeControl";

const filmTypesList = [
  {
    name: "all",
    clicked: false,
  },
  {
    name: "thriller",
    clicked: false,
  },
  {
    name: "horror",
    clicked: false,
  },
  {
    name: "comedy",
    clicked: false,
  },
  {
    name: "action",
    clicked: false,
  },
  {
    name: "Action Movies",
    clicked: false,
  },
  {
    name: "Marvel Movies",
    clicked: false,
  },
  {
    name: "Narcos Movies",
    clicked: false,
  },
];

const searchoptions = [
  { value: "genres", label: "Genres" },
  { value: "title", label: "Title" },
];

const { useEffect, useState } = React;

function MovieFinderWithUseEffects() {
  const filmTypes = filmTypesList;

  const [searchKey, setSearchKey] = useState();
  const [searchText, setSearchText] = useState();

  const [searchCriterion, setSearchCriterion] = useState("genres");

  const [searchTypeUserSelection, setSearchTypeUserSelection] =
    useState("genres");

  const [queriedFilmsList, setQueriedFilmsList] = useState();

  const [clickedFilmType, setClickedFilmType] = useState("comedy");

  //curl -X GET "http://localhost:4000/movies?sortOrder=asc&search=comedy&searchBy=genres&offset=20&limit=20" -H "accept: application/json"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const httpQuery =
          "http://localhost:4000/movies?sortOrder=asc&search=" +
          searchKey +
          "&searchBy=" +
          searchCriterion +
          "&offset=40&limit=40";
        console.log("httpQuery used to call back end-->" + httpQuery);
        const response = await fetch(httpQuery);

        if (!response.ok) {
          throw new Error("error thrown retrieving movies!");
        }

        const responseJson = await response.json();

        setQueriedFilmsList(responseJson.data);
        //.then((response) => response.json())
        //.then((data) => setQueriedFilmsList(data));
      } catch (error) {
        console.error("Error fetching films list:", error);
      } finally {
        console.log("finishing fetch from movies url");
        console.log("response-->" + queriedFilmsList);
      }
    };

    fetchData();
  }, [searchKey, searchCriterion]);

  const handleFilmTypeClick = (filmType) => {
    setClickedFilmType(filmType);

    if (searchCriterion === "genres") {
      setSearchKey(filmType);
    }

    console.log("clicked film type-->" + filmType);
  };

  useEffect(() => {
    console.log(
      "Search criterion state successfully updated to:",
      searchCriterion,
    );
  }, [searchCriterion]);

  useEffect(() => {
    console.log("Search key successfully updated to:", searchKey);
  }, [searchKey]);

  const handleSearchTypeChange = (searchType) => {
    console.log("handleSearchTypeChange called, searchType-->" + searchType);
    if (searchType === "genres") {
      setSearchKey(clickedFilmType);
    } else {
      setSearchKey(searchText);
    }
    setSearchCriterion(searchType);
    setSearchTypeUserSelection(searchType);
    console.log("changed search criterion-->" + searchType);
  };

  function submitSearchQuery(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("search key set to -->" + formData.get("queryText"));
    setSearchText(formData.get("queryText"));
    setSearchKey(formData.get("queryText"));
  }

  return (
    <main className="filmselector">
      <div>
        <ul>
          <li>
            <div className="title-row">
              <span className="movietitle">
                <form onSubmit={submitSearchQuery}>
                  <input
                    name="queryText"
                    type="text"
                    placeholder="Write the film query value"
                  />
                  <button>Look for films with this text search</button>
                </form>
              </span>
              <span className="movietitle">
                <SearchTypeControl
                  searchoptions={searchoptions}
                  handleSearchTypeChange={handleSearchTypeChange}
                />
              </span>
            </div>
          </li>
        </ul>
      </div>

      <React.Fragment>
        <ul className="filmtypes">
          {
            //javascript mode
            filmTypes.map((filmtype) => (
              <FilmType
                name={filmtype.name}
                key={filmtype.name}
                handleFilmTypeClick={handleFilmTypeClick}
                clickedFilmType={clickedFilmType}
              />
            ))
          }
        </ul>
      </React.Fragment>

      <React.Fragment>
        <div className="movie-container">
          <ul className="movie-grid">
            {queriedFilmsList !== undefined &&
              queriedFilmsList.length > 0 &&
              queriedFilmsList.map((movie) => (
                <li key={movie.id} className="movie-grid-item">
                  <MovieTile
                    posterUrl={movie.poster_path}
                    movieTitle={movie.title}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                  />
                </li>
              ))}
          </ul>
        </div>
      </React.Fragment>
    </main>
  );
}

export default MovieFinderWithUseEffects;

/**
 * 
 * {
  "totalAmount": 933,
  "data": [
    {
      "id": 198663,
      "title": "The Maze Runner",
      "tagline": "Remember. Survive. Run.",
      "vote_average": 7,
      "vote_count": 7502,
      "release_date": "2014-09-10",
      "poster_path": "https://image.tmdb.org/t/p/w500/coss7RgL0NH6g4fC2s5atvf3dFO.jpg",
      "overview": "Set in a post-apocalyptic world, young Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow “runners” for a shot at escape.",
      "budget": 34000000,
      "revenue": 348300000,
      "genres": [
        "Action",
        "Mystery",
        "Science Fiction",
        "Thriller"
      ],
      "runtime": 113
    },
 * 



 */
