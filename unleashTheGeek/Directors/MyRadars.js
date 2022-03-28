import { UNKNOWN_CELL_THRESHOLD } from '../config.js';
import ItemDirector from './ItemDirector.js';
import { distanceBetween } from '../common.js';

class MyRadars extends ItemDirector {
	constructor(game) {
		super(game);
		this.startingX = 3;
		this.startingY = 2;
		this.plusX = 3;
		this.plusY = 4;
	}

	shouldRequestOrTake(robot) {
		return (
			super.shouldRequestOrTake(robot) &&
			this._grid.numCellsWithoutRadar > UNKNOWN_CELL_THRESHOLD
		);
	}

	getAmountOfEdgesAdjacentToOtherRadars(cell) {
		let touchingCells = 0;
		this.entities.forEach((radar) => {
			if (distanceBetween(cell, radar) === 9) {
				touchingCells += Math.min(
					Math.abs(cell.y - radar.y) + 1,
					Math.abs(cell.x - radar.x) + 1
				);
			}
		});
		return touchingCells;
	}

	// radarLocScore(radarCheckCell) {
	// 	const cellsWithinOneMove = this._grid.getCellsWithinOneMove(
	// 		radarCheckCell,
	// 		false,
	// 		true
	// 	);

	// 	// Include center, filter out padding around map of 2
	// 	let score = 0;
	// 	let scoreAdd = 5; //41 max tiles, 100 best score
	// 	cellsWithinOneMove.forEach((cell) => {
	// 		// if (cell.ore === '?') {
	// 		// 	score += scoreAdd;
	// 		// 	if (cell.hole) {
	// 		// 		score += Math.floor(scoreAdd); // 1-3 chance
	// 		// 	}
	// 		// } else {
	// 		// 	score += -scoreAdd;
	// 		// }
	// 	});

	// 	let touchingRadarCells = this.getAmountOfEdgesAdjacentToOtherRadars(
	// 		radarCheckCell
	// 	);
	// 	if (touchingRadarCells > 2) {
	// 		score += (2 * scoreAdd) ^ touchingRadarCells;
	// 	}

	// 	if (score < 0) {
	// 		score = 0;
	// 	}

	// 	return score;
	// }
}

export default MyRadars;

// Factors for radarLocScore:
// We don't know if it has ore = plus due to missing radar coverage
// Our hole and didn't get ore = neg TODO track ore
// Our hole and did get ore = plus (may be more, vein effect) TODO track ore
// Ignoring enemy hole due to trap danger
// Has ore -- neutral
// Has no ore -- 2neg due to missing vein and radar coverage already present
// Radar already there is bad
