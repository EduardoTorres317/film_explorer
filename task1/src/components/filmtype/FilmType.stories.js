import FilmType from "./FilmType";

export default {
  component: FilmType,
};

// name, clickedFilmType, handleFilmTypeClick

export const Selected = {
  args: {
    name: "Horror",
    clickedFilmType: "Horror",
    handleFilmTypeClick: undefined,
  },
};

export const UnSelected = {
  args: {
    name: "Horror",
    clickedFilmType: "Action",
    handleFilmTypeClick: undefined,
  },
};
