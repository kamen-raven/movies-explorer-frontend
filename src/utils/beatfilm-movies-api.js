const address = 'https://api.nomoreparties.co'; // адрес api

class Api {
  constructor(address) {
    this._address = address;
  }

  //возвращаем res
  _returnRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ошибка ${res.status}`);
  }

  getBeatfilmMovies() {
    return fetch(`${this._address}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      }
    })
      .then(this._returnRes)
  }
}

const beatfilmMoviesApi = new Api(address);

export default beatfilmMoviesApi;
