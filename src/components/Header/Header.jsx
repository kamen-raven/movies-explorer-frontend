// импорт реакт-компонентов
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, NavLink, useLocation } from "react-router-dom";

import "./Header.css";

import Navigation from "../Navigation/Navigation";

function Header(props) {
  const location = useLocation();
  const [isNavigationOpen, setNavigationOpen] = useState(false);

  function toggleNavigation() {
    setNavigationOpen(!isNavigationOpen);
  }

  useEffect(() => { // если нет авторизации, то отображаем хэдер для регистрации
    if (!localStorage.getItem('token')) {
      props.setIsLogged(false)
    }
  }, [location.pathname, props]);

  useEffect(() => {  // закрываем навигацию после перехода на новую страницу
    setNavigationOpen(false)
    }, [location.pathname]);



  return (
    <Switch>
      {!props.isLogged ? (
        <Route exact path="/">
          <header className="header header_theme_dark">
            <div className="header__container container">
              <Link
                to="/"
                className="logo logo_place_main"
                aria-label="Главная страница"
              />
              <ul className="list list_place_header">
                <li className="header__links">
                  <Link
                    className="link header__link header__link_theme_dark"
                    to="/signup"
                  >
                    Регистрация
                  </Link>
                </li>
                <li className="header__links">
                  <Link
                    className="link header__link header__link_type_button "
                    to="/signin"
                  >
                    Войти
                  </Link>
                </li>
              </ul>
            </div>
          </header>
        </Route>
      ) : (
        /* Страницы с карточками фильмов, сохраненными фильмами и профилем пользователя */
        <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
          <header
            className={`header ${
              location.pathname === "/" && "header_theme_dark"
            }`}
          >
            <div className="header__container container">
              <Link
                to="/"
                className="logo logo_place_main"
                aria-label="Главная страница"
              />
              <div className="header__wrapper">
                <nav className="header__nav">
                  <NavLink
                    to="/movies"
                    activeClassName="header__nav-link_active"
                    className={`link header__nav-link ${
                      location.pathname === "/" && "header__nav-link_theme_dark"
                    }`}
                  >
                    Фильмы
                  </NavLink>
                  <NavLink
                    to="/saved-movies"
                    activeClassName="header__nav-link_active"
                    className={`link header__nav-link ${
                      location.pathname === "/" && "header__nav-link_theme_dark"
                    }`}
                  >
                    Сохранённые фильмы
                  </NavLink>
                </nav>

                <Link
                  to="/profile"
                  className={`link header__profile-link header__profile-button ${
                    location.pathname === "/" &&
                    "header__profile-button_theme_dark header__profile-link_theme_dark"
                  }`}
                >
                  <span
                    className={`header__profile-icon ${
                      location.pathname === "/" &&
                      "header__profile-icon_theme_dark"
                    }`}
                  ></span>
                  Аккаунт
                </Link>
              </div>
              <button
                className={`button header__burger-button ${
                  location.pathname === "/" &&
                  "header__burger-button_theme_dark"
                }`}
                onClick={toggleNavigation}
                aria-label="Меню"
                type="button"
              ></button>
            </div>
          </header>
          <Navigation
            open={isNavigationOpen}
            setOpen={setNavigationOpen}
            buttonClose={toggleNavigation}
          />
        </Route>
      )}
    </Switch>
  );
}

export default Header;
