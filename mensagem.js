/*
Future improvements: create a function to reveal a card, so you wont need to write to reveal every time, just call the function.
*/

// mensagem.html, gift game
const deck = document.querySelector('.deck')
const gifts = document.querySelectorAll('.gift')
const SPECIAL_ID = '4'      // id da carta especial (data-id="4")

// bloqueio em memória para evitar cliques concorrentes
let isLocked = !!localStorage.getItem('chosenCard')

// Fisher-Yates shuffle
function shuffleCards() {
    const cardsArray = Array.from(gifts)
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]]
    }
    // Reapende os elementos na nova ordem (appendChild move elementos existentes)
    cardsArray.forEach(card => deck.appendChild(card))
}

// revela uma carta (usando classe em vez de style direto)
function revealCardElement(g) {
    g.classList.add('revealed')
}

// revela todas as cartas
function revealAll() {
    gifts.forEach(revealCardElement)
}

// carregamento inicial: aplica escolha salva (se houver)
function onPageLoad() {
    const chosen = localStorage.getItem('chosenCard')
    if (!chosen) return

    // marca isLocked para evitar clique após carregamento
    isLocked = true
    if (chosen === 'special') {
        revealAll()
    } else {
        const selected = document.querySelector(`.gift[data-id="${chosen}"]`)
        if (selected) revealCardElement(selected)
    }
}

//// Eventos de clique
gifts.forEach(gift => {
    gift.addEventListener('click', () => {
        if (isLocked) {
            console.log('Click blocked')
            return
        }

        isLocked = true // bloqueia imediatamente
        const id = gift.dataset.id

        if (id === SPECIAL_ID) {
            console.log('Special card clicked')
            revealAll()
            localStorage.setItem('chosenCard', 'special') // salva semântico
        } else {
            console.log('Card chosen:', id)
            revealCardElement(gift)
            localStorage.setItem('chosenCard', id)
        }
    })
})

// só embaralha se ninguém já escolheu
if (!localStorage.getItem('chosenCard')) shuffleCards()
onPageLoad()