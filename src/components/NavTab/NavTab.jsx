// импорт реакт-компонентов
import React from 'react';

function NavTab(props) {
  return (
    <section className="nav">
      <div className="container">
        <ul className="list list_place_nav">
          <li className="nav__links">
            <a className="link nav__link"
              href="#about">
              О проекте
          </a>
          </li>
          <li className="nav__links">
            <a className="link nav__link"
              href="#techs">
              Технологии
          </a>
          </li>
          <li className="nav__links">
            <a className="link nav__link"
              href="#student">
              Студент
          </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default NavTab;
