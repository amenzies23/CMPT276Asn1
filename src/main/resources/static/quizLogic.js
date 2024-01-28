let q1 = {
    q: "What is the derivative of f(x) = x^2?",
    a: ["2x", "2x^3", "2x^2", "0"],
    correct: "2x"
}
let q2 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q3 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}

let q4 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q5 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q6 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q7 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q8 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q9 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}
let q10 = {
    q: "What is the integral of g(x) = 1/2x",
    a: ["2", "1/2", "x^2", "y"],
    correct: "x^2"
}

let questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];

let currentQuestionIndex = 1;
let selectedAnswers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]

document.addEventListener('DOMContentLoaded', (event) => {
    start();
    addAnswerListeners();
    addNavigationListeners();
});

function start(){
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index){
    document.getElementById("question").textContent = questions[index].q;
    document.getElementById("a1").textContent = questions[index].a[0];
    document.getElementById("a2").textContent = questions[index].a[1];
    document.getElementById("a3").textContent = questions[index].a[2];
    document.getElementById("a4").textContent = questions[index].a[3];
}

function addAnswerListeners() {
    const answersList = document.getElementById('answers');
    const answers = answersList.getElementsByTagName('li');
    
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener('click', function() {
            // Remove 'selected-answer' class from all answers
            for (let j = 0; j < answers.length; j++) {
                answers[j].classList.remove('selected-answer');
            }

            // Add 'selected-answer' class to clicked answer
            this.classList.add('selected-answer');

            // Store the selected answer
            selectedAnswers[currentQuestionIndex] = this.textContent;
            console.log('Selected Answer:', selectedAnswers[currentQuestionIndex]);
        });
    }
}

function addNavigationListeners() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    });
}

function showResults() {
    let score = 0;
    let resultSummary = "Your score is: ";

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].correct === selectedAnswers[i]) {
            score++;
            resultSummary += "\nQuestion " + (i + 1) + ": Correct";
        } else {
            resultSummary += "\nQuestion " + (i + 1) + ": Incorrect";
        }
    }

    document.getElementById("resultText").textContent = resultSummary + "\n\nTotal score: " + score + "/" + questions.length;
    openModal();
}

function openModal() {
    document.getElementById("resultsModal").style.display = "block";
}

function closeModal() {
    document.getElementById("resultsModal").style.display = "none";
}

// Get the modal
var modal = document.getElementById("resultsModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}