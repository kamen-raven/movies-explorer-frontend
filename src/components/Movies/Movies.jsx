import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import "./Movies.css";

function Movies(props) {
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
  );
}

export default Movies;
