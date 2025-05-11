// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Menu extends Phaser.Scene {
  constructor() { // key de la escena; usada para iniciar la escena por otras escenas
    super("Escena-Menu");
  }

  init() { // Llamado antes de crear la escena; Inicializar variables; pasar datos entre escenas
    // Controles
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  preload() { // Pre-Cargar assets
    // Fondos
    this.load.image("Cielo", "./public/assets/Cielo.png");
    this.load.image("FondoMenu", "./public/assets/FondoMenu.png");
    this.load.image("FondoMenu2", "./public/assets/Menu.png");
    this.load.image("Victoria", "./public/assets/Victoria.png");
    this.load.image("Derrota", "./public/assets/Derrota.png");
    // Otros
    this.load.image("Suelo", "./public/assets/platform.png");
    this.load.image("ninja", "./public/assets/Ninja.png");
    this.load.image("diamante", "./public/assets/diamond.png");
    this.load.image("cuadrado", "./public/assets/square.png");
    this.load.image("triangulo", "./public/assets/triangle.png");
    this.load.image("circulo", "./public/assets/circle.png");
  }

  create() { // Crear los objetos del juego
    // Fondo
     this.add.image(400, 300, "FondoMenu2").setDisplaySize(this.scale.width, this.scale.height);

    // Texto
    this.add.text(400, 500, `Presiona ENTER para inicar`, {
      fontSize: "50px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 12,
    }).setOrigin(0.5);
  }

  update() { // Actualizar objetos del juego
    // Iniciar el juego
    if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
      this.scene.start("Escena-Juego");
    }
  }
}
