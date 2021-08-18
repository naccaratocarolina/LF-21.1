const MAX_QUESTIONS = 4;
const POINTS = 100;

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
	
};
