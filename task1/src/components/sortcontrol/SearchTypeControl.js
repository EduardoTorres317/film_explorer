import "../../App.css";
import "../../index.css";
import * as React from "react";

function SearchTypeControl({ handleSearchTypeChange, searchoptions }) {
  return (
    <>
      <label>Search Film</label>
      <div>
        <label>Select the search type:</label>
        <select
          id="searchTypeSelect"
          onChange={(evt) => handleSearchTypeChange(evt.target.value)}
        >
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
export default SearchTypeControl;
