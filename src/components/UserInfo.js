export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(userNameSelector);
    this._aboutElement = document.querySelector(userAboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getAbout() {
    return this._about;
  }

  setUserInfo({ _id, name, about, avatar }) {
    this._id = _id;
    this._name = name;
    this._about = about;

    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}
