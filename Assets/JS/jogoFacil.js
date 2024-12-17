const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');



const personagens = [
    'mario',
    'peach',
    'yoshi',
    'luigi',
    'bowser',
    'cogumelo',
 
];

let primeiraCarta = '';
let segundaCarta = '';
let loop; // Variável para armazenar o setInterval

// Função para criar elementos
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Função para verificar se o jogo acabou (vencedor ou derrota por tempo)
const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');


    if (timer.innerHTML == 0) {
        setTimeout(() => {
            alert('Sinto muito, mas vc tem uma memória de peixe.');
            stopTimer(); // Para o tempo
        }, 1000)
        setTimeout(() => {
            window.location.href = 'inicio.html'; // Redireciona para a página inicial
        }, 4000)
    } else if (disableCards.length == 12) {
        setTimeout(() => {

            alert(`Parabéns, ${spanPlayer.innerHTML} você conseguiria se lembrar do aniversário do seu cachorro kkkkk`);
            stopTimer(); // Para o tempo
        }, 1000)
        setTimeout(() => {
            window.location.href = 'inicio.html'; // Redireciona para a página inicial
        }, 4000)

    }
}

// Função que compara as cartas
const checarCarta = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundooPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiroPersonagem == segundooPersonagem) {
        primeiraCarta.firstChild.classList.add('disable-card');
        segundaCarta.firstChild.classList.add('disable-card');
        primeiraCarta = '';
        segundaCarta = '';
        checkEndGame(); // Verifica se o jogo acabou
    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('reveal-card');
            segundaCarta.classList.remove('reveal-card');
            primeiraCarta = '';
            segundaCarta = '';
        }, 500)
    }
}

// Função para revelar as cartas
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (primeiraCarta == '') {
        target.parentNode.classList.add('reveal-card');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
        target.parentNode.classList.add('reveal-card');
        segundaCarta = target.parentNode;
        checarCarta(); // Verifica se as cartas combinam
    }
}

// Função para criar uma carta
const createCard = (personagens) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(' ../IMG/${personagens}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-personagem', personagens);

    return card;
}

// Função para carregar o jogo com as cartas embaralhadas
const carregarJogo = () => {
    const personagensDuplicados = [...personagens, ...personagens];
    const personagensEmbaralhados = personagensDuplicados.sort(() => Math.random() - 0.5);

    personagensEmbaralhados.forEach((personagem) => {
        const card = createCard(personagem);
        grid.appendChild(card);
    })
}

// Função para iniciar o timer
const startTimer = () => {
    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        if (currentTime <= 0) {
            clearInterval(loop); // Para o intervalo quando o tempo chega a zero
            checkEndGame(); // Verifica se o jogo acabou devido ao tempo
        } else {
            timer.innerHTML = currentTime - 1;
        }
    }, 1000);
}

// Função para parar o timer
const stopTimer = () => {
    clearInterval(loop); // Para o intervalo
}

// Função para iniciar o jogo
const startGame = () => {
    // Exibe o nome do jogador
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;

    // Inicia o jogo
    startTimer();
    carregarJogo();
}

// Inicia o jogo quando a página é carregada
window.onload = startGame;

