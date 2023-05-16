const timeElement = document.querySelector("#time");
const startButton = document.querySelector('#start-btn');

const question = document.querySelector('#questionDiv');
const answerButton1 = document.querySelector('#option_1');
const answerButton2 = document.querySelector('#option_2');
const answerButton3 = document.querySelector('#option_3');
const answerButton4 = document.querySelector('#option_4');
const resultText = document.querySelector("#resultText");

const introSection = document.querySelector('#introSection');
const questionSection = document.querySelector('#questionSection');
const currentResultDisplay = document.querySelector("#currentResultDisplay");
const highScoreSection = document.querySelector("#highScoreSection");
const scoreValue = document.querySelector("#score_value");

let secondsLeft = 35;
timeElement.innerHTML = secondsLeft;
let correctAnswer = "";
let currentQuestionIndex = 0;
let questionInterval;
let currentScore;
let questionStartTime = secondsLeft;
let firstTime = true;
let initialsForm = document.getElementById("initialsForm");
let initialOfHighScorer = localStorage.getItem("initials") || " ";
let highScore = localStorage.getItem("highScore") || 0;
scoreValue.innerHTML = initialOfHighScorer + " : " + highScore;
let timer;


const question1 = [
    "1. What JavaScript keyword declares a variable?",
    "1.var", "2.if", "3.for", "4.create", "1.var"
];

const question2 = [
    "2.JavaScript is interpreted by _________",
    "1.Client", " 2.Server", " 3.Object", "4.None of the above", "1.Client"
];

const question3 = [
    "3.Which operator is used to assign a value to a variable?",
    "1.+", "2.=", "3./", "4.*", "2.="
];

const questionSections = [question1, question2, question3];

function setTime() {
    timer = setInterval(timerDisplay, 1000);
}

function startButtonClick(event) {
    setTime();
    displayQuestions();
}

function displayQuestions() {
    questionStartTime = secondsLeft;
    console.log("inside for displayQuestions " + secondsLeft);
    if (currentQuestionIndex > 2) {
        currentScore = secondsLeft;
        showScore();
        return;
    }
    
    let questionDetails = questionSections[currentQuestionIndex];    
    console.log("inside for displayQuestions");
    
    question.innerHTML = questionDetails[0];
    answerButton1.innerHTML = questionDetails[1];
    answerButton2.innerHTML = questionDetails[2];
    answerButton3.innerHTML = questionDetails[3];
    answerButton4.innerHTML = questionDetails[4];
    correctAnswer = questionDetails[5];
    currentQuestionIndex++; 

    if (firstTime) {
        introSection.classList.add("hideElement");
        questionSection.classList.add("showElement"); 
        firstTime = false;
    } else {
        currentResultDisplay.classList.remove("hideElement");
        currentResultDisplay.classList.add("showElement");
    }
}
startButton.addEventListener('click', startButtonClick);


function timerDisplay() {
    if (secondsLeft <= 0) {
        currentScore = 0;
        resultText.innerHTML= "Wrong";
        timeElement.innerHTML = 0;
        showScore();
        return;
    }
    if ((questionStartTime - 10) === secondsLeft) {  
        secondsLeft -= 10;      
        resultText.innerHTML= "Wrong";
        displayQuestions();        
    }
        timeElement.innerHTML = --secondsLeft;
}


function checkAnswer(val) {   
    if (val.textContent === correctAnswer) {
        resultText.innerHTML = "Correct";
    } else {
        secondsLeft -= 10;
        timeElement.innerHTML = secondsLeft;
        resultText.innerHTML = "Wrong";
    }
    displayQuestions();      
}

function showScore () {
    clearInterval(timer);
    document.getElementById("finalScore").innerHTML = "Your final score is " + currentScore;
    questionSection.classList.remove("showElement");
    resultSection.classList.add("showElement");
}

initialsForm.addEventListener("submit", (e) => {
    e.preventDefault();  
    let initials = document.getElementById("initials").value;
    if (currentScore > highScore) {
        localStorage.setItem("highScore", currentScore);
        localStorage.setItem("initials", initials);
        scoreValue.innerHTML = initials + " : " + currentScore;
    }
    displayFinalSection(initials,currentScore);
})

function displayFinalSection (initials,currentScore) {
    currentResultDisplay.classList.remove("showElement");
    currentResultDisplay.classList.add("hideElement");
    resultSection.classList.remove("showElement");
    //resultSection.classList.add("hideElement");
    highScoreSection.classList.add("showElement");
    document.getElementById("displayFinalScore").value = initials + " - " + currentScore;
}

function clearHighScore (){
    localStorage.removeItem("highScore");
    localStorage.removeItem("initials");
    document.getElementById("displayFinalScore").value = "";
    scoreValue.innerHTML = "";
}




function reloadWindow(){
    location.reload();
}








