const images = [
    '🍎', '🍎', '🍌', '🍌',
    '🍇', '🍇', '🍉', '🍉',
    '🍒', '🍒', '🥭', '🥭',
    '🍍', '🍍', '🍓', '🍓'
];

// Shuffle the images array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(images);

const gameBoard = document.getElementById("game-board");
let flippedCards = [];
let matchedCount = 0;

// Create the game cards
images.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "flipped"); // Start with all cards face-up
    card.dataset.image = image;
    card.innerHTML = `<span>${image}</span>`;
    
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
});

// Hide all cards after 5 seconds
setTimeout(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("flipped"));
}, 5000);

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount += 2;
        flippedCards = [];

        if (matchedCount === images.length) {
            document.getElementById("message").innerText = "Congratulations! You've matched all the pairs!";
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}
