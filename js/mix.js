import cardBrown from '../assets/MythicCards/brown/index.js'
import cardBlue from '../assets/MythicCards/blue/index.js'
import cardGreen from '../assets/MythicCards/green/index.js'
import ancientsData from '../data/ancients.js'
// import difficulties from '../data/difficulties'


const gameplay = document.querySelector('.gameplay')
const cardDeck = document.querySelector('.card-deck')
const difficulty = document.querySelectorAll('.main-form-list__checkbox')
const stageItem = document.querySelectorAll('.stage-list__item')
const nameStage = document.querySelectorAll('.gameplay__header')
const imgClose = document.querySelector('.img__close')
const imgOpen = document.querySelector('.img__open')

startBtn.addEventListener('click', () => {
    gameplay.classList.add('gameplay_open')
    cardDeck.classList.add('card-deck_open')
    form.classList.remove('main-container__form_open')
    card.forEach((elem) => {
        elem.removeEventListener('click', openForm)
    })
})


let stageArr = []

card.forEach((elem, idx) => {
    elem.addEventListener('click', () => {
        let greenDeck
        let brownDeck
        let blueDeck

        greenDeck = ancientsData[idx].firstStage.greenCards
        brownDeck = ancientsData[idx].firstStage.brownCards
        blueDeck = ancientsData[idx].firstStage.blueCards
        stageArr.push(greenDeck, brownDeck, blueDeck)

        greenDeck = ancientsData[idx].secondStage.greenCards
        brownDeck = ancientsData[idx].secondStage.brownCards
        blueDeck = ancientsData[idx].secondStage.blueCards
        stageArr.push(greenDeck, brownDeck, blueDeck)

        greenDeck = ancientsData[idx].thirdStage.greenCards
        brownDeck = ancientsData[idx].thirdStage.brownCards
        blueDeck = ancientsData[idx].thirdStage.blueCards
        stageArr.push(greenDeck, brownDeck, blueDeck)
    })
})

overlay.addEventListener('click', () => {
    stageArr = []
})



function getRandomNumber(color) {
    let randomNumber = Math.ceil(Math.random() * Object.keys(color).length)
    return randomNumber
}

let cardQueue = []

startBtn.addEventListener('click', () => {
    stageItem.forEach((elem, idx) => {
        elem.textContent = `${stageArr[idx]}`
    })

    for (let i = 0; i < stageItem.length; i++) {
        if (i === 0 || i === 3 || i === 6)
            for (let j = 0 - 1; j < stageItem[i].textContent - 1; j++) {
                cardQueue.push(cardGreen[getRandomNumber(cardGreen)])
            }
        if (i === 1 || i === 4 || i === 7)
            for (let j = 0 - 1; j < stageItem[i].textContent - 1; j++) {
                cardQueue.push(cardBrown[getRandomNumber(cardBrown)])
            }
        if (i === 2 || i === 5 || i === 8)
            for (let j = 0 - 1; j < stageItem[i].textContent - 1; j++) {
                cardQueue.push(cardBlue[getRandomNumber(cardBlue)])
            }
    }
})



function queueElem() {
    imgOpen.style.opacity = '1'
    imgOpen.style.visibility = 'visible'

    if (cardQueue.length > 0) {
        let result = cardQueue.shift()
        let color = result.slice(0, result.length - 6)

        let firstStageSum = 0
        let secondStageSum = 0
        let thirdStageSum = 0

        for (let i = 0; i <= 2; i++) {
            firstStageSum += Number(stageItem[i].textContent)
        }
        for (let i = 3; i <= 5; i++) {
            secondStageSum += Number(stageItem[i].textContent)
        }
        for (let i = 6; i <= 8; i++) {
            thirdStageSum += Number(stageItem[i].textContent)
        }

        if (color === 'green') {
            if (stageItem[0].textContent > 0) {
                stageItem[0].textContent -= 1
                firstStageSum -= 1
            } else if (stageItem[0].textContent == 0 && stageItem[3].textContent > 0) {
                stageItem[3].textContent -= 1
                secondStageSum -= 1
            }
            else if (stageItem[3].textContent == 0 && stageItem[6].textContent > 0) {
                stageItem[6].textContent -= 1
                thirdStageSum -= 1
            }
        }
        if (color === 'brown') {
            if (stageItem[1].textContent > 0) {
                stageItem[1].textContent -= 1
                firstStageSum -= 1
            } else if (stageItem[1].textContent == 0 && stageItem[4].textContent > 0) {
                stageItem[4].textContent -= 1
                secondStageSum -= 1
            }
            else if (stageItem[4].textContent == 0 && stageItem[7].textContent > 0) {
                stageItem[7].textContent -= 1
                thirdStageSum -= 1
            }
        }
        if (color === 'blue') {
            if (stageItem[2].textContent > 0) {
                stageItem[2].textContent -= 1
                firstStageSum -= 1

                if (firstStageSum == 0) {
                    nameStage[0].style.color = 'red'
                }
            } else if (stageItem[2].textContent == 0 && stageItem[5].textContent > 0) {
                stageItem[5].textContent -= 1
                secondStageSum -= 1
                if (secondStageSum == 0) {
                    nameStage[1].style.color = 'red'
                }
            }
            else if (stageItem[5].textContent == 0 && stageItem[8].textContent > 0) {
                stageItem[8].textContent -= 1
                thirdStageSum -= 1
            }
        }

        return imgOpen.src = `https://github.com/Nexuslolz/eldritch-codejam/tree/gh-pages/assets/MythicCards/${color}/${result}`
    }
}




imgClose.addEventListener('click', queueElem)

imgClose.addEventListener('mouseup', () => {
    if (cardQueue.length === 1) {
        imgClose.style.opacity = '0'
        imgClose.style.visibility = 'hidden'
        nameStage[2].style.color = 'red'
    }
})
