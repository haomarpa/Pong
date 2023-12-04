const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let player2PaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;
let player1Score = 0;
let player2Score = 0;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fill();
}

function draw() {
    // Clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "black");

    // Draw paddles
    drawRect(0, playerPaddleY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, player2PaddleY, paddleWidth, paddleHeight, "white");

    // Draw the ball
    drawCircle(ballX, ballY, ballSize, "white");
}

function movePaddle(evt) {
    if (evt.key == "ArrowUp") {
        player2PaddleY -= 20;
        return;
    } else if (evt.key == "ArrowDown") {
        player2PaddleY += 20;
        return;
    }

    if (evt.key == "w") {
        playerPaddleY -= 20;
        return;
    } else if (evt.key == "s") {
        playerPaddleY += 20;
        return;
    }
}

canvas.addEventListener("keydown", movePaddle);

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY > canvas.height - ballSize || ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        (ballX < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) ||
        (ballX > canvas.width - paddleWidth - ballSize &&
            ballY > player2PaddleY &&
            ballY < player2PaddleY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX > canvas.width) {
        // Player loses a point
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;

        const playerScore = document.getElementById("playerScore");
        playerScore.innerHTML = ++player1Score + '-' + player2Score;
    } else if (ballX < 0) {
        // Player 2 loses a point
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;

        const playerScore = document.getElementById("playerScore");
        playerScore.innerHTML = player1Score + '-' + ++player2Score;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

function startGame() {
    const startButton = document.getElementById("startButton");
    startButton.style.display = "none";
    document.getElementById("pong").click();
    gameLoop();
}