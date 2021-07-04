// импорт реакт-компонентов
import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

// импорт стилей
import "./App.css";

//импорт вспомогательных компонентов
/* import beatfilmMoviesApi from "../../utils/beatfilm-movies-api"; // api получения данных фильмов
import mainApi from "../../utils/movies-explorer-api"; // api сохранения фильмов */
import * as auth from "../../utils/auth-api"; // api регистрации и авторизации
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// импорт компонентов страниц
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import PageNoFound from "../PageNoFound/PageNoFound";

import Register from "../Register/Register";
import Login from "../Login/Login";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  //-----------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ НА САЙТЕ
  //стейт состояния авторизации на сайте
  const [loggedIn, setLoggedIn] = useState(false);
  //стейт емэйла пользователя при авторизации
/*   const [email, setEmail] = useState(""); */
  const history = useHistory();

  //обработчик регистрации
  function handleRegister({ email, password, username }) {
    return auth.register(email, password, username)
      .then((res) => {
        /*         setIsRegistrationSucces(true); //успешное
        setIsInfoTooltipIsOpen(true); */
        history.push('/signin'); //перенаправление на страницу фильмов после успешной регистрации
      })
      .catch((error) => {
        /*         setIsInfoTooltipIsOpen(true);
        setIsRegistrationSucces(false); */
        console.log(
          `Хьюстон, у нас проблема при регистрации пользователя: ${error} - некорректно заполнено одно из полей `
        );
      });
  }

  //обработчик авторизации
  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token); //сохраняем токен в локальное хранилище
        setLoggedIn(true);
/*         setEmail(email); */
        history.push("/movies"); //перенаправление на страницу фильмов
        return res;
      })
      .catch((error) => {
        if (error === "ошибка 400") {
          console.log(
            `Хьюстон, у нас проблема при авторизации пользователя: ${error} - не передано одно из полей`
          );
        } else {
          console.log(
            `Хьюстон, у нас проблема при авторизации пользователя: ${error} - пользователь с email не найден или некорректный ввод пароля`
          );
        }
      });
  }

  //проверка токена пользователя при повторном входе на сайт
  const [authChecking, setAuthChecking] = React.useState(true);
  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthChecking(true);
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
/*             setEmail(res.email); //получаем данные емэйла */
            history.push("/movies");
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          history.push("/singin"); //если токена нет - перенаправляем на Вход
          console.log(
            `Хьюстон, у нас проблема при проверке токена пользователя: ${error} - токен не передан или переданный токен некорректен `
          );
        })
        .finally(() => setAuthChecking(false));
    } else {
      setAuthChecking(false);
    }
  }, [history]);

  //проверяем токен при рендере
  useEffect(() => {
    checkToken();
  }, [checkToken]);

  /*   //выход из профиля
  function handleSignout() {
    localStorage.removeItem("token"); //удаляем токен из локального хранилища
    setEmail("");
    setLoggedIn(false);
    history.push("/");
  } */

  return (
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main /> {/* главная */}
        </Route>

        <ProtectedRoute
          path={["/movies", "/saved-movies", "/profile"]}
          isAuthChecking={authChecking}
          isLoggedIn={loggedIn}
        >
          <Movies />
          <SavedMovies />
          <Profile />
        </ProtectedRoute>

        <Route path="/signup">
          <Register onRegister={handleRegister} /> {/* регистрация */}
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin} checkToken={checkToken} /> {/* вход */}
        </Route>
        <Route path="*">
          <PageNoFound /> {/* страница 404 */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
