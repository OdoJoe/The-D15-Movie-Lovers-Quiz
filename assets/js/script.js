// counters recorded during game
let questionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

// list of questions
let questions = [{
        "text": "How many Star Wars movies released theatrically?",
        "correctIndex": 1,
        "options": ["6", "12", "3", "9"]
    },
    {
        "text": "How many Oscars has Steven Spielberg won in his career?",
        "correctIndex": 2,
        "options": ["3", "16", "4", "2"]
    },
    {
        "text": "What is the name of Kurt Russell's character in Big Trouble in Little China?",
        "correctIndex": 1,
        "options": ["Jack Napier", "Jack Burton", "Jack Torrance", "Jack Traver"]
    },
    {
        "text": "Name the prolific Italian horror director famed for his unique 'Giallo' movies?",
        "correctIndex": 3,
        "options": ["Federico Fellini", "Franco Zeffirelli", "Sergio Leone", "Dario Argento"]
    },
    {
        "text": "The rough and grizzled Quint from Steven Spielbergs Jaws was played by?",
        "correctIndex": 1,
        "options": ["Robert Logia", "Robert Shaw", "Robert Redford", "Robert Duvall"]
    },
    {
        "text": "Who directed the sci-fi horror movie classic The Thing?",
        "correctIndex": 0,
        "options": ["John Carpenter", "Ivan Reitman", "James Cameron", "Peter Hyams"]
    },
    {
        "text": "William Friedken's classic movie 'Sorcerer' while widely regarded as a classic today was panned on its release. Do you know what year the movie released? ",
        "correctIndex": 3,
        "options": ["1971", "1969", "1973", "1977"]
    },
    {
        "text": "How many films did Bruce Lee star in before his untimely death in 1973?",
        "correctIndex": 2,
        "options": ["4", "2", "5", "7"]
    },
    {
        "text": "Who played the 'man with no name' in the Sergio Leone classic 'Once Upon a Time in the West?",
        "correctIndex": 2,
        "options": ["Clint Eastwood", "James Caan", "Charles Bronson", "Lee Van Cleef"]
    },
    {
        "text": "Sammo Hung, Jackie Chan and which other famous Hong Kong cinema action star completes the trio commonly referred to as 'The Three Dragons'?",
        "correctIndex": 1,
        "options": ["Donnie Yen", "Yuen Biao", "Jet Li", "Lau Kar-Wing"]
    }

];

//quiz final screen show results
function showResults() {
    document.getElementById('game-screen').style.visibility = 'hidden';
    let successMessage = '';
    let percentage = (correctCount / questions.length) * 100;
    if (percentage > 50) {
       successMessage = "Well done, you're a Movie Buff";
    } else {
        successMessage = "Hard Luck, Try again";
    }
    document.getElementById('results-screen').innerHTML = '<p class="result-text">' + successMessage + '</p>';

    let retryButton = document.createElement('button');
    retryButton.innerHTML = 'Try Again';
    document.getElementById('results-screen').appendChild(retryButton);
    retryButton.addEventListener('click', resetPage);

    document.getElementById('results-screen').style.visibility = 'visible';
}

//display correct and incorrect counters
function showAnswerCounters() {
    let resultsDiv = document.createElement('div');
    resultsDiv.innerHTML = '<p>Correct Answers:' + correctCount + '<br>Incorrect Answers:' + incorrectCount + '</p>';
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
    questionDiv.innerHTML = "<p class='question-heading'>Question " + (questionIndex+1) + "</p><p>" + questions[questionIndex].text + "</p>";
    document.getElementById('game-screen').appendChild(questionDiv);

    let questionForm = document.createElement('form');
    questionForm.className = 'answers-form';
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
    let br = document.createElement('br');
    document.getElementById('game-screen').appendChild(br);

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
    document.getElementById('rules-screen').innerHTML = '';

    document.getElementById('btn-start').addEventListener('click', startGame);
    document.getElementById('btn-rules').addEventListener('click', showRules);
}

function showRules() {
    document.getElementById('rules-screen').innerHTML = "<p class='rules-text'>Are you a true movie lover? Try out our Quiz. Select your answer, click submit and keep an eye on your score. Good Luck!</p>";
    document.getElementById('rules-screen').style.visibility = "visible";
}

//start or restart the game
function startGame() {
    document.getElementById('rules-screen').innerHTML = '';
    document.getElementById('rules-screen').style.visibility = "hidden";
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