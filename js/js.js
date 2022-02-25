
// DECLARACIONES DE LAS VARIABLES PARA EL JUEGO
// --------------------------------------------
const pantalla = document.getElementById("pantalla");
const ctx = pantalla.getContext("2d");
// Cuadricula de la pantalla del juego
let cuadricula = 20;
// Altura y a anchura en pixeles de la pantalla
let resolucion = 600;
pantalla.height = resolucion;
pantalla.width = resolucion;
let altura = pantalla.height;
let anchura = pantalla.width;
// Tamaño de cada cuadraro de la cuadricula
let cuadrado = altura / cuadricula;
//--------- Creacion de la serpiente --------
// Estas variables almacenarán el las coordenadas x e y de cada cuadrado que compone el cuerpo de la serpiente
let x, y, coords;
let tamañoInicial = 4;
// La serpiente será un array, que contendrá tantos arrays como cuadrados conformen su cuerrpo. Cada array contendrá dos valores, X e Y
let snake = Array();
// Esta variable guardará la ultima tecla que hemos dado
let movimiento;
// Esta almacenará el ultimo movimiento de la serpiente. Lo usaremos para que la serpiente no pueda ir para atras y hacer cosas raras
let ultimoMovimiento;
// La varible posicionManzana contendrá un array con coordenadas X e Y
let posicionManzana = crearManzana();
// Esta variables
let comidoManzana = false;
// PARTE DE LAS FUNCIONES DEL JUEGO
// --------------------------------------
// Esta variable contendrá el loop de la partida;
let bucle;
// Esta función guardará la cola de la serpiente. Esto es así porque cada vez que se mueve, se añade un cuadrado en la direccion a la que va la serpiente, y se borra la cola. Y cuando choca la serpiente, la cabeza se mete dentro de la 
let ultimaPos;
// Esta funcion acaba la partida
function terminarPartida() {
    movimiento = null;
    clearInterval(bucle);
    ctx.fillRect(ultimaPos[0], ultimaPos[1], cuadrado, cuadrado);
    // Estas clases sirven para las animaciones
    document.getElementById("consola").classList.add('animate__animated', 'animate__headShake');
    document.getElementById("start").classList.remove('animate__animated', 'animate__backOutUp');
    document.getElementById("start").classList.add('animate__animated', 'animate__backInDown');
}
// Esta funcion empieza la partida
function empezarPartida() {
    clearInterval(bucle);
    document.getElementById("start").classList.remove('animate__animated', 'animate__backOutUp','animate__delay-2s');
    document.getElementById("consola").classList.remove('animate__animated', 'animate__headShake', 'animate__jackInTheBox','animate__delay-1s');
    document.getElementById("start").classList.add('animate__animated', 'animate__backOutUp');
    movimiento = null;
    ctx.clearRect(0, 0, pantalla.height, pantalla.width);
    crearSerpiente(tamañoInicial);
    bucle = setInterval(frame, 1000 / 15);
}
// bucle principal
// Ese bucle empieza la partida
function frame() {
    moverSnake();
    pintarManzana();
    detectarBordes();
}
// Registra cuando se suelta una tecla para quitar el color de las teclas
document.addEventListener("keyup", function (e) {
        document.getElementById("btn-top").classList.remove("color");
        document.getElementById("btn-bot").classList.remove("color");
        document.getElementById("btn-der").classList.remove("color");
        document.getElementById("btn-izq").classList.remove("color");
    });
