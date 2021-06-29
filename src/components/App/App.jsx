// импорт реакт-компонентов
import React/* , { useState, useEffect, useCallback }  */from 'react';
import { Route, Switch } from 'react-router-dom';

// импорт стилей
import './App.css'

// импорт вспомогательных компонентов

// импорт компонентов страниц
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import PageNoFound from '../PageNoFound/PageNoFound';

import Register from '../Register/Register';
import Login from '../Login/Login';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';


function App() {

  return (
    <div className="page">
      <Switch>
        <Route exact path="/"> {/* главная */}
          <Main />
        </Route>
        <Route path="/movies"> {/* фильмы */}
          <Header />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies"> {/* сохраненные фильмы */}
          <Header />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile"> {/* профиль */}
          <Header />
          <Profile />
        </Route>
        <Route path="/signup"> {/* регистрация */}
          <Register />
        </Route>
        <Route path="/signin"> {/* вход */}
          <Login />
        </Route>
        <Route path="*"> {/* страница 404 */}
          <PageNoFound />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
