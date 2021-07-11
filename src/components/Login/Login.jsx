import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import { useFormWithValidation } from "../../hooks/useForm";

import "./Login.css";

function Login({ onLogin, isInfoVisible, isAuthSucces }) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();

  //обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    resetFrom();
    onLogin(values);
  }

  return (
    <AuthPage
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      linkText="Ещё не зарегистрированы?"
      link="Регистрация"
      patch="/signup"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isInfoVisible={isInfoVisible}
      isInfoSucces={isAuthSucces}
    >
      <fieldset className="login-page__fieldset">
        <label className="login-page__label" htmlFor="input-singup-email">
          E-mail
        </label>
        <input
          className="login-page__input login-page__input_singup_email"
          id="input-singup-email"
          type="email"
          name="email"
          autoComplete="off"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="login-page__input-error" id="input-singup-email-error">
          {errors.email ? "Введите e-mail " : " "}
        </span>
        <label className="login-page__label" htmlFor="input-singup-pass">
          Пароль
        </label>
        <input
          className="login-page__input login-page__input_singup_password "
          id="input-singup-pass"
          type="password"
          name="password"
          minLength="3"
          autoComplete="off"
          required
          pattern="[\s0-9A-Za-zА-Яа-яЁё!?_\-@#$%^&.,*/]{8,}"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="login-page__input-error" id="input-singup-pass-error">
          {errors.password ? "Введите пароль" : " "}
        </span>
      </fieldset>
    </AuthPage>
  );
}

export default Login;
