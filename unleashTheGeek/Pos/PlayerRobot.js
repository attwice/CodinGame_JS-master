import Robot from './Robot.js';
import { RADAR, TRAP } from '../config.js';

class PlayerRobot extends Robot {
	constructor(x, y, type, id, item, director) {
		super(x, y, type, id, item, director);
		this.intendedDigCell = null;
		this.intendedMoveCell = null;
		this.intendedMessage = '';
		this.resetAnticipatedScore(); //this.anticipatedNegScore, this.anticipatedPosScore, ancticipatedradar/trapscore
		this.commandToExecute = {};
		this.clearCommandToExecute();
		this.commandHistory = [];
	}

	get arrivedAtLocationInMemory() {
		return (
			this.intendedMoveCell === null ||
			this.intendedMoveCell === this.cell
		);
	}

	turnStart() {
		super.turnStart();
		if (
			this.commandHistory.length > 0 &&
			this.commandHistory[this.commandHistory.length - 1].command ===
				this.consoleDig
		) {
			if (this.hasOre) {
				this.cell.dugByMe(true);
			} else {
				this.cell.dugByMe(false);
			}
		}

		// add latches from memory
		if (this.intendedDigCell !== null) {
			this.addMemoryLatchForDigging(this.intendedDigCell);
		}
	}

	setCommandToExecute(command, storedThis, ...argsArray) {
		this.commandToExecute = {
			command: command,
			storedThis: storedThis,
			params: argsArray,
		};
		this.commandHistory.push({
			command: command,
			params: argsArray,
		});
	}

	executeCommand() {
		let boundFunc = this.commandToExecute.command.bind(
			this.commandToExecute.storedThis,
			...this.commandToExecute.params
		);
		return boundFunc();
	}

	clearCommandToExecute() {
		this.commandToExecute.command = null;
		this.commandToExecute.storedThis = null;
		this.commandToExecute.params = [];
	}

	consoleMove(cell, message = '') {
		this.intendedMessage = message;
		console.log(`MOVE ${cell.x} ${cell.y} ${message}`);
	}

	consoleWait(message = '') {
		console.log(`WAIT ${message}`);
	}

	consoleDig(cell, message = '') {
		console.log(`DIG ${cell.x} ${cell.y} ${message}`);
	}

	consoleRequest(item, message = '') {
		if (item === RADAR) {
			console.log(`REQUEST RADAR ${message}`);
		} else if (item === TRAP) {
			console.log(`REQUEST TRAP ${message}`);
		} else {
			throw Error(`unrecognized item: ${item}`);
		}
	}

	takeRadar(message) {
		return this.setCommandToExecute(
			this.consoleRequest,
			this,
			RADAR,
			message
		);
	}

	takeTrap(message) {
		return this.setCommandToExecute(
			this.consoleRequest,
			this,
			TRAP,
			message
		);
	}

	moveToCell(moveCell, digCell, message) {
		if (digCell !== null && digCell.x !== 0) {
			this.addMemoryLatchForDigging(digCell);
		}
		this.intendedDigCell = digCell;
		this.intendedMoveCell = moveCell;
		return this.setCommandToExecute(
			this.consoleMove,
			this,
			moveCell,
			message
		);
	}

	memMove() {
		if (this.intendedMessage.indexOf('|MEMx') !== -1) {
			let message = this.intendedMessage;
			let memIndex = message.indexOf('|MEMx') + 5;
			let currentNum = parseInt(message.substring(memIndex), 10);
			message = message.substring(0, memIndex).concat(currentNum + 1);
			this.intendedMessage = message;
		} else {
			this.intendedMessage = this.intendedMessage + '|MEMx1';
		}
		return this.moveToCell(
			this.intendedMoveCell,
			this.intendedDigCell,
			this.intendedMessage
		);
	}

	digCell(digCell, message) {
		this.resetAnticipatedScore();
		digCell.aboutToBeDug(this._item);
		this.intendedMoveCell = this.cell;
		this.intendedDigCell = digCell;
		this.addMemoryLatchForDigging(digCell);
		return this.setCommandToExecute(
			this.consoleDig,
			this,
			digCell,
			message
		);
	}

	addMemoryLatchForDigging(cell) {
		cell.addDigLatch(this);
	}

	breakMemoryLatchForDigging() {
		this.intendedDigCell.removeDigLatch(this);
		this.intendedDigCell = null;
	}

	returnToHQ(moveCell, message) {
		this.resetAnticipatedScore();
		message = message ? 'HQ:' + message : 'HQ';
		return this.moveToCell(moveCell, null, message);
	}

	resetAnticipatedScore() {
		this.anticipatedNegScore = Infinity;
		this.anticipatedPosScore = -Infinity;
		this.anticipatedRadarScore = -Infinity;
		this.anticipatedTrapScore = -Infinity;
	}

	declareDead() {
		return this.setCommandToExecute(this.consoleWait, this, 'DEAD');
	}
}

export default PlayerRobot;
