/* const address = 'https://api.kamen.movies-explorer.nomoredomains.icu'; // адрес api

 */
const address = 'http://localhost:3000'; // адрес api

// возвращение результата
function returnRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

//-------------------ЭКСПОРТ----------------------//

// создание пользователя
function register(email, password, username) {
  return fetch(`${address}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, username })
  })
    .then(returnRes)
}

// вход на сайт
function login(email, password) {
  return fetch(`${address}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(returnRes)
}

// проверка токена
function checkToken(token) {
  return fetch(`${address}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then(returnRes)
}

export { register, login, checkToken };
