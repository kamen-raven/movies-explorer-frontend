import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  handleFormSubmit,
  errorMessage,
  valueSearchMovies,
  setValueSearchMovies,
  searchedCards,
  searchedShortCards,
  setSearchedCards,
  isLoading,
  filterCheckbox,
  setFilterChechbox,
}) {
  const location = useLocation();

  //эффект загрузки данных предыдущего поиска при повторном заходе на сайт в той же сессии
  useEffect(() => {
    if (
      sessionStorage.getItem("Search-query") &&
      location.pathname === "/movies"
    ) {
      setValueSearchMovies(sessionStorage.getItem("Search-query"));
      const filteredMovies = JSON.parse(sessionStorage.getItem("Filter-cards"));
      setSearchedCards(filteredMovies);
      //setFilterChechbox(sessionStorage.getItem("Filter-short-cards"));
    }
  }, [
    location.pathname,
    setFilterChechbox,
    setSearchedCards,
    setValueSearchMovies,
  ]);

  return (
    <main className="main">
      <section className="movies__search container">
        <div className="movies__search-container">
          <SearchForm
            placeholder={"Фильмы"}
            errorMessageSearchForm={errorMessage}
            handleFormSubmit={handleFormSubmit}
            setInputValue={setValueSearchMovies}
            inputValue={valueSearchMovies}
            filterCheckbox={filterCheckbox}
            setFilterChechbox={setFilterChechbox}
          />
          <FilterCheckbox
            filterCheckbox={filterCheckbox}
            setFilterChechbox={setFilterChechbox}
          />
        </div>
      </section>
      {isLoading && <Preloader />}

      {!isLoading && (
        <MoviesCardList
          errorMessageCardList={errorMessage}
          searchResult={searchedCards}
          searchShortResult={searchedShortCards}
          filterMoviesCards={searchedCards}
          filterCheckbox={filterCheckbox}
        />
      )}
    </main>
  );
}

export default Movies;
