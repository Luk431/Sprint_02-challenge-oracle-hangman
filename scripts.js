var listaPalabras = ["PERRO","CELULAR","ZAPATO","GATO","PERSONA"]; //Lista de palabras que pueden tocar adivinar
var palabraAdivinar = []; //Palabra elegida aleatoriamente para que el usuario adivine
var palabraMostrar = []; //Palabra convertida en guiones que luego se ira convirtiendo en la palabra a adivinar a medida que las letras sean descubiertas
var letrasIncorrectas = [];
var intentos = 10;

//funcion que inicia el juego
function iniciarJuego(){

    var botonesPrincipales = document.querySelector(".botones");
    var displayJuego = document.querySelector(".juego-ahorcado");

    fade(botonesPrincipales, displayJuego, "none", "none");
    setTimeout(() => {  unfade(displayJuego, "block"); }, 1500);

    palabraSecreta(listaPalabras);
}

//function que lleva a la pantalla de agregar una nueva palabra
function agregarPalabra(){

    var botonesAgregar = document.querySelector(".agregar-palabra");
    var botonesPrincipales = document.querySelector(".botones");
  

    fade(botonesPrincipales, botonesAgregar, "none", "none");
    
    setTimeout(() => {  unfade(botonesAgregar, "block"); }, 1500);
}

//funcion que agrega la nueva palabra a la lista de posibles palabras y luego inicia el juego
function guardarIniciar(){
    var botonesAgregar = document.querySelector(".agregar-palabra");
    var displayJuego = document.querySelector(".juego-ahorcado");
    var textareaPalabra = document.querySelector(".palabra-agregada").value;

    palabraAgregada = textareaPalabra.toUpperCase();

    //comprueba que la palabra tenga hasta 8 caracteres
    if(palabraAgregada.length > 8){
        alert("Maximo 8 caracteres");
        textareaPalabra = "";
    }else{  
        listaPalabras.push(palabraAgregada);
        fade(botonesAgregar, displayJuego, "none", "none");

        setTimeout(() => {  unfade(displayJuego, "block"); }, 1500);
    
        palabraSecreta(listaPalabras);
    }

}

//funcion que lleva de nuevo al menu de inicio en caso de no querer ingresar una nueva palabra
function volverInicio(){

    var botonesAgregar = document.querySelector(".agregar-palabra");
    var botonesPrincipales = document.querySelector(".botones");

    fade(botonesAgregar, botonesPrincipales, "none", "none");

    setTimeout(() => {  unfade(botonesPrincipales, "flex"); }, 1500);
}

//animacion fadeOUT
function fade(element1, element2, display1, display2) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element1.style.display = display1;
            element2.style.display= display2;
        }
        element1.style.opacity = op;
        element2.style.opacity = op;
        element1.style.filter = 'alpha(opacity=' + op * 100 + ")";
        element2.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

//animacion fadeIN
function unfade(element, display) {
    var op = 0.1;  // initial opacity
    
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.display = display;
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.2;
    }, 60);
}

//function que determina la palabra secreta elegida aleatoriamente
function palabraSecreta(listaPalabras){
    
    var palabraAleatoria = listaPalabras[Math.floor(Math.random()*listaPalabras.length)];

    palabraAdivinar = palabraAleatoria.split("");

    mostrarGuiones(palabraAdivinar);
    
    comprobarLetra(palabraAleatoria);

    console.log(palabraAleatoria);
}

//inserta en el array palabraMostrar la misma cantidad de letras que contenga la palabra secreta
function mostrarGuiones(palabraAleatoria){
    var palabraOculta = document.querySelector(".palabra-oculta");
   

    for (let letra of palabraAleatoria) {
        palabraMostrar.push('_ ');
    }
    
    for(let i = 0; i < palabraAdivinar.length; i++){
        palabraOculta.innerHTML += palabraMostrar[i];
        console.log(i);
    }
}

