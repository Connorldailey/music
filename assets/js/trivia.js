// Reference the trivia-section
const triviaSectionEl = document.querySelector('#trivia-section');

// Create an object to store gameplay data
let gameplayObject = {
    username: "",
    score: 0,
    numQuestions: 0,
    totalTime: 0,
    date: new Date().toJSON().slice(0, 10),
};

// Reference the username-module and username-form
const usernameModuleEl = document.querySelector('#username-module');
const usernameFormEl = document.querySelector('#username-form');
// Handle username form submission
const submitUsernameForm = function(event) {
    event.preventDefault();
    const username = usernameFormEl.username.value;
    if (!username || username === "") {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Please enter a valid username";
        usernameModuleEl.appendChild(errorMessage);
        return;
    }
    usernameModuleEl.setAttribute('style', 'display: none;')
    gameplayObject.username = username;
    startCountdown();
}
// Add an event listener to the username-form
usernameFormEl.addEventListener('submit', submitUsernameForm);

const startCountdown = function() {
    let timeLeft = 3;
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

let currentQuestion = {};
let timer;

const newQuestion = function() {
    clearRadioButtons();
    gameplayObject.numQuestions++;
    const questionIndex = Math.floor(Math.random() * multipleChoiceQuestions.length);
    const question = multipleChoiceQuestions[questionIndex];
    currentQuestion = question;
    renderQuestion();
}

const renderQuestion = function() {
    // Display the question
    const triviaModuleEl = document.querySelector('#trivia-module');
    triviaModuleEl.setAttribute('style', 'display: flex');
    const promptEl = document.querySelector('#prompt');
    promptEl.textContent = currentQuestion.prompt;
    const question1Label = document.querySelector('#question1Label');
    question1Label.textContent = currentQuestion.choices[0];
    const question2Label = document.querySelector('#question2Label');
    question2Label.textContent = currentQuestion.choices[1];
    const question3Label = document.querySelector('#question3Label');
    question3Label.textContent = currentQuestion.choices[2];
    const question4Label = document.querySelector('#question4Label');
    question4Label.textContent = currentQuestion.choices[3];
    // Handle the timer
    let timeLeft = 10;
    const timerEl = document.querySelector('#timer');
    timerEl.setAttribute('style', 'background-color: #66FF99;');
    timer = setInterval(function() {
        if (timeLeft != 0) {
            if (timeLeft <= 3) {
                timerEl.setAttribute('style', 'background-color: #ffcbca;');
            }
            timerEl.textContent = timeLeft;
            timeLeft--;
            gameplayObject.totalTime++;
        } else {
            timerEl.textContent = '';
            clearInterval(timer);
            displayResults(true);
            setTimeout(() => {
                endGame();
            }, 3000)
        }
    }, 1000);
}

const triviaFormEl = document.querySelector('#trivia-form');

const submitTriviaForm = function(event) {
    event.preventDefault();
    const correctRadio = `question${currentQuestion.correctIndex + 1}Input`;
    const timerEl = document.querySelector('#timer');
    let correctAnswer = false;
    if (document.getElementById(correctRadio).checked) {
        gameplayObject.score++;
        clearInterval(timer);
        correctAnswer = true;
        displayResults(correctAnswer);
        setTimeout(() => {
            timerEl.innerHTML = "";
            clearMessages();
            newQuestion();
        }, 3000);
    } else {
        clearInterval(timer);
        displayResults(correctAnswer);
        setTimeout(() => {
            timerEl.innerHTML = "";
            clearMessages();
            endGame();
        }, 3000);
    }
}

triviaFormEl.addEventListener('submit', submitTriviaForm);

const displayResults = function(correctAnswer) {
    const correctMessage = document.createElement('span');
    correctMessage.textContent = "Correct";
    correctMessage.setAttribute('style', 'color: #66FF99; margin-left: 1rem;');
    const correctDiv = `#question${currentQuestion.correctIndex + 1}Div`;
    const correctDivEl = document.querySelector(correctDiv);
    correctDivEl.appendChild(correctMessage);
    if (correctAnswer) {
        return;
    }
    const incorrectMessage = document.createElement('span');
    incorrectMessage.textContent = "Incorrect";
    incorrectMessage.setAttribute('style', 'color: #ffcbca;  margin-left: 1rem;');
    const radioButtons = document.querySelectorAll('input[name="question"]')
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            const incorrectDiv = `#question${i + 1}Div`;
            const incorrectDivEl = document.querySelector(incorrectDiv);
            incorrectDivEl.appendChild(incorrectMessage);
        }
    }
}

const clearMessages = function() {
    const messageElements = document.querySelectorAll('#trivia-form span');
    for (message of messageElements) {
        message.remove();
    }
}

const clearRadioButtons = function() {
    const radioButtons = document.querySelectorAll('input[name="question"]');
    for (button of radioButtons) {
        button.checked = false;
    }
}

const endGame = function() {
    const triviaModuleEl = document.querySelector('#trivia-module');
    triviaModuleEl.setAttribute('style', 'display: none;');
    const endgameModuleEl = document.querySelector('#endgame-module');
    endgameModuleEl.setAttribute('style', 'display: flex;');
    const unformattedAvgTime = gameplayObject.totalTime / gameplayObject.numQuestions;
    const avgTime = Math.round(unformattedAvgTime);
    let formattedAvgTime;
    if (avgTime === 1) {
        formattedAvgTime = `${Math.round(unformattedAvgTime)} second`;
    } else {
        formattedAvgTime = `${Math.round(unformattedAvgTime)} seconds`;
    }
    const statObject = {
        username: gameplayObject.username,
        score: gameplayObject.score,
        avgTime: formattedAvgTime,
        date: gameplayObject.date
    }
    const usernameEl = document.querySelector('#user');
    usernameEl.textContent = statObject.username;
    const scoreEl = document.querySelector('#score');
    scoreEl.textContent = statObject.score;
    const avgTimeEl = document.querySelector('#avgTime');
    avgTimeEl.textContent = statObject.avgTime;
    const dateEl = document.querySelector('#date');
    dateEl.textContent = statObject.date;
    updateStatsInStorage(statObject);
}

const restartButton = document.querySelector('#restart-button');
const restartGame = function(username) {
    gameplayObject = {
        username: username,
        score: 0,
        numQuestions: 0,
        totalTime: 0,
        date: new Date().toJSON().slice(0, 10),
    };
    const endgameModuleEl = document.querySelector('#endgame-module');
    endgameModuleEl.setAttribute('style', 'display: none;');
    startCountdown();
}
restartButton.addEventListener('click', function() {
    restartGame(gameplayObject.username);
});

const exitButton = document.querySelector('#exit-button');
const redirectPage = function() {
    window.location = "index.html";
}
exitButton.addEventListener('click', redirectPage);

// Appends a new entry to the statsObject in local storage
const updateStatsInStorage = function(stat) {
    const statsObject = readStatsFromStorage();
    statsObject.push(stat);
    localStorage.setItem('statsObject', JSON.stringify(statsObject));
}

// Reads local storage and returns the statsObject
const readStatsFromStorage = function() {
    const statsObject = localStorage.getItem('statsObject');
    if (statsObject && statsObject.length > 0) {
        return JSON.parse(statsObject);
    } else {
        return [];
    }
}

// Store the list of multiple choice questions
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
