import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer container">
      <div className="container">
        <p className="footer__desclimer">
          Учебный проект Яндекс.Практикум х BeatFilm
      </p>
        <div className="footer__container">
          <p className="footer__copyright">
            &#169;&#160;2021
        </p>
          <ul className="list list_place_footer">
            <li className="footer__links">
              <a className="link footer__link"
                href="https://praktikum.yandex.ru/web/"
                target="_blank"
                rel="noreferrer">
                Яндекс.Практикум
            </a>
            </li>
            <li className="footer__links">
              <a className="link footer__link"
                href="https://github.com/kamen-raven"
                target="_blank"
                rel="noreferrer">
                Github
            </a>
            </li>
            <li className="footer__links">
              <a className="link footer__link"
                href="https://vk.com/kamen_raven"
                target="_blank"
                rel="noreferrer">
                ВКонтакте
            </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
