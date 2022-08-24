const card = document.querySelectorAll('.main-container__img')
const overlay = document.querySelector('.main-form__overlay')
const form = document.querySelector('.main-container__form')


overlay.addEventListener('click', () => {
    form.classList.remove('main-container__form_open')
})