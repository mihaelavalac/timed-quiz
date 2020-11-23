// Var with array and object for questions
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "#li3",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "#li3",
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "#li4",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "#li3",
  },
  {
    title:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "#li4",
  },
];

//var container = document.querySelector("#container"); //container of the quiz content
// the time "75"
var timeLeft = 75;
var penalty = 10;
var choice1 = document.querySelector("#li1");
var choice2 = document.querySelector("#li2");
var choice3 = document.querySelector("#li3");
var choice4 = document.querySelector("#li4");
var quizQuestionsEl = document.querySelector("#quizQuestion");
var userChoice = [choice1, choice2, choice3, choice4];
var questionIndex = 0;
var userAnswer = document.querySelector("#userAnswer");
var timer = document.querySelector("#startQuiz"); //Start Quiz button on the first page
var currentTimeEl = document.querySelector("#currentTime");
var listChoicesEl = document.querySelector("#listChoices"); //ul-tag id

//this code runs just for initials.html file
if (window.location.href.indexOf("questions.html") > -1) {
  var interval = setInterval(function () {
    if (timeLeft <= 0 || questionIndex >= questions.length) {
      clearInterval(interval);
      window.open("initials.html", "_self");
      localStorage.setItem("timeLeft", timeLeft);
    }
    currentTimeEl.innerHTML = timeLeft;
    timeLeft--;
  }, 1000);

  var userQuestion = questions[questionIndex].title;
  quizQuestionsEl.textContent = userQuestion;
  for (var i = 0; i < questions[questionIndex].choices.length; i++) {
    userChoice[i].textContent = questions[questionIndex].choices[i];
  }

  listChoicesEl.addEventListener("click", function (event) {
    if (questionIndex < questions.length) {
      if (event.target.matches(questions[questionIndex].answer)) {
        userAnswer.textContent = "Correct!";
        let localInterval = setInterval(function () {
          userAnswer.textContent = "";
          clearInterval(localInterval);
        }, 2000);
      } else {
        userAnswer.textContent = "Wrong!";
        timeLeft -= 10;
        let localInterval = setInterval(function () {
          userAnswer.textContent = "";
          clearInterval(localInterval);
        }, 2000);
      }
      questionIndex++;
      if (questionIndex < questions.length) {
        userQuestion = questions[questionIndex].title;
        quizQuestionsEl.textContent = userQuestion;
        for (var i = 0; i < questions[questionIndex].choices.length; i++) {
          userChoice[i].textContent = questions[questionIndex].choices[i];
        }
      }
    }
  });
}

var userScore = document.getElementById("finalScore");
var userInitials = document.getElementById("userInitials");
var submitButton = document.getElementById("submitButton");
//This code runs just for initials.html file
if (window.location.href.indexOf("initials.html") > -1) {
  var finalScore = localStorage.getItem("timeLeft");
  if (finalScore > 10) {
    userScore.textContent = "Your final score is " + finalScore;
  } else {
    userScore.textContent = "Your final score is " + 0;
  }

  currentTimeEl.textContent = " " + finalScore;

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var input = userInitials.value.toUpperCase();
    if (input === null) {
      alert("Enter your initials!");
    } else {
      var yourScore = {
        input: input,
        score: finalScore,
      };
    }
    console.log(yourScore);
    var allScores = localStorage.getItem("allScores");
    if (allScores === null) {
      allScores = [];
    } else {
      allScores = JSON.parse(allScores);
    }
    allScores.push(yourScore);
    var newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    // Travels to final page
    window.location.replace("high-scores.html");
  });
}

//declared variables for high-scores.html file
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");
var listAppend = document.getElementById("score");
var container = document.getElementById("container");
//The above code will run just when the user navigates the high-score.html file.

if (window.location.href.indexOf("high-scores.html") > -1) {
  var finalTime = localStorage.getItem("timeLeft");
  currentTimeEl.textContent = " " + finalTime;

  // Declared variables
  clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
  // Retreives local stroage
  var allScores = localStorage.getItem("allScores");
  allScores = JSON.parse(allScores);

  if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
   
      var createLi = document.createElement("li");
      createLi.textContent = allScores[i].input + " " + allScores[i].score;
      createLi.setAttribute(
        "style",
        "background-color: pink; text-align: left; font-size: 15px; margin: 10px; width: 100%; padding-left: 15px; "
      );
      listAppend.appendChild(createLi);
    }
    function orderScores () {

    }

    
  }
}   
 // Event listener to move to index page
goBack.addEventListener("click", function () {
  window.location.replace("index.html");
});
