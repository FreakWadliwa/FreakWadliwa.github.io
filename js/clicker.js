var click = new Audio();
click.src = "sourses/audio/click.mp3";
var fon_audio = new Audio();
fon_audio.src = "sourses/audio/clicker_fon.mp3";

// document.addEventListener("DOMContentLoaded", ready);

// function ready()
// {
//     fon_audio.play();
// }

let clicks = 0;

const TIMEOUT = 9000;

const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');

button.onclick = start;

function start() {
	fon_audio.play();
	const startTime = Date.now();

	display.textContent = formatTime(TIMEOUT);
	button.onclick = () => {
		counter.textContent = clicks++;
		click.play();
	}

	const interval = setInterval(() => {
		const delta = Date.now() - startTime;
		display.textContent = formatTime(TIMEOUT - delta);
	}, 100);

	const timeOut = setTimeout(() => {

	button.onclick = null;

	display.textContent = 'Game Over';

	clearInterval(interval);
	clearTimeout(timeout);
	}, TIMEOUT);


}

function formatTime(ms) {
	return Number.parseFloat(ms/1000).toFixed(2);
}