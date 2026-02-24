import "../../../App.css";
import "../../../index.css";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function MovieForm() {
  const navigate = useNavigate();

  // 1. Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 2. Define the submit logic
  const onSubmit = async (data) => {
    try {
      console.log("Movie to be added-->", data);

      const response = await fetch("http://localhost:4000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // data already contains numbers thanks to valueAsNumber
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // 3. Use handleSubmit to wrap your onSubmit function
    <form onSubmit={handleSubmit(onSubmit)}>
      <table style={{ height: "300px" }}>
        <tbody>
          <tr>
            <td className="flex-cell">
              <label htmlFor="title">Film title: </label>
              <input
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
            </td>
            <td className="flex-cell">
              <label htmlFor="release_date">Release date: </label>
              <input
                type="date"
                {...register("release_date", { required: "Date is required" })}
              />
            </td>
          </tr>
          <tr>
            <td className="flex-cell" colSpan={2}>
              <label htmlFor="poster_path">Url: </label>
              <input {...register("poster_path")} />
            </td>
          </tr>
          <tr>
            <td className="flex-cell">
              <label htmlFor="revenue">Revenue: </label>
              <input
                type="number"
                {...register("revenue", { valueAsNumber: true })}
              />
            </td>
            <td className="flex-cell">
              <label htmlFor="runtime">Run time: </label>
              <input
                type="number"
                {...register("runtime", { valueAsNumber: true })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <label htmlFor="overview">Overview: </label>
              <textarea {...register("overview")} rows={4} cols={40} />
            </td>
          </tr>
          <tr>
            <td colSpan={1}>
              <button type="submit">Add Movie to List</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default MovieForm;
