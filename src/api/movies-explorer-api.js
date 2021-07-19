const address = 'http://localhost:3000'; // адрес localhost api
//const address = 'https://api.kamen.movies-explorer.nomoredomains.icu'; // адрес
class Api {
  constructor(address) {
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
        username: data.username
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
      body: JSON.stringify(data)
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
