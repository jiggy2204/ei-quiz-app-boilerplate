/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: "Who are the main protagonists in Resident Evil 3: REMAKE?",
      answers: [
        "Claire & Leon",
        "Jill & Carlos",
        "Rebecca & Billy",
        "Jake & Sherry",
      ],
      correctAnswer: "Jill & Carlos",
    },
    {
      question: "Who is the final boss fight in the original Resident Evil?",
      answers: ["Nemesis", "Wesker", "Tyrant", "Alexia Ashford"],
      correctAnswer: "Tyrant",
    },
    {
      question:
        "What is the name of the gunshop owner in Resident Evil 2 and 3 REMAKE?",
      answers: [
        "Alex Ashford",
        "Robert Kendo",
        "Marvin Branagh",
        "Steve Burnside",
      ],
      correctAnswer: "Robert Kendo",
    },
    {
      question: "In Resident Evil 5, what is the name of the virus?",
      answers: ["T-Virus", "Las Plagas", "Progenitor Virus", "Uroboros Virus"],
      correctAnswer: "Uroboros Virus",
    },
    {
      question:
        "Ethan Winters must make a choice in Resident Evil 7. What is it?",
      answers: [
        "Save Zoe or Mia with the antivirus",
        "Inject himself with the antivirus or sacrifice himself",
        "Save Zoe or Eveline with the antivirus",
        "Inject Eveline with the antivirus or become part of her “family”",
      ],
      correctAnswer: "Save Zoe or Mia with the antivirus",
    },
    {
      question:
        "In Resident Evil 6, who injects themselves with the virus to save their partner?",
      answers: [
        "Sheva Alomar",
        "Carlos Oliviera",
        "Billy Cohen",
        "Piers Nivans",
      ],
      correctAnswer: "Piers Nivans",
    },
    {
      question: "Who is kidnapped in Resident Evil 4?",
      answers: [
        "Ashley Graham",
        "Moira Burton",
        "Sherry Birken",
        "Helena Harper",
      ],
      correctAnswer: "Ashley Graham",
    },
    {
      question: "Which monster is blind and hunts using sound?",
      answers: ["Zombie", "Licker", "Hunter", "Drain Deimos"],
      correctAnswer: "Licker",
    },
    {
      question: "Which monster is present in all Resident Evils?",
      answers: ["Zombie", "Licker", "Hunter", "Drain Deimos"],
      correctAnswer: "Zombie",
    },
    {
      question:
        "What are the conditions to get S Rank in Resident Evil 3 REMAKE on STANDARD?",
      answers: [
        "5 or less saves, 2:30 Run time",
        "3 or less saves, 2:30 Run time",
        "5 or less saves, 2:00 Run time",
        "3 or less saves, 2:00 Run time",
      ],
      correctAnswer: "5 or less saves, 2:00 Run time",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

let bkgrdImg = `<img width="100%" height="auto" src="./assets/logo-umbrella-LG-EDITED.jpg" alt="umbrella logo" />`;

$("h1").html("WELCOME TO THE RESIDENT EVIL QUIZ!");
$("header").prepend(bkgrdImg);

// Creates the beginning screen

function beginQuizScreen() {
  return `
    <div id="begin-quiz">
      <p class="beginning-text">This quiz is to test your knowledge of the RE games. You must score 80% to pass. Press the button below to begin.</p>
      <p class="beginning-text announce">GOOD LUCK!</p>
      <button type="button" id="beginQuiz" class="btn begin-btn">BEGIN</button>
    </div>
    `;
}

function currQuestionNumber() {
  return `
      <h3>QUESTION: ${STORE.questionNumber + 1}/${STORE.questions.length}</h3>
    `;
}

// Create current score
function scoreKeeper() {
  let scoreHTML = `
    <div id="score" class="quiz-score">
      <h3 class="score-text">SCORE: ${STORE.score}</h3>
    </div>
    `;

  return scoreHTML;
}

// Creates the answers
function generateAnswers() {
  //initialize the array with the answers that correlate to the question
  const ansArray = STORE.questions[STORE.questionNumber].answers;

  //initialize to empty string, will fill with array loop
  let answersHTML = "";

  // set i to array index 0
  let i = 0;

  // The div id is set to 0 to correspond to array index
  // The input and tab-index start at 1 for screen reader to choose answer
  ansArray.forEach((answer) => {
    answersHTML += `
    <div class="answerContainer" id="answer-container-${i}">
      <input type="radio" class="answers" id="answer${
        i + 1
      }" value="${answer}" tabindex=${
      i + 1
    } name="answer" required/><label for="answer${i + 1}">${answer}</label>
    </div>
    `;
    // Iterate over each element and repeat
    i++;
  });
  // Return the new inner HTML of answers for the question
  return answersHTML;
}

// Creates the quiz question
function quizQuestion() {
  let currQuestion = STORE.questions[STORE.questionNumber];

  return `
    ${currQuestionNumber()}
    <form>
    <fieldset id="question">
      <legend class="test-question">${currQuestion.question}</legend>
      
      ${generateAnswers()}
      
      <button type="submit" id="submitBtn" class="btn submit-btn">SUBMIT</button>
    </fieldset>    
  </form>
  ${scoreKeeper()}
    `;
}

function quizFeedback(userAnswer) {
  let feedbackHTML = "";
  // Store the correct answer for the current question
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  if (userAnswer === correctAnswer) {
    // Add 10 points to current score
    STORE.score += 10;

    feedbackHTML = `
    <div id="feedback">
      <p class="feedback-text correct">That is correct!</p>
      <button type="button" id="nextBtn" class="btn next-btn">NEXT >></button>
    </div>
    `;
  } else if (userAnswer !== correctAnswer) {
    // Automatically update correct answer on feedback if incorrect
    feedbackHTML = `
    <div id="feedback">
      <p class="feedback-text incorrect">That is incorrect. The correct answer is:<br> <span class="correct-answer">${correctAnswer}</span></p>
      <button type="button" id="nextBtn" class="btn next-btn">NEXT >></button>
    </div>
    `;
  }
  feedbackHTML += scoreKeeper();
  //return updated feedback html
  return $("main").html(feedbackHTML);
}

function quizFinalScore() {
  let finalScoreHTML = "";
  if (STORE.score < 80) {
    finalScoreHTML = `
    <div id="final-score">
      <h3 class="result-message-header result-fail">Sorry...</h3>
      <p class="result-message">You did not pass...please try again</p>
      ${scoreKeeper()}
      
      <button type="submit" id="restartQuiz" class="btn restart-btn">RETAKE QUIZ</button>
    </div>
    `;
  } else if (STORE.score >= 80) {
    finalScoreHTML = `
    <div id="final-score">
      <h3 class="result-message-header result-pass">CONGRATULATIONS!</h3>
      <p class="result-message">You passed!</p>
      ${scoreKeeper()}
      
      <button type="button" id="restartQuiz" class="btn restart-btn">RETAKE QUIZ</button>
    </div>
    `;
  }

  return finalScoreHTML;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  if (STORE.quizStarted === false) {
    $("main").html(beginQuizScreen());
  } else if (
    STORE.questionNumber >= 0 &&
    STORE.questionNumber < STORE.questions.length
  ) {
    $("main").html(quizQuestion());
  } else {
    $("main").html(quizFinalScore());
  }
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// Begin quiz
function handleQuizStart() {
  $("main").on("click", "#beginQuiz", function (e) {
    STORE.quizStarted = true;
    console.log("quiz started");
    render();
  });
}

// Handle form submission of answers
function handleFormSubmission() {
  //Get value from user input
  $("main").on("click", "#submitBtn", function (e) {
    // Checks to see if the user selected an answer
    if (!$("input").is(":checked")) {
      e.preventDefault();
      alert("You must make a selection!");
    } else {
      // Return feedback on click
      e.preventDefault();
      console.log("answered questions");
      let userSelection = $("input[name=answer]:checked").val();
      quizFeedback(userSelection);
      console.log(userSelection);
    }
  });
}

// Handle next button for questions
function nextQuestion() {
  $("main").on("click", "#nextBtn", function (e) {
    e.preventDefault();
    console.log("next question, please");
    STORE.questionNumber += 1;
    render();
  });
}

// Reset all values and restart quiz
function restartQuiz() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
  console.log("quiz ended and rebooted");
}

function handleRestartQuiz() {
  $("main").on("click", "#restartQuiz", function (e) {
    console.log("hit that reset button!");
    restartQuiz();
    render();
  });
}

function handleRenderQuiz() {
  render();
  handleQuizStart();
  handleFormSubmission();
  nextQuestion();
  handleRestartQuiz();
}

$(handleRenderQuiz);
