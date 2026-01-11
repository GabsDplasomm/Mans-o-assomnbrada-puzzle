let matriz = [];
let sequencia = [];
let entradaJogador = [];
let ativo = false;

// Pool de símbolos
const letras = ["A", "E", "F", "M", "Z", "R", "K", "T"];
const numeros = ["1","2","3","4","5","6","7","8","9"];
const pool = [...letras, ...numeros];

// Gera símbolo aleatório
function gerarSimbolo() {
    return pool[Math.floor(Math.random() * pool.length)];
}

// Ativa a placa
function ativarPlaca() {
    ativo = true;
    matriz = [];
    sequencia = [];
    entradaJogador = [];

    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    document.getElementById("entrada").textContent = "Entrada:";

    // Cria a matriz clicável
    for (let i = 0; i < 9; i++) {
        const simbolo = gerarSimbolo();
        matriz.push(simbolo);

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = simbolo;
        cell.dataset.index = i;

        // 🔥 CLIQUE NA MATRIZ
        cell.addEventListener("click", () => clicarCelula(i));

        grid.appendChild(cell);
    }

    // Gera sequência sem repetir
    while (sequencia.length < 9) {
        const n = Math.floor(Math.random() * 9) + 1;
        if (!sequencia.includes(n)) {
            sequencia.push(n);
        }
    }

    document.getElementById("sequence").textContent =
        "Sequência: " + sequencia.join(" - ");
}

// Clique na célula da matriz
function clicarCelula(index) {
    if (!ativo) return;

    const simbolo = matriz[index];
    entradaJogador.push(simbolo);

    // Atualiza entrada
    const entradaDiv = document.getElementById("entrada");
    entradaDiv.textContent += " " + simbolo;

    // Efeito visual
    const cells = document.querySelectorAll(".cell");
    cells[index].classList.add("active");

    setTimeout(() => {
        cells[index].classList.remove("active");
    }, 300);

    if (entradaJogador.length === sequencia.length) {
        verificarResultado();
    }
}

// Verificação final
function verificarResultado() {
    let correta = true;

    for (let i = 0; i < sequencia.length; i++) {
        const esperado = matriz[sequencia[i] - 1];
        if (entradaJogador[i] !== esperado) {
            correta = false;
            break;
        }
    }

    if (correta) {
        alert("✔ Puzzle resolvido! As portas se abrem...");
    } else {
        alert("✖ Erro... Algo se move na escuridão.");
    }

    ativo = false;
}
