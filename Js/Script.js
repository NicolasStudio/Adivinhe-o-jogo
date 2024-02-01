let musicas = [
    {title: 'Green Hill Zone', jogo: 'Sonic', src:'Music/Sonic The Hedgehog - Green Hill Zone.mp3', numero: '1'},
    {title: 'Theme Super Mario Bros.', jogo: 'Super Mario', src:'Music/Super Mario Bros. - Theme.mp3', numero: '2'},
    {title: 'Riders on the Storm', jogo: 'Need for speed', src:'Music/Riders on the Storm.mp3', numero: '3'},
    {title: 'Top Gear - Theme', jogo: 'Top Gear', src:'Music/Top Gear - Theme.mp3', numero: '4'},
    {title: 'Bully - Theme', jogo: 'Bully', src:'Music/Bully - Theme.mp3', numero: '5'},
    {title: 'The Last of Us', jogo: 'The last of us', src:'Music/The Last of Us.mp3', numero: '6'},
    {title: 'Crash Bandicoot', jogo: 'Crash', src:'Music/Crash Bandicoot.mp3', numero: '7'},
    {title: 'Gta San Andreas', jogo: 'Gta San Andreas', src:'Music/Gta San Andreas.mp3' , numero: '8'},
    {title: 'Aerokid - Habbo', jogo: 'Habbo', src:'Music/Aerokid - Habbo.mp3' , numero: '9'},
    {title: 'Super Bomberman', jogo: 'Super Bomberman', src:'Music/Super Bomberman.mp3' , numero: '10'}
];

let imagens = [ {img:'Image/0.gif'},
                {img:'Image/1.gif'},
                {img:'Image/2.gif'},
                {img:'Image/3.gif'},
                {img:'Image/4.gif'} ];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let numeroMusica = document.querySelector('.numMusica');

let resposta = '';
let resposta2 = document.querySelector('.nomeMusica');

let pontos = 0;
let pontuacao = 0;
let tentativas = 3;

renderizarMusica(indexMusica);

document.querySelector('.play').addEventListener('click', tocarMusica);
document.querySelector('.pause').addEventListener('click', pauseMusica);
document.querySelector('.stop').addEventListener('click', pararMusica);

musica.addEventListener('timeupdate' , atualizarBarra);

document.querySelector('.pular').addEventListener('click' , () => {

    pararMusica();

    setTimeout(() => {
        
        indexMusica++;
        document.getElementById("texto").value='';
        renderizarMusica(indexMusica);
        tentativas = 3;
            endGame();
    }, 200);
});

function renderizarMusica(index){
    if(indexMusica >= 0 && indexMusica < 10 ){
        musica.setAttribute('src', musicas[index].src);
        musica.addEventListener('loadeddata', () => {

            numeroMusica.textContent = musicas[index].numero;

            resposta2  = musicas[index].jogo;

            duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

            endGame();
    });

        }else if(indexMusica > 10){
                endGame();      
        }


}

function tocarMusica(){
    musica.play();
}

function pauseMusica(){
    musica.pause();
}

function pararMusica(){
    musica.pause();
    musica.currentTime = 0;
}

function atualizarBarra (){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';

    let inicioNum = document.querySelector('.inicio');

    inicioNum.textContent = segundosParaMinutos (Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10){
        campoSegundos = '0'+ campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}

const confirmar = document.querySelector('.confirmar');

confirmar.addEventListener('click', function(e){
    e.preventDefault();

    const nome = document.querySelector('.texto');
    resposta = nome.value;

    if (resposta.trim().toLowerCase() === resposta2.trim().toLowerCase()) {
        alert('Você acertou!!! Ganhou 10 Pontos!');
        pontos = pontos + 10;
        pontuacao = pontos;

        pararMusica();

        setTimeout(() => {
            indexMusica++;

            if (indexMusica < musicas.length) {
                // Se houver mais músicas, renderizar e resetar tentativas para 3
                renderizarMusica(indexMusica);
                tentativas = 3;
            } else {
                // Se não houver mais músicas, encerrar o jogo ou tomar a ação desejada
                // Por exemplo: redirecionar para a página de resultados
                endGame();
            }

            document.getElementById("texto").value = '';
        }, 500);

    } else {
        tentativas = tentativas - 1;
        alert('Errou!!! Suas tentativas: ' + tentativas);

        if (tentativas == 0) {
            setTimeout(() => {
                alert('Você errou e gastou suas tentativas para essa música');
                indexMusica++;

                if (indexMusica < musicas.length) {
                    // Se houver mais músicas, renderizar e resetar tentativas para 3
                    renderizarMusica(indexMusica);
                    tentativas = 3;
                } else {
                    // Se não houver mais músicas, encerrar o jogo ou tomar a ação desejada
                    // Por exemplo: redirecionar para a página de resultados
                    endGame();
                }
            }, 300);
        }
    }
});


const endGame = () => {

    if(indexMusica == 10){
        
        window.localStorage.setItem('acertos', pontuacao);
        
        window.location.assign('resultado.html');
            mensagemFim();
        
    }

}

const mensagemFim = () => {
    let texto0 ='Você pelo visto nunca jogou nada';
    let texto1 ='Você pelo visto jogou poucos jogos ou tem pouca memória';
    let texto2 ='Você pelo visto é um jogador casual, nem pouco, nem muito, o suficiente';
    let texto3 ='Você pelo visto é um jogador acima da média, meus parabéns';
    let texto4 ='Você pelo visto é um gamer fantástico, conhece tudo. Meus parabéns!!!';
    let num0 = 0;
    let num1 = 1;
    let num2 = 2;
    let num3 = 3;
    let num4 = 4;

    if(pontuacao == 0){
        window.localStorage.setItem('mensagem', texto0);
        window.localStorage.setItem('num', num0);

    }else if(pontuacao >=10 && pontuacao <= 40){
        window.localStorage.setItem('mensagem', texto1);
        window.localStorage.setItem('num', num1);

    }else if(pontuacao >=50 && pontuacao <= 60){
        window.localStorage.setItem('mensagem', texto2);
        window.localStorage.setItem('num', num2);

    }else if(pontuacao >=70 && pontuacao <= 90){
        window.localStorage.setItem('mensagem', texto3);
        window.localStorage.setItem('num', num3);

    }else if(pontuacao == 100){
        window.localStorage.setItem('mensagem', texto4);
        window.localStorage.setItem('num', num4);

    } 

}