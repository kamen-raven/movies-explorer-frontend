// импорт реакт-компонентов
import React from 'react';

import './Techs.css';

function Techs(props) {
  return (
    <section className="techs" id="techs">
      <div className="container">
        <div className="container__subtitle container__subtitle_place_techs">
          <h3 className="subtitle">
            Технологии
          </h3>
        </div>
          <h2 className="title title_place_techs">
            7 технологий
          </h2>
          <p className="techs__paragraph">
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте
          </p>
          <ul className="tehcs__grid-container">
            <li className="techs__grid-cell techs__cell-text">
              HTML
            </li>
            <li className="techs__grid-cell techs__cell-text">
              CSS
            </li>
            <li className="techs__grid-cell techs__cell-text">
              JS
            </li>
            <li className="techs__grid-cell techs__cell-text">
              React
            </li>
            <li className="techs__grid-cell techs__cell-text">
              Git
            </li>
            <li className="techs__grid-cell techs__cell-text">
              Express.js
            </li>
            <li className="techs__grid-cell techs__cell-text">
              mongoDB
            </li>
          </ul>
      </div>
    </section>
  )
}

export default Techs;
