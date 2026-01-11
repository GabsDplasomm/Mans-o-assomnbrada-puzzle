let matriz = [];
let sequencia = [];
let entradaJogador = [];
let ativo = false;

const letras = ["A", "E", "F", "M", "Z", "R", "K", "T"];
const numeros = ["1","2","3","4","5","6","7","8","9"];
const pool = [...letras, ...numeros];

function gerarSimbolo() {
    return pool[Math.floor(Math.random() * pool.length)];
}

function ativarPlaca() {
    ativo = true;
    matriz = [];
    sequencia = [];
    entradaJogador = [];

    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    document.getElementById("entrada").textContent = "Entrada:";

    for (let i = 0; i < 9; i++) {
        const simbolo = gerarSimbolo();
        matriz.push(simbolo);

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = simbolo;
        grid.appendChild(cell);
    }

    while (sequencia.length < 9) {
        const n = Math.floor(Math.random() * 9) + 1;
        if (!sequencia.includes(n)) sequencia.push(n);
    }

    document.getElementById("sequence").textContent =
        "Sequência: " + sequencia.join(" - ");
}

function pressionar(posicao) {
    if (!ativo) return;

    const index = posicao - 1;
    const simbolo = matriz[index];

    entradaJogador.push(simbolo);
    document.getElementById("entrada").textContent += " " + simbolo;

    const cells = document.querySelectorAll(".cell");
    cells[index].classList.add("active");

    setTimeout(() => {
        cells[index].classList.remove("active");
    }, 300);

    if (entradaJogador.length === sequencia.length) {
        verificarResultado();
    }
}

function verificarResultado() {
    let correta = true;

    for (let i = 0; i < sequencia.length; i++) {
        const esperado = matriz[sequencia[i] - 1];
        if (entradaJogador[i] !== esperado) {
            correta = false;
            break;
        }
    }

    alert(correta
        ? "✔ Puzzle resolvido! As portas se abrem..."
        : "✖ Erro... Algo se move na escuridão."
    );

    ativo = false;
}