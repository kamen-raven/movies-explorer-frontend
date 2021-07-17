import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ filterCheckbox, setFilterChechbox, filterMoviesCards }) {


  function changeFilterCheckbox(event) {
    setFilterChechbox(event.target.checked)
/*     if (filterCheckbox === true) {
      return filterMoviesCards.filter((card) => {

      })
    } */
  }


/*   function changeFilterCheckbox() {
    setFilterChechbox(!filterCheckbox);
      if (filterCheckbox === true) {
      return filterMoviesCards.filter((card) => {

      })
    }
  }*/


  return (
    <div className="checkbox">
      <div className="checkbox__container">
        <input
          className="checkbox__input"
          name="checkbox"
          type="checkbox"
          id="checkbox"
          checked={filterCheckbox || false}
          onChange={changeFilterCheckbox}
        />
        <label className="checkbox__toggle" htmlFor="checkbox">
          <span className="checkbox__toggle-dot"></span>
        </label>
      </div>
      <h3 className="checkbox__title">Короткометражки</h3>
    </div>
  );
}

export default FilterCheckbox;
