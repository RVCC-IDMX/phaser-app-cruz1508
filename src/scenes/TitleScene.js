// TitleScene.js - Shows game title and start button
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('logo', 'assets/ui/minecraft_quiz_logo.png');
    this.load.image('startButton', 'assets/ui/start_button.png');
    this.load.audio('clickSound', 'assets/sfx/click.mp3');
    this.load.image('background', 'assets/ui/background.png');
  }

create() {
  // background
  this.add.image(400, 300, 'background').setDepth(-1);

  // Minecraft Quiz Logo
  this.add.image(400, 160, 'logo').setScale(0.6);

  // Start button
  const startBtn = this.add.image(400, 420, 'startButton')
    .setInteractive()
    .setScale(0.45);

  startBtn.on('pointerdown', () => {
    this.sound.play('clickSound');
    this.scene.start('QuizScene');
  });
}

}
