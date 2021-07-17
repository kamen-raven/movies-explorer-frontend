 // эффект добавления стейта изначальных карточек фильмов
 useEffect(() => {
  if (
    location.pathname === "/movies" &&
    loggedIn === true &&
    !localStorage.getItem("BeatFilm-movie")
  ) {
    setIsLoading(true);
    return beatfilmMoviesApi
      .getBeatfilmMovies()
      .then((res) => {
        localStorage.setItem("BeatFilm-movie", JSON.stringify(res));
        return res;
      })
      .then((res) => {
        setAllMovies(res);
      })
      .catch((error) => {
        localStorage.removeItem("BeatFilm-movie");
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(
          `Хьюстон, у нас проблема при получении списка фильмов: ${error}`
        );
      })
      .finally(() => setIsLoading(false));
  }
}, [location.pathname, loggedIn]);

useEffect(() => {
  if (localStorage.getItem("BeatFilm-movie")) {
    setAllMovies(JSON.parse(localStorage.getItem("BeatFilm-movie")));
  }
}, []);

//функция поиска фильмов
function searchMovies(items) {
  return items.filter((item) => {
    /*       if(filterCheckbox===true) {   // поиск с условием
      setSearchError("");
      return item.nameRU
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
        item.duration <= 40
    } else { */
    setSearchError("");
    return item.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

// проверка результатов поиска
function checkSearchAnswerNotEmpty() {
  const foundMovies = searchMovies(allMovies); //делаем поиск по массиву всех фильмов из LS
  if (foundMovies.length === 0) {
    //если ничего не найдено
    setFilterMoviesCards([]); //то в фильтрованный стейт ничего не передается
    sessionStorage.removeItem("Search-query");
    sessionStorage.removeItem("Filter-cards");
    return setSearchError("Ничего не найдено");
  } else {
    sessionStorage.setItem("Search-query", searchQuery);
    setFilterMoviesCards(foundMovies);
  }
  sessionStorage.setItem("Filter-cards", JSON.stringify(foundMovies));
}

//функция поиска коротких фильмов
function searchShortMovies() {
  const filterMovies = JSON.parse(sessionStorage.getItem("Filter-cards")); // по имеющимуся массиву найденных всех фильмов
  return filterMovies.filter((card) => { // делаем поиск по условию короткометражки
    return card.duration <= 40;
  });
}


function checkShortSearch() {
  const filterMovies = JSON.parse(sessionStorage.getItem("Filter-cards"));
  if(filterMovies.length !== 0) { // если есть найденные фильмы в целом - то происходит поиск короткометражек
    if (filterCheckbox === true) { // если включено условия поиска по короткометражкам
      const shortMovies = searchShortMovies();  //поиск по короткометражкам
      if (shortMovies.length === 0) {  // если ничего не найдено по короткометражкам
        setShortFilterMoviesCards([]); //то в фильтрованный стейт ничего не передается
        sessionStorage.removeItem("Filter-short-cards");
        return setSearchError("Ничего не найдено");
      } else {
        setShortFilterMoviesCards(shortMovies);
      }
      sessionStorage.setItem("Filter-short-cards", JSON.stringify(shortMovies));
    } else {
      setShortFilterMoviesCards([]);
      sessionStorage.removeItem("Filter-short-cards");
    }
  }
}

//обработчик отправки формы поиска
function handleSearchFormSumbit(event) {
  event.preventDefault();
  if (searchQuery === "") {
    setFilterMoviesCards([]);
    setShortFilterMoviesCards([]);
    setSearchError("Нужно ввести ключевое слово")
    sessionStorage.removeItem("Search-query");
    sessionStorage.removeItem("Filter-cards");
    sessionStorage.removeItem("Filter-short-cards");
    return searchError;
  } else {
    checkSearchAnswerNotEmpty();
    checkShortSearch();
  }
}
