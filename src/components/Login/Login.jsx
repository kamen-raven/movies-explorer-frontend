import React, { useState } from "react";
import AuthPage from '../AuthPage/AuthPage';

import './Login.css';

function Login({ onLogin }) {
  //начальные значения данных инпутов
  const initialData = {
    email: '',
    password: ''
  };
  //стейт данных пользователя
  const [data, setData] = useState(initialData);

  //обработчик инпута
  function handleInputChange(event) {
    const { name, value } = event.target;
    setData(data => ({
      ...data,
      [name]: value
    }));
  }

  //обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(data)
  }

  return (
    <AuthPage name="login"
              title="Рады видеть!"
              buttonText="Войти"
              linkText="Ещё не зарегистрированы?"
              link="Регистрация"
              patch="/signup"
              onSubmit={handleSubmit} >
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
          required
          value={data.email}
          onChange={handleInputChange} />
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
          required
          value={data.password}
          onChange={handleInputChange} />
        <span className="login-page__input-error"
          id="input-singup-pass-error">Тут будет отображаться ошибка валидации
        </span>
      </fieldset>
    </AuthPage>
  )
}

export default Login;
