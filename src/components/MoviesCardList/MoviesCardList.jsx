import React from "react";

import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";
import initialCards from '../../utils/data';



function MoviesCardList(props) {
/*   const movieDataList = JSON.parse(initialCards); */

  return (
    <section className="cards">
      <div className="cards__container ">
        <div className="cards__list">
          {initialCards.map((card) => (
            <MoviesCard
              card={card}
              key={card.id} />
/*               onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} */
          ))}
        </div>
        <button className="button cards__button-more">Ещё</button>
      </div>
      <div className="cards__container cards__empty-page cards__container_hidden">
        <h3 className="cards__empty-info">Ищите и найдёте</h3>
      </div>
    </section>
  );
}

export default MoviesCardList;
