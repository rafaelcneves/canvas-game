import { SoundEffects } from './sound_effects';

export class Bola {
  x: number;
  y: number;
  radius: number;
  dirX: number = (Math.random() > 0.5) ? 3 : -3;
  dirY: number = -3;
  context: CanvasRenderingContext2D;

  constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.context = context;
  }

  paint() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    this.context.fill();
  }

  move() {
    this.x += this.dirX;
    this.y += this.dirY;
  }

  invertX() {
    this.dirX *= -1;
  }

  invertY() {
    this.dirY *= -1;
  }

  detectColision() {
    if ((this.x - this.radius) <= 0 || (this.x + this.radius) >= 400) {
      this.invertX();
      SoundEffects.playBlop();
    }

    if ((this.y - this.radius) <= 0 || window['main'].detectarColisaoRaquetexBola()) {
      this.invertY();
      SoundEffects.playBlop();
    }

    if ((this.y - this.radius) >= 600) {
      // estado = 2;
      // setarhiscore();
    }
  };
}
