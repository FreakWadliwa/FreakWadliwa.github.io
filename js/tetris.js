import Game from "../classes/tetris_game.js";
import View from "../classes/tetris_view.js";

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;
console.log(game);

document.addEventListener('keydown', event => {
	switch (event.keyCode) {
		case 37: game.movePieceLeft();
		view.render(game.getState());
		break;
		case 38: game.rotatePiece();
		view.render(game.getState());
		break;
		case 39: game.movePieceRight();
		view.render(game.getState());
		break;
		case 40: game.movePieceDown();
		view.render(game.getState());
		break;
	}

});

//view.renderPlayfield(game.getState());