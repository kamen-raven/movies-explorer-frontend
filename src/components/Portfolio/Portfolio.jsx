// импорт реакт-компонентов
import React from 'react';

import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className="portfolio container">
      <h3 className="portfolio__title">
        Портфолио
      </h3>
      <div className="portfolio__container">
        <ul className="list list_place_portfolio">
          <li className="portfolio__links">
            <a className="link portfolio__link"
              href="https://github.com/kamen-raven/how-to-learn.git"
              target="_blank"
              rel="noreferrer">
              Статичный сайт
                </a>
          </li>
          <li className="portfolio__links">
            <a className="link portfolio__link"
              href="https://github.com/kamen-raven/russian-travel.git"
              target="_blank"
              rel="noreferrer">
              Адаптивный сайт
                </a>
          </li>
          <li className="portfolio__links">
            <a className="link portfolio__link"
              href="https://github.com/kamen-raven/react-mesto-api-full.git"
              target="_blank"
              rel="noreferrer">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;
