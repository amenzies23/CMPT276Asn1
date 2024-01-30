let questions = [
    {
        q: "Which planet is known as the 'Red Planet'?",
        a: ["Mercury", "Earth", "Mars", "Venus"],
        correct: "Mars"
    },
    {
        q: "What is the capital city of France?",
        a: ["Rome", "Berlin", "Paris", "Madrid"],
        correct: "Paris"
    },
    {
        q: "Who wrote the play 'Romeo and Juliet'?",
        a: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correct: "William Shakespeare"
    },
    {
        q: "What is the largest mammal in the world?",
        a: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale"
    },
    {
        q: "What is the chemical symbol for gold?",
        a: ["Au", "Ag", "Pt", "Pb"],
        correct: "Au"
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = [-1,-1,-1,-1,-1]

document.addEventListener('DOMContentLoaded', (event) => {
    start();
    addAnswerListeners();
    addNavigationListeners();
    setupModalEvents();
});

function start(){
    displayQuestion(currentQuestionIndex);
}
//function to display the questions
function displayQuestion(index) {
    document.getElementById("question").innerHTML = questions[index].q;
    document.getElementById("num").innerHTML = "Question " + (index + 1);
    const answers = document.getElementById('answers').getElementsByTagName('li');

    for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = questions[index].a[i];
        answers[i].classList.remove('selected-answer');
        if (selectedAnswers[index] === answers[i].textContent) {
            answers[i].classList.add('selected-answer');
        }
    }
    document.getElementById('next-btn').disabled = selectedAnswers[index] === -1;
}

function addAnswerListeners() {
    const answers = document.getElementById('answers').getElementsByTagName('li');
    const nextButton = document.getElementById('next-btn');
    
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener('click', function() {
            nextButton.disabled = false;
            for (let j = 0; j < answers.length; j++) {
                answers[j].classList.remove('selected-answer');
            }
            this.classList.add('selected-answer');
            selectedAnswers[currentQuestionIndex] = this.textContent;
        });
    }
}

function addNavigationListeners() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    //disabling the next button by default so the user cant go forward until selecting an answer
    nextButton.disabled = true;

    prevButton.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            nextButton.disabled = selectedAnswers[currentQuestionIndex] === -1;
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            nextButton.disabled = true;
            nextButton.disabled = selectedAnswers[currentQuestionIndex] === -1;
        }
    });
}

//Function to show the results at the end of the quiz
function showResults() {
    let score = 0;
    let resultSummary = "Your score is: <br>";

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].correct === selectedAnswers[i]) {
            score++;
            resultSummary += " Question " + (i + 1) + ": Correct<br>";
        } else {
            resultSummary += " Question " + (i + 1) + ": Incorrect<br>";
        }
    }

    document.getElementById("resultText").innerHTML = resultSummary + "Total score: " + score + "/" + questions.length;
    openModal();
}

//When DOM loads, we setup the events for the modal. This will show the results and add functionality for closing the result box
function setupModalEvents() {
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
}

function openModal() {
    document.getElementById("resultsModal").style.display = "block";
}

function closeModal() {
    document.getElementById("resultsModal").style.display = "none";
}