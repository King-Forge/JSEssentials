//declare variables with global scope,
//since they will be accessed & persist across multiple functions
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
//redundant, will always be called when game starts
//let cards = shuffle(colors.concat(colors));
let cards = [];
let selectedCards = [];
let score = 0;
let gameInterval;

const gameDuration = 30; //added this, because repeating literals in functions is gross
//note: lab code dorked this all up with 3 layers of shadowing, refactored to use one global variable
//not ideal, but it's a simple project and it's better than the mess we started with
let timeLeft = gameDuration;

//assign variable names to some DOM elements, same concept as above
const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

//handleCardDlick already checks if target is a card, no harm in adding this before game starts
gameContainer.addEventListener('click', handleCardClick);

startbtn.addEventListener('click', startGame);

function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCardClick(event) {
    if(!gameInterval) return; //game not running, no interactionn permitted with game board

    const card = event.target;
    //break out of this function if the target isn't a card element, if the card has already been matched
    //if 2 cards have already been selected (checkMatch interval is running) or if one card is selected twice
    if (!card.classList.contains('card') ||
      card.classList.contains('matched') ||
      selectedCards.length >= 2 ||
      selectedCards.includes(card)) {
        return;
    }
    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    selectedCards = [];
}

function startGame() {
    if(gameInterval) return; //game already running, do nothing

    timeLeft = gameDuration;
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer();
    cards = shuffle(colors.concat(colors).concat(colors).concat(colors)); //4 copies of each color, 2 pairs
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    //the lab wanted me to add this here, doesnt' make sense to do this every time you start a game
    //not harmful, but redundant, moved it outside for ease of reading
    //gameContainer.addEventListener('click', handleCardClick);
}

function startGameTimer() {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            gameInterval = null; //so the test in startGame works, otherwise would test as true
            //timeLeft = 30; don't need this either, since global is reset by startGame
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
}

