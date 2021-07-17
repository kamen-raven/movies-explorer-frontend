import React, { useEffect, useCallback } from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ filterCheckbox, setFilterChechbox, filterMoviesCards }) {


  function changeFilterCheckbox() {
    setFilterChechbox(!filterCheckbox);
    //sessionStorage.setItem("Filter-checkbox", !filterCheckbox)
  }

/*   const changeFilterCheckbox = useCallback(() => {
    setFilterChechbox(!filterCheckbox);
    sessionStorage.setItem("Filter-checkbox", !filterCheckbox)
  }, [filterCheckbox, setFilterChechbox])
 */
/*   useEffect(() => {
    if(sessionStorage.getItem("Filter-checkbox") === true) {
      setFilterChechbox(filterCheckbox)
    }
  }, [filterCheckbox, setFilterChechbox])
 */

  return (
    <div className="checkbox">
      <div className="checkbox__container">
        <input
          className="checkbox__input"
          name="checkbox"
          type="checkbox"
          id="checkbox"
          checked={sessionStorage.getItem("Filter-checkbox") === true ? !filterCheckbox : filterCheckbox}
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
