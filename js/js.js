// DECLARACIONES DE LAS VARIABLES PARA EL JUEGO
// --------------------------------------------
const pantalla = document.getElementById("pantalla");
const ctx = pantalla.getContext("2d");
// Cuadricula de la pantalla del juego
let cuadricula = 20;
// Altura y a anchura en pixeles de la pantalla
let resolucion = 300
pantalla.height = resolucion;
pantalla.width = resolucion;
let altura = pantalla.height;
let anchura = pantalla.width;
// Tamaño de cada cuadraro de la cuadricula
let cuadrado = altura / cuadricula;
//--------- Creacion de la serpiente --------
// Estas variables almacenarán el las coordenadas x e y de cada cuadrado que compone el cuerpo de la serpiente
let x, y, coords;
let tamañoInicial = 2;
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
crearSerpiente(tamañoInicial);
// PARTE DE LAS FUNCIONES DEL JUEGO
// --------------------------------------
// llamada al bucle principal. Se supone que 1000/15 son 15 fotogramas por segundo
let bucle = setInterval(frame, 1000 / 10);

// bucle principal
function frame() {
    moverSnake();
    pintarManzana();
    detectarBordes();
}
// Registrador de movimiento de teclas
document.addEventListener("keyup", function (e) {
    switch (e.code) {
        case "ArrowUp":
            if (ultimoMovimiento != 3) {
                movimiento = 1;
            }
            break;
        case "ArrowRight":
            if (ultimoMovimiento != 4) {
                movimiento = 2;
            }
            break;
        case "ArrowDown":
            if (ultimoMovimiento != 1) {
                movimiento = 3;
            }
            break;
        case "ArrowLeft":
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
                snake.shift();
            }
            break;
        case 2:
            ultimoMovimiento = 2;
            x = ((snake[snake.length - 1][0]) + cuadrado);
            y = (snake[snake.length - 1][1]);
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                snake.shift();
            }
            break;
        case 3:
            ultimoMovimiento = 3;
            x = ((snake[snake.length - 1][0]));
            y = ((snake[snake.length - 1][1] + cuadrado));
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                snake.shift();
            }
            break;
        case 4:
            ultimoMovimiento = 4;
            x = ((snake[snake.length - 1][0]) - cuadrado);
            y = (snake[snake.length - 1][1]);
            coords = Array(x, y);
            snake.push(coords);
            if (comidoManzana == false) {
                snake.shift();
            }
            break;
        default:
            break;
    }
    snake.forEach(coords => {
        ctx.strokeRect(coords[0], coords[1], cuadrado, cuadrado);
    });
}
// Esta funcion detecta si si la cabeza ha tocado un borde, si ha tocado aluna parte de su cuerpo o una manzana y actua en consecuencia
function detectarBordes() {
    if ((snake[snake.length - 1][0] == 0 - cuadrado) || (snake[snake.length - 1][0] == pantalla.width) || (snake[snake.length - 1][1] == 0 - cuadrado) || (snake[snake.length - 1][1] == pantalla.height)) {
        console.log("colision con pared");
        clearInterval(bucle);


    }
    if ((snake[snake.length - 1][0] == posicionManzana[0] * cuadrado) && (snake[snake.length - 1][1] == posicionManzana[1] * cuadrado)) {
        console.log("manzana comida");
        posicionManzana = crearManzana();
        comidoManzana = true;

    } else {
        comidoManzana = false;
    }
    for (let a = 0; a < snake.length - 1; a++) {
        coords = snake[a];
        if ((coords[0] == snake[snake.length - 1][0]) && (coords[1] == snake[snake.length - 1][1])) {
            console.log("colision con el cuerpo");
            clearInterval(bucle);
        }
    }
}
function pintarManzana() {
    ctx.strokeRect(posicionManzana[0] * cuadrado, posicionManzana[1] * cuadrado, cuadrado, cuadrado);
}
function crearManzana() {
    x = Math.floor((Math.random() * ((resolucion / cuadrado) - 1 - 0 + 1)) + 0);
    y = Math.floor((Math.random() * ((resolucion / cuadrado) - 1 - 0 + 1)) + 0);
    return Array(x, y);

}
function reiniciarPartida(){

}