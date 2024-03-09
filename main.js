// JUEGO

let nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

let tarjetasDestapadas = 0
let tarjeta1 = null;
let tarjeta2 = null;

let primerResultado = null;
let segundoResultado = null;

let movimientos = 0;
let aciertos = 0;

let temporizador = false
let timer = 60
let tiempoTranscurrido = 0
let detenerTiempoId = null;

//Estadisticas
let mostrarMovs = document.getElementById('movimientos'); 
let mostrarAciertos = document.getElementById('aciertos');
let mostrarT = document.getElementById('t-restante');

//Variables que almacenan el tiempo y el turno de cada jugador
let jugador = 1;
let tiempoJugador1 = 0;
let tiempoJugador2 = 0;

//Generacion de numeros aleatorios
nums = nums.sort(function() {
    return Math.random() - 0.5
});


function contarTiempo (inicio) {

  if (inicio) {
    timer = 60
  } else {
    clearInterval(detenerTiempoId);
    temporizador = false
  }
  detenerTiempoId = setInterval(function(){
    timer--;
    mostrarT.innerHTML = 'Tiempo: ' + timer + ' segundos';

    if (timer == 0 ) {
      clearInterval(detenerTiempoId);
      bloquearTarjets();
      alert('Lo siento! Se te ha acabado el tiempo! Has perdido :(')
    }

  },1000)
}


function compararTiempos () {
  if (tiempoJugador1 > tiempoJugador2) {
    alert('El jugador 1 gano!');
  } else if (tiempoJugador1 < tiempoJugador2) {
    alert('El jugador 2 gano!');
  } else {
    alert('Hubo un empate! Juega de nuevo.')
  }
}

function bloquearTarjets () {
    for (let i = 0; i<=15; i++) {

      let tarjetasBloqueadas = document.getElementById(i);

      tarjetasBloqueadas.innerHTML = '<img src="img/' + nums[i] + '.png" alt"icono">';nums[i];

      tarjetasBloqueadas.disabled = true;
    }
}

function destapar (id) {

  if (temporizador == false) {
      contarTiempo(true);
      temporizador = true;
  }


  tarjetasDestapadas++;

  if (tarjetasDestapadas == 1) {
    tarjeta1 = document.getElementById(id);

    primerResultado = nums[id];
    tarjeta1.innerHTML = '<img src="img/' + primerResultado + '.png" alt"icono">';

    //Deshabilitar el primer boton tocado
    tarjeta1.disabled = true;

  } else if (tarjetasDestapadas == 2) {

    tarjeta2 = document.getElementById(id);

    segundoResultado = nums[id];
    tarjeta2.innerHTML = '<img src="img/' + segundoResultado + '.png" alt"icono">';
    //Deshabilitar el segundo boton tocado
    tarjeta2.disabled = true;

    movimientos++;
    mostrarMovs.innerHTML = 'Movimientos: ' + movimientos;

      if (primerResultado == segundoResultado) {
        tarjetasDestapadas = 0;

        aciertos++;
        mostrarAciertos.innerHTML = 'Aciertos: '+ aciertos;


        if (aciertos == 8) {
          clearInterval(detenerTiempoId); // Detener temporizador
          tiempoTranscurrido = timer; // Almacenar tiempo transcurrido

          if (jugador == 1) {
            tiempoJugador1 = tiempoTranscurrido;
            alert('Has demorado ' + ( 60  - tiempoTranscurrido) + ' segundos.' + ' Acertaste ' + aciertos + ' y te moviste ' + movimientos + ' veces.' + ' Ahora es el turno del jugador 2!');
            reiniciarJuego();
          } else if ( jugador == 2) {
            tiempoJugador2 = tiempoTranscurrido;
            compararTiempos();
          }


        }



      } else {
        setTimeout(function() {
          tarjeta1.innerHTML = ' ';
          tarjeta2.innerHTML = ' ';

          tarjeta1.disabled = false;
          tarjeta2.disabled = false;

          tarjetasDestapadas = 0;

        },900);
      }
  }
}

  function reiniciarJuego () {
    jugador = 2;

    temporizador = false;
    timer = 60;
    tiempoTranscurrido = 0;
    detenerTiempoId = null;

    tarjeta1 = null;
    tarjeta2 = null;
    tarjetasDestapadas = 0;

    primerResultado = null;
    segundoResultado = null;

    // Restaurar las imágenes de las tarjetas
      for (let i = 0; i <= 15; i++) {
          let tarjeta = document.getElementById(i);
          tarjeta.innerHTML = '';
          tarjeta.disabled = false;
      }

    movimientos = 0;
    aciertos = 0;

    mostrarMovs.innerHTML = 'Movimientos: 0';
    mostrarAciertos.innerHTML = 'Aciertos: 0';
    mostrarT.innerHTML = 'Tiempo: 0';
  }



  // FORM VALIDATION
  function validarFormulario() {

    // Validar nombre
    if (document.getElementById('nombre').value == ""){
          alert( "Nombre es obligatorio.");
          document.getElementById('nombre').focus();

          //para que no sea aceptado apenas lo escribe
          return false;
    }

    //Validar apellido
    if (document.getElementById('apellido').value == ""){
          alert("Apellido es obligatorio.");
          document.getElementById('apellido').focus();
          return false;
    }

    // Validar email
    var emailValidation =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;

    //almacena el valor que increse el usuario en el campo de EMAIL
    valor = document.getElementById('email').value;

    if(!emailValidation.test(document.getElementById('email').value)) {
      alert("El email que ingreso no es correcto.")
      document.getElementById('email').focus();
      return false;
    }

    // Enviar formulario
    alert( "Muchas gracias por enviarnos tus datos! CFG los revisara pronto.");
    document.formulario.submit();

}