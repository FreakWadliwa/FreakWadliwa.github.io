var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var off = new Image();

off.src = "sourses/sound_off.png";
bird.src = "sourses/bird.png";
bg.src = "sourses/bg.png";
fg.src = "sourses/fg.png";
pipeUp.src = "sourses/pipeUp.png";
pipeBottom.src = "sourses/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var fon_audio = new Audio();

fly.src = "sourses/audio/fly.mp3";
fon_audio.src = "sourses/audio/flappy_bird_fon.mp3";
score_audio.src = "sourses/audio/score.mp3";

function play()
{
	fon_audio.play();
}

function stop()
{
	fon_audio.pause();
	event.target.src="sourses/sound_off.png"
}

function ready()
{
    fon_audio.play();
}
let dir;

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);
document.addEventListener('keydown', rotare);
document.addEventListener("DOMContentLoaded", ready);

function rotare() {
        bird.style.transform = 'rotate(-' + (deg += 90) + 'deg)';
    }

function moveUp() {
 yPos -= 40;
 fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 2.5;

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;