import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthPage(props) {
  return (
    <div className="page">
      <section className="auth-page">
        <div className="auth-page__container">
          <Link className="logo logo_place_auth"
                to="/"
                aria-label="logo">
          </Link>
          <h2 className="auth-page__title">
            {props.title}
          </h2>
          <form className="auth-page__form"
                name={props.name}
                noValidate >
            {props.children}
            <button className={`auth-page__sumbit-button auth-page__sumbit-button_type_${props.name}`}
                    type="submit">
              {props.buttonText}
            </button>
          </form>
          <div className="auth-page__caption-text">
            <p className="auth-page__link-text">
              {props.linkText}
            </p>
            <Link className="link auth-page__link"
                  to={props.patch}>
              {props.link}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AuthPage;
