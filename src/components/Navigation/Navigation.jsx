// импорт реакт-компонентов
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';

function Navigation({ open, setOpen, buttonClose }) {
  return (
    <div className={`navigation ${open ? 'navigation_is-opened' : ''}`}
    onClick={() => setOpen(false)}>
      <div className="navigation__background"></div>
      <div className="navigation__container"
      onClick={e => e.stopPropagation()}>
        <button
          className="button navigation__close-button"
          onClick={buttonClose}
        ></button>
        <div className="navigation__wrapper">
          <nav className="navigation__nav">
            <NavLink
              exact
              to="/"
              activeClassName="navigation__nav-link_active"
              className="link navigation__nav-link"
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              activeClassName="navigation__nav-link_active"
              className="link navigation__nav-link"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="navigation__nav-link_active"
              className="link navigation__nav-link"
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <Link
            to="/profile"
            className="link navigation__profile-link navigation__profile-button"
          >
            <span className="navigation__profile-icon"></span>
            Аккаунт
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navigation
