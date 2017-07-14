export class SoundEffects {
  private static readonly soundEffects: any[] = [
    new Audio('Blop.mp3'),
    new Audio('MirrorBreaking.mp3')
  ];

  static playBlop() {
    this.soundEffects[0].play();
  }

  static playMirrorBreaking() {
    this.soundEffects[1].play();
  }
}
