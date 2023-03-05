  // задаем размеры ширины экранов для отображения карточек и счетчиков
  export const desktopWidth = 1280;
  export const desktopRenderCards = 12;
  export const desktopMoreButton = 3;

  export const tabletWidth = 768;
  export const tabletRenderCards = 8;
  export const tabletMoreButton = 2;

  export const mobileWidth = 320;
  export const mobileRenderCards = 5;
  export const mobileMoreButton = 2;


// функции рассчета времени
  //часы
  export function hoursSetUp(card) {
    let cardDuration = card.duration;
    let hours = Math.floor(cardDuration / 60);
    return hours;
  }
  //минуты
  export function minutesSetUp(card) {
    let cardDuration = card.duration;
    let hours = Math.floor(cardDuration / 60);
    let minutes = Math.floor(cardDuration - hours * 60);
    return minutes;
  }

