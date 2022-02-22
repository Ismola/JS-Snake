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
x= 0;
y = 0;

// Creacion del mapa
let mapa = Array();
let columnas = Array();
for (let a = 0; a < cuadricula; a++) {
    for (let i = 0; i < cuadricula; i++) {
        columnas.push("0");
    }
    mapa.push(columnas);
    columnas = Array();
}

// Funcion principal
// setInterval(frame, 1000 / 1);
function frame() {
    actualizarMapa();
    pintarMapa();
    mostrarMapa();

}
mapa[0][0] = 1;
mapa[0][1] = 1;

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

function actualizarMapa() {
    let limite = false;
    for (let fila = 0; fila < mapa.length; fila++) {
        for (let columna = 0; columna < mapa[fila].length; columna++) {
            if (mapa[fila][columna] > 0) {
                switch (movimiento) {
                    case 1:
                        if (fila > 0) {
                            console.log ("bajando");
                                mapa[fila - 1][columna] = 1;
                                mapa[fila][columna] = 0;
                        }
                        break;
                    case 2:
                        if (columna < mapa[fila].length-1) {
                            console.log ("derecha");
                                mapa[fila][columna + 1] = 1;
                                mapa[fila][columna] = 0;
                        }
                        break;
                    case 3:
                        if ( (fila < mapa.length-1) && (limite == false) ) {
                            console.log ("bajando");
                                mapa[fila + 1][columna] = 1;
                                mapa[fila][columna] = 0;
                                limite=true;
                        }
                        break;
                    case 4:
                        if (columna > 0) {
                            console.log ("izquierda");
                                mapa[fila][columna - 1] = 1;
                                mapa[fila][columna] = 0;
                        }
                        break;
                    default:
                        break;
                }
                break;
            }
        }
    }
}

function pintarMapa() {
    ctx.clearRect(0, 0, pantalla.width, pantalla.height);
    // for (let i = 0; i < mapa.length; i++) {
    //     if (mapa[i] > 0) {
    //         // ctx.fillRect(i*cuadrado,0, cuadrado, cuadrado);
    //         break;
    //     }
    // }

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

function mostrarMapa() {
    let contador = 1;
    let fila = "";
    mapa.forEach(columna => {
        for (let a = 0; a < columna.length; a++) {
            fila = fila + columna[a];
        }
        console.log(fila + "------" + contador);
        contador++;
        fila = "";
    });
    console.log();
}


