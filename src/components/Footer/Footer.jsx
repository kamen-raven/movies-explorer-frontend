import React from 'react';

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
          <ul class="list list_place_footer">
            <li class="footer__links">
              <a class="link footer__link"
                href="https://praktikum.yandex.ru/web/"
                target="_blank">
                Яндекс.Практикум
            </a>
            </li>
            <li class="footer__links">
              <a class="link footer__link"
                href="https://github.com/kamen-raven"
                target="_blank">
                Github
            </a>
            </li>
            <li class="footer__links">
              <a class="link footer__link"
                href="https://vk.com/kamen_raven"
                target="_blank">
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
