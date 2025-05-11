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
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    // Variables
    this.physics.world.drawDebug = false; // Desactiva el modo debug
    this.UnSegundo = 1000; // un segundo en milisegundos
    this.Puntos = 0;
    this.TiempoRestante = 30;
    this.victoriaODerrota = ""; 

    // Array con objetos literales definiendo los tipos de figuras
    this.Tiposfiguras = [
      { tipo: "cuadrado", cantidadjuntados: 0, puntos: 10 },
      { tipo: "triangulo", cantidadjuntados: 0, puntos: 15 },
      { tipo: "diamante", cantidadjuntados: 0, puntos: 20 },
      { tipo: "circulo", cantidadjuntados: 0, puntos: -25 },
    ];
  }

  preload() { // Pre-Cargar assets
    this.load.image("Cielo", "./public/assets/Cielo.png");
    this.load.image("Suelo", "./public/assets/platform.png");
    this.load.image("ninja", "./public/assets/Ninja.png");
    this.load.image("diamante", "./public/assets/diamond.png");
    this.load.image("cuadrado", "./public/assets/square.png");
    this.load.image("triangulo", "./public/assets/triangle.png");
    this.load.image("circulo", "./public/assets/circle.png");
  }

  create() { // Crear los objetos del juego
    // Fondo y plataformas
    this.add.image(400, 300, "Cielo").setDisplaySize(this.scale.width, this.scale.height);
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400, 570, "Suelo").setScale(2).refreshBody();
    this.plataformas.create(150, 350, "Suelo").setScale(0.5, 1).refreshBody();
    this.plataformas.create(650, 350, "Suelo").setScale(0.5, 1).refreshBody();

    // Jugador
    this.jugador = this.physics.add.sprite(400, 506, "ninja").setScale(0.1);
    this.jugador.setCollideWorldBounds(true);
    this.jugador.setBounce(0.2);

    // Grupo de figuras
    this.figuras = this.physics.add.group();

    // Colisiones y overlaps
    this.physics.add.collider(this.jugador, this.plataformas);
    this.physics.add.collider(this.figuras, this.plataformas, this.ReboteFigura, null, this);
    this.physics.add.overlap(this.jugador, this.figuras, this.recolectarFigura, null, this);

    // Textos
    this.TextoPuntos = this.add.text(16, 16, `Puntos: ${this.Puntos}`, {
      fontSize: "32px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 8,
    }).setDepth(10);

    this.TextoTiempo = this.add.text(570, 16, `Tiempo: ${this.TiempoRestante}s`, {
      fontSize: "32px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 8,
    }).setDepth(10);

    // Textos para mostrar la cantidad de figuras recolectadas
    this.TextoCuadrados = this.add.text(16, 60, `Cuadrados: 0`, {
      fontSize: "24px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 4,
    }).setDepth(10);

    this.TextoTriangulos = this.add.text(16, 90, `Triángulos: 0`, {
      fontSize: "24px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 4,
    }).setDepth(10);

    this.TextoDiamantes = this.add.text(16, 120, `Diamantes: 0`, {
      fontSize: "24px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 4,
    }).setDepth(10);

    // Evento de tiempo para spawnear figuras
    this.eventoSpawnear = this.time.addEvent({
      delay: this.UnSegundo/2,
      callback: this.spawnearFigura,
      callbackScope: this,
      loop: true,
    });

    // Evento de tiempo del TIMER
    this.eventoTiempo = this.time.addEvent({
      delay: this.UnSegundo,
      callback: this.actualizarTiempo,
      callbackScope: this,
      loop: true,
    });
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

    if ((this.cursors.up.isDown || this.keyW.isDown) && this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(330 * -1);
    }

    // Activar/Desactivar Modo Debug
    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.physics.world.drawDebug = !this.physics.world.drawDebug; // lo activa o desactiva según el estado
      this.physics.world.debugGraphic.clear(); // Para que no queden cosas
    }

    // Reiniciar el juego
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.restart();
    }
  }

  spawnearFigura() {
    // Crear figura aleatoria
    if (this.TiempoRestante > 0) {
      const FiguraAleatoria = Phaser.Math.RND.pick(this.Tiposfiguras).tipo; // RND significa "random"
      const x = Phaser.Math.Between(50, 750);
      const nuevaFigura = this.figuras.create(x, -20, FiguraAleatoria).setScale(1).refreshBody();
      nuevaFigura.setBounce(0.6);
      nuevaFigura.puntos = this.Tiposfiguras.find((figurita) => figurita.tipo === FiguraAleatoria).puntos;
    }
    else {
      this.eventoSpawnear.remove();
    }
  }

  actualizarTiempo() {
    if (this.TiempoRestante > 0) {
      this.TiempoRestante--;
      this.TextoTiempo.setText(`Tiempo: ${this.TiempoRestante}s`);
    }
    else {
      this.eventoTiempo.remove();
      this.victoriaODerrota = "Game Over";
      this.scene.start("Fin_Del_Juego", { 
        victoriaODerrota: this.victoriaODerrota, 
        puntos: this.Puntos 
      });
    }
  }

  recolectarFigura(jugador, figura) {
    // Sumar puntos al recolectar la figura
    this.Puntos += figura.puntos;
    this.TextoPuntos.setText(`Puntos: ${this.Puntos}`);

    // Incrementar la cantidad recolectada del tipo de figura
    this.Tiposfiguras.find((figurita) => figurita.tipo === figura.texture.key).cantidadjuntados++; // busca el objeto literal que coincide con la figura recolectada y le suma 1 a la cantidadjuntados
    
    // Actualizar los textos de las figuras recolectadas
    this.TextoCuadrados.setText(`Cuadrados: ${this.Tiposfiguras[0].cantidadjuntados}`);
    this.TextoTriangulos.setText(`Triángulos: ${this.Tiposfiguras[1].cantidadjuntados}`);
    this.TextoDiamantes.setText(`Diamantes: ${this.Tiposfiguras[2].cantidadjuntados}`);

    figura.destroy();

    // Verificar que todas las figuras, excepto el círculo, hayan sido recolectadas al menos 2 veces
    const todasMenosCirculoRecolectadas = this.Tiposfiguras
      .filter((figurita) => figurita.tipo !== "circulo")
      .every((figurita) => figurita.cantidadjuntados >= 2);
    
    // Verificar condición de victoria
    if (todasMenosCirculoRecolectadas && this.Puntos >= 100) {
      this.victoriaODerrota = "You Win";
      this.scene.start("Fin_Del_Juego", { 
        victoriaODerrota: this.victoriaODerrota, 
        puntos: this.Puntos 
      });
    }
  }

  ReboteFigura(figura) {
    // Reducir puntos de la figura al rebotar
    if (figura.texture.key === "circulo") {
      // Si es un círculo, aumentar su puntaje en 5
      figura.puntos += 5;
    }
    else {
      // Si no es un círculo, reducir su puntaje en 5
      figura.puntos -= 5; 
    }
    // Si los puntos llegan a 0, destruir la figura
    if (figura.puntos === 0) {
      figura.destroy();
    }
  }
}
