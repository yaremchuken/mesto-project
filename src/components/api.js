const baseUrl = 'https://nomoreparties.co/v1/plus-cohort-6';

const makeRequest = (path, method = 'GET', body) => {
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      authorization: 'c677fa90-7905-4374-86f2-1b0b7555aa56',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Unable fetch requesting ${url}, reason: ${res.status}`);
  });
};

export const getProfile = () => {
  return makeRequest(`/users/me`);
};

export const getCards = () => {
  return makeRequest(`/cards`);
};

export const updateProfile = (profileData) => {
  return makeRequest(`/users/me`, 'PATCH', profileData);
};

export const updateAvatar = (avatar) => {
  return makeRequest(`/users/me/avatar`, 'PATCH', { avatar });
};

export const uploadCard = (name, link) => {
  return makeRequest(`/cards`, 'POST', { name, link });
};

export const deleteCard = (cardId) => {
  return makeRequest(`/cards/${cardId}`, 'DELETE');
};

export const likeCard = (cardId) => {
  return makeRequest(`/cards/likes/${cardId}`, 'PUT');
};

export const unlikeCard = (cardId) => {
  return makeRequest(`/cards/likes/${cardId}`, 'DELETE');
};
