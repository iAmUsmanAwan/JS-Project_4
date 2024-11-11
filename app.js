//* Array of images to be used in the game
const images = [
    '🍑', '🍑', '🍌', '🍌',
    '🍇', '🍇', '🍉', '🍉',
    '🍒', '🍒', '🥑', '🥑',
    '🍍', '🍍', '🍓', '🍓',
];

//* Function to Shuffle the images array
(function shuffle(array) {            //? array which will be passed as argument , Fisher Yates algorithm
    for (let i = array.length - 1; i > 0; i--)  // Start from the last element and move towards the first
        {
        const j = Math.floor(Math.random() * (i + 1));  // Pick a random index from 0 to i (inclusive)
        [array[i], array[j]] = [array[j], array[i]];  // Swap the elements at i and j
        }   // Repeat the process until all elements are swapped
})(images);  // Shuffle the images array right away to ensure the game starts with a random state

const gameBoard = document.getElementById("game-board");
let flippedCards = [];
let matchedCount = 0;

//* Create the game cards
images.forEach((image, index) => {  // For each image, create a card element and add the image and click event listener
    const card = document.createElement("div");  // Create a div element for each card
    card.classList.add("card", "flipped");    //? This adds two CSS classes to the card // Start with all cards face-up
    card.dataset.image = image;    //? Store the image in the card's dataset
    card.innerHTML = `<span>${image}</span>`; //? Add the image to the card
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);   //? Add the card to the game board
});

//* Hide all cards after 5 seconds
setTimeout(() => {
    const cards = document.querySelectorAll(".card");  // Get all the cards
    cards.forEach(card => card.classList.remove("flipped"));
}, 5000);

//* Flip the card when clicked
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

//* Check if the two flipped cards match and update the game state accordingly. Also, display a message when all pairs are matched.
function checkForMatch() {
    const [card1, card2] = flippedCards;       // Get the two flipped cards
    const isMatch = card1.dataset.image === card2.dataset.image;   // Check if the two cards match
    if (isMatch) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount += 2;
        flippedCards = [];

        if (matchedCount === images.length) {
            document.getElementById("message").innerText = 
            `"Congratulations! You've matched all the pairs!" 
            To play again, reload the page and have fun.`;
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}
