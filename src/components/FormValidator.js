export class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  // показать сообщение об ошибке 
  _showInputError(formInput) {
    const errorElement = document.getElementById(`error-${formInput.id}`);
    formInput.classList.add(this._inputErrorClass);
    errorElement.textContent = formInput.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  // спрятать сообщение об ошибке 
  _hideInputError(formInput) {
    const errorElement = document.getElementById(`error-${formInput.id}`);
    formInput.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // проверка нужно ли выводить сообщение об ошибке. Если поле ввода не валидно, то вызови функцию вывода сообщения об ошибки 
  // если поле ввода валидно, то скрой сообщение об ошибке 
  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });

  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.toggleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetError() {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formInput);
    });
    this.toggleButtonState();
  }
}