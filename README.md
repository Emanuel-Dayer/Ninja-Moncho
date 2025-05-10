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
