import React from 'react';
import AuthPage from '../AuthPage/AuthPage';

import './Login.css';

function Login(props) {
  //начальные значения данных инпутов

  return (
    <AuthPage name="login"
              title="Рады видеть!"
              buttonText="Войти"
              linkText="Ещё не зарегистрированы?"
              link="Регистрация"
              patch="/signup">
      <fieldset className="login-page__fieldset">
        <label className="login-page__label"
          htmlFor="input-singup-email">
          E-mail
      </label>
        <input className="login-page__input login-page__input_singup_email"
          id="input-singup-email"
          type="email"
          name="email"
          autoComplete="off"
          required />
        <span className="login-page__input-error"
          id="input-singup-email-error">Тут будет отображаться ошибка валидации
        </span>
        <label className="login-page__label"
          htmlFor="input-singup-pass">
          Пароль
      </label>
        <input className="login-page__input login-page__input_singup_password"
          id="input-singup-pass"
          type="password"
          name="password"
          minLength="3"
          maxLength="20"
          autoComplete="off"
          required />
        <span className="login-page__input-error"
          id="input-singup-pass-error">Тут будет отображаться ошибка валидации
        </span>
      </fieldset>
    </AuthPage>
  )
}

export default Login;
