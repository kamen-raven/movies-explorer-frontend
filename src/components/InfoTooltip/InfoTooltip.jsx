import React from "react";
import iconFail from "../../images/registration-fail.svg";
import iconSucces from "../../images/registration-succes.svg";

import "./InfoTooltip.css";

export default function InfoTooltip(props) {
  return (
    <div className={`info-tooltip ${props.isOpen ? "info-tooltip_visible" : ""}`}>
            <h2 className={`info-tooltip__title ${props.isSucces==='Успех!' ? "info-tooltip__title_succes" : "info-tooltip__title_fail"}`}>
        {props.isSucces}
      </h2>
      <img
        className="info-tooltip__icon"
        alt={props.isSucces==='Успех!' ? "Успех!" : "Провал!"}
        src={props.isSucces==='Успех!' ? iconSucces : iconFail}
      />

    </div>
  );
}
