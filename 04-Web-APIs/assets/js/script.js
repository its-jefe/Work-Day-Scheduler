function random_Func(length) {
    return Math.floor(Math.random() * length);
}

var updateTimer_Func = function (funTime) {
    //takes only the (relevant portion of) time from Date
    if (funTime >= 60000) {
        return new Date(funTime).toISOString().substr(15, 4);
    } else if (funTime >= 10000) {
        return new Date(funTime).toISOString().substr(17, 2);
    } else {
        return new Date(funTime).toISOString().substr(18, 1);
    }
}

function countdown_Func() {
    startBtnEl.remove(); // remove start button
    highScoresBtn_El.remove();

    main_El.appendChild(preambleEl); // append the div

    preambleEl.textContent = "Get Ready!";

    timer_El.textContent = updateTimer_Func(startTime);

    var funTime = 4000; // local time

    genQuiz_Func(); // generate questions and answers to arrays

    var funInterval2 = setInterval(function () { // countdown 3-2-1-Go!
        if (funTime > 1000) {    
            preambleEl.textContent = ((funTime - 1000) / 1000)
            funTime -= 1000;
        } else if (funTime == 1000) {
            preambleEl.textContent = "Go!";
            funTime -= 1000;
        } else {
            clearInterval(funInterval2);
            preambleEl.remove();
            preambleEl.textContent = "";
            go_Func(); // at the end of countdown .. begins the quiz
        }
    }, 1000);
}

function genQuiz_Func() {
    var funRand; // sent to randomFunc ... returns appropriately sized number to mix things up
    var funArray = []; // temp array to push into 2D answer array

    var funQuestions = [...questionList]; // copy global questions to local
    var funAnswers = [...answerList]; // copy global answers to local

    // I  should refill the funAnswers so that correct answers from other 
    // questions can be placed with all questions but for now I will not do that

    // PLACE ALL CORRECT ANSWERS WITH QUESTIONS
    // so they do not get placed and deleted in my hastily designed function
    for (var i = 0; i < questionList.length; i++) { // for all questions

        funRand = random_Func(funQuestions.length); // random number to pick from sizeof list

        questionArray[i] = funQuestions[funRand]; // fill question array

        funArray[0] = funAnswers[funRand]; //place corresponding answer into [0] of array
        answerArray[i] = funArray; //push array into answer array
        funArray = []; // empty array

        funQuestions.splice(funRand, 1); // remove question from copy so no duplicates
        funAnswers.splice(funRand, 1); // same
    }
    // ADD 3 MORE RANDOM ANSWER
    for (var i = 0; i < questionArray.length; i++) { //for each question

        for (var j = 0; j < 3; j++) { // place 3 more answers
            funRand = random_Func(funAnswers.length);
            answerArray[i].push(funAnswers[funRand]); // place answer
            funAnswers.splice(funRand, 1); // remove from local list
        }
    }
}

function go_Func() {
    //set local variable to initial time
    quizTime = startTime;
    main_El.appendChild(quiz_El);
    quiz_El.appendChild(questionEl)
    quiz_El.appendChild(answersContainer_El)

    var funInterval = setInterval(function() {
        if (quizTime > 1000) {
            quizTime -= 1000;
            timer_El.textContent = updateTimer_Func(quizTime);
        } else {
            timeBonus += quizTime; // set extra time aside for BONUS
            quizTime = 0; // clear timer

            timer_El.textContent = "Finished!";

            clearInterval(funInterval);

            quiz_El.remove();

            scoreboard_Func();
        }
    }, 1000);

    questionnaire_Func();
}

function questionnaire_Func() {
    var answerEl;

    //add or change the question
    questionEl.textContent = questionArray[clickCounter];

    //clear questions box
    answersContainer_El.textContent = [];

    if (clickCounter < questionArray.length) {
        //add the answers
        for (var i = 0; i < 4; i++) {
            answerEl = document.createElement("button");
            answerEl.className = "answer";
            answerEl.setAttribute("data-button-id", i);
            answerEl.innerText = answerArray[clickCounter][i];
            answerEl.onclick = factCheck_Func;

            //RANDOMIZE PLACEMENT
            if (i > 0 && random_Func(2) == 0) {
                //place before correct answer AKA data-button-id = 0
                answersContainer_El.insertBefore(answerEl, document.querySelector(".answer[data-button-id='0']"));
            } else {
                //place after correct answer
                answersContainer_El.appendChild(answerEl);
            }
        }
    }
    else {
        timeBonus += quizTime;
        quizTime = 0;
        quiz_El.remove();
    }
}

