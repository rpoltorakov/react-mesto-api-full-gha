class Api {
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

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._returnData())
  } 

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
     .then(this._returnData())
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._returnData())
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._returnData())
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._returnData())
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._returnData())
  }

  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._returnData())
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLikeCard(id)
    } else {
      return this.likeCard(id)
    }
  }

  changeAvatar(newAvatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newAvatarUrl),
      credentials: 'include'
    })
    .then(this._returnData())
  }
}

const api = new Api({
  // baseUrl: 'https://api.mesto.rpoltorakov.nomoredomains.work/',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json'
  }
})

export default api