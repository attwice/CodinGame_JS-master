import {
	ROBOT_ENEMY,
	ROBOT_ALLY,
	RADAR,
	TRAP,
	ENABLE_TRAPS,
} from './config.js';
import Grid from './Grid.js';
import MyRobots from './Directors/PlayerRobots.js';
import EnemyRobots from './Directors/EnemyRobots.js';
import MyRadars from './Directors/MyRadars.js';
import MyTraps from './Directors/MyTraps.js';

class Game {
	constructor() {
		this.myScore = 0;
		this.enemyScore = 0;
		this.turn = 0;
		this.entityCount = 0;
		this.grid = new Grid(this);
		this.myRobots = new MyRobots(this);
		this.enemyRobots = new EnemyRobots(this);
		this.myRadars = new MyRadars(this);
		this.myTraps = new MyTraps(this, ENABLE_TRAPS);
	}

	turnStart() {
		this.myRadars.turnStart();
		this.myTraps.turnStart();
		this.grid.turnStart();
		this.enemyRobots.turnStart();
		this.myRobots.turnStart();
		printTime('myRobots.turnStart');
	}

	turnOver() {
		this.myRobots.turnOver();
		this.enemyRobots.turnOver();
		this.myRadars.turnOver();
		this.myTraps.turnOver();
		this.grid.turnOver();
		this.turn++;
	}

	updateScoreData(myScore, enemyScore) {
		this.myScore = parseInt(myScore, 10);
		this.enemyScore = parseInt(enemyScore, 10);
	}

	updateCell(x, y, ore, hole) {
		if (ore !== '?') {
			ore = parseInt(ore, 10);
		}
		hole = parseInt(hole, 10);
		this.grid.getCell(x, y).update(ore, hole);
	}

	updateMiscData(...entityData) {
		const [entityCount, radarCooldown, trapCooldown] = entityData.map(
			(a) => {
				return parseInt(a, 10);
			}
		);
		this.entityCount = entityCount;
		this.myRadars.updateCooldown(radarCooldown);
		this.myTraps.updateCooldown(trapCooldown);
	}

	updateEntityData(...entityData) {
		const [id, type, x, y, item] = entityData.map((a) => {
			return parseInt(a, 10);
		});
		switch (type) {
			case ROBOT_ALLY:
				this.myRobots.update(x, y, type, id, item);
				break;
			case ROBOT_ENEMY:
				this.enemyRobots.update(x, y, type, id, item);
				break;
			case RADAR:
				this.myRadars.update(x, y, type, id);
				break;
			case TRAP:
				this.myTraps.update(x, y, type, id);
				break;
		}
	}
}

export default Game;