function factCheck_Func() {
    if (this.dataset.buttonId == 0){
        console.log("CORRECT!");
        correctAnswers += 100; // 500/500 is max
    } else {
        console.log("WRONG");
        quizTime -= 15000; // -15 seconds

        var funTime = 2000; // time to show deductions
        var deductionEl = document.createElement("h1");
            deductionEl.className = "deduction";
            deductionEl.textContent = "-15";
            banner_El.appendChild(deductionEl);

        // Point deduction animation 
        var funInterval3 = setInterval(function () {
            if (funTime <= 0) {
                deductionEl.remove();
                clearInterval(funInterval3);
            }
            funTime -= 2000;
        }, 1000);
    }
    clickCounter++;
    questionnaire_Func();
}

function scoreboard_Func() { //clunky
    main_El.append(scoreboardEl);
    
    var headingEl = document.createElement("div");
    headingEl.className = "heading";
    headingEl.textContent = "SCORE";
    scoreboardEl.appendChild(headingEl);

    var container_El = document.createElement("div");
    container_El.className = "container";
    scoreboardEl.appendChild(container_El);

    var initialEntryBox_El = document.createElement("input"); // initial entry box (CREATE & APPEND)
    initialEntryBox_El.type = "text";
    initialEntryBox_El.className = "inital-entry";
    initialEntryBox_El.maxLength = "3";
    scoreboardEl.appendChild(initialEntryBox_El);

    var submitBtn_El = document.createElement("button"); // submit button (CREATE & APPEND)
    submitBtn_El.className = "submit";
    submitBtn_El.textContent = "SUBMIT";
    submitBtn_El.onclick = function(){
        localStorage.setItem((initialEntryBox_El.value).toUpperCase(), total_R_El.textContent)
        initialEntryBox_El.remove();
        submitBtn_El.remove();
        scoreboardEl.appendChild(returnBtn_El); // allow return only after initals are submitted
    }
    scoreboardEl.appendChild(submitBtn_El);
    
    var returnBtn_El = document.createElement("button"); // return button (CREATE & AWAIT APPEND)
    returnBtn_El.className = "return";
    returnBtn_El.textContent = "RETURN";
    returnBtn_El.onclick = function(){
        // clear the board + scores

        headingEl.remove()
        container_El.remove()
        returnBtn_El.remove();
        scoreboardEl.remove();
        clickCounter = 0;
        correctAnswers = 0;
        timeBonus = 0;
        // append start and highscores buttons
        main_El.appendChild(startBtnEl);
        document.querySelector("footer").appendChild(highScoresBtn_El)
    };

    // Score Rack Left 
    // Score Categories
    var rackLeftEl = document.createElement("div");
    rackLeftEl.className = "rackLeftEl";
    container_El.appendChild(rackLeftEl);
    // includes titles 'Correct Answers' , 'Time Bonus' , 'Total'
    var correctAnswers_L_El = document.createElement("h4");
    correctAnswers_L_El.className = "correctL";
    correctAnswers_L_El.textContent = ("Correct Answers");
    rackLeftEl.appendChild(correctAnswers_L_El);
    var timeBonus_L_El = document.createElement("h4");
    timeBonus_L_El.className = "bonusL";
    timeBonus_L_El.textContent = ("Time Bonus")
    rackLeftEl.appendChild(timeBonus_L_El);
    var total_L_El = document.createElement("h4");
    total_L_El.className = "totalL";
    total_L_El.textContent = ("Total");
    rackLeftEl.appendChild(total_L_El);

    // Score Rack Right
    // Scores
    var rackRightEl = document.createElement("div");
    rackRightEl.className = "rackRightEl";
    container_El.appendChild(rackRightEl);
    // includes scores 
    var correctAnswers_R_El = document.createElement("h4");
    correctAnswers_R_El.className = "correctR";
    correctAnswers_R_El.textContent = (correctAnswers);
    rackRightEl.appendChild(correctAnswers_R_El);
    var timeBonus_R_El = document.createElement("h4");
    timeBonus_R_El.className = "bonusR";
    timeBonus_R_El.textContent = (timeBonus/100);
    rackRightEl.appendChild(timeBonus_R_El);
    var total_R_El = document.createElement("h4");
    total_R_El.className = "totalR";
    total_R_El.textContent = (timeBonus/100 + correctAnswers);
    rackRightEl.appendChild(total_R_El);
}

