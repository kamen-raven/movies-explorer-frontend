// импорт реакт-компонентов
import React from 'react';
import { useHistory } from 'react-router-dom';

import './PageNoFound.css';

function PageNoFound(props) {
  const history = useHistory();

  return (
    <div className="page-no-found">
      <h1 className="page-no-found__code">
        404
      </h1>
      <p className="page-no-found__info">
        Страница не найдена
      </p>
      <button className="page-no-found__button button"
              onClick={() => history.goBack()}>
        Назад
      </button>
    </div>
  )
}

export default PageNoFound;
