
/*
	El 1º elemento de matriz es la fila de más abajo, aquí caen las primeras fichas.
	El último elemento de matriz es la fila más alta, el "techo".

*/



// Funciones
function muestraFichas() {
	
	var strFichas = "";
	var maxIdx = matriz.length - 1;
	
	
	for (var i = maxIdx; i >= 0; i--) {
		
		var arrFila = [...matriz[i]]; // copio el array que contiene la fila
		var maxIdx2 = arrFila.length; // n elementos de la fila
		
		
		for (var j = 0; j < maxIdx2; j++) { // recorro cada elemento de la fila
			
			switch (matriz[i][j]) {
				
				case 1:
					strFichas = strFichas + "<font color='blue'>O &nbsp</font>";
					break;
					
				case 2:
					strFichas = strFichas + "<font color='red'>X &nbsp</font>";
					break;
				
				default:
					strFichas = strFichas + "<font color='grey'>. &nbsp</font>";
					break;
							
			};
			
			
		};
		
		
		strFichas = strFichas + "<br/>"; // salto de línea, voy a otra fila
		
		
	};
	
	
	// Separador
	strFichas = strFichas + '<hr style="border:0; height: 1px; background #333; background-image:linear-gradient(to right, #ccc, #333, #ccc); width: 7%; margin-left:0; align:left">';
	
	// Número de columna
	strFichas = "<tt> " + strFichas + "1&nbsp 2&nbsp 3&nbsp 4&nbsp 5&nbsp 6" + "</tt>";
	// strFichas = strFichas + "<br/><br/>" + JSON.stringify(matriz); // DEBUG
	
	// Escribo valores fichas
	document.getElementById("output").innerHTML = strFichas;
	
};	



function setFicha (fila, columna, ficha) {
	
	var filaBuena = getFilaParaMeter(fila - 1, columna - 1);
	
	matriz [filaBuena][columna - 1] = ficha;
	
};



function getFilaParaMeter (idxFila, idxColumna) {
	
	for (var i = 0; i < largo; i++) {
		
		if ((matriz [idxFila + i][idxColumna]) == 0) {
			return i;
		};
		
	};
	
	return 0;
	
};



function pulsaMeteFicha (miColumna) {
	
	var tipoFicha = 0;
	
	switch (turno) {
		case 1:
			tipoFicha = 1;
			break;
		case 2:
			tipoFicha = 2;
			break;
	};
	
	
	// Meto ficha y actualizo
	setFicha(1, miColumna, tipoFicha);
	muestraFichas();
	
	
	// Compruebo si hay ganador
	var ganador = false;
	
	for (var i = 0; i <= maxIdxY; i ++) {
		
		// console.log ("enRaya: " + (enRaya (i, 0)) );
		
		for (var j = 0; j <= maxIdxX; j ++) {
			if (enRaya (i, j)) {
				ganador = true;
				break;
			};
		};
	};
	
	
	
	// ¿Hay ganador?
	if (ganador) {
		alert("¡Hay un ganador!");
	} else {
		pasaTurno();
	};
	
};



function pasaTurno() {
	
	var strColor = "";
	
	if (turno == 1) {
		turno = 2;
		strColor = "<b><font color='red'>";
	} else if (turno == 2) {
		turno = 1;
		strColor = "<b><font color='blue'>";
	};
	
	
	// Sigo
	strTurno = "Turno del " + strColor + "jugador " + turno + "</font></b>" + ".<br/>Pulsa en una columna para poner tu ficha.";
	document.getElementById("turno").innerHTML = strTurno;
	
};



function empezar() {
	
	matriz = []; // tendré array de filas
	
	
	turno = 2; // jugador 1 o 2 (empiezo en el 1 para pasar al 2)
	
	
	var datosFila = [];
	
	for (var i = 1; i <= largo; i++) { // añado la cantidad de huecos que tendrá una fila
		datosFila.push(0);
	};
	
	
	for (var i = 1; i <= alto; i++) { // Añado X filas en el array, de más abajo a más arriba
		// matriz.push(datosFila);
		matriz.push([0, 0, 0, 0, 0, 0]);
	};
	
	
	// matriz = [[1,0,0,0,0,0],[1,0,0,0,0,0],[1,0,0,0,0,0],[2,2,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
	
	
	pasaTurno();
	muestraFichas();
	
};



