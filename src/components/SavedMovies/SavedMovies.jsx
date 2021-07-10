import React from 'react';

import './SavedMovies.css';

import SavedMoviesSearchForm from '../SavedMoviesSearchForm/SavedMoviesSearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
      <main className="content">
        <SavedMoviesSearchForm />
        <MoviesCardList />
        <Footer />
      </main>
  )
}



export default SavedMovies;
