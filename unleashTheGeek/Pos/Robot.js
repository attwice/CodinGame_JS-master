import { RADAR, TRAP, NONE, ORE, AGENTS_MOVE_DISTANCE } from '../config.js';
import Entity from './Entity.js';
import Pos from './Pos.js';

class Robot extends Entity {
	constructor(x, y, type, id, item, director) {
		super(x, y, type, id);
		this.director = director;
		this.locHistory = [];
		this._item = item;
	}

	get hasRadar() {
		return this._item === RADAR;
	}

	get hasTrap() {
		return this._item === TRAP;
	}

	get hasOre() {
		return this._item === ORE;
	}

	get hasItem() {
		return this._item !== NONE;
	}

	update(x, y, cell, item) {
		super.update(x, y, cell);
		this._item = item;
	}

	turnStart() {
		this.locHistory.push(new Pos(this.x, this.y));
	}

	isDead() {
		return this.x === -1 && this.y === -1;
	}
}

export default Robot;
