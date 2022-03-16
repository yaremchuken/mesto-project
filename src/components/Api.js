export default class Api {
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

  updateAvatar = (avatar) => {
    return this._makeRequest(`/users/me/avatar`, 'PATCH', { avatar });
  };

  getUserInfo = () => {
    return this._makeRequest(`/users/me`);
  };

  updateUserInfo = (userInfo) => {
    return this._makeRequest(`/users/me`, 'PATCH', userInfo);
  };

  getCards = () => {
    return this._makeRequest(`/cards`);
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
