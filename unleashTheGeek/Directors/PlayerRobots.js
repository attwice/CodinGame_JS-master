import EntityDirector from './EntityDirector';
import PlayerRobot from '../Pos/PlayerRobot.js';
import {
	RADAR,
	TRAP,
	TOP_CELLS_TO_ANALYZE,
	DEVMSG,
	DIG_POS_SCORE_CHANGE_THRESHOLD,
} from '../config.js';
import { distanceBetween, movesToCoverDistance } from '../common.js';

class PlayerRobots extends EntityDirector {
	constructor(game) {
		super(game);
	}

	get availableRobots() {
		return this.entities.filter((robot) => {
			return robot.commandToExecute.command === null;
		});
	}

	createNewEntity(x, y, type, id, item) {
		return new PlayerRobot(x, y, type, id, item, this);
	}

	// ask, remote, take
	requestItem(item, requestType, requester) {
		if (item === RADAR) {
			this._game.myRadars.requestItem(requestType, requester);
		} else {
			this._game.myTraps.requestItem(requestType, requester);
		}
	}

	getCellMoveScore(robot, cell) {
		const distance = distanceBetween(cell, robot.cell);
		const moves = movesToCoverDistance(distance, false);
		const distanceToHQ = cell.distanceToHQ();
		const totalMoves = moves + movesToCoverDistance(distanceToHQ, false);
		const moveScore = totalMoves;
		return {
			totalMoves: totalMoves,
			moveScore: moveScore,
		};
	}

	getValueGraphForMovingAroundDigCell(robot, digCell) {
		let movingValueGraph = [];
		const adjacentCells = this._grid.getCellsWithAdjacency(digCell, true);
		adjacentCells.forEach((cell) => {
			const moveScoreObject = this.getCellMoveScore(robot, cell);
			movingValueGraph.push({
				moveCell: cell,
				...moveScoreObject,
			});
		});

		return movingValueGraph;
	}

	getIdealCellsData(robot) {
		let savedIdealScore = -Infinity;
		let idealMoveCellData = {};
		for (let i = this._grid.cells.length - 1; i !== -1; i--) {
			const digCell = this._grid.cells[i];
			const movingValueGraph = this.getValueGraphForMovingAroundDigCell(
				robot,
				digCell
			);
			for (let j = 0, len = movingValueGraph.length; j < len; j++) {
				const moveNodeData = movingValueGraph[j];
				let idealScore = digCell.digPosScore;

				if (moveNodeData.moveScore !== 0) {
					idealScore = idealScore / moveNodeData.moveScore;
				}

				idealScore += -digCell.digNegScore;

				if (
					robot.hasItem &&
					!digCell.isDigLatchedByGivenRobot(robot) &&
					digCell.numDigLatched !== 0
				) {
					idealScore += -100;
				}
				if (
					digCell.ore !== '?' &&
					!digCell.isDigLatchedByGivenRobot(robot) &&
					digCell.numDigLatched >= digCell.ore
				) {
					idealScore += -100;
				}

				let radarScore = 0;
				let trapScore = 0;
				if (robot.hasRadar) {
					radarScore += digCell.radarPlaceScore;
					idealScore += radarScore;
				} else if (robot.hasTrap) {
					trapScore += digCell.trapPlaceScore;
					idealScore += trapScore;
				}

				if (idealScore > savedIdealScore) {
					idealMoveCellData = {
						idealScore: idealScore,
						moveScore: moveNodeData.moveScore,
						radarPlaceScore: radarScore,
						trapPlaceScore: trapScore,
						moveCell: moveNodeData.moveCell,
						digCell: digCell,
						digPos: digCell.digPosScore,
						digNeg: digCell.digNegScore,
					};
					savedIdealScore = idealScore;
				}
			}
		}

		if (DEVMSG) {
			// prettier-ignore
			console.error(`(${robot.x},${robot.y}) => move (${idealMoveCellData.moveCell.x},${idealMoveCellData.moveCell.y}), dig (${idealMoveCellData.digCell.x},${idealMoveCellData.digCell.y})
		digPos: ${idealMoveCellData.digPos}, digNeg: ${idealMoveCellData.digNeg}
		radarScore: ${idealMoveCellData.radarPlaceScore}, trapScore: ${idealMoveCellData.trapPlaceScore}
		moveScore: ${idealMoveCellData.moveScore}, idealScore: ${idealMoveCellData.idealScore}`);
		}
		return idealMoveCellData;
	}

