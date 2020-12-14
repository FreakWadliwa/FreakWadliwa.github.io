export default class Game{
	score = 0;
	lines = 0;
	level = 0;
	activePiece = {
	x: 0,
	y: 0,
	get blocks() {
return this.rotations[this.rotationsIndex];
	},
	blocks: [
			[0,1,0],
			[1,1,1],
			[0,0,0]
	]
};
	playfield = this.createPlayField();
	movePieceLeft() {
		this.activePiece.x -=1;
		if (this.Collision()) {
			this.activePiece.x +=1;
		}
	}

	movePieceRight() {
		this.activePiece.x +=1;
		if (this.Collision()) {
			this.activePiece.x -=1;
		}
	}

	movePieceDown() {
		this.activePiece.y +=1;
		if (this.Collision()) {
			this.activePiece.y -=1;
			this.lockPiece();
		}
	}
	//Проверка выхода за границы и наслоения фигур
	Collision() {
		const { y: pieceY, x: pieceX, blocks} = this.activePiece;

		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				if ( blocks[y][x] &&
					((this.playfield[pieceY + y] === undefined || this.playfield[pieceY +y][pieceX + x] === undefined) || // проверка на выход из игрового поля
					 this.playfield[pieceY +y][pieceX + x])) // проверка на наслоение фигур
				{
					return true;
				}
				this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
			}
		}
		return false;

	}
	// фиксация фигуры (обьединяет массив с массивом активной фигуры)
	lockPiece() {
		const { y: pieceY, x: pieceX, blocks} = this.activePiece;
		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				if (blocks[y][x]) {
					this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
				}
				
			}
		}
	}
	//поворот фигуры
	rotatePiece() {
		this.rotateBlocks();
		if (this.Collision()) {
			this.rotateBlocks(false);
		}
	}

	rotateBlocks(clockwise = true) {
		const blocks = this.activePiece.blocks;
		const length = blocks.length;
		const x = Math.floor(length / 2);
		const y = length - 1;

		for (let i = 0; i < x; i++) {
			for (let j = i; j < y - i; j++) {
				const temp = blocks[i][j];

				if (clockwise) {
				blocks[i][j] = blocks[y-j][i];
				blocks[y-j][i] = blocks[y-i][y-j];
				blocks[y-i][y-j] = blocks[j][y-i];
				blocks[j][y-i] = temp;
				} else {
				blocks[i][j] = blocks[j][y-i];
				blocks[j][y-i] = blocks[y-i][y-j];
				blocks[y-i][y-j] = blocks[y-j][i];
				blocks[y-j][i] = temp;
				}
			}
		}
	}
	// Передаем view остояние игрового поля
	getState() {
		const playfield = this.createPlayField();

		for (let y = 0; y < this.playfield.length; y++) {
			playfield[y] = [];

			for (let x = 0; x < this.playfield[y].length; x++) {
				playfield[y][x] = this.playfield[y][x];
			}
		}
			// оздали игровое поле
		for (let y = 0; y < this.activePiece.blocks.length; y++) {
			for (var x = 0; x < this.activePiece.blocks[y].length; x++) {
				if (this.activePiece.blocks[y][x]) {
					playfield[this.activePiece.y + y][this.activePiece.x +x] = this.activePiece.blocks[y][x];
				}
			}
		}

		return{
			playfield
		};

		
	}

	createPlayField() {
		const playfield = [];

		for (let y = 0; y < 20; y++) {
			playfield[y] = [];

			for (let x = 0; x < 10; x++) {
				playfield[y][x] =0;
			}
			// создали игровое поле
		}
		return playfield;
	}
}