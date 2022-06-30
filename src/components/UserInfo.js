export default class UserInfo {
    constructor({ name, aboutMe }) {
      this._name = document.querySelector(name);
      this._aboutMe = document.querySelector(aboutMe);
    }
  
    getUserInfo() {
      this._profileValues = {};
      this._profileValues.name = this._name.textContent;
      this._profileValues.aboutMe = this._aboutMe.textContent;
      return this._profileValues;
    }
  
    setUserInfo(inputValues) {
      this._name.textContent = inputValues["name"];
      this._aboutMe.textContent = inputValues["description"];
    }
  }