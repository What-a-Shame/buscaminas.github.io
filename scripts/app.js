'use strict'

const tamaño = 9;
const minas = 12;

let tablero = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

let c = 0;
while (c < minas) {
    let i = Math.floor(Math.random()*tablero.length);
    let j = Math.floor(Math.random()*tablero[0].length);
    if (tablero[i][j] === 0) {
        tablero[i][j] = 1;
        c++;
    }
}

/////////////////////////////////////////////////////////////////////////
document.write("<div id='elementos'>");
document.write(`<div id='banderas'></div>`);
document.write(`<div id="contador">00:00</div>`);
document.write("</div>");


document.write(`<table>`);
for (let i = 0; i < tamaño; i++) {
    document.write(`<tr>`);
    for (let j = 0; j < tamaño; j++) {
        if (tablero[i][j] == 0) {
            document.write(`<td class='i_${i} j_${j} vacio'></td>`);
        } else {
            document.write(`<td class='mina oculta'></td>`);
        }
    }
    document.write(`</tr>`);
}
document.write(`</table>`);