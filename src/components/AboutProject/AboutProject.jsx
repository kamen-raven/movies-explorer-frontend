// импорт реакт-компонентов
import React from 'react';

function AboutProject(props) {
  return (
    <section className="about-project container" id="about">
      <div className="container__subtitle container__subtitle_place_about-project">
        <h3 className="subtitle">
          О проекте
          </h3>
      </div>
      <div className="about-project__container">
        <h3 className="about-project__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__paragraph">
          Составление плана, работу над бэкендом, вёрстку,
          добавление функциональности и финальные доработки
        </p>
        <h3 className="about-project__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__paragraph">
          У каждого этапа был мягкий и жёсткий дедлайн,
          которые нужно было соблюдать, чтобы успешно защититься
        </p>
      </div>
      <div className="about-project__progressbar">
        <div className="about-project__time-container">
          <p className="about-project__progressbar-info about-project__progressbar-info_time about-project__time-container_short">
            1 неделя
          </p>
        </div>
        <p className="about-project__progressbar-info">
          Back-end
        </p>
        <div className="about-project__time-container">
          <p className="about-project__progressbar-info about-project__progressbar-info_time">
            4 недели
          </p>
        </div>
        <p className="about-project__progressbar-info">
          Front-end
        </p>
      </div>
    </section>
  )
}

export default AboutProject;
