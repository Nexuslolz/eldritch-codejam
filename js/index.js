const card = document.querySelectorAll('.main-container__img')
const overlay = document.querySelector('.main-form__overlay')
const form = document.querySelector('.main-container__form')
const startBtn = document.querySelector('.main-form__btn')

function openForm(event) {
    card.forEach((item) => {
        if (item.classList.contains('main-container__img_open')) {
            item.classList.remove('main-container__img_open')
        }
    })

    event.target.classList.add('main-container__img_open')
    form.classList.add('main-container__form_open')
}

card.forEach((elem) => {
    elem.addEventListener('click', openForm)
})



overlay.addEventListener('click', () => {
    form.classList.remove('main-container__form_open')
    card.forEach((item) => {
        if (item.classList.contains('main-container__img_open')) {
            item.classList.remove('main-container__img_open')
        }
    })
})
