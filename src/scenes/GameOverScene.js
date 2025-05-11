// GameOverScene.js - Shows final score and lets player restart
import { globals } from '../globals.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  preload() {
    this.load.image('gameOverBanner', 'assets/ui/game_over.png');
    this.load.image('restartBanner', 'assets/ui/restart.png');
    this.load.image('background', 'assets/ui/background.png');
  }

  create() {
    // Background image
    this.add.image(400, 300, 'background').setDepth(-1);

    // Game Over image
    this.add.image(400, 130, 'gameOverBanner').setScale(0.4);

    // Score text
    this.add.text(400, 315, `Score: ${globals.score}`, {
      fontSize: '32px',
      fill: '#000',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Restart button image
    const restart = this.add.image(400, 500, 'restartBanner')
      .setInteractive()
      .setScale(0.4);

    restart.on('pointerdown', () => {
      globals.lives = 3;
      globals.score = 0;
      globals.currentQuestion = 0;
      this.scene.start('QuizScene');
    });
  }
}
