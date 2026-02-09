import "../../App.css";
import "../../index.css";
import * as React from "react";

const searchoptions = [
  { value: "releasedate", label: "Release Date" },
  { value: "title", label: "Title" },
];

function SortControl() {
  const [searchType, setSearchType] = React.useState("title");

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <>
      <label>Search Film</label>
      <div>
        <label htmlFor="food-select">Select the search type:</label>
        <select id="food-select" value={searchType} onChange={handleChange}>
          <option key="" value="">
            --Please choose an option--
          </option>
          {searchoptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
export default SortControl;
