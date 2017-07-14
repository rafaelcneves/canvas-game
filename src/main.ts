import { Raquete } from './raquete';
import { Bola } from './bola';
import { Tijolo } from './tijolo';
import { Hud } from "./hud";

export class Main {
  context: CanvasRenderingContext2D;
  timer: any;
  keyMap: any = {};

  state: number = 0;

  hud: Hud;
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

    this.hud = new Hud(this.context);
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

    this.ball.detectWallColision();

    if (this.ball.detectOutOfBounds()) {
      this.state = 2;
      this.hud.updateHiscore();
      this.hud.scoreReset();
    }

    this.player.detectColisionPlayerxBall(this.ball);

    this.bricks.forEach((brick, i) => {
      if (brick.detectColisionBrickxBall(this.ball)) {
        this.bricks.splice(i, 1);
        this.hud.scoreIncrement();

        if (this.bricks.length == 0) {
          this.state = 3;
          this.hud.updateHiscore();
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
    this.hud.paint(this.state);
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
