import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import "./Movies.css";

function Movies(props) {
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
