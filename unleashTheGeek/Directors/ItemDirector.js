import EntityDirector from './EntityDirector.js';

class ItemDirector extends EntityDirector {
	constructor(game) {
		super(game);
		this.itemFreezeLatch = false;
		this.cooldown = 0;
	}

	turnStart() {
		super.turnStart();
	}

	turnOver() {
		super.turnOver();
		if (
			this.itemFreezeLatch &&
			(this.itemFreezeLatch.hasRadar || this.itemFreezeLatch.hasTrap)
		) {
			this.itemFreezeLatch = false;
		}
	}

	updateCooldown(cooldown) {
		this.cooldown = cooldown;
	}

	// ask,remote,take
	requestItem(requestType, requester) {
		if (requestType === 'ask') {
			return this.shouldRequestOrTake(requester);
		} else if (requestType === 'remote') {
			return this.requestRemotely(requester);
		} else {
			return this.requestAndTake(requester);
		}
	}

	requestAndTake(robot) {
		this.latch(robot);
	}

	requestRemotely(robot) {
		this.latch(robot);
	}

	shouldRequestOrTake(robot) {
		return (
			this.cooldown === 0 &&
			(this.itemFreezeLatch === false ||
				this.isLatchedByGivenRobot(robot))
		);
	}

	latch(robot) {
		this.itemFreezeLatch = robot;
	}

	isLatchedByGivenRobot(robot) {
		return this.itemFreezeLatch === robot;
	}
}

export default ItemDirector;
