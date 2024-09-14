const triviaSectionEl = document.querySelector('#trivia-section');

const formModuleEl = document.querySelector('#username-module');
const usernameFormEl = document.querySelector('#username-form');

const submitUsernameForm = function(event) {
    event.preventDefault();
    const username = usernameFormEl.username.value;
    if (!username || username === "") {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Please enter a valid username";
        formModuleEl.appendChild(errorMessage);
        return;
    }
    formModuleEl.setAttribute('style', 'display: none;')
    initializeGame(username);
}

usernameFormEl.addEventListener('submit', submitUsernameForm);

const initializeGame = function(username) {
    startCountdown();
}

const startCountdown = function() {
    let timeLeft = 5;
    const countEl = document.createElement('p');
    const timeInterval = setInterval(function() {
        if (timeLeft != 0) {
            countEl.textContent = timeLeft;
            triviaSectionEl.appendChild(countEl);
            timeLeft--;
        } else {
            countEl.textContent = '';
            clearInterval(timeInterval);
            newQuestion();
        }
    }, 1000);
}

const newQuestion = function() {
    const questionIndex = Math.floor(Math.random() * multipleChoiceQuestions.length);
    const question = multipleChoiceQuestions[questionIndex];
    renderQuestion(question);
}

const renderQuestion = function(question) {
    const triviaSectionEl = document.querySelector('#trivia-module');
    triviaSectionEl.setAttribute('style', 'display: flex');
    const promptEl = document.querySelector('#prompt');
    promptEl.textContent = question.prompt;
    const question1Label = document.querySelector('#question1Label');
    question1Label.textContent = question.choices[0];
    const question2Label = document.querySelector('#question2Label');
    question2Label.textContent = question.choices[1];
    const question3Label = document.querySelector('#question3Label');
    question3Label.textContent = question.choices[2];
    const question4Label = document.querySelector('#question4Label');
    question4Label.textContent = question.choices[3];
}

const triviaFormEl = document.querySelector('#trivia-form');

const submitTriviaForm = function(event) {
    event.preventDefault();
}

triviaFormEl.addEventListener('submit', submitTriviaForm);

const multipleChoiceQuestions = [
    {
        prompt: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correctIndex: 2
    },
    {
        prompt: "Who wrote the novel '1984'?",
        choices: ["George Orwell", "Aldous Huxley", "J.K. Rowling", "Ernest Hemingway"],
        correctIndex: 0
    },
    {
        prompt: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correctIndex: 1
    },
    {
        prompt: "In what year did the Titanic sink?",
        choices: ["1912", "1905", "1923", "1898"],
        correctIndex: 0
    },
    {
        prompt: "What is the chemical symbol for gold?",
        choices: ["Ag", "Au", "Pb", "Fe"],
        correctIndex: 1
    },
    {
        prompt: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctIndex: 1
    },
    {
        prompt: "Which country is home to the kangaroo?",
        choices: ["Canada", "South Africa", "Australia", "Brazil"],
        correctIndex: 2
    },
    {
        prompt: "What is the largest mammal in the world?",
        choices: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
        correctIndex: 1
    },
    {
        prompt: "How many continents are there on Earth?",
        choices: ["5", "6", "7", "8"],
        correctIndex: 2
    },
    {
        prompt: "What is the longest river in the world?",
        choices: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctIndex: 1
    }
];
