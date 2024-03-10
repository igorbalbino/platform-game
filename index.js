const canvas = document.querySelector('canvas'); //tag do html
const c = canvas.getContext('2d'); //contexto de como as coisas devem ser desenhadas
const gravity = 0.5; //da efeito de gravidade
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
};

canvas.width = 1024; //largura da tela do jogo
canvas.height = 576; //alura da tela do jogo

class Player {
    constructor (position) {
        this.position = position; //criando variavel local da classe player com base em um parametro que recebemos quando instanciamos a classe
        this.velocity = {
            x: 0,
            y: 1
        };
        this.heigth = 100;
    } //construtor da classe player. sempre executa quando cria um novo player

    draw() {
        c.fillStyle = 'red'; //cor do objeto
        c.fillRect(this.position.x, this.position.y, 100, this.heigth); //argumentos: x, y, width, heigth
    }

    update() {
        this.draw(); //refaz os desenhos quando entra no loop
        this.position.x += this.velocity.x; //aumenta a posicao de forma q faz o obj andar
        this.position.y += this.velocity.y; //aumenta a posicao de forma q faz o obj cair
        if((this.position.y + this.heigth + this.velocity.y) < canvas.height)
            this.velocity.y += gravity; // se a posicao do player, mais o tamanho dele, mais a velocidade na qual ele estava cainto no eixo y for menor q o tamanho da tela, para de cair.
        else this.velocity.y = 0; // colocamos a velocidade em zero para que pare de contar no eixo y
    }
}

const player = new Player({x: 10, y: 10}); //instancia o player

function animate() {
    window.requestAnimationFrame(animate); //atualiza o frame da tela com o argumento criando um loop

    c.fillStyle = 'white'; //cor do objeto
    c.fillRect(10, 10, canvas.width, canvas.height); //argumentos: x, y, width, heigth

    player.update(); //da update no player para q se mova

    player.velocity.x = 0;
    if(keys.d.pressed) player.velocity.x = 5;
    else if(keys.a.pressed) player.velocity.x = -5;
}
animate(); //inicia o loop do jogo

window.addEventListener(`keydown`, (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            player.velocity.y = -15;
            break;
        case 's':
            break;
    }
}); //evento que dispara quando precionamos qualquer tecla. a sintaxe `() => {}` depois da virgula e uma funcao de callback para ser chamada quando o evento disparar 

window.addEventListener(`keyup`, (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            player.velocity.y = -1;
            break;
        case 's':
            break;
    }
}); //evento que dispara quando precionamos qualquer tecla. a sintaxe `() => {}` depois da virgula e uma funcao de callback para ser chamada quando o evento disparar 
