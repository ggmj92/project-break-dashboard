// Reloj digital 24h + Fecha:
// ¿Como funciona?
// Crea un página que tendrá lo siguiente:

// Un reloj digital con la fecha y hora actual del lugar en el que te encuentres. Tendrá las siguientes características:

// Por un lado tendremos un reloj digital con horas, minutos y segundos que se tendrá que actualizar automaticamente cada segundo que pase.
// Tendrás que formatear las hora. Si las horas, minutos y segundos son menores de 10 habrá que añadir un 0 delante para que quede como 01, 02, ...
// La fecha tendrá formato DD/MM/AAAA
// Aparecerán unas frases dependiendo un intervalo de horas. Doy una de ejemplo aunque puedes cambiarlas a tu gusto:
// Desde las 00:01 hasta las 07:00 Es hora de descansar. Apaga y sigue mañana
// Desde las 07:01 hasta las 12:00 Buenos días, desayuna fuerte y a darle al código
// Desde las 12:01 hasta las 14:00 Echa un rato más pero no olvides comer
// Desde las 14:01 hasta las 16:00 Espero que hayas comido
// Desde las 16:01 hasta las 18:00 Buenas tardes, el último empujón
// Desde las 18:01 hasta las 22:00 Esto ya son horas extras, ... piensa en parar pronto
// Desde las 22:01 hasta las 00:00 Buenas noches, es hora de pensar en parar y descansar
// Dale estilo con CSS
// ¿Qué usaremos?
// new Date() Es el objeto que representa la fecha y hora. Tiene varios métodos que nos ayudará a abtener lo que necesitamos:
// Hora, minutos y segundos
// Día, mes año
// La hora debe actualizarse sola, es decir que si cambia la hora, el minuto o el segundo deben cambiar automaticamente en pantalla. Piensa en la unidad mínima que se necesita para hacer ese cambio. La fecha también debe cambiar. Para esto podemos usar setInterval()
// Necesitaremos condicionales para las frases. Dependiendo la hora saldrá una u otra
// PISTAS PISTAS Y CONSEJOS
// Aquí tienes como usar el constructor de fechas. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
// Aquí los métodos necesarios para componerlo todo https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date
// Aquí lo que hace y como funciona setInterval() https://developer.mozilla.org/es/docs/Web/API/setInterval