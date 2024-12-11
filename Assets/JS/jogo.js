const grid = document.querySelector('.grid');

const personagens = [
    'mario',
    'peach',
    'yoshi',
    'luigi',
    'bowser',
    'cogumelo',
    'wario',
    'marrom',
    'tartaruga',
    'waluigi'
];


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {

    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length == 20) {
        alert('Parabéns, parece que você consegue se lembrar do aniversário do seu cachorro hahaha.');
    }

}

const checarCarta = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem')
    const segundooPersonagem = segundaCarta.getAttribute('data-personagem')

    if (primeiroPersonagem == segundooPersonagem) {

        primeiraCarta.firstChild.classList.add('disable-card')
        segundaCarta.firstChild.classList.add('disable-card')


        primeiraCarta = '';
        segundaCarta = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            primeiraCarta.classList.remove('reveal-card')
            segundaCarta.classList.remove('reveal-card')

            primeiraCarta = '';
            segundaCarta = '';

        }, 500)

    }
}

let primeiraCarta = '';
let segundaCarta = '';

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

    front.style.backgroundImage = `url(' ../Assets/IMG/${personagens}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-personagem', personagens)

    return card;
}


const carregarJogo = () => {

    const personagensDuplicados = [...personagens, ...personagens]

    const personagensEmbaralhados = personagensDuplicados.sort(() => Math.random() - 0.5)

    personagensEmbaralhados.forEach((personagens) => {
        const card = createCard(personagens)
        grid.appendChild(card);
    })

}
carregarJogo();
