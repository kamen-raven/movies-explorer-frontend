import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./MoviesCard.css";
import beatfilmLogo from "../../images/beatfilm_logo.svg";

function MoviesCard({
  card,
  onCardSave,
  onCardDelete,
  savedMovies,
}) {
  const location = useLocation();
  const isCardSaved = savedMovies.some((i) => i.movieId === card.id);
  const [isSaved, setIsSaved] = useState(isCardSaved ? true : false);

  function hoursSetUp() {
    let cardDuration = card.duration;
    let hours = Math.floor(cardDuration / 60);
    return hours;
  }

  function minutesSetUp() {
    let cardDuration = card.duration;
    let hours = Math.floor(cardDuration / 60);
    let minutes = Math.floor(cardDuration - hours * 60);
    return minutes;
  }

  const classButtonCheckSave = `card__button ${
    isCardSaved ? "card__button_type_saved" : "card__button_type_save"
  } `;

  //функция постановик лайка
  function handleLikeClick() {
    onCardSave({
      country: card.country !== null ? card.country : "Страна неизвестна",
      director: card.director !== null ? card.director : "Режиссер неизвестен",
      duration: card.duration,
      year: card.year !== null ? card.year : "xxxx",
      description: card.description,
      image: `https://api.nomoreparties.co${card.image?.url}`,
      trailer:
        card.trailerLink !== null
          ? card.trailerLink
          : "https://beatfilmfestival.ru/",
      thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN !== "" ? card.nameEN : "Unknown",
    });
    setIsSaved(true);
  }

  //функция удаления карточки
  function handleDeleteSaveCard() {
    onCardDelete(card);
    //setSearchResutls(savedMovies)
  }

  //функция удаления карточки лайкнутого фильма MOVIES
  function handleDeleteMovie() {
    savedMovies.forEach((movie) => {
      if (movie.movieId === card.id) {
        //const id = movie._id;
        onCardDelete(movie);
      }
    });
    setIsSaved(false);
  }

  return location.pathname === "/movies" ? (
    // вид карточки при movies
    <div className="card">
      <div className="card__info-container">
        <div className="card__info">
          <h2 className="card__title">
            {card.nameRU !== null ? card.nameRU : card.nameEN}
          </h2>
          <p className="card__duration">{`${hoursSetUp()}ч ${minutesSetUp()}м`}</p>
        </div>
        {!isSaved ? (
          <button
            className={classButtonCheckSave}
            type="button"
            aria-label="Сохранить в избранное"
            onClick={handleLikeClick}
          ></button>
        ) : (
          <button
            className={classButtonCheckSave}
            type="button"
            aria-label="Удалить"
            onClick={handleDeleteMovie}
          ></button>
        )}
      </div>
      <Link
        to={{
          pathname:
            card.trailerLink !== null
              ? card.trailerLink
              : "https://beatfilmfestival.ru/",
        }}
        target="_blank"
        className="card__image-link link"
        aria-label={card.nameRU !== null ? card.nameRU : card.nameEN}
      >
        <img
          className="card__image"
          src={
            card.image.url !== null
              ? `https://api.nomoreparties.co${card.image.url}`
              : beatfilmLogo
          }
          alt={card.nameRU !== null ? card.nameRU : card.nameEN}
        />
      </Link>
    </div>
  ) : (
    <div className="card">
      <div className="card__info-container">
        <div className="card__info">
          <h2 className="card__title">
            {card.nameRU !== null ? card.nameRU : card.nameEN}
          </h2>
          <p className="card__duration">{`${hoursSetUp()}ч ${minutesSetUp()}м`}</p>
        </div>
        <button
          className="card__button card__button_type_delete"
          type="button"
          aria-label="Удалить из избранного"
          onClick={handleDeleteSaveCard}
        ></button>
      </div>
      <Link
        to={{
          pathname:
            card.trailer !== null
              ? card.trailer
              : "https://beatfilmfestival.ru/",
        }}
        target="_blank"
        className="card__image-link link"
        aria-label={card.nameRU !== null ? card.nameRU : card.nameEN}
      >
        <img
          className="card__image"
          src={card.image !== null ? card.image : beatfilmLogo}
          alt={card.nameRU !== null ? card.nameRU : card.nameEN}
        />
      </Link>
    </div>
  );
}

export default MoviesCard;
