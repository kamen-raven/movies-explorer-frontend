import React from 'react';
import iconFail from "../../images/registration-fail.svg";
import iconSucces from "../../images/registration-succes.svg";

import './InfoTooltip.css';

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button"
                type="button"
                onClick={props.onClose}>
        </button>
        <div className="popup__content">
          <img className="popup__info-tooltip-icon"
                alt={props.isSucces ? "Успех!" : "Провал!"}
                src={props.isSucces ? iconSucces : iconFail} />
          <h2 className="popup__title">
            {props.isSucces ? `Вы успешно зарегистрировались!`
                            : `Что-то пошло не так! Попробуйте ещё раз.`}
          </h2>
        </div>
      </div>
    </div>
  )
}
