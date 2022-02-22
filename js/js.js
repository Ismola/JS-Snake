const pantalla = document.getElementById("pantalla");
const ctx = pantalla.getContext("2d");
// Cuadricula de la pantalla del juego
var cuadricula = 5;
// Altura y a anchura en pixeles de la pantalla
pantalla.height = 600;
pantalla.width = 600;
let altura = pantalla.height;
let anchura = pantalla.width;
// Tamaño de cada cuadraro de la cuadricula
let cuadrado = altura / cuadricula;
// Cooredenadas iniciales de la cabeza
let x = cuadrado * 2;
let y = cuadrado * 2;
ctx.fillRect(x, y, cuadrado, cuadrado);
// Creacion del mapa
let mapa = Array();
for (let i = 0; i < ( cuadricula * cuadricula); i++){
    mapa.push("0");
}


var movimiento;

function frame() {
    moverse();
}


mapa[12] = 1;
var contador = 0;
for (var i = 0; i < mapa.length; i++){
    contador++;
    document.write(mapa[i]);
    if ( contador == 5){
        document.write("<br>");
        contador = 0;
    }
}

// Indicar la posicion
document.addEventListener("keyup", function (e) {
    switch (e.code) {
        case "ArrowUp":
            if( movimiento != 3){
                movimiento = 1; 
            }
            break;
        case "ArrowRight":
            if( movimiento != 4){
                movimiento = 2;
            }
            break;
        case "ArrowDown":
            if( movimiento != 1){
                movimiento = 3;
            }
            break;
        case "ArrowLeft":
            if( movimiento != 2){
                movimiento = 4;
            }
            break;
        default:
            break;
    }

});


setInterval (frame , 1000 / 1);

function moverse() {
    switch (movimiento) {
        case 1:
            y -= cuadrado;
            break;
        case 2:
            x += cuadrado;
            break;
        case 3:
            y += cuadrado;
            break;
        case 4:
            x -= cuadrado;
            break;
        default:
            break;
    }
    ctx.fillRect(x, y, cuadrado, cuadrado);

}