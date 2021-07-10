import React from "react";

import "./SearchForm.css";
import { useFormWithValidation } from "../../hooks/useForm";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  //обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    resetFrom();

  }


  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form"
              noValidate
              onSubmit={handleSubmit}>
          <input
            className="search-form__search-input"
            id="search-input"
            type="search"
            name="search"
            placeholder="Фильм"
            autoComplete="off"
            required
            value={values.search || ""}
            onChange={handleChange}
          />
          <span
            className="login-page__input-error"
            id="input-singup-email-error"
          >
            {errors.search ? "Введите e-mail " : " "}
          </span>
          <button className="button search-form__button" type="submit"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
