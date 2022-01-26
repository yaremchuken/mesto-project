import { initProfile, profileId } from './profile';
import { initCards } from './card';

const baseUrl = 'https://nomoreparties.co/v1/plus-cohort-6';

const api = (url, method = 'GET', body) => {
  return fetch(url, {
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

export const prepareDatas = () => {
  api(`${baseUrl}/users/me`)
    .then((data) => initProfile(data))
    .then((_) => api(`${baseUrl}/cards`))
    .then((data) => initCards(data));
};

export const updateProfile = (profileData) => {
  api(`${baseUrl}/users/me`, 'PATCH', profileData).then((data) => {
    profileId = data._id;
  });
};

export const updateAvatar = (avatar) => {
  api(`${baseUrl}/users/me/avatar`, 'PATCH', { avatar }).then((data) => {
    profileId = data._id;
  });
};

export const uploadCard = (name, link) => {
  return api(`${baseUrl}/cards`, 'POST', { name, link });
};

export const deleteCard = (cardId) => {
  return api(`${baseUrl}/cards/${cardId}`, 'DELETE');
};

export const likeCard = (cardId) => {
  return api(`${baseUrl}/cards/likes/${cardId}`, 'PUT');
};

export const unlikeCard = (cardId) => {
  return api(`${baseUrl}/cards/likes/${cardId}`, 'DELETE');
};
