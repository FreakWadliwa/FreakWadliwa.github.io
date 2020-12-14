const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "sourses/ground.png";

const foodImg = new Image();
foodImg.src = "sourses/carrot.png";

const snakeh = new Image();
snakeh.src = "sourses/snake_head.png";

const snakeb = new Image();
snakeb.src = "sourses/snake_body.png";

const melon = new Image();
melon.src = "sourses/melon.png";

var score_audio = new Audio();
score_audio.src = "sourses/audio/score.mp3";
var fon_audio = new Audio();
fon_audio.src = "sourses/audio/snake_fon.mp3";

let box = 32;

let score = 0;

let bad = {
	x: Math.floor((Math.random() * 15 + 3)) * box,
	y: Math.floor((Math.random() * 13 + 5)) * box,
};

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);
document.addEventListener("DOMContentLoaded", ready);
function stop()
{
	fon_audio.pause();
	event.target.src="sourses/sound_off.png"
}

function play()
{
	fon_audio.play();
}

function ready()
{
    fon_audio.play();
}
let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right" )
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);
	ctx.drawImage(melon, bad.x, bad.y);


	for(let i = 0; i < snake.length; i++) {
		ctx.drawImage(snakeh, snake[0].x-16, snake[0].y-16) ;
		if (i!= 0) { ctx.drawImage(snakeb, snake[i].x-8, snake[i].y-8);}
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
				score_audio.play();
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		
	if(snakeX == bad.x && snakeY == bad.y) {
		score--;
		bad = {
			x: Math.floor((Math.random() * 15 + 3)) * box,
			y: Math.floor((Math.random() * 13 + 5)) * box,
		};
	} else
		snake.pop();

	if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17)
		location.reload(); // Перезагрузка страницы

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);