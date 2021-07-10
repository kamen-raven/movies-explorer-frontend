import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./AuthPage.css";

import AuthInfo from "../InfoTooltip/InfoTooltip";

function AuthPage({
  name,
  title,
  buttonText,
  linkText,
  link,
  patch,
  onSubmit,
  children,
  isDisabled = false,
  isAuthInfoVisible,
  isAuthInfoSucces
}) {


  return (
    <div className="page">
      <section className="auth-page">
        <div className="auth-page__container">
          <Link
            className="logo logo_place_auth"
            to="/"
            aria-label="logo"
          ></Link>
          <form
            className="auth-page__form"
            name={name}
            noValidate
            onSubmit={onSubmit}
          >
            <h2 className="auth-page__title">{title}</h2>
            {children}
            <AuthInfo
              isOpen={isAuthInfoVisible}
              isSucces={isAuthInfoSucces}
            />
            <button
              className={`button auth-page__sumbit-button
                auth-page__sumbit-button_type_${name}
                ${isDisabled && "auth-page__sumbit-button_disabled"}`}
              type="submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
          </form>
          <div className="auth-page__caption-text">
            <p className="auth-page__link-text">{linkText}</p>
            <Link className="link auth-page__link" to={patch}>
              {link}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthPage;
