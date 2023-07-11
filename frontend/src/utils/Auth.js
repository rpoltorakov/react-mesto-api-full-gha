class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _returnData() {
    return (res) => {
      if (res.ok) {return res.json()} 
      else {return Promise.reject(`Ошибка ${res.status}`)}
    }
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._returnData())
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then(this._returnData())
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${jwt}`
      },
    })
      .then(this._returnData())
  }

  logout(userId) {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        _id: userId,
      })
    })
      .then(this._returnData())
  }
}

const auth = new Auth({
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
})

export default auth