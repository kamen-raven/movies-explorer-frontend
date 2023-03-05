import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import { useFormWithValidation } from "../../hooks/useForm";

import "./Register.css";

function Register({ onRegister, isInfoVisible, isAuthSucces, isLoading }) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();

  //обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    resetFrom();
    onRegister(values);
  }

  return (
    <AuthPage
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      linkText="Уже зарегистрированы?"
      link="Войти"
      patch="/signin"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isInfoVisible={isInfoVisible}
      isInfoSucces={isAuthSucces}
      isLoading={isLoading}
    >
      <fieldset className="register-page__fieldset">
        <label className="register-page__label" htmlFor="input-singup-username">
          Имя
        </label>
        <input
          className="register-page__input register-page__input_singup_username"
          id="input-singup-username"
          type="text"
          name="username"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          required
          pattern="[\sA-Za-zА-Яа-яЁё-]{2,30}"
          value={values.username || ""}
          onChange={handleChange}
        />
        <span
          className="register-page__input-error"
          id="input-singup-username-error"
        >
          {errors.username ? "Введите имя пользователя" : " "}
        </span>
        <label className="register-page__label" htmlFor="input-singup-email">
          E-mail
        </label>
        <input
          className="register-page__input register-page__input_singup_email"
          id="input-singup-email"
          type="email"
          name="email"
          autoComplete="off"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span
          className="register-page__input-error"
          id="input-singup-email-error"
        >
          {errors.email ? "Введите e-mail " : " "}
        </span>
        <label className="register-page__label" htmlFor="input-singup-pass">
          Пароль
        </label>
        <input
          className="register-page__input register-page__input_singup_password"
          id="input-singup-pass"
          type="password"
          name="password"
          minLength="8"
          autoComplete="off"
          required
          pattern="[\s0-9A-Za-zА-Яа-яЁё!?_\-@#$%^&.,*/]{8,}"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span
          className="register-page__input-error"
          id="input-singup-pass-error"
        >
          {errors.password ? "Пароль должен содержать не менее 8 символов" : " "}
        </span>
      </fieldset>
    </AuthPage>
  );
}

export default Register;
