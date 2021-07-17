import React, { useState, useEffect, useCallback } from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

import { useWindowWidthSize } from "../../hooks/useWindowWidthSize";

function MoviesCardList({
  valueSearchMovies,
  errorMessageCardList,
  setErrorMessageCardList,
  searchFullResult,
  searchShortResult,
  filterCheckbox,
}) {
  const widthSize = useWindowWidthSize(); //хук ширины экрана

  const [renderCountCards, setRenderCountCards] = useState(Number); // стейт количества первначально загружаемых карточек в зависимости от ширины экрана
  const [showMoreButton, setShowMoreButton] = useState(Number); // стейт количества добавления карточек по кнопке ЕЩЕ в зависимости от ширины экрана
  const [widthCountLoad, setWidthCountLoad] = useState(Number); // стейт отображения нужного количества карточек в зависимости от ширины экрана

      // задаем изначальное количество отображаемых карточек
  const setInitialCount = useCallback(() => {
    if (widthSize >= 1280) {
      setRenderCountCards(12); //Ширина 1280px — 12 карточек по 3 в ряд.
      setShowMoreButton(3); //Кнопка «Ещё» загружает по 3 карточки.
    }
    if (768 <= widthSize && widthSize < 1280) {
      setRenderCountCards(8); //Ширина 768px — 8 карточек по 2 в ряд.
      setShowMoreButton(2); //Кнопка «Ещё» загружает по 2 карточки.
    }
    if (320 <= widthSize && widthSize < 768) {
      setRenderCountCards(5); //Ширина 320px — 5 карточек по 1 в ряд.
      setShowMoreButton(2); //Кнопка «Ещё» загружает по 2 карточки.
    }
    setWidthCountLoad(renderCountCards);
  }, [renderCountCards, widthSize]);

  useEffect(() => {
    setInitialCount();
  }, [setInitialCount]);

  function showMoreCards() {
    setWidthCountLoad(widthCountLoad + showMoreButton);
  }

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

  return (
    <section className="cards container">
      {searchResults.length === 0 ? (
        <div className="cards__container cards__empty-page ">
          <h3 className="cards__empty-info">
            {errorMessageCardList ? errorMessageCardList : "Ищите и найдёте"}
          </h3>
        </div>
      ) : (
        <div className="cards__container">
          <div className="cards__list">
            {searchResults.slice(0, widthCountLoad).map((card) => (
              <MoviesCard card={card} key={card.id} />
              /*               onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} */
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
      )}
    </section>
  );
}

export default MoviesCardList;
