import { MAP_ORE_IN_CELL_MAX, HOLE, RADAR, TRAP } from '../config.js';
import Pos from './Pos.js';

class Cell extends Pos {
	constructor(ore, hole, x, y, probOre) {
		super(x, y);
		this.update(ore, hole); //this.ore, this.hole
		this.myHole = false;
		this._oreGiven = 0;
		this.radar = false;
		this.trap = false;
		this.enemyTrapChance = 0;
		this.wasJustMined = false;
		this.updateRadarEdges(0); // amountOfEdgesAdjacentToOtherRadars

		const startingProb = probOre;
		this.getStartingProb = () => {
			return startingProb;
		};

		this._digLatchedArray = [];
		this._entityArray = [];
	}

	get probOre() {
		return this.getStartingProb(); //TODO to expand
	}

	get enemyHole() {
		return this.hole && !this.myHole;
	}

	get numDigLatched() {
		return this._digLatchedArray.length;
	}

	get minedOre() {
		return this._oreMinedByMe + this._oreMinedByEnemy;
	}

	addDigLatch(robot) {
		if (robot.hasItem) {
			this._digLatchedArray = new Array(MAP_ORE_IN_CELL_MAX).fill(robot);
		} else {
			this._digLatchedArray.push(robot);
		}
	}

	removeDigLatch(robot) {
		this._digLatchedArray = this._digLatchedArray.filter((a) => {
			return robot.id !== a.id;
		});
	}

	isDigLatchedByGivenRobot(robot) {
		return this._digLatchedArray.includes(robot);
	}

	_dug(gaveOre) {
		if (gaveOre) {
			if (this.ore !== '?') {
				this.ore--;
			}
		} else {
			this.ore = 0;
		}
	}

	dugByMe(gaveOre) {
		this._dug(gaveOre);
		this._oreMinedByMe++;
	}

	dugByEnemy(gaveOre) {
		// TODO
		this._dug(gaveOre);
		this._oreMinedByEnemy++;
	}

	aboutToBeDug(item) {
		if (item === RADAR) {
			this.radar = true;
		} else if (item === TRAP) {
			this.trap = true;
		}
		this.myHole = true;
	}

	resetDigLatchedArray() {
		this._digLatchedArray = [];
	}

	update(ore, hole) {
		if (ore !== '?') {
			this.ore = ore;
		} else {
			if (this.ore === '?') {
				this.ore = ore;
			} // ignore it if we already know the number and it's given us ?
		}
		// We may already know it's empty if we/enemy mined an unknown and got nothing
		if (this.ore !== 0) {
			this.ore = ore;
		}
		if (this.hole !== (hole === HOLE)) {
			this.wasJustMined = true;
			this.hole = hole === HOLE ? true : false;
		} else {
			this.wasJustMined = false;
		}
	}

	updateRadarEdges(numEdges) {
		this.amountOfEdgesAdjacentToOtherRadars = numEdges;
	}

	updateRadarSpray(sprayed) {
		if (sprayed) {
			this.radarSprayed = true;
		}
	}

	get digPosScore() {
		let digPos = 0;

		if (this.ore === '?') {
			digPos += this.probOre;
		} else if (this.ore > 0) {
			digPos += 100;
			for (let i = this.ore; i > 1; i--) {
				digPos += 25;
			}
		}

		return digPos;
	}

	get digNegScore() {
		let digNeg = 0;
		if (this.x === 0) {
			return 1000;
		}
		if (this.radar || this.trap) {
			return 1000;
		}
		if (this.enemyHole) {
			digNeg += 200;
		}
		if (this.hole && this.enemyTrapChance > 0) {
			digNeg += 500 * this.enemyTrapChance;
		}
		if (this.hole && this.ore === '?') {
			digNeg += 100;
		}
		if (this.ore === 0) {
			digNeg += 100;
		}

		return digNeg;
	}

	get radarPlaceScore() {
		let radarScore = 0;
		if (this.x < 5 || this.radar) {
			radarScore += -10000;
		} else {
			radarScore += 5 ** this.amountOfEdgesAdjacentToOtherRadars;
			if (this.radarSprayed) {
				radarScore -= 1000;
			}
		}
		return radarScore;
	}

	get trapPlaceScore() {
		let trapScore = 0;
		if (this.ore !== '?' && this.ore > 0) {
			if (this.enemyHole) {
				trapScore += 10; // TODO: Overdoing it? -- will be better when you have likely enemy traps
			} else {
				trapScore += 5;
			}
		}
		return trapScore;
	}
}

export default Cell;
