export class Hud {
  score: number = 0;
  hiscore: number = 0;
  context: CanvasRenderingContext2D;

  constructor(context) {
    this.hiscore = parseInt(localStorage.getItem('hiscore'));

    this.context = context;
  }

  paint(state: number = 0) {
    this.context.font = '18pt monospace';
    switch(state) {
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

  scoreIncrement() {
    this.score++;
  }

  scoreReset() {
    this.score = 0;
  }

  updateHiscore() {
    if (this.score > this.hiscore) {
      this.hiscore = this.score;
      localStorage.setItem('hiscore', this.score.toString());
    }
  }
}
