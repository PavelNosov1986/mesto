const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close');

function popupOpenToggle() {
    popup.classList.toggle('popup_opened');
    document.getElementById('name').value = document.querySelector('.profile__name').textContent;
    document.getElementById('description').value = document.querySelector('.profile__about-me').textContent;
}

openPopupButton.addEventListener('click', popupOpenToggle);
closePopupButton.addEventListener('click', popupOpenToggle);

let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('description');

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = document.getElementById('name').value;
    let jobInput = document.getElementById('description').value;
    document.querySelector('.profile__name').textContent = nameInput;
    document.querySelector('.profile__about-me').textContent = jobInput;
    popupOpenToggle();
}

formElement.addEventListener('submit', formSubmitHandler);