//comprueba si la letra ingresada en el input es correcta, de ser asi cambia en el array palabraMostrar el guion respectivo de la letra ingresada
function comprobarLetra(){
    var input = document.querySelector(".guess-area");
    var palabraOculta = document.querySelector(".palabra-oculta");
    var letraIncorrecta = document.querySelector(".incorrect")

    input.addEventListener("keypress", function(event){
        if(event.key === "Enter" && isNaN(input.value)){
            var inputUpperCase = this.value.toUpperCase();
            for (let i = 0; i < palabraAdivinar.length; i++) {
                // Comprobamos si la letra del usuario es igual a la letra a adivinar
                if (inputUpperCase == palabraAdivinar[i]) {
                    // Sustituimos el guion por la letra acertada
                    palabraMostrar[i] = inputUpperCase;
                    palabraOculta.innerHTML = "";
                    for(let i = 0; i < palabraAdivinar.length; i++){
                        palabraOculta.innerHTML += palabraMostrar[i]+" ";
                    }
                    console.log("coincide");
                }
            }

            if(!palabraMostrar.includes(inputUpperCase) && !letrasIncorrectas.includes(inputUpperCase)){
                letrasIncorrectas.push(inputUpperCase);
                letraIncorrecta.innerHTML = "";
                letrasIncorrectas.forEach(letras => {
                    
                        letraIncorrecta.innerHTML += letras + " ";
    
                });

                intentos-=1;
                dibujarHorca();
            }
            
            this.value= '';
            acabarJuego();

            console.log(palabraAdivinar);
        }
        
    });
}

//comprueba que en el array palabraMostrar no queden mas guiones, si esto es asi el jugador ganó
function acabarJuego () {
    var input = document.querySelector(".guess-area");
    var botonReset = document.querySelector(".reiniciar");
    var wingame =  document.querySelector(".win-game");
    
    if (!palabraMostrar.includes('_ ')) {
        wingame.style.display = "flex";
        input.style.display = "none";
        setTimeout(() => {  unfade(botonReset, "flex"); }, 1000);
    }
}

function reiniciar(){
    location.reload(true);
}

function dibujarHorca(){
    var botonReset = document.querySelector(".reiniciar");
    var rendirse = document.querySelector(".rendirse")
    var input = document.querySelector(".guess-area");
    var losegame = document.querySelector(".lose-game");
    const canvas = document.querySelector('.dibujar');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;

    ctx.beginPath();

    switch(intentos){
        case 9:
            ctx.moveTo(50, 130);
            ctx.lineTo(100, 130);
            ctx.stroke();
            break;
        case 8: 
            ctx.moveTo(80, 130);
            ctx.lineTo(80, 20);
            ctx.stroke();
            break;
        case 7:
            ctx.moveTo(77, 20);
            ctx.lineTo(130, 20);
            ctx.stroke();
            break;
        case 6: 
            ctx.moveTo(128, 20);
            ctx.lineTo(128, 40);
            ctx.stroke()
            break;
        case 5:
            ctx.arc(128,55,15,1.5*Math.PI,-1.5*Math.PI,true);
            ctx.stroke();
            break;
        case 4: 
            ctx.moveTo(128, 70);
            ctx.lineTo(128, 100);
            ctx.stroke();
            break;
        case 3:
            ctx.moveTo(128, 70);
            ctx.lineTo(100, 80);
            ctx.stroke();
            break;
        case 2: 
            ctx.moveTo(128, 70);
            ctx.lineTo(150, 80);
            ctx.stroke();
            break;
        case 1:
            ctx.moveTo(130, 99);
            ctx.lineTo(100, 120);
            ctx.stroke();
            break;
        case 0: 
            ctx.moveTo(128, 99);
            ctx.lineTo(150, 120);
            ctx.stroke();
            losegame.style.display = "flex";
            input.style.display = "none";
            rendirse.style.display = "none";
            setTimeout(() => {  unfade(botonReset, "flex"); }, 1500);
            break;
    }
  
}