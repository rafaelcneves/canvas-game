import { Main } from './main';
import { Bola } from './bola';

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

      // pontos += 1;
      // sons[1].play();

      return true;
    }
    return false;
  }
}

// function Tijolo (x, y, largura, altura) {
//   this.x = x;
//   this.y = y;
//   this.largura = largura;
//   this.altura = altura;

//   this.pintar = function () {
//     contexto.fillRect(this.x, this.y, this.largura, this.altura);
//     contexto.fillStyle='#555555';
//     contexto.strokeRect(this.x, this.y, this.largura, this.altura);
//     contexto.fillStyle='#000000';
//   };

//   this.detectarColisaoTijoloxBola = function () {
//     var xMaisProximo = clamp(bola.x, this.x, (this.x + this.largura));
//     var yMaisProximo = clamp(bola.y, this.y, (this.y + this.altura));

//     var distanciaX = bola.x - xMaisProximo;
//     var distanciaY = bola.y - yMaisProximo;
//     var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);

//     if (distancia < (bola.raio * bola.raio)) {
//       if (bola.x > this.x && bola.x < (this.x + this.largura)) {
//         bola.inverterY();
//       } else if (bola.y > this.y && bola.y < (this.y + this.altura)) {
//         bola.inverterX();
//       } else {
//         bola.inverterY();
//         bola.inverterX();
//       }

//       pontos += 1;
//       sons[1].play();

//       return true;
//     }
//     return false;
//   };
// }
