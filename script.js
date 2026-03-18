// Pong Game Logic

// Game Variables
let ball; 
let leftPaddle; 
let rightPaddle;

// Set up the game
function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    leftPaddle = new Paddle(true);
    rightPaddle = new Paddle(false);
}

// Draw the frame
function draw() {
    background(0);
    ball.update();
    ball.show();
    leftPaddle.show();
    rightPaddle.show();
    checkCollision(leftPaddle);
    checkCollision(rightPaddle);
    // Move AI paddle
    rightPaddle.aiMove(ball);
}

// Ball class 
class Ball {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = random(5, 7) * (random() < 0.5 ? 1 : -1);
        this.yspeed = random(5, 7) * (random() < 0.5 ? 1 : -1);
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.y < 0 || this.y > height) this.yspeed *= -1;
        if (this.x < 0) {
            this.reset();
        } else if (this.x > width) {
            this.reset();
        }
    }
    show() {
        fill(255);
        ellipse(this.x, this.y, 20, 20);
    }
}

// Paddle class
class Paddle {
    constructor(isLeft) {
        this.isLeft = isLeft;
        this.width = 10;
        this.height = 80;
        this.y = height / 2 - this.height / 2;
    }
    show() {
        fill(255);
        rect(this.isLeft ? 0 : width - this.width, this.y, this.width, this.height);
    }
    aiMove(ball) {
        if (ball.y < this.y + this.height / 2) {
            this.y -= 5;
        } else {
            this.y += 5;
        }
        this.y = constrain(this.y, 0, height - this.height);
    }
}

// Check collision between paddles and ball
function checkCollision(paddle) {
    if (ball.x < paddle.isLeft ? paddle.width : width - paddle.width && 
        ball.x > (paddle.isLeft ? 0 : width - paddle.width) && 
        ball.y > paddle.y && 
        ball.y < paddle.y + paddle.height) {
        ball.xspeed *= -1;
    }
}