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
}
