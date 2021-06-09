import React, { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";

function Register(props) {

  return (
    <AuthPage name="register"
              title="Добро пожаловать!"
              buttonText="Зарегистрироваться"
              linkText="Уже зарегистрированы?"
              link="Войти"
              patch="/signin">
      <fieldset className="register-page__fieldset">
        <label className="register-page__label" htmlFor="input-singup-username">
          Имя
        </label>
        <input
          className="register-page__input register-page__input_singup_username"
          id="input-singup-username"
          type="username"
          name="username"
          autoComplete="off"
          required
        />
        <span
          className="register-page__input-error"
          id="input-singup-username-error"
        ></span>
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
        />
        <span
          className="register-page__input-error"
          id="input-singup-email-error"
        ></span>
        <label className="register-page__label" htmlFor="input-singup-pass">
          Пароль
        </label>
        <input
          className="register-page__input register-page__input_singup_password"
          id="input-singup-pass"
          type="password"
          name="password"
          minLength="3"
          maxLength="20"
          autoComplete="off"
          required
        />
        <span
          className="register-page__input-error"
          id="input-singup-pass-error"
        ></span>
      </fieldset>
    </AuthPage>
  );
}

export default Register;
