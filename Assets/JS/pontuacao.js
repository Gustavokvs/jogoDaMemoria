const pontuacaoDisplay = document.getElementById("pontuacao");

let pontuacao = 0;

function atualizarPontuacao(){
    pontuacaoDisplay.textContent = "Pontuação: ${pontuacao}";
}



if (primeiraCarta.dataset.personagens == segundaCarta.dataset.personagens){
    pontuacao += 10;
    atualizarPontuacao(); 
} 

