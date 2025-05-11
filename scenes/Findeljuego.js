export default class Findeljuego extends Phaser.Scene {
  constructor() {
    super("Fin_Del_Juego"); // Nombre de la escena
  }

  init(data) {
    // Recibir datos de la escena anterior
    this.victoriaODerrota = data.victoriaODerrota;
    this.puntos = data.puntos;

    // Controles
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  create() {
    // Fondo
    this.add.image(400, 300, "Cielo").setDisplaySize(this.scale.width, this.scale.height);

    // Texto de victoria o derrota
    this.add.text(400, 200, this.victoriaODerrota, {
      fontSize: "48px",
      fill: this.victoriaODerrota === "Ganaste" ? "#0f0" : "#f00",
      stroke: "#000",
      strokeThickness: 8,
    }).setOrigin(0.5);

    // Mostrar la puntuación final
    this.add.text(400, 300, `Puntuación: ${this.puntos}`, {
      fontSize: "32px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 8,
    }).setOrigin(0.5);

    // Texto para reiniciar el juego
    this.add.text(400, 400, "Presiona R para reiniciar", {
      fontSize: "32px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 8,
    }).setOrigin(0.5);
  }

  update() { // Actualizar objetos del juego
    // Reiniciar el juego
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.start("Escena-Juego");
    }
  }
}