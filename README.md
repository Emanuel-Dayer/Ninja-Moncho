# Phaser 3 Template

Plantilla para iniciar nuevos proyectos con PHASER 3.

Contiene configuración inicial y buenas prácticas de estructuras de carpetas.

## Cuando lo utilices

No te olvides de customizarlo a tus necesidades.

1. Cuando lo utilices como Template desde el botón de GitHub, no olvides cambiar el nombre del repositorio acorde a tu proyecto en el wizard de creación de repositorios.
1. Luego de clonar el repositorio en tu maquina local. Deberias:
   1. Actualizar la version de Phaser a la version más actualizada en el archivo `index.html`. Ver la web: https://phaser.io/download/stable
   1. También, dentro del `index.html` modificar el titulo de la pagina. Por ejemplo: `<title>My Game</title>`
   1. Ejecutar el proyecto de forma local para ver que este funcionando correctamente. Si no es asi, deberias lograr que corra.
   1. Una vez que este funcionando correctamente, hacer un commit con el mensaje "Update Phaser version and title".
   1. Borrar los archivos dentro de la carpeta `/assets` y empezar a desarrollar.
1. Por ultimo, una buena practica es: modificar este README.md, poner información relevante de tu juego, imagenes, videos, etc, y luego hacer un commit con el mensaje "Customize README.md".

## Actividad
Escena de juego:
Desarrollar un videojuego que:
•	Al comienzo del juego, el personaje aparecerá encima de una plataforma en la parte inferior.
•	Desde la parte superior de la pantalla deberán caer items recolectables en forma de cuadrados, triángulos y rombos, de forma aleatoria con intervalos de un segundo.
Condición para GANAR y Perder
Juntar 2 ítems de cada tipo y superar los 100 puntos. La acumulación de objetos se deberá persistir en un estructura de datos “array”. Al momento de recolectar un nuevo elemento se deberá verificar la condición de victoria.
Mejoras
1)	En la esquina superior derecha, Adicionar un TIMER de tiempo descendente que mostrará el tiempo restante de la partida. Al llegar a 0, el jugador PIERDE. 
2)	En la esquina superior izquierda aparecerá un contador de puntaje. Asignar un puntaje distinto a cada elemento recolectable. 
3)	Reducir intervalo entre cada aparición de un nuevo item a 0.5 segundos. En cada rebote con el piso, descontar 5 puntos al objeto. Si llega a 0, desaparece.
4)	Agregar más plataformas a la escena.
5)	Agregar un nuevo tipo de objeto que al recolectar descuenta puntos.
6)	Agregar una escena nueva para fin de juego. Deberá de ser única para ganar y perder. Mostrar un texto acorde a la escena. Mostrar si ganaste o perdiste y la puntuación del jugador.
Controles:
•	El personaje podrá moverse utilizando las flechas del teclado.
Elementos de la escena:
•	Objetos que caen del cielo.
•	Plataformas
•	Personaje.
