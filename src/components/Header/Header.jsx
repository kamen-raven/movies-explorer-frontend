// импорт реакт-компонентов
import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <Switch>
      {/* Заглавная страница - лэндинг */}
      <Route exact path="/">
        <header className="header header_theme_dark">
          <div className="header__container container">
            <Link className="header__logo"
                  to="/"
                  aria-label="Главная страница" />
            <ul className="list list_place_header">
              <li className="header__links">
                <Link className="link header__link header__link_theme_dark"
                      to="/signup">
                  Регистрация
              </Link>
              </li>
              <li className="header__links">
                <Link className="link header__link header__link_type_button "
                      to="/signin">
                  Войти
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </Route>
      {/* Страницы с карточками фильмов, сохраненными фильмами и профилем пользователя */}
      <Route path={["/movies", "/saved-movies", "/profile"]}>
        <header className="header">
          <div className="header__container container">
            <Link className="header__logo"
                  to="/"
                  aria-label="Главная страница" />

            <nav className="header__nav">


              <NavLink className="link header__link "
                to="/movies">
                Фильмы
              </NavLink>

              <NavLink className="link header__link"
                to="/saved-movies">
                Сохранённые фильмы
                </NavLink>

            </nav>
            <Link className="header__logo"
              to="/"
              aria-label="Главная страница" />
          </div>
        </header>
      </Route>
      {/* Страницы регистрации и входа */}
      <Route path={["/signin", "/signup"]}>
        <header className="header">

        </header>
      </Route>
    </Switch>

  )
}

export default Header;