function enRaya (posX, posY) {
	/*
		Comprueba si hay 4 en raya en vertical, horizontal o diagonal a partir de las coordenadas
		Ejemplo: si con enRaya(1,1)
			
			o o o o
			o X o o
			o o o o
			o o o o
			
		comprobará desde la X hacia todas direcciones.
		
	*/
	
	
	var igualesArr = false;
	var igualesDer = false;
	var igualesDerArr = false;
	var igualesDerAba = false;
	
	
	var nMovimientos = 3;
	
	
	// console.log("caben4: " + caben4 (posX, posY, 0, nMovimientos));
	
	
	// Vertical arriba
	if (caben4 (posX, posY, 0, nMovimientos)) { // sí que cabrían 4, compruebo si los 4 son iguales
		
		var ref = matriz [posY][posX]; // referencia de la ficha, para que todas sean iguales que esa
		var ele; // elemento actual del for
		var algunaMal = false;
		
		
		if (ref != 0) {
			for (var i = 0; i < nMovimientos + 1; i++) {
				
				ele = matriz [posY + i][posX];
				// console.log ("xy " + posX + "," + (posY + i) + " = " + ele);
				
				if (ele != ref) { // si no coincide, se rompe todo
					algunaMal = true;
					break;
				};
				
			};
			
		} else {
			algunaMal = true;
		};
		
		igualesArr = !algunaMal;
		
	};
	
	
	
	// Horizontal derecha
	if (caben4 (posX, posY, nMovimientos, 0)) {
		
		var ref = matriz [posY][posX]; // referencia de la ficha, para que todas sean iguales que esa
		var ele; // elemento actual del for
		var algunaMal = false;
			
			
		if (ref != 0) {
			for (var i = posX; i < nMovimientos + 1; i++) {
				
				ele = matriz [posY][posX + i];
				// console.log ("xy " + (posX + i) + "," + posY + " = " + ele);
				
				if (ele != ref) { // si no coincide, se rompe todo
					algunaMal = true;
					break;
				};
				
			};
			
		} else {
			algunaMal = true;
		};
		
		igualesDer = !algunaMal; // SI hay alguna mal, NO son iguales
		
	};
	
	
	
	// Diagonal derecha arriba
	if (caben4 (posX, posY, nMovimientos, nMovimientos)) {
		
		var ref = matriz [posY][posX]; // referencia de la ficha, para que todas sean iguales que esa
		var ele; // elemento actual del for
		var algunaMal = false;
		
		
		if (ref != 0) {
			for (var i = posX; i < nMovimientos + 1; i++) {
				
				ele = matriz [posY + i][posX + i];
				
				// console.log ("xy " + (posX + i) + "," + (posY + i) + " = " + ele);
				
				
				if (ele != ref) { // si no coincide, se rompe todo
					algunaMal = true;
					break;
				};
				
			};
			
		} else {
			algunaMal = true;
		};
		
		igualesDerArr = !algunaMal;
		
	};
	
	
	
	// Diagonal derecha abajo
	if (caben4 (posX, posY, nMovimientos, -nMovimientos)) {
		
		var ref = matriz [posY][posX]; // referencia de la ficha, para que todas sean iguales que esa
		var ele; // elemento actual del for
		var algunaMal = false;
		
		
		if (ref != 0) {
			for (var i = posX; i < nMovimientos + 1; i++) {
				
				ele = matriz [posY - i][posX + i];
				// console.log ("xy " + (posX + i) + "," + (posY - i) + " = " + ele);
				
				
				if (ele != ref) { // si no coincide, se rompe todo
					algunaMal = true;
					break;
				};
				
			};
			
		} else {
			algunaMal = true;
		};
		
		igualesDerAba = !algunaMal;
		
	};
	
	
	// console.log("xy" + posX + "," + posY + "\nArr " + igualesArr + "\nDer " + igualesDer + "\nDerArr " + igualesDerArr + "\nDerAba " + igualesDerAba);
	
	
	var resFin = igualesArr || igualesDer || igualesDerArr || igualesDerAba;
	return resFin;
	
	
};



function caben4 (posX, posY, avanceX, avanceY) {
	/*
		Comprueba si existe una coordenada, partiendo de una coordenada XY que se suma con avanceX y avanceY.
		Ejemplos:
			caben4 (0,0, 3,0);
			¿Desde 0,0 se puede avanzar 3 hacia la derecha?
			
			caben4 (0,0, 0,-3);
			¿Desde 0,0 se puede avanzar 3 hacia la arriba?
		.
	*/
	
	
	var finX = posX + avanceX;
	var finY = posY + avanceY;
	
	
	/*
	debug(
		"x " + finX + 
		"<br/>y " + finY +
		"<br/>" + ((finX > maxIdxX) || (finX < 0)) + " " + ((finY > maxIdxY) || (finY < 0)) +
		"<br/>" + !(
			(finX > maxIdxX) || (finX < 0) ||
			(finY > maxIdxY) || (finY < 0)
		)
	);
	*/
	
	return !(
		(finX > maxIdxX) || (finX < 0) ||
		(finY > maxIdxY) || (finY < 0)
	);
	
};



function debug (str) {
	
	document.getElementById("debug").innerHTML = str;
	
};



// ----------------------------------------------------------------
// Fin funciones	
// ----------------------------------------------------------------



// Vars (configurable)
var largo = 6; // PENDIENTE: de momento está hardcodeado
var alto = 6;

var maxIdxX = largo - 1;
var maxIdxY = alto - 1;

empezar();