// Registra cuando se pulsa una tecla para mover la serpiente y para darle color a los botones
document.addEventListener("keydown", function (e) {
    document.getElementById("btn-top").classList.remove("color");
    document.getElementById("btn-bot").classList.remove("color");
    document.getElementById("btn-der").classList.remove("color");
    document.getElementById("btn-izq").classList.remove("color");
    switch (e.code) {
        case "ArrowUp":
            document.getElementById("btn-top").classList.add("color");
            if (ultimoMovimiento != 3) {
                movimiento = 1;
            }
            break;
        case "ArrowRight":
            document.getElementById("btn-der").classList.add("color");
            if (ultimoMovimiento != 4) {
                movimiento = 2;
            }
            break;
        case "ArrowDown":
            document.getElementById("btn-bot").classList.add("color");
            if (ultimoMovimiento != 1) {
                movimiento = 3;
            }
            break;
        case "ArrowLeft":
            document.getElementById("btn-izq").classList.add("color");
            if (ultimoMovimiento != 2) {
                movimiento = 4;
            }
            break;
        default:
            break;
    }

});
// Funcion que crea a la serpiente
function crearSerpiente(tamañoSerpiente) {
    x = 0, y = 0, coords = Array();
    snake = Array();
    for (let i = 0; i < tamañoSerpiente; i++) {
        x = i * cuadrado;
        y = 0;
        coords = Array(x, y);
        snake.push(coords)
    }
}
// Esta función será la encargada de ir movienvo la serpiete. Para ello creará un cuadrado en la direccion seleccionada y eliminará el ultimo cuadrado que compone su cuerpo 
function moverSnake() {
    ctx.clearRect(0, 0, pantalla.height, pantalla.width);
    switch (movimiento) {
        case 1:
            ultimoMovimiento = 1;
            x = ((snake[snake.length - 1][0]));
            y = ((snake[snake.length - 1][1] - cuadrado));
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                ultimaPos = snake.shift();
            }
            break;
        case 2:
            ultimoMovimiento = 2;
            x = ((snake[snake.length - 1][0]) + cuadrado);
            y = (snake[snake.length - 1][1]);
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                ultimaPos = snake.shift();
            }
            break;
        case 3:
            ultimoMovimiento = 3;
            x = ((snake[snake.length - 1][0]));
            y = ((snake[snake.length - 1][1] + cuadrado));
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                ultimaPos = snake.shift();
            }
            break;
        case 4:
            ultimoMovimiento = 4;
            x = ((snake[snake.length - 1][0]) - cuadrado);
            y = (snake[snake.length - 1][1]);
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                ultimaPos = snake.shift();
            }
            break;
        default:
            break;
    }
    snake.forEach(coords => {
        ctx.fillRect(coords[0], coords[1], cuadrado, cuadrado);
        ctx.fillStyle = "#314108";
    });
}
// Esta funcion detecta si si la cabeza ha tocado un borde, si ha tocado aluna parte de su cuerpo o una manzana y actua en consecuencia
function detectarBordes() {
    // Este if detecta si la serpiente ha cochado con una pared
    if ((snake[snake.length - 1][0] == 0 - cuadrado) || (snake[snake.length - 1][0] == pantalla.width) || (snake[snake.length - 1][1] == 0 - cuadrado) || (snake[snake.length - 1][1] == pantalla.height)) {
        terminarPartida();
    }
    // Este for detecta si la serpiente se ha chocado contra su propio cuerpo
    for (let a = 0; a < snake.length - 1; a++) {
        coords = snake[a];
        if ((coords[0] == snake[snake.length - 1][0]) && (coords[1] == snake[snake.length - 1][1])) {
            terminarPartida();
        }
    }
    if ((snake[snake.length - 1][0] == posicionManzana[0] * cuadrado) && (snake[snake.length - 1][1] == posicionManzana[1] * cuadrado)) {

        posicionManzana = crearManzana();
        comidoManzana = true;
    } else {
        comidoManzana = false;
    }

}
// Esta función pinta la manzana, saca las coordenadas de la variables posicionManzana
function pintarManzana() {
    ctx.fillRect(posicionManzana[0] * cuadrado, posicionManzana[1] * cuadrado, cuadrado, cuadrado);
}
// Esta funcino genera unas coordenadas aleatorias dentro del tablero
function crearManzana() {
    x = Math.floor((Math.random() * ((resolucion / cuadrado) - 1 - 0 + 1)) + 0);
    y = Math.floor((Math.random() * ((resolucion / cuadrado) - 1 - 0 + 1)) + 0);
    return Array(x, y);

}
// Esta funcion se cargará justo al iniciar la pagina
function inicio(){
    document.getElementById("start").classList.add('animate__animated', 'animate__backInDown', 'animate__delay-2s');
    document.getElementById("consola").classList.add('animate__animated', 'animate__jackInTheBox', 'animate__delay-1s');
    const timeAuto = setTimeout(juegoAutomatico, 2000);
}

function juegoAutomatico(){
    // alert("hola");
    ctx.clearRect(0, 0, pantalla.height, pantalla.width);
    crearSerpiente(tamañoInicial);
    movimiento = 2;
    bucle = setInterval(automatico, 10000/9999);

}
function automatico() {
    moverSnake();
    pintarManzana();
    detectarBordes();
    if( (snake[snake.length - 1][0] == pantalla.width-cuadrado) || (snake[snake.length - 1][0] == 0+cuadrado)){
        movimiento=3;
    }
    if( (snake[snake.length - 1][1] % (resolucion / cuadrado) == 0) && (snake[snake.length - 1][1] != 0)  && (snake[snake.length - 1][0] != pantalla.width-cuadrado)){
        movimiento=2;
    }
    if( (snake[snake.length - 1][1] % (resolucion / cuadrado) != 0) && (snake[snake.length - 1][1] != 0) && (snake[snake.length - 1][0] != 0+cuadrado)){
        movimiento=4;
    }
    if ( (snake[snake.length - 1][0] == 0+cuadrado)  && (snake[snake.length - 1][1] == pantalla.height-cuadrado)  ){
        movimiento=4;
    }
    if ( (snake[snake.length - 1][0] == 0)){
        movimiento=1;
    }
    if ( ((snake[snake.length - 1][0] == 0) && (snake[snake.length - 1][1] == 0))){
        movimiento=2
    }
    if ( ((snake[snake.length - 1][0] == 0+cuadrado) && (snake[snake.length - 1][1] == 0))){
        movimiento=2
    }


}
// console.log(resolucion / cuadrado);