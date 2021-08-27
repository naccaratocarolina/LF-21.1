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
  	 question: 'Por definição, um Autômato finito e determinístico é composto por uma 5-upla de elementos. Quais são eles?',
     choice1: 'Conjunto finito de estados, conjunto finito de símbolos, estado inicial, conjunto de estados finais e função de transição',
     choice2: 'Conjunto infinito de estados, conjunto infinito de símbolos, estado inicial, conjunto de estados finais e função de transição',
     choice3: 'Conjunto finito de estados, conjunto finito de símbolos, estado inicial, conjunto de estados finais e função de definição',
     choice4: 'Conjunto finito de estados, conjunto infinito de símbolos, estado inicial, conjunto de estados finais e função de definição',
     answer: 1,
		 explanation: 'O termo “autômato” vem da palavra grega “αὐτόματα” que implica “ação própria”. Um autômato (autômato no plural) é uma máquina autopropelida abstrata que segue uma seqüência predeterminada de operações automaticamente.\n\nUm autômato finito determinístico (DFA) é definido como uma 5-upla (Q, Σ, δ, s, F) consistindo em\n\nUm conjunto finito Q (o conjunto de estados)\nUm conjunto finito de símbolos Σ (o alfabeto de entrada)\nUm estado inicial q0 ∈ Q (o estado inicial)\nUm conjunto de estados de aceitação F (conjunto de estados finais)\nUma função de transição δ: Q × Σ → Q mapeando o estado atual q ∈ Q e o símbolo de entrada a ∈ Σ para um novo estado δ (q, a) ∈ Q/\n\nUm DFA é um modelo matemático de um dispositivo computacional simples que lê uma string de símbolos sobre o alfabeto de entrada Σ e aceita ou rejeita a string de entrada. Gostaríamos de transformar essa definição matemática em um programa funcional, para que possamos executar DFAs em nosso computador.' 
  },
  {
  	 question:"Marque a opção que não corresponde a uma aplicação dos Autômatos finitos e determinísticos",
     choice1: "Concepção da análise lexical de um compilador",
     choice2: "Reconhecer os padrões usando expressões regulares",
     choice3: "Para resolver qualquer problema recursivamente enumerável",
     choice4: "Implementação de verificadores ortográficos",
     answer: 3,
		 explanation: 'Algumas aplicações dos DFA são\n\nConcepção da análise lexical de um compilador: Algoritmos para converter expressões regulares são conhecidos e podem ser reaproveitados, assim, of DFAs podem ser usados como  um analisador léxico bastante eficiente\n\nReconhecer os padrões usando expressões regulares: AFDs reconhecem exatamente o conjunto de Linguagens Regulares que são, dentre outras coisas, úteis para a realização de análise léxica e reconhecimento de padrões\n\nImplementação de verificadores ortográficos: Uma maneira muito eficiente de se implementar verificadores ortograficos é o uso de automatos finitos determinısticos acıclicos mınimos\n\nDentre outras\n\nA opção incorreta na verdade é uma aplicação das Máquinas de Turing'
  },
  {
     question: "O que o termo “determinístico” de Autômato finito e determinístico significa?",
     choice1: "Cada sequência de estado é única",
     choice2: "Há um número limitado de estados possíveis que podem ser alcançados",
     choice3: "Cada sequência de estado é única e há um número limitado de estados possíveis que podem ser alcançados",
     choice4: "Independente da string de entrada, sempre retorna um valor pré determinado",
     answer: 3,
		 explanation: 'Autômatos finitos determinísticos (ou DFA) são máquinas de estado finito que aceitam ou rejeitam sequências de caracteres analisando-os por meio de uma sequência determinada exclusivamente por cada string (palavra).\n\nO termo "determinístico" se refere ao fato de que cada string e, portanto, cada sequência de estado, é única. Em um DFA, uma sequência de símbolos é analisada por meio de um autômato do DFA e cada símbolo de entrada se moverá para o próximo estado que pode ser determinado.\n\nEssas máquinas são chamadas de finitas porque há um número limitado de estados possíveis que podem ser alcançados. Um autômato finito só é chamado de determinístico se puder cumprir ambas as condições.'
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
