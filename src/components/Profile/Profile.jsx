import React  from "react";

import './Profile.css';

function Profile(props) {
  return (
    <div className="page">
      <section className="profile-page">
        <div className="profile-page__container">
          <form className="profile-page__form" name={props.name} noValidate>
            <h2 className="profile-page__title">Привет, currentUser.name!</h2>
            <fieldset className="profile-page__fieldset">
              <label className="profile-page__label" htmlFor="input-name">
                Имя
              </label>
              <input
                className="profile-page__input profile-page__input_name"
                id="input-name"
                type="text"
                name="name"
                value="currentUser.name"
                autoComplete="off"
                required
                readOnly
              />
              <span
                className="profile-page__input-error"
                id="input-name-error"
              ></span>
              <label className="profile-page__label" htmlFor="input-email">
                E-mail
              </label>
              <input
                className="profile-page__input profile-page__input_email"
                id="input-email"
                type="email"
                name="email"
                value="currentUser.email"
                autoComplete="off"
                required
                readOnly
              />
              <span
                className="profile-page__input-error"
                id="input-email-error"
              ></span>
            </fieldset>
            <button
              className="button profile-page__button profile-page__button_type_edit profile-page__button_active"
              type="submit"
            >
              Редактировать
            </button>
          </form>
          <button className="button profile-page__button profile-page__button_type_exit profile-page__button_active">
            Выйти из аккаунта
          </button>
          <button className="button profile-page__button profile-page__button_type_save">
            Сохранить
          </button>
          </div>
      </section>
    </div>
  );
}

export default Profile;
