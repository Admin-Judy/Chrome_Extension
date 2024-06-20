rotate(player.matrix, dir);
while (collide(arena, player)) {
  player.pos.x += offset;
  offset = -(offset + (offset > 0 ? 1 : -1));
  if (offset > player.matrix[0].length) {
    rotate(player.matrix, -dir);
    player.pos.x = pos;
    return;
  }
}
}

function rotate(matrix, dir) {
for (let y = 0; y < matrix.length; ++y) {
  for (let x = 0; x < y; ++x) {
    [
      matrix[x][y],
      matrix[y][x],
    ] = [
        matrix[y][x],
        matrix[x][y],
      ];
  }
}
if (dir > 0) {
  matrix.forEach(row => row.reverse());
} else {
  matrix.reverse();
}
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
const deltaTime = time - lastTime;
lastTime = time;

dropCounter += deltaTime;
if (dropCounter > dropInterval) {
  playerDrop();
}

draw();
requestAnimationFrame(update);
}

function updateScore() {
document.getElementById('score').innerText = player.score;
}

const colors = [
null,
'#FF0D72',
'#0DC2FF',
'#0DFF72',
'#F538FF',
'#FF8E0D',
'#FFE138',
'#3877FF',
];

const arena = createMatrix(12, 20);

const player = {
pos: { x: 0, y: 0 },
matrix: null,
score: 0,
};

document.addEventListener('keydown', event => {
if (event.key === 'ArrowLeft') {
  playerMove(-1);
} else if (event.key === 'ArrowRight') {
  playerMove(1);
} else if (event.key === 'ArrowDown') {
  playerDrop();
} else if (event.key === 'ArrowUp') {
  playerRotate(1);
}
});

playerReset();
updateScore();
update();
});
