//defaults 
const default_size = 16;
const default_color = 'black';
const default_mode = 'pen'
const previous_color = 'black';

let current_size = default_size;
let current_color = default_color;
let current_mode = default_mode;


const container = document.querySelector(".gridContainer")
const currentValue = document.querySelector(".slider")
const label = document.querySelector("label")
const grids = document.querySelectorAll('.grid');
const colorPick = document.querySelector('#color')
const clearGrid = document.querySelector('#clear');
const eraserButton = document.querySelector('#eraseMode')
const penButton = document.querySelector('#colorMode')
//grid setup

//clicking the clear button will reload and clear the grid of color
clearGrid.addEventListener('click', reloadGrid);
colorPick.addEventListener('input', function update() {
    current_color = colorPick.value;
});
eraserButton.addEventListener('click', function erase() {
    current_color = "white";
});
penButton.addEventListener('click', function pen() {
    current_color = colorPick.value;
});

//sets up grid
function setupGrid(n) {
    container.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    for (let i = 0; i < n * n; i++) {
        let grid = document.createElement('div');
        container.appendChild(grid);
        grid.classList.add('grid')
        grid.addEventListener('mousedown', () => {
                grid.style.backgroundColor = current_color; 
        })
        //grid.addEventListener('mouseenter', draw)
    }
}
setupGrid(16)

function reloadGrid() {
    container.innerHTML = ''
    setupGrid(current_size)
}

// function draw(e) {
//     //changeColor()
//     if (e.mousedown & e.mouseenter) {
//     this.style.backgroundColor = current_color;
//     }
// }

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
