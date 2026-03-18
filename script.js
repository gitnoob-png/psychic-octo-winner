// Pong Game Code

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Create the pong paddle and ball objects
const user = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
};

const com = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 10,
    height: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
};

// Draw the rectangle
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Draw the circle
function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// Reset the ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velocityX *= -1;
}

// Update the canvas drawing and animation
function draw() {
    // Clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    // Draw paddles and ball
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawArc(ball.x, ball.y, ball.width / 2, ball.color);
    // Draw the scoreboard
    ctx.font = '35px Arial';
    ctx.fillText(user.score, canvas.width / 4, canvas.height / 5);
    ctx.fillText(com.score, 3 * canvas.width / 4, canvas.height / 5);
}

// Update the positions of game objects
function update() {
    // Move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom
    if (ball.y + ball.height >= canvas.height || ball.y <= 0) {
        ball.velocityY *= -1;
    }

    // Ball collision with paddles
    let player = (ball.x < canvas.width / 2) ? user : com;
    if (collision(ball, player)) {
        // Ball collision response
        ball.velocityX *= -1;
    }

    // Reset ball when it goes out of bounds
    if (ball.x + ball.width < 0) {
        com.score++;
        resetBall();
    } else if (ball.x > canvas.width) {
        user.score++;
        resetBall();
    }
}

// Control the paddles with mouse
canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
});

// Control the paddles with arrow keys
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 38: // Up arrow
            user.y = Math.max(0, user.y - 20);
            break;
        case 40: // Down arrow
            user.y = Math.min(canvas.height - user.height, user.y + 20);
            break;
        case 80: // P for pause
            // Pause functionality could be implemented here
            break;
    }
});

// Simple AI for computer paddle
function comMove() {
    if (ball.y > com.y + com.height / 2) {
        com.y += 4;
    } else {
        com.y -= 4;
    }
}

// Check for collision between ball and paddle
function collision(ball, paddle) {
    return ball.x < paddle.x + paddle.width &&
           ball.x + ball.width > paddle.x &&
           ball.y < paddle.y + paddle.height &&
           ball.y + ball.height > paddle.y;
}

// Game loop
function game() {
    update();
    draw();
    comMove();
    requestAnimationFrame(game);
}

// Start the game
resetBall();
game();
