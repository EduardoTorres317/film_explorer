import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails"; // Adjust path as needed

// 1. Mock the React Router hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
  useNavigate: jest.fn(),
}));

// 2. Mock the global fetch function
global.fetch = jest.fn();

describe("MovieDetails Component", () => {
  const mockMovie = {
    id: 123,
    title: "Inception",
    poster_path: "https://image.path",
    releaseYear: "2010-07-16",
    revenue: 825000000,
    runtime: 148,
    description: "A thief who steals corporate secrets...",
  };

  const mockNavigate = jest.fn();

  beforeEach(() => {
    //mockReturnValue when mocking SYNCHROUNOUS calls
    useLoaderData.mockReturnValue(mockMovie);
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test("renders initial movie details correctly", () => {
    render(<MovieDetails />);

    expect(screen.getByDisplayValue(mockMovie.title)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockMovie.id.toString()),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Film Poster")).toHaveAttribute(
      "src",
      mockMovie.poster_path,
    );
  });

  //this one is defined with an async function as the http fetch
  //is asynchrounous
  test("submits form data and navigates on success", async () => {
    //use mockResolvedValueOnce when mocking ASYNCHRONOUS calls
    //like http calls, specify return value from promise on json field
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    render(<MovieDetails />);

    // Modify a field to simulate user input
    const titleInput = screen.getByPlaceholderText("Title");
    //screen.getByLabelText("Film Id");
    fireEvent.change(titleInput, { target: { value: "Inception Updated" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /update movie/i });

    //trigger the form submission
    fireEvent.click(submitButton);

    //wait for mocked http PUT response
    await waitFor(() => {
      // Verify fetch was called with correct data
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/movies",
        expect.objectContaining({
          method: "PUT",
          body: expect.stringContaining('"title":"Inception Updated"'),
        }),
      );
      // Verify navigation back home
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("shows validation errors for invalid inputs", async () => {
    render(<MovieDetails />);

    const revenueInput = screen.getByLabelText("Revenue:"); // You might want to add labels to inputs
    fireEvent.change(revenueInput, { target: { value: "-100" } });

    const submitButton = screen.getByRole("button", { name: /update movie/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/revenue cannot be negative/i),
    ).toBeInTheDocument();
  });
});
