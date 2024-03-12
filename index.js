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
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
};

canvas.width = 1024; //largura da tela do jogo
canvas.height = 576; //alura da tela do jogo

class Sprite {
    constructor({ position, imgSrc }) {
        this.position = position;
        this.image = new Image(); //cria var local e instancia classe Image
        this.image.src = imgSrc; //seta o valor de source da imagem do sprite
    }

    draw() {
        if(!this.image) return; //se a imagem estiver vazia, retorna sem fazer nada
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}

//INSTANCIA CLASSE SPRITE. INSTANCIAMENTOS DEVEM FICAR DEPOIS DA CRIAÇÃO DA CLASSE
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: './assets/background.png'
});

class Player {
    constructor (position) {
        this.position = position; //criando variavel local da classe player com base em um parametro que recebemos quando instanciamos a classe
        this.velocity = {
            x: 0,
            y: 1
        };
        this.height = 100;
    } //construtor da classe player. sempre executa quando cria um novo player

    draw() {
        c.fillStyle = 'red'; //cor do objeto
        c.fillRect(this.position.x, this.position.y, 100, this.height); //argumentos: x, y, width, height
    }

    update() {
        this.draw(); //refaz os desenhos quando entra no loop
        this.position.x += this.velocity.x; //aumenta a posicao de forma q faz o obj andar
        this.position.y += this.velocity.y; //aumenta a posicao de forma q faz o obj cair
        if((this.position.y + this.height + this.velocity.y) < canvas.height)
            this.velocity.y += gravity; // se a posicao do player, mais o tamanho dele, mais a velocidade na qual ele estava cainto no eixo y for menor q o tamanho da tela, para de cair.
        else this.velocity.y = 0; // colocamos a velocidade em zero para que pare de contar no eixo y
    }
}

//INSTANCIA CLASSE SPRITE. INSTANCIAMENTOS DEVEM FICAR DEPOIS DA CRIAÇÃO DA CLASSE
const player = new Player({x: 10, y: 10}); //instancia o player

function animate() {
    window.requestAnimationFrame(animate); //atualiza o frame da tela com o argumento criando um loop

    c.fillStyle = 'white'; //cor do objeto
    c.fillRect(0, 0, canvas.width, canvas.height); //argumentos: x, y, width, height

    c.save(); //saves the entire state of the canvas by pushing the current state onto a stack. link: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    c.scale(4, 4); //adds a scaling transformation to the canvas units horizontally and/or vertically. link: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
    c.translate(0, -background.image.height + scaledCanvas.height); //adds a translation transformation to the current matrix. link: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
    background.update();
    c.restore(); // restores the most recently saved canvas state by popping the top entry in the drawing state stack. If there is no saved state, this method does nothing. link: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
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
