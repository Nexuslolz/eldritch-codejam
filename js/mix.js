import cardBrown from '../assets/MythicCards/brown/index.js'
import cardBlue from '../assets/MythicCards/blue/index.js'
import cardGreen from '../assets/MythicCards/green/index.js'
import ancientsData from '../data/ancients.js'
// import difficulties from '../data/difficulties'


const gameplay = document.querySelector('.gameplay')
const cardDeck = document.querySelector('.card-deck')
const imgClose = document.querySelector('.img__close')
const imgOpen = document.querySelector('.img__open')
const itemOpen = document.querySelector('.item__open')

const difficulty = document.querySelectorAll('.main-form-list__checkbox')
const stageItem = document.querySelectorAll('.stage-list__item')
const nameStage = document.querySelectorAll('.gameplay__header')


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

let firstStageArr = []
let secondStageArr = []
let thirdStageArr = []
let stageQueue = [firstStageArr, secondStageArr, thirdStageArr]

let cardQueue = []


function addQueue() {
    stageItem.forEach((elem, idx) => {
        elem.textContent = `${stageArr[idx]}`
    })

    for (let i = 0; i < stageItem.length; i++) {
        if (i === 0 || i === 3 || i === 6)
            for (let j = 0 - 1; j < stageItem[i].textContent - 1; j++) {
                if (i === 0) {
                    firstStageArr.push(cardGreen[getRandomNumber(cardGreen)])
                } else if (i === 3) {
                    secondStageArr.push(cardGreen[getRandomNumber(cardGreen)])
                } else if (i === 6) {
                    thirdStageArr.push(cardGreen[getRandomNumber(cardGreen)])
                }
            }
        if (i === 1 || i === 4 || i === 7)
            for (let j = 0 - 1; j < stageItem[i].textContent - 1; j++) {
                if (i === 1) {
                    firstStageArr.push(cardBrown[getRandomNumber(cardBrown)])
                } else if (i === 4) {
                    secondStageArr.push(cardBrown[getRandomNumber(cardBrown)])
                } else if (i === 7) {
                    thirdStageArr.push(cardBrown[getRandomNumber(cardBrown)])
                }
            }
        if (i === 2 || i === 5 || i === 8)
            for (let j = 0 - 1; j < stageItem[i].textContent - 1; j++) {
                if (i === 2) {
                    firstStageArr.push(cardBlue[getRandomNumber(cardBlue)])
                } else if (i === 5) {
                    secondStageArr.push(cardBlue[getRandomNumber(cardBlue)])
                } else if (i === 8) {
                    thirdStageArr.push(cardBlue[getRandomNumber(cardBlue)])
                }
            }
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let t = arr[i];
            arr[i] = arr[j];
            arr[j] = t
        }
        return arr
    }

    for (let k = 0; k < stageQueue.length; k++) {
        let arr = shuffle(stageQueue[k])
        for (let l = 0; l < stageQueue[k].length; l++) {
            cardQueue.push(arr[l])
        }
    }
}

startBtn.addEventListener('click', addQueue)


function queueNextElem() {
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

        let x = 0
        function cardCounter(x) {
            if (stageItem[x].textContent > 0) {
                stageItem[x].textContent -= 1
                firstStageSum -= 1

                if (firstStageSum == 0) {
                    nameStage[0].style.color = 'red'
                }
            } else if (stageItem[x].textContent == 0 && stageItem[x + 3].textContent > 0) {
                stageItem[x + 3].textContent -= 1
                secondStageSum -= 1
                if (secondStageSum == 0) {
                    nameStage[1].style.color = 'red'
                }
            }
            else if (stageItem[x + 3].textContent == 0 && stageItem[x + 6].textContent > 0) {
                stageItem[x + 6].textContent -= 1
                thirdStageSum -= 1
            }
        }

        if (color === 'green') {
            cardCounter(0)
        }
        if (color === 'brown') {
            cardCounter(1)
        }
        if (color === 'blue') {
            cardCounter(2)
        }

        const img = new Image()
        img.src = `https://raw.githubusercontent.com/Nexuslolz/eldritch-codejam/gh-pages/assets/MythicCards/${color}/${result}`
        imgOpen.style.opacity = '1'
        imgOpen.style.visibility = 'visible'
        img.onload = () => {
            imgOpen.style.background = `url(${img.src}) no-repeat center / 100% 100%`
        }
    }
}




imgClose.addEventListener('click', queueNextElem)

imgClose.addEventListener('mouseup', () => {
    if (cardQueue.length === 1) {
        imgClose.style.opacity = '0'
        imgClose.style.visibility = 'hidden'
        nameStage[2].style.color = 'red'
    }
})
