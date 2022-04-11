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
//decides what to do whem the user submits an answer
function handleAnswer() {
    let options = document.getElementsByName('option');
    let userSubmittedAnswer = false;
    for (i = 0; i < options.length; i++) {
        if (options[i].checked === true)
            userSubmittedAnswer = true;
    }

    if (userSubmittedAnswer) {
        questionIndex++;
        if (questionIndex === questions.length) {
            alert('all done');
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
    questionDiv.innerHTML = questions[index].text;
    document.getElementById('game-screen').appendChild(questionDiv);

    let questionForm = document.createElement('form');
    document.getElementById('game-screen').appendChild(questionForm);

    for (i = 0; i < questions[index].options.length; i++) {
        let thisOptionRadio = document.createElement('input');
        thisOptionRadio.type = 'radio';
        thisOptionRadio.id = 'option' + index + '-' + i;
        thisOptionRadio.name = 'option';

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

initialisePage();
showWelcome();