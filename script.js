const rows = 5;  
const cols = 10;  
const totalCells = rows * cols;  
const totalMines = 10;  

let mines = [];  
let revealedCells = [];  
let gameOver = false;  

const gameContainer = document.getElementById('game');  
const restartButton = document.getElementById('restartBtn');  

// Inicializar el juego  
function initializeGame() {  
    mines = [];  
    revealedCells = Array(totalCells).fill(false);  
    gameOver = false;  
    gameContainer.innerHTML = ''; // Limpiar el contenedor del juego  
    restartButton.style.display = 'none'; // Ocultar botón de reinicio  

    // Colocar las minas  
    while (mines.length < totalMines) {  
        let randIndex = Math.floor(Math.random() * totalCells);  
        if (!mines.includes(randIndex)) {  
            mines.push(randIndex);  
        }  
    }  

    // Crear las celdas  
    for (let i = 0; i < totalCells; i++) {  
        const cell = document.createElement('div');  
        cell.classList.add('cell');  
        cell.dataset.index = i;  

        cell.addEventListener('click', () => {  
            if (!gameOver) {  
                revealCell(i);  
            }  
        });  

        gameContainer.appendChild(cell);  
    }  
}  

// Revelar la celda  
function revealCell(index) {  
    if (mines.includes(index)) {  
        gameOver = true;  
        alert('¡Game Over! Has tocado una mina.');  
        const cells = document.querySelectorAll('.cell');  
        mines.forEach(mine => {  
            cells[mine].classList.add('bomb');  
        });  
        restartButton.style.display = 'block'; // Mostrar botón de reinicio  
    } else {  
        reveal(index);  
    }  
}  

// Revelar la celda y contabilizar minas adyacentes  
function reveal(index) {  
    const cell = document.querySelector(`.cell[data-index="${index}"]`);  
    if (revealedCells[index] || gameOver) return;  

    revealedCells[index] = true;  
    cell.classList.add('revealed');  

    const adjacentMines = countAdjacentMines(index);  
    if (adjacentMines > 0) {  
        cell.textContent = adjacentMines;  
    } else {  
        // Revelar celdas adyacentes si no hay minas  
        const adjacentIndices = getAdjacentIndices(index);  
        adjacentIndices.forEach(adjIndex => reveal(adjIndex));  
    }  
}  

// Contar minas adyacentes  
function countAdjacentMines(index) {  
    return getAdjacentIndices(index).filter(adjIndex => mines.includes(adjIndex)).length;  
}  

// Obtener índices adyacentes  
function getAdjacentIndices(index) {  
    const adjacentIndices = [];  
    const row = Math.floor(index / cols);  
    const col = index % cols;  

    for (let r = -1; r <= 1; r++) {  
        for (let c = -1; c <= 1; c++) {  
            if (r === 0 && c === 0) continue;  
            const newRow = row + r;  
            const newCol = col + c;  
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {  
                adjacentIndices.push(newRow * cols + newCol);  
            }  
        }  
    }  
    return adjacentIndices;  
}  

// Función para reiniciar el juego  
restartButton.addEventListener('click', () => {  
    initializeGame();  
});  

// Iniciar el juego  
initializeGame();