const address = 'https://kamen.movies-explorer.nomoredomains.icu'; // адрес

class Api {
  constructor({ address }) {
    this._address = address;
  }

  //возвращаем res
  _returnRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //--------запросы к данным пользователя
  //запрос данных пользователя - GET
  getCurrentUser() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._returnRes)
  }

  //запрос на обновление данных пользователя - PATCH
  editUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name
      })
    })
      .then(this._returnRes)
  }

  //---------запросы к сохраненным фильмам
  //запрос массива сохраненных пользователем фильмов
  getMovies() {
    return fetch(`${this._address}/movies `, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._returnRes)
  }

  //запрос добавления нового фильма в сохраненные
  createMovie(data) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(this._returnRes)
  }

  //запрос на удаление фильма из сохраненных
  deleteMovieById(id) {
    return fetch(`${this._address}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._returnRes)
  }
}


const mainApi = new Api(address);
export default mainApi;
