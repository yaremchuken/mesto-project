class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest = (path, method = 'GET', body) => {
    return fetch(`${this._baseUrl}${path}`, {
      method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Unable fetch requesting ${url}, reason: ${res.status}`);
    });
  };

  getProfile = () => {
    return this._makeRequest(`/users/me`);
  };

  getCards = () => {
    return this._makeRequest(`/cards`);
  };

  updateProfile = (profileData) => {
    return this._makeRequest(`/users/me`, 'PATCH', profileData);
  };

  updateAvatar = (avatar) => {
    return this._makeRequest(`/users/me/avatar`, 'PATCH', { avatar });
  };

  uploadCard = (name, link) => {
    return this._makeRequest(`/cards`, 'POST', { name, link });
  };

  deleteCard = (cardId) => {
    return this._makeRequest(`/cards/${cardId}`, 'DELETE');
  };

  likeCard = (cardId) => {
    return this._makeRequest(`/cards/likes/${cardId}`, 'PUT');
  };

  unlikeCard = (cardId) => {
    return this._makeRequest(`/cards/likes/${cardId}`, 'DELETE');
  };
}

const api = new Api('https://nomoreparties.co/v1/plus-cohort-6', {
  authorization: 'c677fa90-7905-4374-86f2-1b0b7555aa56',
  'Content-Type': 'application/json',
});

export default api;
