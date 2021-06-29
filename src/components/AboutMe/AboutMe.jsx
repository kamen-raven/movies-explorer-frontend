// импорт реакт-компонентов
import React from 'react';

import photo from "../../images/me.jpg"

import './AboutMe.css';

function AboutMe(props) {
  return (
    <section className="about-me container" id="student">
      <div className="container__subtitle container__subtitle_place_about-me">
        <h3 className="subtitle">
          Студент
          </h3>
      </div>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h2 className="title title_place_about-me">
            Вячеслав
            </h2>
          <h3 className="about-me__subtitle">
            Студент Яндекс.Практикума, 29 лет
            </h3>
          <p className="about-me__info">
            Я родился в Ставрополе, но уже больее 10 лет живу в Санкт-Петербурге.
            Окончил бакалавриат и магистратуру Философского факультета СПбГУ по специальности Конфликтология.
            Я люблю слушать музыку, играть в настольные игры и занимаюсь коллекционированием комиксов.
            С 2017 года работаю в Университете ИТМО.
            В 2020 году заинтересовался разработкой, сейчас оканчиваю курс по веб-разработке от Яндекс.Практикума.
            </p>
          <ul className="list">
            <li className="about-me__links">
              <a className="link about-me__link"
                href="https://github.com/kamen-raven"
                rel="noreferrer"
                target="_blank">
                Github
                </a>
            </li>
            <li className="about-me__links">
              <a className="link about-me__link"
                href="https://vk.com/kamen_raven"
                rel="noreferrer"
                target="_blank">
                ВКонтакте
                </a>
            </li>
            <li className="about-me__links">
              <a className="link about-me__link"
                href="https://t.me/kamen_raven"
                rel="noreferrer"
                target="_blank">
                Telegram
                </a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo"
          src={photo}
          alt="Фото"
        />
      </div>
    </section>
  )
}

export default AboutMe;
