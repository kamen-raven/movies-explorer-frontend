// импорт реакт-компонентов
import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

// импорт стилей
import "./App.css";

// импорт компонентов страниц
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import PageNoFound from "../PageNoFound/PageNoFound";

import Register from "../Register/Register";
import Login from "../Login/Login";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

//импорт вспомогательных компонентов
import beatfilmMoviesApi from "../../utils/beatfilm-movies-api"; // api получения данных фильмов
import mainApi from "../../utils/movies-explorer-api"; // api сохранения фильмов
import * as auth from "../../utils/auth-api"; // api регистрации и авторизации
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  //-----------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ НА САЙТЕ
  const [loggedIn, setLoggedIn] = useState(false); //стейт состояния авторизации на сайте
  const [currentUser, setCurretUser] = useState({}); //стейт-переменная данных пользоваетля
  const [isAuthInfoVisible, setIsAuthInfoVisible] = useState(false);
  const [isAuthInfoSucces, setIsAuthInfoSucces] = useState('');
  const history = useHistory();

  //обработчик регистрации
  function handleRegister({ email, password, username }) {
    return auth.register(email, password, username)
      .then((res) => {
        localStorage.setItem("token", res.token); //сохраняем токен в локальное хранилище
        //setCurretUser({ email, username }); //задаем данные текущего пользователя
        handleLogin({ email, password }); //производим авторизацию сразу после регистрации
        setIsAuthInfoSucces('Успех!');
        setIsAuthInfoVisible(true); //успешное
        return res;
      })
      .catch((error) => {
        setIsAuthInfoVisible(true); //неуспешное
        if (error === "ошибка 409") {
          setIsAuthInfoSucces("Пользователь с указанной почтой уже существует");
          console.log(
            `Хьюстон, у нас проблема при регистрации пользователя: ${error} - пользователь с указанной почтой уже существует`
          );
        } else {
          setIsAuthInfoSucces("Что-то пошло не так! Попробуйте ещё раз..")
          console.log(
            `Хьюстон, у нас проблема при регистрации пользователя: ${error} `
          );
        }
      })
      .finally(() => {
/*         setIsAuthInfoSucces('');
        setIsAuthInfoVisible(false); */
      })
  }

  //обработчик авторизации
  function handleLogin({ email, password }) {
    return auth.login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token); //сохраняем токен в локальное хранилище
        setLoggedIn(true);
        setIsAuthInfoSucces('Успех!');
        setIsAuthInfoVisible(true);
        history.push("/movies"); //перенаправление на страницу фильмов
        return res;
      })
      .catch((error) => {
        setIsAuthInfoVisible(true);
        if (error === "ошибка 400") {
          setIsAuthInfoSucces("Что-то пошло не так! Попробуйте ещё раз.."); //неуспешное
          console.log(
            `Хьюстон, у нас проблема при авторизации пользователя: ${error} - не передано одно из полей`
          );
        } else {
          setIsAuthInfoSucces("Неверный ввод почты или пароля")
          console.log(
            `Хьюстон, у нас проблема при авторизации пользователя: ${error} - пользователь с указанной почтой и паролем не найден`
          );
        }
      })
      .finally(() => {
/*       setIsAuthInfoSucces('');
      setIsAuthInfoVisible(false); */
    })
  }

  //проверка токена пользователя при повторном входе на сайт
  const [authChecking, setAuthChecking] = React.useState(true); //стейт загрузки данных для отображения прелоадера в ПротектРоуте
  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthChecking(true);
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          //setCurretUser(res);
        })
        .catch((error) => {
          localStorage.removeItem("token"); //если токен некорректный - очищаем локальное хранилище
          history.push("/"); //если токена нет - перенаправляем на главную
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

  //выход из профиля
  function handleSignout() {
    localStorage.removeItem("token"); //удаляем токен из локального хранилища
    setLoggedIn(false);
    history.push("/");
  }

  //--------------СТРАНИЦА ФИЛЬМОВ-------------//
  useEffect(() => {
    if (loggedIn) {
      mainApi.getCurrentUser()
      .then((res) => {
        setCurretUser(res);  //отрисовка данных пользователя

      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при загрузке первоначальной информации: ${error}`)
      })
    } else {
      setCurretUser({})
    }
  }, [loggedIn]);





  const [isProfileEdit, setIsprofileEdit] = useState(false); //стейт нажатия кнопки Редактировать






  //изменение данных пользователя
  function handleUpdateUser(data) {
    mainApi.editUserInfo(data)
      .then((res) => {
        setCurretUser(res);
        setIsAuthInfoSucces('Успех!');
        setIsAuthInfoVisible(true); //успешное
        setIsprofileEdit(false)
      })
/*       .then(() => {

        //setIsAuthInfoSucces('');
        //setIsAuthInfoVisible(false);
      }) */
      .catch((error) => {
        setIsAuthInfoVisible(true); //неуспешное
        setIsprofileEdit(true);
        if (error === "Ошибка 409") {
          setIsAuthInfoSucces("Пользователь с указанной почтой уже существует");
          console.log(
            `Хьюстон, у нас проблема при обновлении информации пользователя: ${error} - пользователь с указанной почтой уже существует`
          );
        } else {
          setIsAuthInfoSucces("Что-то пошло не так! Попробуйте ещё раз..")
          console.log(
            `Хьюстон, у нас проблема при обновлении информации пользователя: ${error} `
          );
        }
      })
      .finally(() => {
/*       setIsAuthInfoSucces('');
      setIsAuthInfoVisible(false); */
      })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogged={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main /> {/* главная */}
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
            onSignOut={handleSignout}
            isInfoVisible={isAuthInfoVisible}
            isSucces={isAuthInfoSucces}
            onUpdateUser={handleUpdateUser}
            setIsAuthInfoSucces={setIsAuthInfoSucces}
            setIsAuthInfoVisible={setIsAuthInfoVisible}
            isProfileEdit={isProfileEdit}
            setIsprofileEdit={setIsprofileEdit}
          />
          <Route path="/signup">
            <Register onRegister={handleRegister}
                      isInfoVisible={isAuthInfoVisible}
                      isAuthSucces={isAuthInfoSucces}  /> {/* регистрация */}
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin}
                  isInfoVisible={isAuthInfoVisible}
                  isAuthSucces={isAuthInfoSucces}  /> {/* вход */}
          </Route>
          <Route path="*">
            <PageNoFound /> {/* страница 404 */}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
