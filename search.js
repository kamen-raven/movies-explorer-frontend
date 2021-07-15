  //функция получения первоначального списка фильмов и сохранения его в локальное хранилище
  function getBeatfilmMoviesList() {
    setIsLoading(true);
    return beatfilmMoviesApi
      .getBeatfilmMovies()
      .then((res) => {
        localStorage.setItem("BeatFilm-movie", JSON.stringify(res));
        return res;
      })
      .then((res) => {
        setAllMovies(res);
        console.log(allMovies)
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

  // эффект добавления стейта изначальных карточек фильмов
  useEffect(() => {
    if (localStorage.getItem("BeatFilm-movie")) {
      setAllMovies(JSON.parse(localStorage.getItem("BeatFilm-movie")));
      console.log("обновили стейт allMovies");
    }
  }, []);


  //функция поиска фильмов
  function searchMovies(items) {
    return items.filter((item) => {
        setSearchError("");
        return item.nameRU
          .toLowerCase()
          .includes(searchQuery.toLowerCase()); /* ||
          item.nameEN === null
          ? setSearchError("Нужно ввести ключевое слово")
          : item.nameEN.toLowerCase().includes(searchQuery.toLowerCase())); */
    });
  }

  //проверка на наличие информации о всех фильмах в локальном хранилище
  function checkAllMoviesLocalStorage() {
    const movies = JSON.parse(localStorage.getItem("BeatFilm-movie"));
    if (movies === null) {
      getBeatfilmMoviesList();
      console.log("получили фильмы");
    } /* else {
      setAllMovies(movies);
      console.log("фильмы тут уже");
    } */
  }

  // проверка результатов поиска
  function checkSearchAnswerNotEmpty() {
    const foundMovies = searchMovies(allMovies); //делаем поиск по массиву всех фильмов из LS
   // sessionStorage.setItem("Filter-cards", JSON.stringify(foundMovies));
    if (foundMovies.length === 0) { //если ничего не найдено
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

  //обработчик отправки формы поиска
  function handleSearchFormSumbit(event) {
    event.preventDefault();
    if (searchQuery === "") {
      setFilterMoviesCards([]);
      setSearchError("Нужно ввести ключевое слово");
      return searchError;
    } else {
      checkAllMoviesLocalStorage();
      checkSearchAnswerNotEmpty();
    }
  }
