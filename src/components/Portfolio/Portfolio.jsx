// импорт реакт-компонентов
import React from 'react';

function Portfolio(props) {
  return (
    <section className="portfolio container">
      <h3 className="portfolio__title">
        Портфолио
      </h3>
      <div className="portfolio__container">
        <ul class="list list_place_portfolio">
          <li class="portfolio__links">
            <a class="link portfolio__link"
              href="https://github.com/kamen-raven/how-to-learn.git"
              target="_blank">
              Статичный сайт
                </a>
          </li>
          <li class="portfolio__links">
            <a class="link portfolio__link"
              href="https://github.com/kamen-raven/russian-travel.git"
              target="_blank">
              Адаптивный сайт
                </a>
          </li>
          <li class="portfolio__links">
            <a class="link portfolio__link"
              href="https://github.com/kamen-raven/react-mesto-api-full.git"
              target="_blank">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;
