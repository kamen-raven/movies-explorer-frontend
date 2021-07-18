import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./MoviesCard.css";
import beatfilmLogo from "../../images/beatfilm_logo.svg";

function MoviesCard({ card }) {
  const location = useLocation();

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
        {location.pathname === "/movies" ? (
          <button
            className="card__button card__button_type_save"
            type="button"
            aria-label="Сохранить в избранное"
          ></button>
        ) : (
          <button
            className="card__button card__button_type_delete"
            type="button"
            aria-label="Удалить из избранного"
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
        {location.pathname === "/movies" ? (
          <button
            className="card__button card__button_type_save"
            type="button"
            aria-label="Сохранить в избранное"
          ></button>
        ) : (
          <button
            className="card__button card__button_type_delete"
            type="button"
            aria-label="Удалить из избранного"
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
            card.image !== null
              ? `https://api.nomoreparties.co${card.image}`
              : beatfilmLogo
          }
          alt={card.nameRU !== null ? card.nameRU : card.nameEN}
        />
      </Link>
    </div>
  );
}

export default MoviesCard;

{
  /* <div className="card__info-container">
<div className="card__info">
  <h2 className="card__title">
    {card.nameRU !== null ? card.nameRU : card.nameEN}
  </h2>
  <p className="card__duration">{`${hoursSetUp()}ч ${minutesSetUp()}м`}</p>
</div>
{location.pathname === "/movies" ? (
  <button
    className="card__button card__button_type_save"
    type="button"
    aria-label="Сохранить в избранное"
  ></button>
) : (
  <button
    className="card__button card__button_type_delete"
    type="button"
    aria-label="Удалить из избранного"
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
 */
}
