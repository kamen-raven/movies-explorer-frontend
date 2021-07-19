import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

import { useWindowWidthSize } from "../../hooks/useWindowWidthSize";
import {
  desktopWidth,
  desktopRenderCards,
  desktopMoreButton,
  tabletWidth,
  tabletRenderCards,
  tabletMoreButton,
  mobileWidth,
  mobileRenderCards,
  mobileMoreButton
} from "../../utils/config";   // экспортируем размеры ширины экранов для отображения карточек и счетчиков

function MoviesCardList({
  valueSearchMovies,
  errorMessageCardList,
  setErrorMessageCardList,
  searchFullResult,
  setSearchFullResult,
  searchShortResult,
  setSearchShortResult,
  filterCheckbox,
  savedMovies,
  savedShortMovies,
  onMovieSave,
  onMovieDelete
}) {
  const location = useLocation();
  //-------------------------отображение кнопки ЕЩЕ------------------------//
  const widthSize = useWindowWidthSize(); //хук ширины экрана

  const [renderCountCards, setRenderCountCards] = useState(Number); // стейт количества первначально загружаемых карточек в зависимости от ширины экрана
  const [showMoreButton, setShowMoreButton] = useState(Number); // стейт количества добавления карточек по кнопке ЕЩЕ в зависимости от ширины экрана
  const [widthCountLoad, setWidthCountLoad] = useState(Number); // стейт отображения нужного количества карточек в зависимости от ширины экрана

  // задаем изначальное количество отображаемых карточек
  const setInitialCount = useCallback(() => {
    if (widthSize >= desktopWidth) {
      setRenderCountCards(desktopRenderCards); //Ширина 1280px — 12 карточек по 3 в ряд.
      setShowMoreButton(desktopMoreButton); //Кнопка «Ещё» загружает по 3 карточки.
    }
    if (tabletWidth <= widthSize && widthSize < desktopWidth) {
      setRenderCountCards(tabletRenderCards); //Ширина 768px — 8 карточек по 2 в ряд.
      setShowMoreButton(tabletMoreButton); //Кнопка «Ещё» загружает по 2 карточки.
    }
    if (mobileWidth <= widthSize && widthSize < tabletWidth) {
      setRenderCountCards(mobileRenderCards); //Ширина 320px — 5 карточек по 1 в ряд.
      setShowMoreButton(mobileMoreButton); //Кнопка «Ещё» загружает по 2 карточки.
    }
    setWidthCountLoad(renderCountCards);
  }, [renderCountCards, widthSize]);

  useEffect(() => {
    setInitialCount();
  }, [setInitialCount]);

  function showMoreCards() {
    setWidthCountLoad(widthCountLoad + showMoreButton);
  }

  //-------------отображение результатов поиска в зависимости от чек-бокса короткометражек------------//
  const [searchResults, setSearchResutls] = useState([]); // стейт отображения результата поиска
  // отображение результата поиска в зависимости отт фильтра короткометражек
  const renderResults = useCallback(() => {
    if (filterCheckbox === true) {
      // если фильтр включен
      if (searchShortResult.length !== 0) {
        // и если есть короткометражки
        setSearchResutls(searchShortResult); // показываем короткометражки
      } else {
        setSearchResutls([]); //если короткометражек нет, то задаем ошибку поиска
        valueSearchMovies === ""
          ? setErrorMessageCardList("Нужно ввести ключевое слово")
          : setErrorMessageCardList("Ничего не найдено");
      }
    } else {
      setSearchResutls(searchFullResult); // если фильтр выключен - то задаем результат общий
    }
  }, [
    filterCheckbox,
    searchFullResult,
    searchShortResult,
    setErrorMessageCardList,
    valueSearchMovies,
  ]);

  useEffect(() => {
    renderResults();
  }, [renderResults]);


  // обновляем стейты сохраненных фильмов для первоначального отображения карточек
  useEffect(() => {
    if (location.pathname === "/saved-movies" && valueSearchMovies === "") {
      setSearchFullResult(savedMovies);
      setSearchShortResult(savedShortMovies);
    }
  }, [
    location.pathname,
    savedMovies,
    savedShortMovies,
    setSearchFullResult,
    setSearchShortResult,
    valueSearchMovies,
  ]);



  return (
    <section className="cards container">
      {/* если страница MOVIES */}
      {location.pathname === "/movies" &&
        (searchResults.length === 0 ? ( // если данных нет
          <div className="cards__container cards__empty-page ">
            <h3 className="cards__empty-info">
              {errorMessageCardList ? errorMessageCardList : "Ищите и найдёте"}
            </h3>
          </div>
        ) : (
          // если данные есть
          <div className="cards__container">
            <div className="cards__list">
              {searchResults.slice(0, widthCountLoad).map((card) => (
                <MoviesCard card={card} key={card.id}
                  onCardSave={onMovieSave}
                  onCardDelete={onMovieDelete}
                  savedMovies={savedMovies}
                />
              ))}
            </div>
            {widthCountLoad < searchResults.length && (
              <button // отображаем карточку ЕЩЕ - если есть что еще отображать
                className={`button cards__button-more`}
                onClick={showMoreCards}
              >
                Еще
              </button>
            )}
          </div>
        ))}

      {/* если страница SAVED-MOVIES */}
      {location.pathname === "/saved-movies" &&
        (searchResults.length === 0 ? ( // если данных нет
          <div className="cards__container cards__empty-page ">
            <h3 className="cards__empty-info">
              {errorMessageCardList
                ? errorMessageCardList
                : "Введите поисковый запрос по сохраненным фильмам"}
            </h3>
          </div>
        ) : (
          // если данные есть
          <div className="cards__container">
            <div className="cards__list">
              {searchResults.map((card) => (
                <MoviesCard card={card} key={card.movieId}
                  onCardDelete={onMovieDelete}
                  savedMovies={savedMovies}
                />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}

export default MoviesCardList;
