'use strcit'

const tabla = document.querySelector("tbody");
const vacios = document.querySelectorAll("td.vacio");
const bombas = document.querySelectorAll(".mina");
const timer = document.querySelector("#contador");
const num_band = document.querySelector("#banderas");

const desp_i = [-1,-1,-1,0,0,1,1,1];
const desp_j = [-1,0,1,-1,1,-1,0,1];
const nums = ["", "1", "2", "3", "4", "5", "6", "7", "8"];
const condicion = Math.pow(tamaño, 2)-minas;

let fila, celda;
let segundos = 1;
let minutos = 0;
let win = 0;
let cont_banderas = 0;
let partida = null;

num_band.innerText = cont_banderas + " / " + minas + "🚩";

const formater = (n) => {
    return n < 10 ? "0"+n : n;
}

const comprobar_victoria = (win) => {
    if (win === condicion) {
        victoria();
    }
}

const victoria = () => {
    tabla.style.pointerEvents = "none";
    clearInterval(partida);
    revelar_all();
}

const derrota = () => {
    tabla.style.pointerEvents = "none";
    clearInterval(partida);
    revelar_all();
}

const revelar_all = () => {
    bombas.forEach(
        (bomb) => {
            bomb.classList.remove("oculta");
            bomb.classList.add("visible");
        }
    );
    vacios.forEach(
        (ca) => {
            if (!ca.classList.contains("recorrida")) {
                ca.classList.add("recorrida");
            }
        }
    );
}

const banderas = (celda) => {
    return (evento) => {
        evento.preventDefault();
        if (partida !== null) {
            if (!celda.classList.contains("bandera") && !celda.classList.contains("recorrida")) {
                if (cont_banderas < minas) {
                    celda.classList.add("bandera");
                    cont_banderas++;
                }
            } else {
                celda.classList.remove("bandera");
                cont_banderas--;
            }
            num_band.innerText = cont_banderas + " / " + minas + "🚩";
        }
    }
}

const explosivos = (i,j) => {
    let cant_minas = 0;
    let mov_i, mov_j;

    for (let k = 0; k < desp_i.length; k++) {
        mov_i = i + desp_i[k];
        mov_j = j + desp_j[k];
        if(mov_i>=0 && mov_i<tablero.length && mov_j>=0 && mov_j<tablero.length){
            if(tablero[mov_i][mov_j] === 1){
                cant_minas++;
            }
        }
    }

    return cant_minas;
}

const juego = (i, j, celda) => {
    return () => {
        // Inicio el contador cuando el jugador "clicka" por primera vez
        if (partida === null) {
            partida = setInterval(
                    () => {
                        let m = formater(minutos);
                        let s = formater(segundos);

                        timer.innerText = `${m}:${s}`;
                        segundos++;
                        
                        if (segundos === 60) {
                            minutos++;
                            segundos = 0;
                        }

                        if (minutos === 60) {
                            derrota();
                        }
                    }, 1000
                );
        }
        
        if (!celda.classList.contains("bandera")) {
            if (celda.classList.contains("mina")) {
                derrota();
            } else {
                win++;
                celda.classList.add("recorrida");
                comprobar_victoria(win);

                let n = explosivos(i,j);

                celda.innerText = nums[n];
            }
        }
    }
}

for (let i = 0; i < tabla.children.length; i++) {
    fila = tabla.children[i];
    for (let j = 0; j < tabla.children.length; j++) {
        celda = fila.children[j];
        celda.addEventListener("click", juego(i, j, celda));
        celda.addEventListener("contextmenu", banderas(celda));
    }
}