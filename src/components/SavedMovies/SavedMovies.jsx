import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import { checkSavedSearch } from "../../utils/searchUtils";

function SavedMovies({
  savedErrorMessage, // сообщение об ошибки
  setSavedErrorMessage, // сет сообщения об ошибки
  valueSavedSearchMovies, //запрос
  setValueSavedSearchMovies, // сет запроса
  savedCards, //сохраненные фильмы
  setSavedCards, // сет сохраненных фильмов
  savedShortCards,
  setSavedShortCards,
  searchedSavedCards, // отфильтрованные фильмы
  setSearchedSavedCards, // сет отфильтрованных фильмов
  searchedSavedShortCards, // отфильтрованные короткие
  setSearchedSavedShortCards, // сет отфильтрованных которких
  isLoading, // загрузка
  filterCheckbox, // фильтр коротких
  setFilterChechbox // сет фильтра коротких
}) {




  //обработчик отправки формы поиска MOVIES
  function handleSavedSearchFormSumbit(event) {
    event.preventDefault();
    if (valueSavedSearchMovies === "") {
      setSearchedSavedCards([]);
      setSearchedSavedShortCards([]);
      setSavedErrorMessage("");
      return savedErrorMessage;
    } else {
      checkSavedSearch(
        savedCards,
        setSearchedSavedCards,
        setSearchedSavedShortCards,
        valueSavedSearchMovies,
        setSavedErrorMessage
      );
    }
  }


  return (
    <main className="saved-movies">
      <section className="saved-movies__search container">
        <div className="saved-movies__search-container">
          <SearchForm
            placeholder={"Сохраненные фильмы"}
            //errorMessageSearchForm={savedErrorMessage}
            handleFormSubmit={handleSavedSearchFormSumbit}
            setInputValue={setValueSavedSearchMovies}
            inputValue={valueSavedSearchMovies}
            filterCheckbox={filterCheckbox}
            setFilterChechbox={setFilterChechbox}
          />
        </div>
      </section>

      {isLoading && <Preloader />}

      {!isLoading && (
        <MoviesCardList
          valueSearchMovies={valueSavedSearchMovies}
          errorMessageCardList={savedErrorMessage}
          setErrorMessageCardList={setSavedErrorMessage}
          searchFullResult={searchedSavedCards}
          setSearchFullResult={setSearchedSavedCards}
          searchShortResult={searchedSavedShortCards}
          setSearchShortResult={setSearchedSavedShortCards}
          filterCheckbox={filterCheckbox}
          savedMovies={savedCards}
          savedShortMovies={savedShortCards}


        />
      )}
    </main>
  );
}

export default SavedMovies;
