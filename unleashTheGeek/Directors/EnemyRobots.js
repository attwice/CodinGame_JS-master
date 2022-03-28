import EntityDirector from './EntityDirector.js';
import EnemyRobot from '../Pos/EnemyRobot.js';

class EnemyRobots extends EntityDirector {
	constructor(game) {
		super(game);
	}

	turnStart() {
		super.turnStart();

		this.entities.forEach((robot) => {
			robot.turnStart();
			if (robot.locHistory.length > 0) {
				const lastLoc = robot.locHistory[robot.locHistory.length - 1];
				if (
					lastLoc.x === robot.x &&
					lastLoc.y === robot.y &&
					lastLoc.x !== 0 // TODO can dig in hq
				) {
					const possibleCells = [];
					const surroundingCells = this._grid.getCellsWithAdjacency(
						robot,
						true
					);
					surroundingCells.forEach((cell) => {
						if (cell.hole && cell.wasJustMined) {
							possibleCells.push(cell);
						}
					});
					console.error(possibleCells.map((a) => a.pretty));
					if (possibleCells.length === 1) {
						if (possibleCells[0].myHole) {
							possibleCells[0].enemyTrapChance += 10;
						} else {
							possibleCells[0].enemyTrapChance += 1;
						}
					} else if (possibleCells.length > 1) {
						console.error(possibleCells.map((a) => a.pretty));
						possibleCells.forEach((cell) => {
							console.error(
								'unsure cell dug by enemy: ',
								cell.pretty
							);
							if (cell.myHole) {
								cell.enemyTrapChance += possibleCells.length;
							}
						});
					}
				}
			}
		});
	}

	createNewEntity(x, y, type, id, item) {
		return new EnemyRobot(x, y, type, id, item, this);
	}
}

export default EnemyRobots;
