import "../../App.css";
import "../../index.css";

//reciba un elemento {movieDetail}
/** */

import React, { use } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const { useEffect, useState } = React;

function MovieDetails() {
  const movieDetails = useLoaderData();
  const navigate = useNavigate();

  console.log("movieDetails initial load object-->");
  console.log(movieDetails);

  // 1. Initialize the form with movieDetails as default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      poster_path: movieDetails.poster_path,
      id: movieDetails.id,
      title: movieDetails.title,
      release_date: movieDetails.releaseYear,
      revenue: movieDetails.revenue,
      runtime: movieDetails.runtime,
      overview: movieDetails.description,
    },
  });

  // 2. This function receives the 'data' object automatically
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/movies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Explicitly ensure numeric fields are numbers
          id: Number(data.id),
          revenue: Number(data.revenue),
          runtime: Number(data.runtime),
        }),
      });

      if (response.ok) {
        console.log("Success:", await response.json());
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // minimumFractionDigits: 2, // Optional: defaults to 2 for USD
  });

  return (
    <div className="outlet">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li className="flex-cell-movie-url">
            <img src={movieDetails.poster_path} alt="Film Poster" />
          </li>
          <li>
            <input {...register("poster_path")} readOnly />
          </li>

          <li>
            <div className="filmdescription">
              <span>
                <label htmlFor="id">Film Id:</label>
                <input
                  {...register("id", {
                    required: "id is required",
                    valueAsNumber: true, // Automatically converts string to Number
                  })}
                  readOnly
                />
              </span>
            </div>
          </li>

          <li>
            <div className="filmdescription">
              <span>
                <input
                  {...register("title", { required: "Title is required!" })}
                  placeholder="Title"
                />
              </span>
              <span>
                <input
                  type="date"
                  {...register("release_date", {
                    required: true,
                    maxLength: 20,
                  })}
                />
              </span>
            </div>
          </li>

          <li>
            <div className="filmdescription">
              <span>
                <label htmlFor="revenue">Revenue:</label>
                <input
                  type="number"
                  {...register("revenue", {
                    required: "Revenue is required",
                    valueAsNumber: true, // Automatically converts string to Number
                    min: { value: 0, message: "Revenue cannot be negative" },
                  })}
                />
                {errors.revenue && (
                  <p className="error">{errors.revenue.message}</p>
                )}
              </span>
              <span>
                <label htmlFor="runtime">Runtime:</label>
                {movieDetails.runtime}
                <input
                  type="number"
                  {...register("runtime", {
                    required: "Runtime is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Must be at least 1 minute" },
                  })}
                />
                {errors.runtime && (
                  <p className="error">{errors.runtime.message}</p>
                )}
              </span>
            </div>
          </li>
          <li className="filmdescription">
            <span>
              <textarea {...register("overview")} rows={4} cols={40} />
            </span>
          </li>

          <li>
            <button type="submit">Update Movie</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default MovieDetails;