function highScores_Func(){

    highScoresBtn_El.remove();

    var highScores_El = document.createElement("div");
    highScores_El.className = "highscores";
    startBtnEl.remove();
    main_El.appendChild(highScores_El);

    var grabInitials_El = document.createElement("div");
    var grabScores_El = document.createElement("div");
    grabInitials_El.className = "local-initials";
    grabScores_El.className = "local-scores";
    for (var i = 0; i < localStorage.length; i++){
        grabInitials_El.textContent += (localStorage.key(i) + "\r\n")
        grabScores_El.textContent += (localStorage.getItem(localStorage.key(i)) + "\r\n")
    }
    highScores_El.appendChild(grabInitials_El);
    highScores_El.appendChild(grabScores_El);

    var returnBtn_El = document.createElement("button");
    returnBtn_El.className = "return";
    returnBtn_El.textContent = "RETURN";
    returnBtn_El.onclick = function(){
        highScores_El.remove();
        main_El.appendChild(startBtnEl);
        document.querySelector("footer").appendChild(highScoresBtn_El)
    };
    highScores_El.appendChild(returnBtn_El)
}

// HTML Elements
var banner_El = document.querySelector("div");
var main_El = document.querySelector("main"); //main section
var scoreboardEl = document.createElement("div");
scoreboardEl.className = "scoreboard";
var timer_El = document.getElementById("timer"); //countdown timer
var startBtnEl = document.getElementById("start"); //start button

startBtnEl.onclick = countdown_Func;

var preambleEl = document.createElement("div");
preambleEl.className = "preamble";
var quiz_El = document.createElement("div");
quiz_El.className = "quiz";
var questionEl = document.createElement("div");
questionEl.className = "question";
var answersContainer_El = document.createElement("div");
answersContainer_El.className = "answers";
var highScoresBtn_El = document.getElementById("highscores")


highScoresBtn_El.onclick = highScores_Func;

//1 minute (60 seconds) in milliseconds
const startTime = 60 * 1000;

var quizTime; // main quiz timer var

const questionList = [
    'Who is the most famous person in the world?',
    'Who was the 44th President of The United States?',
    'Who was in the movie Jurassic Park and now has his face on throw pillows and shower curtains?',
    'Who theorized special relativity?',
    "Who said 'An unexamined life is not worth living?'"
    // BONUS : Bell peppers have more vitamin C than oranges? TRUE! 
];
var questionArray = []; // list of questions

const answerList = [ // 5 correct ... 23 fillers ... 28 total
    'Jesus Christ', 'Barack Obama', 'Jeff Goldblum', 'Albert Enstein', 'Socrates',
    'Oprah Winfrey', 'Wolfgang Amadeus Mozart', 'David Bowie', 'Neil Armstrong', 'Marilyn Monroe',
    'Salvador Dali', 'Will Smith', 'Stephen Hawking', 'Steve Jobs', 'Jackie Chan',
    'Meryl Streep', 'Whitney Houston', 'Jim Morrison', 'Beyoncé', 'Cristiano Ronaldo',
    'George Washington', 'Michael Jordan', 'Leonardo DiCaprio', 'Bono', 'Abraham Lincoln',
    'Rihanna', 'Ghandi', 'Yo Momma'
];
var answerArray = []; // 2D array of answers (array of arrays)

var clickCounter = 0;

var correctAnswers = 0;
var timeBonus = 0;