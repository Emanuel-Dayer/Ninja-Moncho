// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Escena_Juego extends Phaser.Scene {
  constructor() { // key de la escena; usada para iniciar la escena por otras escenas
    super("Escena-Juego");
  }

  init() { // Llamado antes de crear la escena; Inicializar variables; pasar datos entre escenas
    // controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  preload() { // Pre-Cargar assets
    this.load.image("Cielo", "./public/assets/Cielo.png");
    this.load.image("Suelo", "./public/assets/platform.png");
    this.load.image("ninja", "./public/assets/Ninja.png");
    this.load.image("diamante", "./public/assets/diamond.png");
    this.load.image("cuadrado", "./public/assets/square.png");
    this.load.image("triangulo", "./public/assets/triangle.png");
  }

  create() { // Crear los objetos del juego
    // Fondo y plataformas
    this.add.image(400, 300, "Cielo").setDisplaySize(this.scale.width, this.scale.height);
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400, 570, "Suelo").setScale(2).refreshBody();

    // Jugador
    this.jugador = this.physics.add.sprite(400, 506, "ninja").setScale(0.1);
    this.jugador.setCollideWorldBounds(true);
    this.jugador.setBounce(0.2);

    // Colisiones
    this.physics.add.collider(this.jugador, this.plataformas);
  }

  update() { // Actualizar objetos del juego
    // Movimiento del jugador
    if (this.cursors.left.isDown || this.keyA.isDown) {
      this.jugador.setVelocityX(-160);
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.jugador.setVelocityX(160);
    } else {
      this.jugador.setVelocityX(0);
    }

    if ((this.cursors.up.isDown || this.keyW.isDown) && this.jugador.body.touching.down) {
      this.jugador.setVelocityY(-330);
    }
  }
}
