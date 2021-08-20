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
		 explanation: 'aasdsad' 
  },
  {
  	 question:"The tallest building in the world is located in which city?",
     choice1: "Dubai",
     choice2: "New York",
     choice3: "Shanghai",
     choice4: "None of the above",
     answer: 1,
		 explanation: '12213123'
  },
  {
     question: "What percent of American adults believe that chocolate milk comes from brown cows?",
     choice1: "20%",
     choice2: "18%",
     choice3: "7%",
     choice4: "33%",
     answer: 3,
		 explanation: 'pqpqpqpq'
  },
  {
     question: "Approximately what percent of U.S. power outages are caused by squirrels?",
     choice1: "10-20%",
     choice2: "5-10%",
     choice3: "15-20%",
     choice4: "30%-40%",
     answer: 1,
		 explanation: '123was'
  },
  {
     question: "Pergunta extra",
     choice1: "a",
     choice2: "b",
     choice3: "c",
     choice4: "d",
     answer: 1,
		 explanation: 'aaaaaaaaaaa'
  },
  {
     question: "Pergunta extra 2",
     choice1: "a",
     choice2: "b",
     choice3: "c",
     choice4: "d",
     answer: 4,
		 explanation: 'bbbbbbbbb'
  },
];

/* Funcao que inicializa o jogo  */
start = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNextQuestion();
};

/* 
 * Implementa a logica de avancar para a proxima pergunta, assim como fazer o display
 * do texto das perguntas e suas opcoes
 */
getNextQuestion = () => {
	// Condicoes para encerrar o jogo
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		// Salva a pontuacao no local storage
		localStorage.setItem('lastScore', score);

		return window.location.assign('./end.html');
	}

	// Inicializa o jogo, incrementando o contador e fazendo o display
	// da barra de progresso de acordo com a questao atual
	questionCounter++;
	progressText.innerText = `Questão ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	
	// Faz o display da pergunta atual
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	// Faz o display das opcoes da pergunta atual
	choices.forEach(choice => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);

	// Seta a variavel de controle como true
	isAcceptiongAnswers = true;
};

/*
 * Realiza a logica de definir qual opcao eh a correta, de acordo com o array de perguntas
 * (aplicando o CSS correspondente), assim como define a animacao de avancar para uma proxima 
 * pergunta. No caso do usuario nao acertar a resposta correta, faz o display de um popup com
 * a explicacao.
 */
choices.forEach(choice => {
	choice.addEventListener('click', choice => {
		// Se a variavel de controle nao for true, interrompe a funcao
		if (!isAcceptiongAnswers) return;
		
		// Salva as informacoes da opcao clicada pelo usuario
		isAcceptiongAnswers = false;
		const selectedChoice = choice.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		// Variavel booleana de controle para aplicar o estilo correto de acordo com a
		// resposta correta de cada questao
		let styleToAply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		// No caso do usuario escolher a resposta correta, incrementa a sua pontuacao
		if (styleToAply == 'correct') 
			incrementScore(SCORE_PER_QUESTION);

		selectedChoice.parentElement.classList.add(styleToAply);
		
		// Implementa a animacao
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(styleToAply);

			// Dispara um alerta com a explicacao caso a resposta escolhida for incorreta
			if (styleToAply == 'incorrect') alert(currentQuestion['explanation']);

			getNextQuestion();
		}, 500)
	})
});

/* 
 * Acessa a variavel do jogo score e a incrementa, dado o valor (number)
 * a ser incrementado (SCORE_PER_QUESTION)
*/
incrementScore = number => {
	score += number;
	scoreText.innerText = score;
};

// Inicializa o jogo
start();
