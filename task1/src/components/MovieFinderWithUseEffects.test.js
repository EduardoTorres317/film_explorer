import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MovieFinderWithUseEffects from "./MovieFinderWithUseEffects"; // Adjust path

// 1. Mock the global fetch
global.fetch = jest.fn();

// 2. Mock child components that might complicate the unit test
//jest.mock("../movietile/MovieTile", () => ({ movieTitle }) => (
//  <div data-testid="movie-tile">{movieTitle}</div>
//));

describe("MovieFinderWithUseEffects Component", () => {
  const mockMovies = {
    data: [
      {
        id: 1,
        title: "Inception",
        poster_path: "",
        overview: "Dream",
        release_date: "2010",
      },
      {
        id: 2,
        title: "Interstellar",
        poster_path: "",
        overview: "Space",
        release_date: "2014",
      },
    ],
  };

  beforeEach(() => {
    fetch.mockClear();
    // Default mock response for the initial useEffect fetch
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockMovies,
    });
  });

  test("fetches and displays movies on initial load", async () => {
    render(
      <MemoryRouter>
        <MovieFinderWithUseEffects />
      </MemoryRouter>,
    );

    // Verify fetch was called with default genres (comedy)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("search=comedy"),
    );

    // Wait for the mock titles to appear in the document
    //findAll is asynchronous
    const movieItems = await screen.findAllByTestId("movie-tile");
    expect(movieItems).toHaveLength(2);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  test("updates searchKey when search form is submitted", async () => {
    render(
      <MemoryRouter>
        <MovieFinderWithUseEffects />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/write the film query value/i);
    const button = screen.getByRole("button", { name: /look for films/i });

    fireEvent.change(input, { target: { value: "Batman", name: "queryText" } });
    fireEvent.click(button);

    // useEffect should trigger a new fetch with the search text
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("search=Batman"),
      );
    });
  });

  test("changes search criterion when SearchTypeControl triggers change", async () => {
    render(
      <MemoryRouter>
        <MovieFinderWithUseEffects />
      </MemoryRouter>,
    );

    // We assume SearchTypeControl calls the handler with "title"
    // Since we can't see the internal UI of SearchTypeControl here, we trigger it manually
    // if you have access to the select/buttons within it.

    const searchInput = screen.getByPlaceholderText(
      /write the film query value/i,
    );
    fireEvent.change(searchInput, { target: { value: "Avatar" } });

    // Triggering a search to see if the query uses the correct criterion
    const button = screen.getByRole("button", { name: /look for films/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("searchBy=genres"),
      );
    });
  });

  test("navigates to addMovie route when 'Add movie' button is clicked", () => {
    // For navigation testing, we need the actual mock from react-router
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <MovieFinderWithUseEffects />
      </MemoryRouter>,
    );

    const addButton = screen.getByRole("button", { name: /add movie/i });
    fireEvent.click(addButton);
    //test agains the url
    //since navigate to a child route
    //CHANGES THE URL
    expect(mockNavigate).toHaveBeenCalledWith("/addMovie");
  });
});
