import cardBrown from '../assets/MythicCards/brown/index.js'
import cardBlue from '../assets/MythicCards/blue/index.js'
import cardGreen from '../assets/MythicCards/green/index.js'
import ancientsData from '../data/ancients.js'
import greenCardsData from '../data/mythicCards/green/index.js'
import brownCardsData from '../data/mythicCards/brown/index.js'
import blueCardsData from '../data/mythicCards/blue/index.js'

const gameplay = document.querySelector('.gameplay')
const cardDeck = document.querySelector('.card-deck')
const imgClose = document.querySelector('.img__close')
const imgOpen = document.querySelector('.img__open')

const difficult = document.querySelectorAll('.main-form-list__checkbox')
const stageItem = document.querySelectorAll('.stage-list__item')
const nameStage = document.querySelectorAll('.gameplay__header')

let stageArr = []
let firstStageArr = []
let secondStageArr = []
let thirdStageArr = []
let stageQueue = [firstStageArr, secondStageArr, thirdStageArr]
let cardQueue = []

function checkDifficulty() {
    let elemValue
    difficult.forEach((elem) => {
        if (elem.checked) {
            elemValue = elem.value
        }
    })
    return elemValue
}

function getRandomNumber(color) {
    let randomNumber = Math.ceil(Math.random() * Object.keys(color).length)
    return randomNumber
}

function addQueue() {
    stageItem.forEach((elem, idx) => {
        elem.textContent = `${stageArr[idx]}`
    })

    const difficultyLevel = checkDifficulty()

    for (let i = 0; i < stageItem.length; i++) {

        function useDifficulty(firstIdx, secondIdx, thirdIdx, colorCard, colorDeck) {
            let maxValue
            if (i === firstIdx) {
                maxValue = Number(stageItem[firstIdx].textContent)
            } else if (i === secondIdx) {
                maxValue = Number(stageItem[secondIdx].textContent)
            } else if (i === thirdIdx) {
                maxValue = Number(stageItem[thirdIdx].textContent)
            }

            if (difficultyLevel === 'Средний') {
                if (i === firstIdx) {
                    firstStageArr.push(colorCard[getRandomNumber(colorCard)])
                } else if (i === secondIdx) {
                    secondStageArr.push(colorCard[getRandomNumber(colorCard)])
                } else if (i === thirdIdx) {
                    thirdStageArr.push(colorCard[getRandomNumber(colorCard)])
                }
            } else if (difficultyLevel === 'Лёгкий') {
                let cardInfo
                if (i === firstIdx) {
                    let arr = []
                    for (let l = 0; l < colorDeck.length; l++) {
                        cardInfo = colorDeck[Math.floor(Math.random() * colorDeck.length)]
                        if (cardInfo.difficulty !== 'hard') {
                            while (arr.length <= maxValue) {
                                arr.push(cardInfo.cardFace)
                            }
                        }
                    }
                    firstStageArr.push(arr[Math.floor(Math.random() * arr.length)])
                    shuffle(firstStageArr)
                } else if (i === secondIdx) {
                    let arr = []
                    for (let l = 0; l < colorDeck.length; l++) {
                        cardInfo = colorDeck[Math.floor(Math.random() * colorDeck.length)]
                        if (cardInfo.difficulty !== 'hard') {
                            while (arr.length <= maxValue) {
                                arr.push(cardInfo.cardFace)
                            }
                        }
                    }
                    secondStageArr.push(arr[Math.floor(Math.random() * arr.length)])
                    shuffle(secondStageArr)
                } else if (i === thirdIdx) {
                    let arr = []
                    for (let l = 0; l < colorDeck.length; l++) {
                        cardInfo = colorDeck[Math.floor(Math.random() * colorDeck.length)]
                        if (cardInfo.difficulty !== 'hard') {
                            while (arr.length <= maxValue) {
                                arr.push(cardInfo.cardFace)
                            }
                        }
                    }
                    thirdStageArr.push(arr[Math.floor(Math.random() * arr.length)])
                    shuffle(thirdStageArr)
                }
            }
            else if (difficultyLevel === 'Сложный') {
                let cardInfo
                if (i === firstIdx) {
                    let arr = []
                    for (let l = 0; l < colorDeck.length; l++) {
                        cardInfo = colorDeck[Math.floor(Math.random() * colorDeck.length)]
                        if (cardInfo.difficulty !== 'easy') {
                            while (arr.length <= maxValue) {
                                arr.push(cardInfo.cardFace)
                            }
                        }
                    }
                    firstStageArr.push(arr[Math.floor(Math.random() * arr.length)])
                    shuffle(firstStageArr)
                } else if (i === secondIdx) {
                    let arr = []
                    for (let l = 0; l < colorDeck.length; l++) {
                        cardInfo = colorDeck[Math.floor(Math.random() * colorDeck.length)]
                        if (cardInfo.difficulty !== 'easy') {
                            while (arr.length <= maxValue) {
                                arr.push(cardInfo.cardFace)
                            }
                        }
                    }
                    secondStageArr.push(arr[Math.floor(Math.random() * arr.length)])
                    shuffle(secondStageArr)
                } else if (i === thirdIdx) {
                    let arr = []
                    for (let l = 0; l < colorDeck.length; l++) {
                        cardInfo = colorDeck[Math.floor(Math.random() * colorDeck.length)]
                        if (cardInfo.difficulty !== 'easy') {
                            while (arr.length <= maxValue) {
                                arr.push(cardInfo.cardFace)
                            }
                        }
                    }
                    thirdStageArr.push(arr[Math.floor(Math.random() * arr.length)])
                    shuffle(thirdStageArr)
                }
            }

        }


        for (let j = 0; j < Number(stageItem[i].textContent); j++) {
            if (i === 0 || i === 3 || i === 6) {
                useDifficulty(0, 3, 6, cardGreen, greenCardsData)
            }
            if (i === 1 || i === 4 || i === 7) {
                useDifficulty(1, 4, 7, cardBrown, brownCardsData)
            }
            if (i === 2 || i === 5 || i === 8) {
                useDifficulty(2, 5, 8, cardBlue, blueCardsData)
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







startBtn.addEventListener('click', () => {
    gameplay.classList.add('gameplay_open')
    cardDeck.classList.add('card-deck_open')
    form.classList.remove('main-container__form_open')
    card.forEach((elem) => {
        elem.removeEventListener('click', openForm)
    })
    checkDifficulty()
})

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

startBtn.addEventListener('click', addQueue)

imgClose.addEventListener('click', queueNextElem)

imgClose.addEventListener('mouseup', () => {
    if (cardQueue.length === 1) {
        imgClose.style.opacity = '0'
        imgClose.style.visibility = 'hidden'
        nameStage[2].style.color = 'red'
    }
})
