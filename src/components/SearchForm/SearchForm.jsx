import React from 'react';

import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm(props) {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input className="search-form__search-input"
                id="search-input"
                type="search"
                name="search"
                placeholder="Фильм"
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

export default SearchForm;
