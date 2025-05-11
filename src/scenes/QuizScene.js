import { quizQuestions } from '../data/quizData.js';
import { globals } from '../globals.js';

export default class QuizScene extends Phaser.Scene {
  constructor() {
    super('QuizScene');
  }

  preload() {
    // Load all item and recipe images
    quizQuestions.forEach(q => {
      this.load.image(q.item, `assets/${q.item}`);
      q.options.forEach(opt => {
        this.load.image(opt.image, `assets/${opt.image}`);
      });
    });

    // Load UI assets
    this.load.image('heart', 'assets/ui/heart.png');
    this.load.image('background', 'assets/ui/background.png');
    this.load.audio('clickSound', 'assets/sfx/click.mp3');
  }

  create() {
    const HEART_SPACING = 50;
    const HEART_SCALE = 0.04;
    const HEART_START_X = 30;
    const HEART_START_Y = 30;

    // Background
    this.add.image(400, 300, 'background').setDepth(-1);

    // Hearts top left
    this.hearts = [];
    for (let i = 0; i < globals.lives; i++) {
      const heart = this.add.image(HEART_START_X + i * HEART_SPACING, HEART_START_Y, 'heart').setScale(HEART_SCALE);
      this.hearts.push(heart);
    }

    this.showQuestion();
  }

  showQuestion() {
    this.clearScene();
    const question = quizQuestions[globals.currentQuestion];

    // Item image
    this.add.image(400, 200, question.item).setScale(2);

    // Recipe options
    Phaser.Utils.Array.Shuffle(question.options).forEach((opt, index) => {
      const optionImage = this.add.image(200 + index * 200, 480, opt.image)
        .setInteractive()
        .setScale(1.2);

      optionImage.on('pointerdown', () => {
        this.sound.play('clickSound');
        this.checkAnswer(opt.isCorrect);
      });
    });
  }

  checkAnswer(isCorrect) {
    if (isCorrect) {
      globals.score++;
    } else {
      globals.lives--;
      this.hearts[globals.lives].setVisible(false);
    }

    if (globals.lives <= 0 || globals.currentQuestion + 1 >= quizQuestions.length) {
      this.scene.start('GameOverScene');
    } else {
      globals.currentQuestion++;
      this.showQuestion();
    }
  }

  clearScene() {
    const HEART_SPACING = 64;
    const HEART_SCALE = 0.07;
    const HEART_START_X = 30;
    const HEART_START_Y = 30;

    this.children.removeAll();
    this.add.image(400, 300, 'background').setDepth(-1);

    // Redraw hearts top-left
    this.hearts = [];
    for (let i = 0; i < globals.lives; i++) {
      const heart = this.add.image(HEART_START_X + i * HEART_SPACING, HEART_START_Y, 'heart').setScale(HEART_SCALE);
      this.hearts.push(heart);
    }
  }
}

