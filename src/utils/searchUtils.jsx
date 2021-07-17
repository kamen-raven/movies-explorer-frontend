//функция поиска фильмов
function searchMovies(items, query, setErrors) {
  return items.filter((item) => {
    setErrors("");
    return item.nameRU.toLowerCase().includes(query.toLowerCase());
  });
}

//функция поиска коротких фильмов
function searchShortMovies(items) {
  return items.filter((item) => {
    // делаем поиск по условию короткометражки
    return item.duration <= 40;
  });
}

// проверка результатов поиска
export function checkSearchAnswerNotEmpty(
  items,
  setFilterResults,
  setShortFilterResults,
  query,
  setErrors
) {
  const foundMovies = searchMovies(items, query, setErrors); //делаем поиск по массиву всех фильмов из LS
  if (foundMovies.length === 0) {
    //если ничего не найдено
    setFilterResults([]); //то в фильтрованный стейт ничего не передается
    setShortFilterResults([]);
    sessionStorage.removeItem("Search-query");
    sessionStorage.removeItem("Filter-cards");
    sessionStorage.removeItem("Filter-short-cards");
    return setErrors("Ничего не найдено"); // возвращаем отображение пустого поиска
  } else {
    //если что-то нашли
    setFilterResults(foundMovies); //задаем стейты
    const shortMovies = searchShortMovies(foundMovies);
    setShortFilterResults(shortMovies);
    sessionStorage.setItem("Search-query", query); //задаем LS
    sessionStorage.setItem("Filter-cards", JSON.stringify(foundMovies));
    sessionStorage.setItem("Filter-short-cards", JSON.stringify(shortMovies));
  }
}
