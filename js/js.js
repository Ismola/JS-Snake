// DECLARACIONES DE LAS VARIABLES PARA EL JUEGO
// --------------------------------------------
const pantalla = document.getElementById("pantalla");
const ctx = pantalla.getContext("2d");
// Cuadricula de la pantalla del juego
let cuadricula = 30;
// Altura y a anchura en pixeles de la pantalla
pantalla.height = 300;
pantalla.width = 300;
let altura = pantalla.height;
let anchura = pantalla.width;
// Tamaño de cada cuadraro de la cuadricula
let cuadrado = altura / cuadricula;
//--------- Creacion de la serpiente --------
// Estas variables almacenarán el las coordenadas x e y de cada cuadrado que compone el cuerpo de la serpiente
let x, y, coords;
let tamañoInicial = 17;
// La serpiente será un array, que contendrá tantos arrays como cuadrados conformen su cuerrpo. Cada array contendrá dos valores, X e Y
let snake = Array();
// Esta variable guardará la ultima tecla que hemos dado
let movimiento;
// Esta almacenará el ultimo movimiento de la serpiente. Lo usaremos para que la serpiente no pueda ir para atras y hacer cosas raras
let ultimoMovimiento;




crearSerpiente(tamañoInicial);
// PARTE DE LAS FUNCIONES DEL JUEGO
// --------------------------------------
// llamada al bucle principal. Se supone que 1000/15 son 15 fotogramas por segundo
setInterval(frame, 1000 / 15);

// bucle principal
function frame() {
    moverSnake();
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
            snake.shift();
            break;
        case 2:
            ultimoMovimiento = 2;
            x = ((snake[snake.length - 1][0]) + cuadrado);
            y = (snake[snake.length - 1][1]);
            coords = Array(x, y);
            snake.push(coords);
            snake.shift();
            break;
        case 3:
            ultimoMovimiento = 3;
            x = ((snake[snake.length - 1][0]));
            y = ((snake[snake.length - 1][1] + cuadrado));
            coords = Array(x, y);
            snake.push(coords);
            snake.shift();
            break;
        case 4:
            ultimoMovimiento = 4;
            x = ((snake[snake.length - 1][0]) - cuadrado);
            y = (snake[snake.length - 1][1]);
            coords = Array(x, y);
            snake.push(coords);
            snake.shift();
            break;
        default:
            break;
    }

    snake.forEach(coords => {
        ctx.strokeRect(coords[0], coords[1], cuadrado, cuadrado);
    });

}
function detectarBordes() {
    if ((snake[snake.length - 1][0] == 0 - cuadrado) || (snake[snake.length - 1][0] == pantalla.width) || (snake[snake.length - 1][1] == 0 - cuadrado) || (snake[snake.length - 1][1] == pantalla.height)) {
        console.log("colision con pared");
    }
    for (let a = 0; a < snake.length - 1; a++) {
        coords = snake[a];
        if((coords[0] == snake[snake.length-1][0]) && (coords[1] == snake[snake.length-1][1]) ){
            console.log("colision con el cuerpo");
        }
    }

}
function crearManzana(){

}
function crearRandom() {
    return Math.floor((Math.random() * (max - 0 + 1)) + 0);
}