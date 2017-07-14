import { Raquete } from './raquete';
import { Bola } from './bola';
import { Tijolo } from './tijolo';

export class Main {
  context: CanvasRenderingContext2D;
  timer: any;
  keyMap: any = {};

  state: number = 0;
  score: number = 0;
  hiscore: number = 0;

  player: Raquete;
  ball: Bola;
  bricks: Tijolo[];

  constructor() {
    let canvas = <HTMLCanvasElement>document.getElementById('game');
    this.context = canvas.getContext('2d');

    this.player = new Raquete(150, 580, 100, 10, this.context);
    this.ball = new Bola(200, 570, 10, this.context);
    this.bricks = [
      new Tijolo(10, 10, 50, 10, this.context),
      new Tijolo(62, 10, 50, 10, this.context),
      new Tijolo(114, 10, 50, 10, this.context),
      new Tijolo(166, 10, 50, 10, this.context),
      new Tijolo(30, 22, 50, 10, this.context),
      new Tijolo(82, 22, 50, 10, this.context),
      new Tijolo(134, 22, 50, 10, this.context),
      new Tijolo(186, 22, 50, 10, this.context)
    ];
    this.hiscore = parseInt(localStorage.getItem('hiscore'));
  }

  start() {
    this.timer = setInterval(() => { this.mainloop() }, 33);
  }

  mainloop() {
    if (this.keyMap[37] == true) {
      this.player.move(-2);
    }

    if (this.keyMap[39] == true) {
      this.player.move(2);
    }

    if (this.keyMap[32] == true && this.state == 0) {
      this.state = 1;
    }

    if (this.state == 1) {
      this.ball.move();
    }

    this.ball.detectColision();

    this.bricks.forEach((brick, i) => {
      if (brick.detectColisionBrickxBall(this.ball)) {
        this.bricks.splice(i, 1);
        if (this.bricks.length == 0) {
          this.state = 3;
          this.updateHiscore();
        }
      }
    });

    this.paint();
  }

  paint() {
    this.context.clearRect(0, 0, 400, 600);
    this.player.paint();
    this.ball.paint();

    this.bricks.forEach(brick => brick.paint());

    this.context.font = '18pt monospace';
    switch(this.state){
      case 0:
        this.context.fillText('Aperte ESPACO para iniciar', 12, 295);
        break;
      case 1:
        this.context.fillText(this.score.toString(), 350, 595);
        break;
      case 2:
        this.context.fillText('Fim de Jogo', 125, 295);
        break;
      case 3:
        this.context.fillText('Voce venceu', 125, 295);
        break;
    }

    this.context.fillText('Hi-Score', 5, 575);
    this.context.fillText(this.hiscore.toString(), 5, 595);
  }

  updateHiscore() {
    if (this.score > this.hiscore) {
      this.hiscore = this.score;
      localStorage.setItem('hiscore', this.score.toString());
    }
  }

  onKeyDown(e) {
    this.keyMap[e.keyCode] = true;
  }

  onKeyUp(e) {
    this.keyMap[e.keyCode] = false;
  }

  static clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  detectarColisaoRaquetexBola() {
    var xMaisProximo = Main.clamp(this.ball.x, this.player.x, (this.player.x + this.player.width));
    var yMaisProximo = Main.clamp(this.ball.y, this.player.y, (this.player.y + this.player.height));

    var distanciaX = this.ball.x - xMaisProximo;
    var distanciaY = this.ball.y - yMaisProximo;
    var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);

    return distancia < (this.ball.radius * this.ball.radius);
  }
}

window.onload = function () {
  window['main'] = new Main();
  window['main'].start();

  window.onkeydown = function (e) {
    window['main'].onKeyDown(e);
  };
  window.onkeyup = function (e) {
    window['main'].onKeyUp(e);
  };
};
