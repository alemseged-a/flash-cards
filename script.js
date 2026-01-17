let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
let currentIndex = 0;
let showingAnswer = false;

const flashcardEl = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const addBtn = document.getElementById("addBtn");

// Display current flashcard
function displayFlashcard() {
    if (flashcards.length === 0) {
        flashcardEl.innerText = "No flashcards yet. Add one below!";
        return;
    }
    showingAnswer = false;
    flashcardEl.innerText = flashcards[currentIndex].question;
}

// Flip the card
flipBtn.addEventListener("click", () => {
    if (flashcards.length === 0) return;

    showingAnswer = !showingAnswer;
    flashcardEl.innerText = showingAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question;
});

// Navigate previous
prevBtn.addEventListener("click", () => {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayFlashcard();
});

// Navigate next
nextBtn.addEventListener("click", () => {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex + 1) % flashcards.length;
    displayFlashcard();
});

// Add new flashcard
addBtn.addEventListener("click", () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
        alert("Please enter both question and answer!");
        return;
    }

    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));

    questionInput.value = "";
    answerInput.value = "";

    currentIndex = flashcards.length - 1;
    displayFlashcard();
});

// Initialize display
displayFlashcard();
