import { Main } from "./main";
import { Bola } from "./bola";
import { SoundEffects } from "./sound_effects";

export class Raquete {
  x: number;
  y: number;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  constructor(x: number, y: number, width: number, height: number, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.context = context;
  }

  paint() {
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  move(dx: number) {
    this.x += dx;
  }

  detectColisionPlayerxBall(ball: Bola) {
    var xMaisProximo = Main.clamp(ball.x, this.x, (this.x + this.width));
    var yMaisProximo = Main.clamp(ball.y, this.y, (this.y + this.height));

    var distanciaX = ball.x - xMaisProximo;
    var distanciaY = ball.y - yMaisProximo;
    var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);

    if (distancia < (ball.radius * ball.radius)) {
      ball.invertY();
      SoundEffects.playBlop();

      return true;
    }
    return false;
  }
}
