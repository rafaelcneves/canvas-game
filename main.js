var contexto;
var temporizador;
var mapaTecla = [];
var estado = 0;
var pontos = 0;
var hiscore;
dado = parseInt(localStorage.getItem('hiscore'));
hiscore = (isNaN(dado)) ? 0 : dado;

var jogador = new Raquete(150, 580, 100, 10);
var bola = new Bola(200, 570, 10);
var tijolos = [
  new Tijolo(10, 10, 50, 10),
  new Tijolo(62, 10, 50, 10),
  new Tijolo(114, 10, 50, 10),
  new Tijolo(166, 10, 50, 10),
  new Tijolo(30, 22, 50, 10),
  new Tijolo(82, 22, 50, 10),
  new Tijolo(134, 22, 50, 10),
  new Tijolo(186, 22, 50, 10)
];
var sons = [
  new Audio('Blop.mp3'),
  new Audio('MirrorBreaking.mp3')
];

window.onload = iniciar;
window.onkeydown = teclaPressionada;
window.onkeyup = teclaSolta;

function iniciar () {
  var canvas = document.getElementById('game');
  contexto = canvas.getContext('2d');
  jogador.pintar();
  temporizador = setInterval(mainloop, 33);
}

function pintar () {
  contexto.clearRect(0, 0, 400, 600);
  jogador.pintar();
  bola.pintar();

  for(t in tijolos){
    tijolos[t].pintar();
  }

  contexto.font = '18pt monospace';
  switch(estado){
    case 0:
      contexto.fillText('Aperte ESPACO para iniciar', 12, 295);
      break;
    case 1:
      contexto.fillText(pontos, 350, 595);
      break;
    case 2:
      contexto.fillText('Fim de Jogo', 125, 295);
      break;
    case 3:
      contexto.fillText('Voce venceu', 125, 295);
      break;
  }

  contexto.fillText('Hi-Score', 5, 575);
  contexto.fillText(hiscore, 5, 595);
}

function mainloop () {
  if (mapaTecla[37] == true) {
    jogador.mover(-2);
  }

  if (mapaTecla[39] == true) {
    jogador.mover(2);
  }

  if (mapaTecla[32] == true && estado == 0) {
    estado = 1;
  }

  if (estado == 1) {
    bola.mover();
  }

  bola.verificaColisao();

  for (t in tijolos) {
    if(tijolos[t].detectarColisaoTijoloxBola()){
      tijolos.splice(t, 1);
      if(tijolos.length == 0){
        estado = 3;
        setarhiscore();
      }
    }
  }

  pintar();
}

function teclaPressionada (evento) {
  mapaTecla[evento.keyCode] = true;
}

function teclaSolta (evento) {
  mapaTecla[evento.keyCode] = false;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function detectarColisaoRaquetexBola() {
  var xMaisProximo = clamp(bola.x, jogador.x, (jogador.x + jogador.largura));
  var yMaisProximo = clamp(bola.y, jogador.y, (jogador.y + jogador.altura));

  var distanciaX = bola.x - xMaisProximo;
  var distanciaY = bola.y - yMaisProximo;
  var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);

  return distancia < (bola.raio * bola.raio);
}

function setarhiscore() {
  if (pontos > hiscore) {
    hiscore = pontos;
    localStorage.setItem('hiscore', pontos);
  }
}

function Raquete (x, y, largura, altura) {
  this.x = x;
  this.y = y;
  this.largura = largura;
  this.altura = altura;

  this.pintar = function () {
    contexto.fillRect(this.x, this.y, this.largura, this.altura);
  };

  this.mover = function (dx) {
    this.x += dx;
  };
}

function Bola(x,y,raio){
  this.x = x;
  this.y = y;
  this.raio = raio;
  this.dirX = (Math.random() > 0.5) ? 3 : -3;
  this.dirY = -3;

  this.pintar = function () {
    contexto.beginPath();
    contexto.arc(this.x, this.y, this.raio, 0, 2*Math.PI);
    contexto.fill();
  };

  this.mover = function () {
    this.x += this.dirX;
    this.y += this.dirY;
  };

  this.inverterX = function () {
    this.dirX *= -1;
  };

  this.inverterY = function () {
    this.dirY *= -1;
  };

  this.verificaColisao = function () {
    if ((this.x - this.raio) <= 0 || (this.x + this.raio) >= 400) {
      this.inverterX();
      sons[0].play();
    }

    if ((this.y - this.raio) <= 0 || detectarColisaoRaquetexBola()) {
      this.inverterY();
      sons[0].play();
    }

    if ((this.y - this.raio) >= 600) {
      estado = 2;
      setarhiscore();
    }
  };
}

function Tijolo (x, y, largura, altura) {
  this.x = x;
  this.y = y;
  this.largura = largura;
  this.altura = altura;

  this.pintar = function () {
    contexto.fillRect(this.x, this.y, this.largura, this.altura);
    contexto.fillStyle='#555555';
    contexto.strokeRect(this.x, this.y, this.largura, this.altura);
    contexto.fillStyle='#000000';
  };

  this.detectarColisaoTijoloxBola = function () {
    var xMaisProximo = clamp(bola.x, this.x, (this.x + this.largura));
    var yMaisProximo = clamp(bola.y, this.y, (this.y + this.altura));

    var distanciaX = bola.x - xMaisProximo;
    var distanciaY = bola.y - yMaisProximo;
    var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);

    if (distancia < (bola.raio * bola.raio)) {
      if (bola.x > this.x && bola.x < (this.x + this.largura)) {
        bola.inverterY();
      } else if (bola.y > this.y && bola.y < (this.y + this.altura)) {
        bola.inverterX();
      } else {
        bola.inverterY();
        bola.inverterX();
      }

      pontos += 1;
      sons[1].play();

      return true;
    }
    return false;
  };
}
