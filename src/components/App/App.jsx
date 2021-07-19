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
import { stateSavedShordMovies } from "../../utils/searchUtils";

function App() {
  const history = useHistory();
  const location = useLocation();

  //----------------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ И ВЫХОД-----------------------//
  const [loggedIn, setLoggedIn] = useState(false); //стейт состояния авторизации на сайте
  const [currentUser, setCurretUser] = useState({}); //стейт-переменная данных пользоваетля
  const [isInfoVisible, setIsInfoVisible] = useState(false); //стейт-переменная отображения информации при работе с формами
  const [isInfoSucces, setIsInfoSucces] = useState(""); // стейт сообщения об ошибки

  // обновление данных стейта отображения ошибки при регистрации, авторизации
  useEffect(() => {
    if (location.pathname === "/signup" || "/signin") {
      setIsInfoSucces("");
      setIsInfoVisible(false);
    }
    if (location.pathname === "/signup" && loggedIn) {
      history.push("/movies");
    }
    if (location.pathname === "/signin" && loggedIn) {
      history.push("/movies");
    }
  }, [history, location.pathname, loggedIn]);

  //обработчик регистрации
  function handleRegister({ email, password, username }) {
    return auth
      .register(email, password, username)
      .then((res) => {
        setIsLoading(true)
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
      })
      .finally(() => setIsLoading(false));
  }

  //обработчик авторизации
  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        setIsLoading(true);
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
      })
      .finally(() => setIsLoading(false));
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
          localStorage.clear(); //если токен некорректный - очищаем локальное хранилище
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

  //---------РЕДАКТИРОВАНИЕ ПРОФИЛЯ----------------//
  const [isProfileEdit, setIsProfileEdit] = useState(false); //стейт нажатия кнопки Редактировать

  //задавание стейта текущего пользователя и сохраненных пользователем фильмов
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getCurrentUser(), mainApi.getMovies()])
        .then(([userValue, savedCards]) => {
          setCurretUser(userValue); //отрисовка данных пользователя
          setSavedMovies(savedCards.reverse());
          return savedCards;
        })
        .then((savedCards) => {
          localStorage.setItem("Saved-movie", JSON.stringify(savedCards));
        })
        .catch((error) => {
          localStorage.removeItem("Saved-movie");
          setSavedSearchError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(
            `Хьюстон, у нас проблема при загрузке первоначальной информации: ${error}`
          );
        })
        .finally(() => setIsLoading(false));
    } else {
      setCurretUser({});
    }
  }, [loggedIn]);

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
        setIsLoading(true);
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
      })
      .finally(() => setIsLoading(false));
  }

  //--------------СТРАНИЦА ФИЛЬМОВ MOVIES-------------//
  const [allMovies, setAllMovies] = useState([]); //стейт массива всех фильмов

  const [searchQuery, setSearchQuery] = useState(""); //стейт строки поискового запроса
  const [searchError, setSearchError] = useState(""); //стейт текста ошибки запроса поиска

  const [filterMoviesCards, setFilterMoviesCards] = useState([]); //стейт массива найденных карточек
  const [shortFilterMoviesCards, setShortFilterMoviesCards] = useState([]); //стейт массива короткометражек найденных карточек

  const [isLoading, setIsLoading] = useState(false); //стейт загрузки данных
  const [filterCheckbox, setFilterChechbox] = useState(false); //стейт активного чекбокса коротких фильмов

  // эффект добавления стейта изначальных карточек фильмов
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      loggedIn === true &&
      !localStorage.getItem("BeatFilm-movie")
    ) {
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

  // эффект обновления стейта при повторном заходе
  useEffect(() => {
    if (localStorage.getItem("BeatFilm-movie")) {
      setAllMovies(JSON.parse(localStorage.getItem("BeatFilm-movie")));
    }
  }, []);

  //--------------СТРАНИЦА СОХРАНЕННЫХ ФИЛЬМОВ SAVED-MOVIES-------------//
  const [savedMovies, setSavedMovies] = useState([]); //стейт сохраненных пользователем фильмов
  const [savedShortMovies, setSavedShortMovies] = useState([]); //стейт сохраненных пользователем коротких фильмов

  const [savedSearchQuery, setSavedSearchQuery] = useState(""); //стейт строки поискового запроса сохраненных карточек
  const [savedSearchError, setSavedSearchError] = useState(""); //стейт текста ошибки запроса поиска сохраненных карточек

  const [savedFilterMoviesCards, setSavedFilterMoviesCards] = useState([]); //стейт массива сохраненных карточек
  const [savedShortFilterMoviesCards, setSavedShortFilterMoviesCards] =
    useState([]); //стейт массива короткометражек сохраненных

  // эффект обновления стейта при повторном заходе
  useEffect(() => {
    if (localStorage.getItem("Saved-movie")) {
      const savedMovies = JSON.parse(localStorage.getItem("Saved-movie"));
      setSavedMovies(savedMovies);
      stateSavedShordMovies(savedMovies, setSavedShortMovies);
      setSavedFilterMoviesCards(savedMovies);
      stateSavedShordMovies(savedMovies, setSavedShortFilterMoviesCards);
    }
  }, []);

  function handleMovieSave(movie) {
    mainApi
      .createMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
        console.log(savedMovies);
        return savedMovies;
      })

      .then(() => {
        mainApi
          .getMovies()
          .then((res) => {
            setSavedMovies(res.reverse());
            return res;
          })
          .then((res) => {
            localStorage.setItem("Saved-movie", JSON.stringify(res));
          })
          .catch((error) => {
            localStorage.removeItem("Saved-movie");
            setSavedSearchError(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
            console.log(
              `Хьюстон, у нас проблема при загрузке первоначальной информации: ${error}`
            );
          });
      })

      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при сохранении фильма: ${error}`);
      });
  }

  function handleMovieDelete(movie) {
    // Снова проверяем, являемся ли мы владельцем карточек
    const isOwn = movie.owner === currentUser._id;
    // Отправляем запрос в API и получаем обновлённые данные
    if (isOwn) {
      mainApi
        .deleteMovieById(movie._id)
        .then(() => {
          // Формируем новый массив на основе имеющегося, убирая из него удаленный фильм
          const newCards = savedMovies.filter((item) => item._id !== movie._id);
          // Обновляем стейт
          setSavedMovies(newCards);
        })
        .then(() => {
          mainApi
            .getMovies()
            .then((res) => {
              setSavedMovies(res.reverse());
              return res;
            })
            .then((res) => {
              localStorage.setItem("Saved-movie", JSON.stringify(res));
            });
        })

        .catch((error) => {
          console.log(
            `Хьюстон, у нас проблема при удалении фильма из Сохраненных: ${error}`
          );
        });
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
            //пропсы компонента
            errorMessage={searchError} // сообщение об ошибки
            setErrorMessage={setSearchError} // сет сообщения об ошибки
            valueSearchMovies={searchQuery} //запрос
            setValueSearchMovies={setSearchQuery} // сет запроса
            allCArds={allMovies} //все фильмы
            searchedCards={filterMoviesCards} // отфильтрованные фильмы
            setSearchedCards={setFilterMoviesCards} // сет отфильтрованных фильмов
            searchedShortCards={shortFilterMoviesCards} // отфильтрованные короткие
            setSearchedShortCards={setShortFilterMoviesCards} // сет отфильтрованных которких
            isLoading={isLoading} // загрузка
            filterCheckbox={filterCheckbox} // фильтр коротких
            setFilterChechbox={setFilterChechbox} // сет фильтра коротких
            onMovieSave={handleMovieSave}
            onMovieDelete={handleMovieDelete}
            savedCards={savedMovies} //сохраненные фильмы
          />
          {/* сохраненные фильмы */}
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
            // пропсы компонента
            savedErrorMessage={savedSearchError} // сообщение об ошибки
            setSavedErrorMessage={setSavedSearchError} // сет сообщения об ошибки
            valueSavedSearchMovies={savedSearchQuery} //запрос
            setValueSavedSearchMovies={setSavedSearchQuery} // сет запроса
            savedCards={savedMovies} //сохраненные фильмы
            setSavedCards={setSavedMovies} // сет сохраненных фильмов
            savedShortCards={savedShortMovies}
            setSavedShortCards={setSavedShortMovies}
            searchedSavedCards={savedFilterMoviesCards} // отфильтрованные фильмы
            setSearchedSavedCards={setSavedFilterMoviesCards} // сет отфильтрованных фильмов
            searchedSavedShortCards={savedShortFilterMoviesCards} // отфильтрованные короткие
            setSearchedSavedShortCards={setSavedShortFilterMoviesCards} // сет отфильтрованных которких
            isLoading={isLoading} // загрузка
            filterCheckbox={filterCheckbox} // фильтр коротких
            setFilterChechbox={setFilterChechbox} // сет фильтра коротких
            onMovieDelete={handleMovieDelete}
          />
          {/* профиль */}
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isAuthChecking={authChecking}
            loggedIn={loggedIn}
            // пропсы компонента
            isLoading={isLoading} // загрузка
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
              isLoading={isLoading} // загрузка
              onRegister={handleRegister}
              isInfoVisible={isInfoVisible}
              isAuthSucces={isInfoSucces}
            />
          </Route>
          {/* вход */}
          <Route path="/signin">
            <Login
              isLoading={isLoading} // загрузка
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
