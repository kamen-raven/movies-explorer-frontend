import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm(props) {
  const handleInputChange = (event) => {
    props.setInputValue(event.target.value);
  };

  return (
    <section className="search-form container">
      <div className="search-form__container">
        <form
          className="search-form__form"
          name="Поиск"
          noValidate
          onSubmit={props.handleFormSubmit}
        >
          <input
            className="search-form__search-input"
            id="search-input"
            type="search"
            name="search"
            placeholder={props.placeholder}
            autoComplete="off"
            required
            value={props.inputValue || ""}
            onChange={handleInputChange}
          />
          <button className="button search-form__button" type="submit"></button>
        </form>
        <FilterCheckbox
          filterCheckbox={props.filterCheckbox}
          setFilterChechbox={props.setFilterChechbox}
        />
      </div>
    </section>
  );
}

export default SearchForm;
