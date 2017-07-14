import { Main } from './main';
import { Bola } from './bola';
import { SoundEffects } from "./sound_effects";

export class Tijolo {
  x: number;
  y: number;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  constructor(x: number, y: number, width: number, height:number, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.context = context;
  }

  paint() {
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.fillStyle='#555555';
    this.context.strokeRect(this.x, this.y, this.width, this.height);
    this.context.fillStyle='#000000';
  }

  detectColisionBrickxBall(ball: Bola) {
    var xMaisProximo = Main.clamp(ball.x, this.x, (this.x + this.width));
    var yMaisProximo = Main.clamp(ball.y, this.y, (this.y + this.height));

    var distanciaX = ball.x - xMaisProximo;
    var distanciaY = ball.y - yMaisProximo;
    var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);

    if (distancia < (ball.radius * ball.radius)) {
      if (ball.x > this.x && ball.x < (this.x + this.width)) {
        ball.invertY();
      } else if (ball.y > this.y && ball.y < (this.y + this.height)) {
        ball.invertX();
      } else {
        ball.invertY();
        ball.invertX();
      }

      SoundEffects.playMirrorBreaking();

      return true;
    }
    return false;
  }
}
