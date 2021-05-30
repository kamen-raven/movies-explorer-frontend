// импорт реакт-компонентов
import React/* , { useState, useEffect, useCallback }  */from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

// импорт стилей
import './App.css'

// импорт вспомогательных компонентов

// импорт компонентов страниц
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';







function App() {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">

        </Route>
        <Route path="/saved-movies">
        </Route>
      </Switch>

    </div>
  );
}

export default App;
