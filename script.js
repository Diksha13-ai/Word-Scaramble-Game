// Select HTML elements using their class or tag name
const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

// Declare variables to hold the correct word and a timer
let correctWord, timer;

// Define a function to initialize and start the timer
const initTimer = (maxTime) => {
  
// Clear any previous timers to prevent overlapping
  clearInterval(timer);
  
// Start a new timer that runs every second
  timer = setInterval(() => {
   
// Decrement the remaining time by one second and update the timer display
    if (maxTime > 0)
     {
      maxTime--;
      return (timeText.innerText = maxTime);
     }
// If time runs out, show an alert with the correct word and reset the game
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame();
  }, 1000);
  };


// Define a function to initialize the game with a new word and hint
const initGame = () => 
{
  // Call initTimer with a 30-second time limit
  initTimer(30);
 
  // Choose a random word from the 'words' array and shuffle its letters
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
  
   let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  
  // Update the word and hint displays with the scrambled word and its hint
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  // Store the correct word in lowercase for comparison later
  correctWord = randomObj.word.toLowerCase();
  // Reset the input field to an empty string and set its maximum length to the length of the correct word
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};
// Call the initGame function to start the game initially
initGame();

// Define a function to check the user's input word and handle success/failure
const checkWord = () => {
  // Get the user's input word in lowercase
  let userWord = inputField.value.toLowerCase();
  // If the input field is empty, show an alert and return without checking the word
  if (!userWord) return alert("Please enter the word to check!");
  // If the input word does not match the correct word, show an alert and return without resetting the game
  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not a correct word`);
  // If the input word matches the correct word, show an alert and reset the game
  alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  initGame();
};

// Add event listeners to the refresh and check buttons to call the corresponding functions
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);