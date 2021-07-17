// импорт реакт-компонентов
import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

// импорт стилей
import "./App.css";

// импорт компонентов страниц
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import PageNoFound from "../PageNoFound/PageNoFound";
import Footer from "../Footer/Footer";

import Register from "../Register/Register";
import Login from "../Login/Login";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

//импорт вспомогательных компонентов
import beatfilmMoviesApi from "../../api/beatfilm-movies-api"; // api получения данных фильмов
import mainApi from "../../api/movies-explorer-api"; // api сохранения фильмов
import * as auth from "../../api/auth-api"; // api регистрации и авторизации
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  //-----------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ НА САЙТЕ
  const [loggedIn, setLoggedIn] = useState(false); //стейт состояния авторизации на сайте
  const [currentUser, setCurretUser] = useState({}); //стейт-переменная данных пользоваетля
  const [isInfoVisible, setIsInfoVisible] = useState(false); //стейт-переменная отображения информации при работе с формами
  const [isInfoSucces, setIsInfoSucces] = useState(""); // стейт сообщения об ошибки
  const history = useHistory();
  const location = useLocation();

  //----------------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ И ВЫХОД-----------------------//
  // обновление данных стейта отображения ошибки при регистрации, авторизации
  useEffect(() => {
    if (location.pathname === "/signup" || "/signin") {
      setIsInfoSucces("");
      setIsInfoVisible(false);
    }

    if((location.pathname === "/signup") && loggedIn) {
      history.push("/movies");
    }

    if((location.pathname === "/signin") && loggedIn) {
      history.push("/movies");
    }
  }, [history, location.pathname, loggedIn]);

  //обработчик регистрации
  function handleRegister({ email, password, username }) {
    return auth
      .register(email, password, username)
      .then((res) => {
        localStorage.setItem("token", res.token); //сохраняем токен в локальное хранилище
        handleLogin({ email, password }); //производим авторизацию сразу после регистрации
        setIsInfoSucces("Успех!");
        setIsInfoVisible(true); //успешное
        return res;
      })
      .catch((error) => {
        setIsInfoVisible(true); //неуспешное
        if (error === "ошибка 409") {
          setIsInfoSucces("Пользователь с указанной почтой уже существует");
          console.log(
            `Хьюстон, у нас проблема при регистрации пользователя: ${error} - пользователь с указанной почтой уже существует`
          );
        } else {
          setIsInfoSucces("Что-то пошло не так! Попробуйте ещё раз..");
          console.log(
            `Хьюстон, у нас проблема при регистрации пользователя: ${error} `
          );
        }
      });
  }

  //обработчик авторизации
  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token); //сохраняем токен в локальное хранилище
        setLoggedIn(true);
        setIsInfoSucces("Успех!");
        setIsInfoVisible(true);
        history.push("/movies"); //перенаправление на страницу фильмов
        return res;
      })
      .catch((error) => {
        setIsInfoVisible(true);
        if (error === "ошибка 400") {
          setIsInfoSucces("Что-то пошло не так! Попробуйте ещё раз.."); //неуспешное
          console.log(
            `Хьюстон, у нас проблема при авторизации пользователя: ${error} - не передано одно из полей`
          );
        } else {
          setIsInfoSucces("Неверный ввод почты или пароля");
          console.log(
            `Хьюстон, у нас проблема при авторизации пользователя: ${error} - пользователь с указанной почтой и паролем не найден`
          );
        }
      });
  }

  //проверка токена пользователя при повторном входе на сайт
  const [authChecking, setAuthChecking] = React.useState(true); //стейт загрузки данных для отображения прелоадера в ПротектРоуте
  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthChecking(true);
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          //setCurretUser(res);
        })
        .catch((error) => {
          localStorage.removeItem("token"); //если токен некорректный - очищаем локальное хранилище
          sessionStorage.clear();
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
    localStorage.removeItem("BeatFilm-movie");
    sessionStorage.clear();
    setSearchQuery("");
    setSearchError("");
    setLoggedIn(false);
    history.push("/");
  }

  //задавание стейта текущего пользователя
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getCurrentUser()
        .then((res) => {
          setCurretUser(res); //отрисовка данных пользователя
        })
        .catch((error) => {
          console.log(
            `Хьюстон, у нас проблема при загрузке первоначальной информации: ${error}`
          );
        });
    } else {
      setCurretUser({});
    }
  }, [loggedIn]);

  //---------РЕДАКТИРОВАНИЕ ПРОФИЛЯ----------------//
  const [isProfileEdit, setIsProfileEdit] = useState(false); //стейт нажатия кнопки Редактировать
  // обновление данных стейта отображения ошибки при редактировании профиля
  useEffect(() => {
    if (location.pathname === "/profile") {
      setIsInfoSucces("");
      setIsInfoVisible(false);
      setIsProfileEdit(false);
    }
  }, [location.pathname]);

  //изменение данных пользователя
  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data)
      .then((res) => {
        setCurretUser(res);
        setIsInfoSucces("Успех!");
        setIsInfoVisible(true); //успешное
        setIsProfileEdit(false);
      })
      .catch((error) => {
        setIsInfoVisible(true); //неуспешное
        setIsProfileEdit(true);
        if (error === "Ошибка 409") {
          setIsInfoSucces("Пользователь с указанной почтой уже существует");
          console.log(
            `Хьюстон, у нас проблема при обновлении информации пользователя: ${error} - пользователь с указанной почтой уже существует`
          );
        } else {
          setIsInfoSucces("Что-то пошло не так! Попробуйте ещё раз..");
          console.log(
            `Хьюстон, у нас проблема при обновлении информации пользователя: ${error} `
          );
        }
      });
  }

  //--------------СТРАНИЦА ФИЛЬМОВ-------------//
  const [allMovies, setAllMovies] = useState([]); //стейт массива всех фильмов

  const [searchQuery, setSearchQuery] = useState(""); //стейт строки поискового запроса
  const [searchError, setSearchError] = useState(""); //стейт текста ошибки запроса поиска
  const [filterMoviesCards, setFilterMoviesCards] = useState([]); //стейт массива найденных карточек

  const [isLoading, setIsLoading] = useState(false); //стейт загрузки данных

  const [filterCheckbox, setFilterChechbox] = useState(false);



  // эффект добавления стейта изначальных карточек фильмов
  useEffect(() => {
    if (location.pathname==="/movies" && loggedIn === true && !localStorage.getItem("BeatFilm-movie")) {
      setIsLoading(true);
      return beatfilmMoviesApi
        .getBeatfilmMovies()
        .then((res) => {
          localStorage.setItem("BeatFilm-movie", JSON.stringify(res));
          return res;
        })
        .then((res) => {
          setAllMovies(res);
        })
        .catch((error) => {
          localStorage.removeItem("BeatFilm-movie");
          setSearchError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(
            `Хьюстон, у нас проблема при получении списка фильмов: ${error}`
          );
        })
        .finally(() => setIsLoading(false));
    }
  }, [location.pathname, loggedIn]);

  useEffect(() => {
    if (localStorage.getItem("BeatFilm-movie")) {
      setAllMovies(JSON.parse(localStorage.getItem("BeatFilm-movie")));
    }
  }, []);

  //функция поиска фильмов
  function searchMovies(items) {
    return items.filter((item) => {
      if(filterCheckbox===true) {   // поиск с условием
        setSearchError("");
        return item.nameRU
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
          item.duration <= 40
      } else {
        setSearchError("");
        return item.nameRU
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
    });
  }

  // проверка результатов поиска
  function checkSearchAnswerNotEmpty() {
    const foundMovies = searchMovies(allMovies); //делаем поиск по массиву всех фильмов из LS
    if (foundMovies.length === 0) {
      //если ничего не найдено
      setFilterMoviesCards([]); //то в фильтрованный стейт ничего не передается
      sessionStorage.removeItem("Search-query");
      sessionStorage.removeItem("Filter-cards");
      return setSearchError("Ничего не найдено");
    } else {
      sessionStorage.setItem("Search-query", searchQuery);
      setFilterMoviesCards(foundMovies);
    }
    sessionStorage.setItem("Filter-cards", JSON.stringify(foundMovies));
  }


/*   function checkboxFilterSearch() {
    if (filterCheckbox === true) {
      return filterMoviesCards.filter((card) => {
        return card.duration <= 40;
      })
    }
  }
 */
  //обработчик отправки формы поиска
  function handleSearchFormSumbit(event) {
    event.preventDefault();
    if (searchQuery === "") {
      setFilterMoviesCards([]);
      sessionStorage.removeItem("Search-query");
      sessionStorage.removeItem("Filter-cards");
      setSearchError("Нужно ввести ключевое слово");
      return searchError;
    } else {
      checkSearchAnswerNotEmpty();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogged={loggedIn} setIsLogged={setLoggedIn} />
        <Switch>
          {/* главная */}
          <Route exact path="/">
            <Main />
          </Route>
          {/* фильмы */}
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
            handleFormSubmit={handleSearchFormSumbit}
            errorMessage={searchError}
            valueSearchMovies={searchQuery}
            setValueSearchMovies={setSearchQuery}
            searchedCards={filterMoviesCards}
            setSearchedCards={setFilterMoviesCards}
            isLoading={isLoading}
            filterCheckbox={filterCheckbox}
            setFilterChechbox={setFilterChechbox}
          />
          {/* сохраненные фильмы */}
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
          />
          {/* профиль */}
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
            onSignOut={handleSignout}
            isInfoVisible={isInfoVisible}
            isSucces={isInfoSucces}
            onUpdateUser={handleUpdateUser}
            isProfileEdit={isProfileEdit}
            setIsProfileEdit={setIsProfileEdit}
          />

          {/* регистрация */}
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              isInfoVisible={isInfoVisible}
              isAuthSucces={isInfoSucces}
            />
          </Route>
          {/* вход */}
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isInfoVisible={isInfoVisible}
              isAuthSucces={isInfoSucces}
            />
          </Route>
          {/* страница 404 */}
          <Route path="*">
            <PageNoFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
