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
            <Link to="/"
                  className="logo logo_place_main"
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
            <Link to="/"
                  className="logo logo_place_main"
                  aria-label="Главная страница" />
            <nav className="header__nav">
              <NavLink to="/movies"
                      className="link header__nav-link"
                      activeClassName="header__nav-link_active">
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies"
                      className="link header__nav-link"
                      activeClassName="header__nav-link_active">
                Сохранённые фильмы
                </NavLink>
            </nav>

              <Link to="/profile"
                    className="link header__profile-link header__profile-button"
                    activeClassName="header__profile-button_active">
                      <span className="heder__profile-icon"></span>
                      Аккаунт
              </Link>

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
