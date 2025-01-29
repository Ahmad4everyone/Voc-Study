const quizData = [
    {
    question: "The science tht deals with the study of crops and field management is called:",
    options: ["agronomy", "botany", "entomology", "horticulture", "pathology"],
    answer: "agronomy"
},
{
    question: "Which of the following is a dicotyledon plant?",
    options: [ "sisal", "pineapple", "rice", "cassava", "sugarcane"],
    answer: "cassava"
},
{
    question: "The most limiting factor in agricultural production in Nigeria is.",
    options: ["farm inputs", "capital","labour","farm machinery", "land"],
    answer: "capital"
},
];


let currentQueInd = 0;
let score = 0;
let timer;
let timeLeft = 5;
let studentName = "";

const nameInputSection = document.getElementById("nameinput-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const studentNameInput = document.getElementById("student-name");
const startQuizBtn = document.getElementById("start-quiz");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("time-left");
const feedbackElement = document.getElementById("feedback");
const resultMessageElement = document.getElementById("result-message");

startQuizBtn.addEventListener("click", () => {
    studentName = studentNameInput.value.trim();
    if (studentName === '') {
        alert("please fill in your name!");
        return;
    }
    nameInputSection.classList.add("hidden");
    quizSection.classList.remove("hidden")
    loadQuestion();
    startTimer();
});
function loadQuestion(){
    const currentQuestion = quizData[currentQueInd];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(button);
    })
}
function checkAnswer (selectedOption) {
    const currentQuestion = quizData[currentQueInd];
    if (selectedOption === currentQuestion.answer) {
        score ++;
        feedbackElement.textContent = "correct!";
}
else{
    feedbackElement.textContent = "wrong!";
}
clearInterval(timer);
currentQueInd++;
if(currentQueInd < quizData.length) {
    timeLeft = 5;
    startTimer();
    loadQuestion();
} else {
    showResult()
}
}

function startTimer () {
    timer = setInterval (() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = "Time's up!";
            currentQueInd++;
            if(currentQueInd < quizData.length) {
                timeLeft = 5;
                startTimer();
                loadQuestion();
            } else{
                showResult();
            }
        }
    }, 1000);
}

function showResult(){
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    resultMessageElement.textContent = `${studentName} you scored ${score} out of ${quizData.length}!`
}