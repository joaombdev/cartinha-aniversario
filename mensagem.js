/*
Future improvements: create a function to reveal a card, so you wont need to write to reveal every time, just call the function.
*/

// mensagem.html, gift game
const gifts = document.querySelectorAll('.gift')

// Search, in the array, each gift
gifts.forEach(gift => {
    gift.addEventListener('click', () => {
        // Block to click on second card
        if (localStorage.getItem('chosenCard')) {
            console.log('Click blocked')
            return;
        }

        console.log('Card clicked')
        const back = gift.querySelector('.giftBack')
        const front = gift.querySelector('.giftFront')
        const id = gift.dataset.id
        console.log('Card chosen', id)

        // if special card
        if (id == "4") {
            console.log('Special card cliked')
            // open all cards
            gifts.forEach(g => {
                g.querySelector('.giftBack').style.display = 'none'
                g.querySelector('.giftFront').style.display = 'flex'
            })
            // SET_ITEM
            localStorage.setItem('chosenCard', "4")
        } else { // normal cards
            back.style.display = 'none'
            front.style.display = 'flex'
            // SET_ITEM
            localStorage.setItem('chosenCard', id)
        }
    })
})

// on page load verify if any card chosen already
function onPageLoad() {
    const chosenCard = localStorage.getItem('chosenCard')
    if (chosenCard) {
        console.log('Card already chosen:', chosenCard)
    }

    if (chosenCard === '4') {
        gifts.forEach(g => {
            g.querySelector('.giftBack').style.display = 'none'
            g.querySelector('.giftFront').style.display = 'block'
        })
    } else {
        const selectedGift = document.querySelector(`.gift[data-id="${chosenCard}"]`)
        if (selectedGift) {
            selectedGift.querySelector('.giftBack').style.display = 'none'
            selectedGift.querySelector('.giftFront').style.display = 'block'
        }
    }
}
onPageLoad()