// импорт реакт-компонентов
import React from 'react';
import { useHistory } from 'react-router-dom';



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
      <button className="page-no-found__button link"
              onClick={() => history.goBack()}>
        Назад
      </button>
    </div>
  )
}

export default PageNoFound;
