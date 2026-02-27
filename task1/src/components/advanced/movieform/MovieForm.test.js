import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import MovieForm from "./MovieForm"; // Adjust path

// 1. Mock useNavigate
//const mockNavigate = jest.fn();
//jest.mock("react-router-dom", () => ({
//  ...jest.requireActual("react-router-dom"),
//  useNavigate: () => mockNavigate,
//}));

// 2. Mock global fetch
global.fetch = jest.fn();

describe("MovieForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits form data correctly and navigates on success", async () => {
    // Mock successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, title: "Inception" }),
    });

    render(
      <BrowserRouter>
        <MovieForm />
      </BrowserRouter>,
    );

    // 3. Fill out the form
    await userEvent.type(screen.getByLabelText(/film title:/i), "Inception");
    await userEvent.type(screen.getByLabelText(/release date:/i), "2010-07-16");
    await userEvent.type(screen.getByLabelText(/revenue:/i), "825000000");
    await userEvent.type(screen.getByLabelText(/run time:/i), "148");
    await userEvent.type(
      screen.getByLabelText(/overview:/i),
      "A dream within a dream.",
    );

    // 4. Submit the form
    await userEvent.click(
      screen.getByRole("button", { name: /add movie to list/i }),
    );

    // 5. Assertions
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/movies",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            title: "Inception",
            release_date: "2010-07-16",
            poster_path: "",
            revenue: 825000000, // verified as number due to valueAsNumber
            runtime: 148,
            overview: "A dream within a dream.",
          }),
        }),
      );
    });

    await waitFor(() =>
      expect(window.location.pathname).toHaveBeenCalledWith("/"),
    );
  });

  test("displays validation error when title is missing", async () => {
    render(
      <BrowserRouter>
        <MovieForm />
      </BrowserRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /add movie to list/i,
    });
    await userEvent.click(submitButton);

    // Verify error message appears
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
});
