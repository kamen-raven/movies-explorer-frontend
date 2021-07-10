import React from 'react';

import './SavedMoviesSearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SavedMoviesSearchForm(props) {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input className="search-form__search-input"
                id="search-input"
                type="search"
                name="search"
                placeholder="Найти сохранённый фильм"
                autoComplete="off"
                required>
          </input>
          <button className="button search-form__button"
                  type="submit">
          </button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SavedMoviesSearchForm;
