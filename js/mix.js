const startBtn = document.querySelector('.main-form__btn')
const gameplay = document.querySelector('.gameplay')
const cardDeck = document.querySelector('.card-deck')


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


startBtn.addEventListener('click', () => {
    gameplay.classList.add('gameplay_open')
    cardDeck.classList.add('card-deck_open')
    form.classList.remove('main-container__form_open')
    card.forEach((elem) => {
        elem.removeEventListener('click', openForm)
    })
})