	hasScoreChanged(robot) {
		if (robot.intendedDigCell !== null) {
			// let radarLocScore = 0;
			// if (robot.hasRadar) {
			// 	radarLocScore = this._game.myRadars.radarLocScore(
			// 		robot.intendedDigCell
			// 	);
			// }
			// let currentCellScore = robot.intendedDigCell;
			// let currentCellScore = this.getCellDigScore(
			// 	robot,
			// 	robot.intendedDigCell,
			// 	radarLocScore
			// );
			return (
				robot.intendedDigCell.digNegScore !==
					robot.anticipatedNegScore ||
				robot.intendedDigCell.digPosScore <
					robot.anticipatedPosScore +
						DIG_POS_SCORE_CHANGE_THRESHOLD ||
				(robot.hasRadar &&
					robot.intendedDigCell.radarPlaceScore !==
						robot.anticipatedRadarScore) ||
				(robot.hasTrap &&
					robot.intendedDigCell.trapPlaceScore !==
						robot.anticipatedTrapScore)
			);
		} else {
			return true;
		}
	}

	determineBestAction(robot) {
		// It has arrived at its destination move cell
		if (!this.hasScoreChanged(robot)) {
			printTime(
				'myRobots.turnStart.best action loop.score changed',
				true
			);
			return robot.digCell(robot.intendedDigCell, 'DIG');
		} else {
			printTime(
				'myRobots.turnStart.best action loop.score changed',
				true
			);
			let bestCellData = this.getIdealCellsData(robot);
			printTime(
				'myRobots.turnStart.best action loop.ideal cell selected'
			);
			robot.anticipatedPosScore = bestCellData.digPos;
			robot.anticipatedNegScore = bestCellData.digNeg;
			robot.anticipatedRadarScore = bestCellData.radarPlaceScore;
			robot.anticipatedTrapScore = bestCellData.trapPlaceScore;
			if (robot.cell === bestCellData.moveCell) {
				return robot.digCell(bestCellData.digCell, 'DIG');
			} else {
				return robot.moveToCell(
					bestCellData.moveCell,
					bestCellData.digCell,
					'MOVE'
				);
			}
		}
	}

	turnStart() {
		super.turnStart();

		this.entities.forEach((robot) => {
			if (robot.isDead()) {
				return robot.declareDead();
			}
			robot.turnStart(); // Otherwise, hole might get marked as 0 ore if earlier
			if (robot.isInHQ && !robot.hasItem) {
				if (this._game.myRadars.shouldRequestOrTake(robot)) {
					this.requestItem(RADAR, 'take', robot);
					return robot.takeRadar('REQRADAR');
				}
				if (this._game.myTraps.shouldRequestOrTake(robot)) {
					this.requestItem(TRAP, 'take', robot);
					return robot.takeTrap('REQTRAP');
				}
			}

			if (robot.hasOre) {
				return robot.returnToHQ(this._grid.getCell(0, robot.y), 'ORE');
			}
		});
		printTime('myRobots.turnStart.rules loop', false);

		// Clear unneeded digging latches before going further
		this.availableRobots.forEach((robot) => {
			if (!robot.arrivedAtLocationInMemory) {
				if (!this.hasScoreChanged(robot)) {
					return robot.memMove();
				} else {
					robot.breakMemoryLatchForDigging();
				}
			}
		});
		printTime('myRobots.turnStart.memory loop', false);

		this.availableRobots.forEach((robot) => {
			this.determineBestAction(robot);
		});
		printTime('myRobots.turnStart.best action loop');
	}

	turnOver() {
		super.turnOver();
		this.entities.forEach((robot) => {
			robot.clearCommandToExecute();
		});
	}
}

export default PlayerRobots;
