const pantalla = document.getElementById("pantalla");
const ctx = pantalla.getContext("2d");
// Cuadricula de la pantalla del juego
let cuadricula = 5;
// Altura y a anchura en pixeles de la pantalla
pantalla.height = 300;
pantalla.width = 300;
let altura = pantalla.height;
let anchura = pantalla.width;
// Tamaño de cada cuadraro de la cuadricula
let cuadrado = altura / cuadricula;
let snake = [
    [0, 0],
    [cuadrado * 1, 0],
    [cuadrado * 2, 0],
];

// Funcion principal
// setInterval(frame, 1000 / 1);
function frame() {
    moverSnake();
}

// Indicar la posicion
let movimiento;
document.addEventListener("keyup", function (e) {
    switch (e.code) {
        case "ArrowUp":
            if (movimiento != 3) {
                movimiento = 1;
            }
            break;
        case "ArrowRight":
            if (movimiento != 4) {
                movimiento = 2;
            }
            break;
        case "ArrowDown":
            if (movimiento != 1) {
                movimiento = 3;
            }
            break;
        case "ArrowLeft":
            if (movimiento != 2) {
                movimiento = 4;
            }
            break;
        default:
            break;
    }
    frame();
});


function moverSnake() {
    ctx.clearRect(0, 0, pantalla.height, pantalla.width);
    switch (movimiento) {
        case 1:
            x =
            snake.push();
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        default:
            break;
    }

    snake.forEach(coords => {
        ctx.strokeRect(coords[0], coords[1], cuadrado, cuadrado);
    });

}

