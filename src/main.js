// main.js - Initializes Phaser game and sets up scenes
import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene.js';
import QuizScene from './scenes/QuizScene.js';
import GameOverScene from './scenes/GameOverScene.js';

window.onload = function () {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: [TitleScene, QuizScene, GameOverScene]
  });

  game.scene.start('TitleScene'); // Force start the title screen
};
