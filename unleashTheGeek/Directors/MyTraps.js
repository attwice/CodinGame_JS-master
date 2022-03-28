import ItemDirector from './ItemDirector.js';

class MyTraps extends ItemDirector {
	constructor(game, enableTraps) {
		super(game);
		this.enableTraps = enableTraps;
	}

	shouldRequestOrTake(robot) {
		return this.enableTraps && super.shouldRequestOrTake(robot);
	}
}

export default MyTraps;
