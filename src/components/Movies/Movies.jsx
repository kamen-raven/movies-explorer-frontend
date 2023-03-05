import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import { checkSearchAnswerNotEmpty } from "../../utils/searchUtils";

function Movies({
  errorMessage,
  setErrorMessage,
  valueSearchMovies,
  setValueSearchMovies,
  allCArds,
  searchedCards,
  setSearchedCards,
  searchedShortCards,
  setSearchedShortCards,
  isLoading,
  filterCheckbox,
  setFilterChechbox,
  onMovieSave,
  onMovieDelete,
  savedCards
}) {
  const location = useLocation();

  //эффект загрузки данных предыдущего поиска при повторном заходе на сайт в той же сессии
  useEffect(() => {
    if (
      sessionStorage.getItem("Search-query") && // если был прошлый поисковый запрос и мы перегли на страницу фильмов
      location.pathname === "/movies"
    ) {
      setValueSearchMovies(sessionStorage.getItem("Search-query")); //задаем стейт поиска
      const filteredMovies = JSON.parse(sessionStorage.getItem("Filter-cards"));
      setSearchedCards(filteredMovies); // задаем стейт фильмов
      const filteredShortMovies = JSON.parse(
        sessionStorage.getItem("Filter-short-cards")
      );
      setSearchedShortCards(filteredShortMovies); //задаем стейт короткометражек
    }
  }, [
    location.pathname,
    setFilterChechbox,
    setSearchedCards,
    setSearchedShortCards,
    setValueSearchMovies,
  ]);

  //обработчик отправки формы поиска MOVIES
  function handleSearchFormSumbit(event) {
    event.preventDefault();
    if (valueSearchMovies === "") {
      setSearchedCards([]);
      setSearchedShortCards([]);
      setErrorMessage("Нужно ввести ключевое слово");
      sessionStorage.removeItem("Search-query");
      sessionStorage.removeItem("Filter-cards");
      sessionStorage.removeItem("Filter-short-cards");
      return errorMessage;
    } else {
      checkSearchAnswerNotEmpty(
        allCArds,
        setSearchedCards,
        setSearchedShortCards,
        valueSearchMovies,
        setErrorMessage
      );
    }
  }

  return (
    <main className="main">

          <SearchForm
            placeholder={"Фильмы"}
            //errorMessageSearchForm={errorMessage}
            handleFormSubmit={handleSearchFormSumbit}
            setInputValue={setValueSearchMovies}
            inputValue={valueSearchMovies}
            filterCheckbox={filterCheckbox}
            setFilterChechbox={setFilterChechbox}
          />

      {isLoading && <Preloader />}

      {!isLoading && (
        <MoviesCardList
          valueSearchMovies={valueSearchMovies}
          errorMessageCardList={errorMessage}
          setErrorMessageCardList={setErrorMessage}
          searchFullResult={searchedCards}
          searchShortResult={searchedShortCards}
          filterCheckbox={filterCheckbox}
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          savedMovies={savedCards}
        />
      )}
    </main>
  );
}

export default Movies;
