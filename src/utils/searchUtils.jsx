
  //функция поиска фильмов
  function searchMovies(items, query, setError) {
    return items.filter((item) => {
      setError("");
      return item.nameRU
        .toLowerCase()
        .includes(query.toLowerCase()); /* ||
            item.nameEN === null
            ? setSearchError("Нужно ввести ключевое слово")
            : item.nameEN.toLowerCase().includes(searchQuery.toLowerCase())); */
    });
  }

  // проверка результатов поиска
  function checkSearchAnswerNotEmpty(data, query, setdatdFilter, setError) {
    const foundMovies = searchMovies(data, query, setError); //делаем поиск по массиву всех фильмов из LS
    if (foundMovies.length === 0) {
      //если ничего не найдено
      setdatdFilter([]); //то в фильтрованный стейт ничего не передается
      sessionStorage.removeItem("Search-query");
      sessionStorage.removeItem("Filter-cards");
      return setError("Ничего не найдено");
    } else {
      sessionStorage.setItem("Search-query", query);
      setdatdFilter(foundMovies);
    }
    sessionStorage.setItem("Filter-cards", JSON.stringify(foundMovies));
  }

  //обработчик отправки формы поиска
  export function handleSearchFormSumbit(data, query, setdatdFilter, setError, error, event) {
    event.preventDefault();
    if (query === "") {
      setdatdFilter([]);
      setError("Нужно ввести ключевое слово");
      return error;
    } else {
      checkSearchAnswerNotEmpty(data, query, setdatdFilter, setError);
    }
  }
