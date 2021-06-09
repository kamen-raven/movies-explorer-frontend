// импорт реакт-компонентов
import React/* , { useState, useEffect, useCallback }  */from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

// импорт стилей
import './App.css'

// импорт вспомогательных компонентов

// импорт компонентов страниц
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import Footer from '../Footer/Footer';
import PageNoFound from '../PageNoFound/PageNoFound';

import Register from '../Register/Register';
import Login from '../Login/Login';




function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/"> {/* главная */}
          <Header />
          <LandingPage />
          <Footer />
        </Route>
        <Route path="/movies"> {/* фильмы */}
          <Header />

          <Footer />
        </Route>
        <Route path="/saved-movies"> {/* сохраненные фильмы */}
          <Header />

          <Footer />
        </Route>
        <Route path="/profile"> {/* профиль */}
          <Header />
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
