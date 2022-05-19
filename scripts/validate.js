//Проверяем наличие невалидного поля
const hasInvalidInput = (inputList) => {
    return inputList.some((item) => {
        if (item.validity.valid) {
            return false;
        } else {
            return true;
        }
    })
};
//Отключаем и включаем кнопки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__save_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__save_inactive');
    }
};

// Прячем ошибки
const hideErrorMessage = (formElement, inputElement) => {

    const {
        errorClass
    } = config;
    const errorElement = document.getElementById(`error-${inputElement.id}`);

    formElement.parentNode.classList.remove(errorClass);

    errorElement.textContent = '';
};

// Показываем ошибки
const showErrorMessage = (formElement, inputElement) => {

    const {
        errorClass
    } = config;

    formElement.parentNode.classList.add(errorClass);

    const errorElement = document.getElementById(`error-${inputElement.id}`);

    errorElement.textContent = inputElement.validationMessage;
};

//Проверяем правильности ввода данных
const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
        hideErrorMessage(formElement, inputElement, config);
    } else {
        showErrorMessage(formElement, inputElement, config);
    }
};

// Установливаем слушителей событий
const setEventListeners = (formElement, config) => {
    const {
        inputSelector,
        submitButtonSelector,
        ...restConfig
    } = config;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {

        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Включение валидации
const enableValidation = (config) => {
    const {
        formSelector,
        ...restConfig
    } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    });
};

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    errorClass: 'popup__field-input_invalid'
};

enableValidation(config);