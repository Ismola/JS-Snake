
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
// La serpiente será un array, que contendrá tantos arrays como cuadrados conformen su cuerrpo. Cada array contendrá dos valores, X e Y
let tamañoInicial = 4;
let snake = Array();
// Esta variable guardará la ultima tecla que hemos dado
let movimiento;
// Esta almacenará el ultimo movimiento de la serpiente. Lo usaremos para que la serpiente no pueda ir para atras y hacer cosas raras
let ultimoMovimiento;
// La varible posicionManzana contendrá un array con coordenadas X e Y
let posicionManzana;
// Esta variable servirá para detectar si ha "chocado con una manzana" (comer)
let comidoManzana = false;
// Este es el contador de puntos
let contador = 0;


// PARTE DE LAS FUNCIONES DEL JUEGO
// --------------------------------------
// Esta variable contendrá el loop de la partida;
let bucle;
// Esta función guardará la cola de la serpiente. Esto es así porque cada vez que se mueve, se añade un cuadrado en la direccion a la que va la serpiente, y se borra la cola. Y cuando choca la serpiente, la cabeza se mete dentro de la 
let ultimaPos;
// Esta funcion acaba la partida
function terminarPartida() {
    contador = 0;
    movimiento = null;
    clearInterval(bucle);
    ctx.fillStyle = "#314108";
    ctx.fillRect(ultimaPos[0], ultimaPos[1], cuadrado, cuadrado);
    // Estas clases sirven para las animaciones
    document.getElementById("puntos").classList.add("posicionArriba");
    document.getElementById("puntos").classList.remove("posicionAbajo");
    document.getElementById("fondoColor").style.filter = "opacity(0%)";
    document.getElementById("consola").classList.add('animate__animated', 'animate__headShake');
    document.getElementById("start").classList.remove('animate__animated', 'animate__backOutUp');
    document.getElementById("start").classList.add('animate__animated', 'animate__backInDown');
}
// Esta funcion empieza la partida
function empezarPartida() {
    posicionManzana = crearManzana();
    contador = 0;
    clearInterval(bucle);
    movimiento = 2;
    ctx.clearRect(0, 0, pantalla.height, pantalla.width);
    crearSerpiente(tamañoInicial);
    bucle = setInterval(frame, 1000 / 15);
    // Registra cuando se suelta una tecla para quitar el color de las teclas
    document.addEventListener("keyup", function (e) {
        switch (e.code) {
            case "ArrowUp":
                document.getElementById("btn-top").classList.remove("color");
                break;
            case "ArrowRight":
                document.getElementById("btn-der").classList.remove("color");
                break;
            case "ArrowDown":
                document.getElementById("btn-bot").classList.remove("color");
                break;
            case "ArrowLeft":
                document.getElementById("btn-izq").classList.remove("color");
                break;
            default:
                break;
        }
    });
    // Registra cuando se pulsa una tecla para mover la serpiente y para darle color a los botones
    document.addEventListener("keydown", function (e) {
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
    // Estas clases sirven para las animaciones
    document.getElementById("puntos").innerHTML = contador;
    document.getElementById("puntos").classList.remove("posicionArriba");
    document.getElementById("puntos").classList.add("posicionAbajo");
    document.getElementById("fondoColor").style.filter = "opacity(0%)";
    document.getElementById("btn-top").classList.remove("color");
    document.getElementById("btn-der").classList.remove("color");
    document.getElementById("btn-bot").classList.remove("color");
    document.getElementById("btn-izq").classList.remove("color");
    document.getElementById("start").classList.remove('animate__animated', 'animate__backOutUp', 'animate__delay-2s');
    document.getElementById("consola").classList.remove('animate__animated', 'animate__headShake', 'animate__jackInTheBox', 'animate__delay-1s');
    document.getElementById("start").classList.add('animate__animated', 'animate__backOutUp');
}
// Ese bucle se repite por cada fotograma, en el que llama a varias funciones
function frame() {
    moverSnake();
    pintarManzana();
    detectarBordes();
}
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
        ctx.fillStyle = "#314108";
        ctx.fillRect(coords[0], coords[1], cuadrado, cuadrado);
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
    // Este if detecta si se ha comido una manzana
    if ((snake[snake.length - 1][0] == posicionManzana[0] * cuadrado) && (snake[snake.length - 1][1] == posicionManzana[1] * cuadrado)) {
        posicionManzana = crearManzana();
        comidoManzana = true;
        contador++;
        document.getElementById("puntos").innerHTML = contador;
        document.getElementById("puntos").classList.add('animate__animated', 'animate__rubberBand');
        document.getElementById("fondoColor").style.filter = "opacity(" + contador * 5 + "%)";
        setTimeout(aux, 1000);
    } else {
        comidoManzana = false;
    }
}
// Esta función pinta la manzana, saca las coordenadas de la variables posicionManzana
function pintarManzana() {
    ctx.fillStyle = "red";
    ctx.fillRect(posicionManzana[0] * cuadrado, posicionManzana[1] * cuadrado, cuadrado, cuadrado);
}
// Esta funcino genera unas coordenadas aleatorias dentro del tablero
function crearManzana() {
    while (true) {
        x = Math.floor((Math.random() * ((resolucion / cuadrado) - 1 - 0 + 1)) + 0);
        y = Math.floor((Math.random() * ((resolucion / cuadrado) - 1 - 0 + 1)) + 0);
        // Todo esta for y tal es para comprobar que la manzana no aparezca en el cuerpo
        let manzanaCuerpo = false;
        for (let a = 0; a < snake.length - 1; a++) {
            coords = snake[a];
            if (coords[0] == x * cuadrado && coords[1] == y * cuadrado) {
                manzanaCuerpo = true;
                break;
            }
        }
        if (manzanaCuerpo === true) {
            continue;
        }
        return Array(x, y);
    }
}
// Esta funcion se cargará justo al iniciar la pagina
function inicio() {
    document.getElementById("start").classList.add('animate__animated', 'animate__backInDown', 'animate__delay-2s');
    document.getElementById("consola").classList.add('animate__animated', 'animate__jackInTheBox', 'animate__delay-1s');
    setTimeout(juegoAutomatico, 1);
}
// Esta función se encargará de empezar el modo de juego automático
function juegoAutomatico() {
    ctx.clearRect(0, 0, pantalla.height, pantalla.width);
    crearSerpiente(tamañoInicial);
    movimiento = 2;
    posicionManzana = crearManzana();
    bucle = setInterval(automatico, 1000 / 40);
}
// Esta funcion moverá la serpiente automaticamente
function automatico() {
    moverSnake();
    pintarManzana();
    detectarBordes();
    document.getElementById("btn-top").classList.remove("color");
    document.getElementById("btn-der").classList.remove("color");
    document.getElementById("btn-bot").classList.remove("color");
    document.getElementById("btn-izq").classList.remove("color");
    // Todos estos If sirven para que la serpiente juege sola en el inicio. Lo he sacado a base de prueba y error. Aunque parezcan un monstruo, tienen su sentido
    if ((snake[snake.length - 1][0] == pantalla.width - cuadrado) || (snake[snake.length - 1][0] == 0 + cuadrado)) {
        movimiento = 3;
        document.getElementById("btn-bot").classList.add("color");
    }
    if (((snake[snake.length - 1][1] % (resolucion / cuadrado) != 0) && (snake[snake.length - 1][1] != 0) && (snake[snake.length - 1][0] != 0 + cuadrado) && (snake[snake.length - 1][0] != 0)) || (snake[snake.length - 1][0] == 0 + cuadrado) && (snake[snake.length - 1][1] == pantalla.height - cuadrado)) {
        movimiento = 4;
        document.getElementById("btn-izq").classList.add("color");
    }
    if ((snake[snake.length - 1][0] == 0)) {
        document.getElementById("btn-top").classList.add("color");
        movimiento = 1;
    }
    if ((((snake[snake.length - 1][0] == 0) && (snake[snake.length - 1][1] == 0)) || ((snake[snake.length - 1][0] == 0 + cuadrado) && (snake[snake.length - 1][1] == 0))) || (snake[snake.length - 1][1] % (resolucion / cuadrado) == 0) && (snake[snake.length - 1][1] != 0) && (snake[snake.length - 1][0] != pantalla.width - cuadrado) && (snake[snake.length - 1][0] != 0)) {
        movimiento = 2
        document.getElementById("btn-der").classList.add("color");
    }
}
function aux() {
    document.getElementById("puntos").classList.remove('animate__animated', 'animate__rubberBand');
}