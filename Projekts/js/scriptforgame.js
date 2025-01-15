const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');
const box = 16; //čūsku izmērs
const canvasSize = 400;
const speed = 3; // spēles ātrums

let player1 = {
    x: 0,
    y: 0,
    dx: box,
    dy: 0,
    trail: [],
    tail: 5,                // pirmā stati
    color: '#ff0',
    lives: 5,
    keyUp: 38,
    keyRight: 39,
    keyDown: 40,
    keyLeft: 37
};

let player2 = {
    x: canvasSize - box,
    y: canvasSize - box,
    dx: -box,
    dy: 0,
    trail: [],
    tail: 5,                // otrā stati
    color: '#0ff',
    lives: 5,
    keyUp: 87,
    keyRight: 68,
    keyDown: 83,
    keyLeft: 65 
};

let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
    color: '#f00'
};

let gameOver = false;

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(e) {
    //  pirmās čūskas kontrole
    if (e.keyCode === player1.keyUp && player1.dy !== box) {
        player1.dx = 0;
        player1.dy = -box;
    } else if (e.keyCode === player1.keyRight && player1.dx !== -box) {
        player1.dx = box;
        player1.dy = 0;
    } else if (e.keyCode === player1.keyDown && player1.dy !== -box) {
        player1.dx = 0;
        player1.dy = box;
    } else if (e.keyCode === player1.keyLeft && player1.dx !== box) {
        player1.dx = -box;
        player1.dy = 0;
    }

    // otrās čūskas kontrole
    if (e.keyCode === player2.keyUp && player2.dy !== box) {
        player2.dx = 0;
        player2.dy = -box;
    } else if (e.keyCode === player2.keyRight && player2.dx !== -box) {
        player2.dx = box;
        player2.dy = 0;
    } else if (e.keyCode === player2.keyDown && player2.dy !== -box) {
        player2.dx = 0;
        player2.dy = box;
    } else if (e.keyCode === player2.keyLeft && player2.dx !== box) {
        player2.dx = -box;
        player2.dy = 0;
    }
}

function draw() {       // ķipa main funkcija
    if (gameOver) {
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    drawPlayer(player1);
    drawPlayer(player2);
    drawFood();
    drawLives();

    move(player1, player2);
    move(player2, player1);

    checkIfEaten();

    setTimeout(draw, 200/speed); // uzstāda spēles ātrumu
}

function drawPlayer(player) {      // zīmē čūsku
    ctx.fillStyle = player.color;
    for (let i = 0; i < player.trail.length; i++) {
        ctx.fillRect(player.trail[i].x, player.trail[i].y, box - 1, box - 1);
    }
    player.trail.push({ x: player.x, y: player.y });
    while (player.trail.length > player.tail) {
        player.trail.shift();
    }
}

function move(player, otherPlayer) {     // nodrošina kustību
    player.x += player.dx;
    player.y += player.dy;

    if (player.x >= canvasSize) {
        player.x = 0;
    } else if (player.x < 0) {
        player.x = canvasSize - box;
    }

    if (player.y >= canvasSize) {
        player.y = 0;
    } else if (player.y < 0) {
        player.y = canvasSize - box;
    }

    // pārbauda spēlētāju kolīzijas
    for (let i = 1; i < otherPlayer.trail.length; i++) {
        if (player.x === otherPlayer.trail[i].x && player.y === otherPlayer.trail[i].y) {
            // zaudē dzīvību, ja aizķer cita asti
            player.lives--;
            if (player.lives === 0) {
                gameOver = true;
                displayWinner(player === player1 ? 'Otrais' : 'Pirmais');
                return;
            }
            resetPlayer(player);
        }
    }
    for (let i = 1; i < player.trail.length; i++) {
         if (player.x === player.trail[i].x && player.y === player.trail[i].y) {
            // zaudē dzīvību, ja aizķer savu asti
            player.lives--;
            if (player.lives === 0) {
                gameOver = true;
                displayWinner(player === player1 ? 'Otrais' : 'Pirmais');
                return;
            }
            resetPlayer(player);
        }
    }
}

function drawFood() {
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, box, box);
}

function checkIfEaten() {   // pārbauda, vai ēdiens ir apēsts
    if (player1.x === food.x && player1.y === food.y) {
        player1.lives++;
        if (player1.lives === 20) {
            gameOver = true;
            displayWinner('Pirmais');
            return;
        }
        player1.tail++;
        respawnFood();
    }

    if (player2.x === food.x && player2.y === food.y) {
        player2.lives++;
        if (player2.lives === 20) {
            gameOver = true;
            displayWinner('OTRAIS');
            return;
        }
        player2.tail++;
        respawnFood();
    }
}

function drawLives() { // izvada dzīvības
    info1.innerText = `DZĪVĪBAS: ${player1.lives}`;
    info2.innerText = `DZĪVĪBAS: ${player2.lives}`;
}

function respawnFood() {
    // ģenerē ēdienu
    food.x = Math.floor(Math.random() * (canvasSize / box)) * box;
    food.y = Math.floor(Math.random() * (canvasSize / box)) * box;
}

function resetPlayer(player) {
    // teleportē spēlētāju starta pozīcijā
    player.x = 0;
    player.y = 0;
    player.trail = [];
    player.tail--;
}

function displayWinner(winner) { // izvada uzvarētāju
    alert(`${winner} uzvarēja!`);
}

draw();
