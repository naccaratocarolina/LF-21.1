const MAX_QUESTIONS = 4;
const POINTS = 100;

// Acessando objetos do HTML
const question = document.querySelectorAll('.choice-text');
const choices = Array.from(document.querySelector('#progressText'));
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

// Construtor
function Game() {
	// Variavel de controle
	this.acceptingAnswers = true;

	// Array de perguntas
	this.questions = {
		{
			question: "Quanto eh 2 + 2?",
			choice1: "1",
			choice2: "2",
			choice3: "3",
			choice4: "4",
		},
		{
			question: "Blablabla?",
			choice1: "1",
			choice2: "2",
			choice3: "3",
			choice4: "4",
		},
	}

	// Estados do jogo
	this.score = 0;
	this.questionCounter = 0;
	this.currentQuestion = {};
	this,availableQuestions = [];
}

// Funcao principal que inicializa o jogo
Game.prototype.start = () => {
	this.questionCounter = 0;
	this.score = 0;
	availableQuestions = [...this.questions];
	this.getNewQuestion();
};

Game.prototype.getNewQuestion = () => {
				// Condicoes para encerrar o jogo
				if (this.availableQuestions.length === 0 || this.questionCounter > MAX_QUESTIONS) {
					localStorage.setItem('lastScore', score);

					return window.location.assign('/end.html');
				}

				this.questionCounter++;
				progressText.innerText = `Questão ${this.questionCounter} of ${MAX_QUESTIONS}`;
				progressBarFull.style.width = `${(this.questionCounter / MAX_QUESTIONS) * 100}%`;

				const questionIndex = Math.floor(Math.random() * this.availableQuestions.length);
				this.currentQuestion = this.availableQuestions[questionIndex];
				question.innerText = this.currentQuestion.question;

				choices.forEach(choice => {
					const number = choice.dataset['number'];
					choice.innerText = this.currentQuestion['choice' + number];
				});

				this.availableQuestions.splice(questionIndex, 1);

				this.acceptingAnswers = true;
};

Game.prototype.choices.forEach(choice => {
	choice.addEventListener('click', e => {
		if (!this.acceptingAnswers) return;

		this.acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToAply = selectedAnswer == this.currentQuestion.answer ? 'correct' : 'incorrect';

		if (classToAply == 'correct') this.incrementScore(POINTS);

		selectedChoice.parentElement.classList.add(classToAply);
		
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			this.getNewQuestion();
		}, 100);
	})
});

Game.prototype.incrementScore = number => {
	this.score += number;
	scoreText.innerText = this.score;
};
