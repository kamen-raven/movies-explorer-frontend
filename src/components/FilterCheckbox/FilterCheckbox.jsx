import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
	<div className="checkbox">
    <div className="checkbox__container">
		<input className="checkbox__input"
          type="checkbox"
          id="checkbox" />
		<label className="checkbox__toggle"
            htmlFor="checkbox" >
			<span className="checkbox__toggle-dot">
			</span>
		</label>
    </div>
    <h3 className="checkbox__title">
      Короткометражки
    </h3>
	</div>
  )
}

export default FilterCheckbox;
