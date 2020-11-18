const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasSize = 23;

// Score Variable
let score = document.getElementById('cscore').innerHTML;
let nscore = score + 1;

// Load snake starting position
let snake = [];

snake[0] = {
	x: Math.floor(canvasSize / 2) * box,
	y: Math.floor(canvasSize / 2) * box,
};

// Set direction getting pressed by arrow keys
let dir;
var pressed = false;
document.addEventListener('keydown', direction);

function direction(event) {
	if (event.keyCode == 37 && dir != 'RIGHT') {
		dir = 'LEFT';
	} else if (event.keyCode == 38 && dir != 'DOWN') {
		dir = 'UP';
	} else if (event.keyCode == 39 && dir != 'LEFT') {
		dir = 'RIGHT';
	} else if (event.keyCode == 40 && dir != 'UP') {
		dir = 'DOWN';
	}
}

// Set the location of our food
let food = {
	x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
	y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
};

// Draw function
function draw() {
	// Draw the background
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(box, box, canvasSize * box - box, canvasSize * box - box);

	// Draw the snake head and tail
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = 'green';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		if (snake[i].x == food.x && snake[i].y == food.y) {
			food = {
				x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
				y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
			};
		}
	}

	// Move the snake head
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (dir == 'LEFT') snakeX -= box;
	if (dir == 'RIGHT') snakeX += box;
	if (dir == 'UP') snakeY -= box;
	if (dir == 'DOWN') snakeY += box;

	// If the snake eats the food
	if (snakeX == food.x && snakeY == food.y) {
		newScore();
		food = {
			x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
			y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
		};
	} else {
		snake.pop();
	}

	let newHead = {
		x: snakeX,
		y: snakeY,
	};

	// Function increase score
	function newScore() {
		let currentScore = parseInt(nscore++);
		document.getElementById('cscore').innerHTML = currentScore;
	}

	var newHighScore = 0;

	function storage() {
		newHighScore = nscore - 1;
		document.getElementById('hscore').innerHTML = newHighScore;
		console.log(newHighScore);
		localStorage.setItem(newHighScore);
	}

	function getStorage() {}

	// Check Collision
	function collision(head, array) {
		for (let i = 0; i < array.length; i++) {
			if (head.x == array[i].x && head.y == array[i].y) {
				return true;
			}
		}
		return false;
	}
	// Game over
	if (snakeX < box || snakeY < box || snakeX > (canvasSize - 1) * box || snakeY > (canvasSize - 1) * box || collision(newHead, snake)) {
		clearInterval(game);
		storage();
		console.log(getStorage);
	}

	snake.unshift(newHead);
	// Draw in food
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, box, box);
}

let game = setInterval(draw, 100);
