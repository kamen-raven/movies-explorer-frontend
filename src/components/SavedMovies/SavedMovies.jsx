import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
      <main className="content">
        <SearchForm />
        <MoviesCardList />
        <Footer />
      </main>
  )
}



export default SavedMovies;
