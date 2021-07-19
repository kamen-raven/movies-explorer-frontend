import React, { useEffect } from "react";

import "./Profile.css";
import AuthInfo from "../InfoTooltip/InfoTooltip";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile(props) {
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation(); // импорт валидации
  const currentUser = React.useContext(CurrentUserContext); //подписываемся на контекст данных текущего пользователя

  // задавание данных пользователя в инпуты
  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);

  //обработчик клика кнопки Редактировать
  function handleProfileEditClick() {
    props.setIsProfileEdit(true);
  }

  //обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      email: values.email,
      username: values.username,
    });
  }

  return (
    <div className="page">
      {props.isLoading && <Preloader />}

      {!props.isLoading && (
        <section className="profile-page">
          <div className="profile-page__container">
            <form
              className="profile-page__form"
              name={props.name}
              noValidate
              onSubmit={handleSubmit}
            >
              <h2 className="profile-page__title">{`Привет, ${currentUser.username}!`}</h2>
              <fieldset className="profile-page__fieldset">
                <label className="profile-page__label" htmlFor="input-name">
                  Имя
                </label>
                <input
                  className="profile-page__input profile-page__input_username"
                  id="input-username"
                  type="text"
                  name="username"
                  value={values.username || ""}
                  autoComplete="off"
                  required
                  pattern="[\sA-Za-zА-Яа-яЁё-]{2,30}"
                  onChange={handleChange}
                  readOnly={props.isProfileEdit ? false : true} //разрешаем редактировать после нажатия кнопки Редактирования
                />
                <span
                  className="profile-page__input-error profile-page__input-error_type_username"
                  id="input-name-error"
                >
                  {errors.username ? "Введите имя пользователя" : " "}
                </span>
                <label className="profile-page__label" htmlFor="input-email">
                  E-mail
                </label>
                <input
                  className="profile-page__input profile-page__input_email"
                  id="input-email"
                  type="email"
                  name="email"
                  value={values.email || ""}
                  autoComplete="off"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={handleChange}
                  readOnly={props.isProfileEdit ? false : true} //разрешаем редактировать после нажатия кнопки Редактирования
                />
                <span
                  className="profile-page__input-error profile-page__input-error_type_email"
                  id="input-email-error"
                >
                  {errors.email ? "Введите e-mail " : " "}
                </span>
              </fieldset>
              <AuthInfo
                isOpen={props.isInfoVisible}
                isSucces={props.isSucces}
              />
              <button
                className={`button profile-page__button profile-page__button_type_save ${
                  props.isProfileEdit ? "profile-page__button_active" : " "
                } ${!isValid && "profile-page__button_disabled"}`}
                type="submit"
                disabled={
                  values.username === currentUser.username &&
                  values.email === currentUser.email
                }
              >
                Сохранить
              </button>
            </form>
            <div
              className={`profile-page__button-container ${
                props.isProfileEdit
                  ? " "
                  : "profile-page__button-container_active"
              }`}
            >
              <button
                className="button profile-page__button profile-page__button_type_edit"
                onClick={handleProfileEditClick}
              >
                Редактировать
              </button>
              <button
                className="button profile-page__button profile-page__button_type_exit"
                onClick={props.onSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Profile;
