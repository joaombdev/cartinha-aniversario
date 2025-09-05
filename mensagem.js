// mensagem.html, jogo de cartas
const gifts = document.querySelectorAll('.gift')

// Search, in the array, each gift
gifts.forEach(gift => {
    gift.addEventListener('click', () => {
        console.log('Card clicked')
        const back = gift.querySelector('.giftBack')
        const front = gift.querySelector('.giftFront')
        const id = gift.dataset.id

        // verify special card
        // if (localStorage.getItem('chosenCard')) {
        //     return
        // }

        // if special card
        if (id == "4") {
            console.log('Special card cliked')
            gifts.forEach(g => {
                g.querySelector('.giftBack').style.display = 'none'
                g.querySelector('.giftFront').style.display = 'block'
            })
            // localStorage.setItem('chosenCard', "all")
        } else { // normal cards
            back.style.display = 'none'
            front.style.display = 'block'
            // localStorage.setItem('chosenCard', id)
        }


        // if (chosenCard) {
        //     // carta não pode ser clicável
        // }
    })
})

// on page load verify if any card chosen already
function onPageLoad() {
    const chosenCard = localStorage.getItem('chosenCard')
    if (chosenCard) {
        console.log('Carta já foi escolhida:', chosenCard)
    }
}
onPageLoad()

