//array of question objects hardcoded as the assignment says
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
//variables to keep track of the current index, and the selected answers
let currentQuestionIndex = 0;
let selectedAnswers = [-1,-1,-1,-1,-1]

//as the site is loaded, this function will run the following events to begin the page
document.addEventListener('DOMContentLoaded', (event) => {
    displayQuestion(currentQuestionIndex);
    addAnswerListeners();
    addNavigationListeners();
    setupModalEvents();
});

//function to display the questions
function displayQuestion(index) {
    //grab the html elements for the current question and question number
    document.getElementById("question").innerHTML = questions[index].q;
    document.getElementById("num").innerHTML = "Question " + (index + 1);
    //grabbing the list of answers as an array so we can update each answer choice below
    const answers = document.getElementById('answers').getElementsByTagName('li');
    //display the answer options
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = questions[index].a[i];
        //remove the selected-answer class by default, but add it back if it is the answer selected
        answers[i].classList.remove('selected-answer');
        if (selectedAnswers[index] === answers[i].textContent) {
            answers[i].classList.add('selected-answer');
        }
    }
    //if we are at the first question, disable the prev button
    if(currentQuestionIndex === 0){
        document.getElementById('prev-btn').disabled = true;
    }else{
        document.getElementById('prev-btn').disabled = false;
    }
    //If the current index answer is -1, then the right side returns true so the next button is disabled
    document.getElementById('next-btn').disabled = selectedAnswers[index] === -1;
}

function addAnswerListeners() {
    const answersList = document.getElementById('answers');
    const answers = answersList.getElementsByTagName('li');
    const submitButton = document.getElementById('submit-btn');
    const nextButton = document.getElementById('next-btn');
    
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener('click', function() {
            // Logic for selecting an answer
            for (let j = 0; j < answers.length; j++) {
                answers[j].classList.remove('selected-answer');
            }
            this.classList.add('selected-answer');
            selectedAnswers[currentQuestionIndex] = this.textContent; // Store the selected answer
            nextButton.disabled = false;
            // Check if all questions have been answered
            const allAnswered = selectedAnswers.every(answer => answer !== -1 && answer !== null && answer !== '');
            submitButton.disabled = !allAnswered; // Enable submit button only if all questions are answered
        });
    }
}
//adding listening functions for the navigation buttons
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
    let questionsResultsContent = "";
    //display the results in the modal in a clean way
    for (let i = 0; i < questions.length; i++) {
        questionsResultsContent += `<div class='question-result'>
            <strong>Question ${i + 1}:</strong><br>
            <span class='user-answer'>Your answer: ${selectedAnswers[i]}</span><br>
            <span class='correct-answer'>Correct answer: ${questions[i].correct}</span>
        </div>`;

        if (questions[i].correct === selectedAnswers[i]) {
            score++;
        }
    }
    document.getElementById("questionsResults").innerHTML = questionsResultsContent;
    document.getElementById("totalScore").innerHTML = `Total score: ${score}/${questions.length}`;
    openModal();
    //Adding an event listener for clicking the restart quiz button
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

//when DOM loads, we setup the events for the modal. This will show the results and add functionality for closing the result box
function setupModalEvents() {
    //get the modal
    var modal = document.getElementById("resultsModal");
    //get the span element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    //when the user clicks on span (x), close the modal
    span.onclick = function() {
        closeModal();
    }
    //when the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}
//function to open the modal
function openModal() {
    document.getElementById("resultsModal").style.display = "block";
}
//function to close the modal
function closeModal() {
    document.getElementById("resultsModal").style.display = "none";
}
//function to restart the quiz - resets everything back to default
function restartQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers.fill(-1);
    document.getElementById('next-btn').disabled = true; //ensure next button is disabled initially
    document.getElementById('submit-btn').disabled = true; //ensure submit button is disabled until all answers are selected
    closeModal();
    displayQuestion(currentQuestionIndex);
}