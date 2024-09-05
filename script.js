const cardValues = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${value}</div>
        </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function startNewGame() {
    const shuffledValues = shuffleArray([...cardValues]);
    const gameBoard = document.getElementById('game-board');
    
    gameBoard.innerHTML = '';
    shuffledValues.forEach(value => gameBoard.appendChild(createCardElement(value)));
    
    // Reset attempts
    attempts = 0;
    document.getElementById('attempts-counter').innerText = `Attempts: ${attempts}`;
}

function flipCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;
    card.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = card;
        return;
    }
    
    secondCard = card;
    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;
    
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', () => flipCard(firstCard));
    secondCard.removeEventListener('click', () => flipCard(secondCard));
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
    incrementAttempts();
}

function incrementAttempts() {
    attempts++;
    document.getElementById('attempts-counter').innerText = `Attempts: ${attempts}`;
}

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', startNewGame);
