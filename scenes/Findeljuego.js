export default class Findeljuego extends Phaser.Scene {
  constructor() {
    super("Fin_Del_Juego"); // Nombre de la escena
  }

  init(data) {
    // Recibir datos de la escena anterior
    this.victoriaODerrota = data.victoriaODerrota;
    this.puntos = data.puntos;
  }

  create() {
    // Fondo
    this.add.image(400, 300, "Cielo").setDisplaySize(this.scale.width, this.scale.height);
  }
}