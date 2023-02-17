//defaults 
const default_size = 16;
const default_color = 'black';
const default_mode = 'pen'
const previous_color = 'black';

let current_size = default_size;
let current_color = default_color;
let current_mode = default_mode;
let isDrawing = false;


const container = document.querySelector(".gridContainer")
const currentValue = document.querySelector(".slider")
const label = document.querySelector("label")
const grids = document.querySelectorAll('.grid');
const colorPick = document.querySelector('#color')
const clearGrid = document.querySelector('#clear');
const eraserButton = document.querySelector('#eraseMode')
const penButton = document.querySelector('#colorMode')
const rainbowButton = document.querySelector('#rainbowMode');
//grid setup

//clicking the clear button will reload and clear the grid of color
clearGrid.addEventListener('click', reloadGrid);
colorPick.addEventListener('input', function update() {
    current_color = colorPick.value;
});
eraserButton.addEventListener('click', function erase() {
    current_color = "white";
    current_mode = "erase";
});
penButton.addEventListener('click', function pen() {
    current_color = colorPick.value;
    current_mode = "pen";
});
rainbowButton.addEventListener('click', function setRain() {
    rainbow();
    current_mode = "rainbow";
})

function rainbow() {
    current_color = `#${randomColor()}`
}


function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

//sets up grid
function setupGrid(n) {
    container.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    for (let i = 0; i < n * n; i++) {
        let grid = document.createElement('div');
        container.appendChild(grid);
        grid.classList.add('grid');
        grid.addEventListener('mousedown', () => isDrawing = true)
        grid.addEventListener('mouseup', () => isDrawing = false);
        grid.addEventListener('mouseout', () => {
            if (current_mode === 'rainbow') {
                rainbow();
            }
        })
        grid.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                e.target.style.backgroundColor = current_color
            }
        })
    }
}
setupGrid(16)

function reloadGrid() {
    container.innerHTML = ''
    setupGrid(current_size)
}

//update value of slider when moving it 
currentValue.addEventListener('change', () => {
    let x = currentValue.value;
    current_size = x;
    label.textContent = `${current_size} x ${current_size}`
    reloadGrid(current_size);
})


function updateMode(mode) {
    current_mode = mode;
}
