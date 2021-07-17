import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm(props) {
  const handleInputChange = (event) => {
    props.setInputValue(event.target.value);
  };

  return (
    <form
      className="search-form"
      name="Поиск"
      noValidate
      onSubmit={props.handleFormSubmit}
    >
      <input
        className="search-form__input"
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
      <FilterCheckbox
        filterCheckbox={props.filterCheckbox}
        setFilterChechbox={props.setFilterChechbox}
      />
    </form>
  );
}

export default SearchForm;
