import Robot from './Robot.js';

class EnemyRobot extends Robot {
	constructor(x, y, type, id, item, director) {
		super(x, y, type, id, item, director);
	}

	turnStart() {
		super.turnStart();
	}
}

export default EnemyRobot;
