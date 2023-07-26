//DEPENDENCIES
var timeElement = document.querySelector("time");
var mainElement = document.querySelector("main");
var startButton = document.querySelector("start-button");
var questionsElement = document.querySelector(".questions");
var a1Element = document.getElementById("answer-1");
var a2Element = document.getElementById("answer-2");
var a3Element = document.getElementById("answer-3");
var a4Element = document.getElementById("answer-4");
var greeting = document.getElementById("greeting");
var response = document.getElementById("response")
var timerElement = document.querySelector(".timer-count");

//DATA
var quizAnswers = document.getElementById("quiz-answers");
var results = document.getElementById("results");
var submitButton = document.getElementById("submit-button");

// Array of questions
var quizQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    answers: {
        a: 'var x = 10',
        b: 'let x = 10',
        c: 'const x = 10',
        d: 'all of the above'
    },
    correctAnswer: 'd'
},
{
  question: "How do you write a comment in JavaScript?",
  answers: {
      a: '<!-- this is a comment -->',
      b: '//this is a comment',
      c: '/* this is a comment */',
      d: 'this is a comment'
  },
  correctAnswer: 'b'
},
{
  question: "Which built in method is used to convert a string to uppercase in JavaScript?",
  answers: {
      a: 'toUpperCase()',
      b: 'upperCase()',
      c: 'convertUpperCase()',
      d: 'toUpper()'
  },
  correctAnswer: 'a'
},
{
  question: "What does the '===' operator do in JavaScript",
  answers: {
      a: 'Compares two values for equality, ignoring their data type',
      b: 'Compares two values for equality, including their data types',
      c: 'Assigns a value to a variable',
      d: 'Checks if a value is greater than or equal to another value'
  },
  correctAnswer: 'b'
},
{
  question: "What does the 'typeOf' operator return in JavaScript",
  answers: {
      a: 'The type of a variable as a string',
      b: 'The value of a variable',
      c: 'The size of the array',
      d: 'The data type of a variable as a boolean'
  },
  correctAnswer: 'a'
},
{
  question: "Which function is used to output data in the browser's console in JavaScript?",
  answers: {
      a: 'console.log()',
      b: 'alert()',
      c: 'print()',
      d: 'document.write()'
  },
  correctAnswer: 'a'
},
{
  question: "How do you add an event listener to a button with the ID 'myButton' in Javascript?",
  answers: {
      a: "addEventListener('click', myFunction",
      b: 'onclick = myFunction',
      c: "myButton.addEventListener('click', myFunction)",
      d: "on('click', myButton, myFunction)"
  },
  correctAnswer: 'c'
},
{
  question: "Which statement is used to exit a loop prematurely in Javascript?",
  answers: {
      a: 'return',
      b: 'exit',
      c: 'stop',
      d: 'break'
  },
  correctAnswer: 'd'
},
]

/*
// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}
*/

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  greeting.classList.add("hidden")
  quizAnswers.classList.remove("hidden")
  displayQuestion()

  //startTimer()
}

function displayQuestion(){

}

// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Creates blanks on screen
function renderBlanks() {
  // Randomly picks word from words array
  chosenWord = words[Math.floor(Math.random() * words.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blanksLetters = []
  // Uses loop to push blanks to blankLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  // Converts blankLetters array into a string and renders it on the screen
  wordBlank.textContent = blanksLetters.join(" ")
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}


function checkAnswer(event) {
  console.log(event.target.textContent)
  var currentQuestion = jsQuestions[questionIndex]
  if(currentQuestion.correctAnswer === event.target.textContent){
    console.log('correct!');
    response.textContent = "correct!";
  } else {
    console.log('incorrect!');
    secondsLeft = secondsLeft - 5;
    response.textContent = "incorrect!";
  }
  questionIndex++
  showQuestion();
}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
