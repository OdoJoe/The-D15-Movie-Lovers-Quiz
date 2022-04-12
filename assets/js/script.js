// counters recorded during game
let questionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

// list of questions
let questions = [{
        "text": "1 How many Star Wars movies released theatrically?",
        "correctIndex": 0,
        "options": ["6", "12", "3", "9"]
    },
    {
        "text": "2 How many Star Wars movies released theatrically?",
        "correctIndex": 1,
        "options": ["6", "12", "3", "9"]
    },
    {
        "text": "3 How many Star Wars movies released theatrically?",
        "correctIndex": 2,
        "options": ["6", "12", "3", "9"]
    }

];

//quiz final screen show results
function showResults() {
    document.getElementById('game-screen').style.visibility = 'hidden';
    let successMessage = ''
    let percentage = (correctCount / questions.length) * 100;
    if (percentage > 50) {
       successMessage = "Well done, you're a Movie Buff";
    } else {
        successMessage = "Hard Luck, Try again";
    }
    document.getElementById('results-screen').innerHTML = successMessage;

    let retryButton = document.createElement('button');
    retryButton.innerHTML = 'Try Again';
    document.getElementById('results-screen').appendChild(retryButton);
    retryButton.addEventListener('click', resetPage);

    document.getElementById('results-screen').style.visibility = 'visible';
}

//display correct and incorrect counters
function showAnswerCounters() {
    let resultsDiv = document.createElement('div');
    resultsDiv.innerHTML = 'Correct Answers:' + correctCount + '<br>Incorrect Answers:' + incorrectCount;
    document.getElementById('game-screen').appendChild(resultsDiv);
}

//decide and record user correct answer
function recordAnswer() {
    let options = document.getElementsByName('option');
    let userAnswer = '-1';
    for (i = 0; i < options.length; i++) {
        if (options[i].checked === true)
            userAnswer = options[i].value;
    }
    
    
    if (userAnswer == questions[questionIndex].correctIndex){
        correctCount++;
    } else {
        incorrectCount++;
    }
}

//decides what to do whem the user submits an answer
function handleAnswer() {
    let options = document.getElementsByName('option');
    let userSubmittedAnswer = false;
    for (i = 0; i < options.length; i++) {
        if (options[i].checked === true)
            userSubmittedAnswer = true;
    }

    if (userSubmittedAnswer) {
        recordAnswer();
        questionIndex++;
        if (questionIndex === questions.length) {
            showResults();
        } else {
            showQuestion(questionIndex);
        }
    } else {
        alert('please select an option');
    }


}
// show the next question based on index
function showQuestion(index) {
    document.getElementById('game-screen').innerHTML = "";
    let questionDiv = document.createElement('div');
    questionDiv.innerHTML = "Question " + (questionIndex+1) + "<br>" + questions[questionIndex].text;
    document.getElementById('game-screen').appendChild(questionDiv);

    let questionForm = document.createElement('form');
    document.getElementById('game-screen').appendChild(questionForm);

    for (i = 0; i < questions[index].options.length; i++) {
        let thisOptionRadio = document.createElement('input');
        thisOptionRadio.type = 'radio';
        thisOptionRadio.id = 'option' + index + '-' + i;
        thisOptionRadio.name = 'option';
        thisOptionRadio.value = i;

        let thisOptionLabel = document.createElement('label');
        thisOptionLabel.for = thisOptionRadio.id;
        thisOptionLabel.innerHTML = questions[index].options[i];

        let thisOptionBr = document.createElement('br');
        questionForm.appendChild(thisOptionRadio);
        questionForm.appendChild(thisOptionLabel);
        questionForm.appendChild(thisOptionBr);
    }

    let thisQuestionButton = document.createElement('button');
    thisQuestionButton.innerHTML = 'submit';
    document.getElementById('game-screen').appendChild(thisQuestionButton);
    thisQuestionButton.addEventListener('click', handleAnswer);
    showAnswerCounters();
}
//start or reset the page
function initialisePage() {
    document.getElementById('welcome-screen').style.visibility = 'hidden';
    document.getElementById('game-screen').style.visibility = 'hidden';
    document.getElementById('rules-screen').style.visibility = 'hidden';
    document.getElementById('results-screen').style.visibility = 'hidden';

    document.getElementById('btn-start').addEventListener('click', startGame);
}
//start or restart the game
function startGame() {
    document.getElementById('welcome-screen').style.visibility = 'hidden';
    document.getElementById('game-screen').style.visibility = 'visible';

    questionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;

    showQuestion(questionIndex);
}
//show the welcome message at the start
function showWelcome() {
    document.getElementById('welcome-screen').style.visibility = 'visible';
}

function resetPage(){
    initialisePage();
    showWelcome();
}

resetPage();