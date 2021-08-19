// Definindo constantes
const SCORE_PER_QUESTION = 100;
const MAX_QUESTIONS = 4;

// Acessando objetos do HTML
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBar = document.querySelector('#progressBar');

// Variaveis de controle do jogo
let currentQuestion = {};
let isAcceptiongAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questoes do quizz
let questions = [
	{
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question:"The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What percent of American adults believe that chocolate milk comes from brown cows?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33%",
        answer: 3,
    },
    {
        question: "Approximately what percent of U.S. power outages are caused by squirrels?",
        choice1: "10-20%",
        choice2: "5-10%",
        choice3: "15-20%",
        choice4: "30%-40%",
        answer: 1,
    }
];

// Logica do jogo
start = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNextQuestion();
};

getNextQuestion = () => {
	// Condicoes para encerrar o jogo
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		// Salva a pontuacao no local storage
		localStorage.setItem('lastScore', score);

		return window.location.assign('./end.html');
	}

	questionCounter++;
	progressText.innerText = `Questão ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach(choice => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);

	isAcceptiongAnswers = true;
};

choices.forEach(choice => {
	choice.addEventListener('click', choice => {
		if (!isAcceptiongAnswers) return;

		isAcceptiongAnswers = false;
		const selectedChoice = choice.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let styleToAply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if (styleToAply == 'correct') 
			incrementScore(SCORE_PER_QUESTION);

		selectedChoice.parentElement.classList.add(styleToAply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(styleToAply);
			getNextQuestion();
		}, 500)
	})
});

incrementScore = number => {
	score += number;
	scoreText.innerText = score;
};

start();
