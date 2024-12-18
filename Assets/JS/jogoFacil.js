const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score');

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
let loop;
let score = 0;

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (timer.innerHTML == 0) {
        setTimeout(() => {
            alert('Sinto muito, mas vc tem uma memória de peixe.');
            stopTimer();
            saveScore();
        }, 1000);
    } else if (disableCards.length == 12) {
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML} você conseguiria se lembrar do aniversário do seu cachorro kkkkk`);
            stopTimer();
            saveScore();
        }, 1000);
    }
}

const checarCarta = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundooPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiroPersonagem == segundooPersonagem) {
        primeiraCarta.firstChild.classList.add('disable-card');
        segundaCarta.firstChild.classList.add('disable-card');
        primeiraCarta = '';
        segundaCarta = '';
        score += 10;
        updateScore();
        checkEndGame();
    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('reveal-card');
            segundaCarta.classList.remove('reveal-card');
            primeiraCarta = '';
            segundaCarta = '';
        }, 500);
    }
}

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
        checarCarta();
    }
}

const createCard = (personagens) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('./Assets/IMG/${personagens}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-personagem', personagens);

    return card;
}

const carregarJogo = () => {
    const personagensDuplicados = [...personagens, ...personagens];
    const personagensEmbaralhados = personagensDuplicados.sort(() => Math.random() - 0.5);

    personagensEmbaralhados.forEach((personagem) => {
        const card = createCard(personagem);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        if (currentTime <= 0) {
            clearInterval(loop);
            checkEndGame();
        } else {
            timer.innerHTML = currentTime - 1;
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(loop);
}

const updateScore = () => {
    scoreDisplay.innerHTML = `Pontuação: ${score}`;
}

const saveScore = () => {
    const playerName = localStorage.getItem('player');
    const newScore = { name: playerName, score: score };

    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    ranking.push(newScore);
    ranking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(ranking));

    // Redireciona para a página de ranking
    window.location.href = 'ranking.html';
}

const startGame = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;

    score = 0;
    updateScore();

    startTimer();
    carregarJogo();
}

window.onload = startGame;
