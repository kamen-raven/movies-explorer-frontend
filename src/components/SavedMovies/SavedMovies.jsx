import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <main className="content">
      <section className="movies__search">
        <div className="movies__search-container">
          <SearchForm
            placeholder={"Сохраненные фильмы"}
            errorMessageSearchForm={props.errorMessage}
            handleFormSubmit={props.handleFormSubmit}
            inputValue={props.valueSearchMovies}
          />
          <FilterCheckbox />
        </div>
      </section>



      <MoviesCardList
        errorMessageCardList={props.errorMessage}
        searchResult={props.searchedCards}
      />
      <Footer />
    </main>
  )
}



export default SavedMovies;
