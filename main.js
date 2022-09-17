var palabra; //Palabra que sera elegida
var palabra_vacia = []; //Array con caracteres para adivinar
var secretas = [["JAVA","Lenguaje de Programacion"],
                ["PYTHON","Lenguaje de Programacion"],
                ["AREQUIPA","Departamento del peru"],
                ["PERU","Es un Pais"],
                ["LINUX","Es un Sistema Operativo"]];
var rand; //numero aleatorio
var contador = 6; //intentos
var letra; //Letra ingresada por el usuario
var cadena_usadas = ""; //Letras usadas hasta el momento

//Deshabilita los botones 
document.getElementById("leer").disabled = true;
document.getElementById("pista").disabled = true;

function leerLetra(){
	letra = document.getElementById("letra").value;
	document.getElementById("letra").value = "";

	if( validarEntrada() ){
		letra = letra.toUpperCase();
		console.log(letra);
        letrasUsadas();
	    
	    let index = secretas[rand][0].indexOf(letra);
        if( index != -1 ){
    	    evalua();   	
        }
        else{
    	    contador--;
    	    if(contador == 0) {
    		    document.getElementById("intentos").innerHTML =
    		     "GAME OVER: La palabra era "+secretas[rand][0];
    	        document.querySelector('button').disabled = true;
    	    }

            else {
    		     document.getElementById("intentos").innerHTML = "Intentos disponibles: "+contador;   		
            }
        }
	}
	else alert("INGRESE SOLO UN CARACTER");	
}

function obtenerPalabra(){
    document.getElementById("leer").disabled = false;
    document.getElementById("obtener").disabled = true;
    document.getElementById("pista").disabled = false;

	rand = Math.round(Math.random() * (secretas.length-1));
	palabra = secretas[rand][0].split('');
	console.log(palabra);

	for(let i = 0; i < palabra.length; i++){
		palabra_vacia.push("_");
	}
	
	console.log(palabra_vacia);
	dibujarPalabra();
}

function evalua(){
    for(let i = 0; i < palabra.length; i++){
		if( palabra[i] == letra) palabra_vacia[i] = letra;
	}
     
	dibujarPalabra();

	if( palabra_vacia.toString().indexOf("_") == -1){
		document.getElementById("intentos").innerHTML = "GANASTE";
        document.querySelector('button').disabled = true;
	}	
}
function obtenerPista(){
	alert(secretas[rand][1]);
}

function dibujarPalabra(){
	var p = "";
	for(let i = 0; i < palabra.length; i++){
        p += palabra_vacia[i]+" ";
	}
    document.getElementById("vacios").innerHTML = p;
}
function letrasUsadas(){
	if(cadena_usadas.indexOf(letra) == -1) cadena_usadas += letra + " ";
	document.getElementById("usadas").innerHTML = "Letras usadas: "+cadena_usadas;

}
function reiniciar(){
	contador = 6;
	palabra_vacia = [];
	cadena_usadas = "";
	document.getElementById("leer").disabled = true;
	document.getElementById("vacios").innerHTML = "Presiona obtener palabra";
	document.getElementById("intentos").innerHTML = "Intentos disponibles: "+contador; 
	document.getElementById("usadas").innerHTML = "Letras usadas: ";
	document.getElementById("obtener").disabled = false;
	document.getElementById("pista").disabled = true;
}
function validarEntrada(){
	if( letra.length == 1) return true;
	else return false;
}

