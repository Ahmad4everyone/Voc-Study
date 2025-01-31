const quizData = [
    {
    question: "The science tht deals with the study of crops and field management is called:",
    options: ["agronomy", "botany", "horticulture", "pathology"],
    answer: "agronomy"
},
{
    question: "Which of the following is a dicotyledonous plant?",
    options: [ "sisal", "rice", "cassava", "sugarcane"],
    answer: "cassava"
},
{
    question: "The most limiting factor in agricultural production in Nigeria is?",
    options: [ "capital","labour","farm machinery", "land"],
    answer: "capital"
},
{
    question: "Mechanized land clearing is done by:",
    options: ["bush burning", "caterpillar", "cutlass", "grader",],
    answer: "caterpillar"
},
{
    question: "An andvantage of commercial agriculture is that?",
    options: ["requires small space", "requires skilled labour", "involves low capital", "all of the above"],
    answer: "all of the above"
},
{
    question: "Which of following is a complete form of rest?",
    options: ["exercise", "rest", "sleep", "standing"],
    answer: "sleep"
},
{
    question: "Cooking food by heat in an enclosed space is what?",
    options: ["steaming", "baking", "frying", "boiling"],
    answer: "steaming"
},
{
    question: "___ and ____ are cure for fatigue?",
    options:["reading & sewing", "rest & sleep", "singing & washing", "running & jogging"],
    answer: "rest & sleep"
},
{
    question: "The green revolution is an example of government agricultural what?",
    options: ["extension", "policy", "programme", "research"],
    answer: "programme"
},
{
    question: "The Nigerian land use of Act of 1978 puts the right of land on the?",
    options: ["Governor of a state", "head of the society", "President of the farmers co-operative", "traditional rulers"],
    answer: "Governor of a state"
},
{
    question: "The main reason for establishing game reserve is to prevent wild-life from:",
    options: ["being poached", "being hunted periodically", "attacking tourists", "becoming extint"],
    answer: "being poached"
},
{
    question: "The biotic factor which derives much from livestock and reduces productivity is a ?",
    options: ["predator", "temperature", "pathogen", "parasite"],
    answer: "parasite"
},
{
    question: "Which of the following groups of crops grow best in the savannah zone of west africa?",
    options: ["maize, millet and groundnut", "cocoa, kola and palmoil", "cotton, cocoa and guinea-corn", "banana, rubber and milet"],
    answer: "maize, millet and groundnut"
},
{
    question: "The different between subsidy and loan is that subsidy is:",
    options: ["a short term credit while loan is long term credit", "is a medium term credit while loan is a long term credit", "requires a collateral while loan doesn't", "none of the above"],
    answer: "none of the above"
},
{
    question: "Which of the following is a form of complete rest?",
    options:["exercise", "rest", "sleep", "standing"],
    answer: "sleep"
}
];


let currentQueInd = 0;
let score = 0;
let timer;
let timeLeft = 15;
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
const voc = document.getElementById("voc");


startQuizBtn.addEventListener("click", () => {

    voc.style.display = "none";
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
    timeLeft = 15;
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
                timeLeft = 15;
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
    resultMessageElement.textContent = `${studentName}!  you scored ${score} out of ${quizData.length}.`
}