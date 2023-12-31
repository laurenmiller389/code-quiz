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
  var currentQuestion = jsQuestions[questionIndex]
  questionEl.textContent = currentQuestion.question
  a1Element.textContent = currentQuestion.answers.a
  a2Element.textContent = currentQuestion.answers.b
  a3Element.textContent = currentQuestion.answers.c
  a4Element.textContent = currentQuestion.answers.d
}



// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  var timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      sendMessage();
    }
  }, 1000);
}

//send message
function sendMessage() {
  timeEl.textContent = "Quiz Complete!";
  var imgElement = document.createElement("img");
  imgElement.setAttribute("src", "../assets/images/congrats.jpg")
  mainElement.appendChild(imgElement);
 }

var questionIndex = 0
var secondsLeft = 60

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
  displayQuestion();
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", function(){
  startQuiz()
  startTimer()
});

//listens for a click to answers
a1Element.addEventListener('click', checkAnswer)
a2Element.addEventListener('click', checkAnswer)
a3Element.addEventListener('click', checkAnswer)
a4Element.addEventListener('click', checkAnswer)

// These functions are used by init
function highScores() {
  // Get stored value from client storage, if it exists
  var highscores;
  highscores = localStorage.getItem("highscores");
  highScores()
}

var initialsInput = document.querySelector("#initials");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var initials = document.querySelector("#initials").value;
    if (initials === "") {
        displayMessage("error", "Initials cannot be blank!");
    } else {
        displayMessage("success", "Your scores have been recorded!");

        localStorage.setItem("initials", initials)
    
    }
});
