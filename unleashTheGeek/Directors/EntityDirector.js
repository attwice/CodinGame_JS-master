import Entity from '../Pos/Entity.js';

class EntityDirector {
	constructor(game) {
		this._game = game;
		this._grid = game.grid;
		this.reset(); // this.entities[]
	}

	reset() {
		this.entities = [];
	}

	getEntityById(id) {
		return this.entities.find((entity) => {
			return entity.id === id;
		});
	}

	createNewEntity(x, y, type, id) {
		return new Entity(x, y, type, id);
	}

	update(x, y, type, id, item) {
		let found = this.getEntityById(id);
		if (found) {
			found.update(x, y, this._grid.getCell(x, y), item);
		} else {
			let newEntity = this.createNewEntity(x, y, type, id, item);
			this.entities.push(newEntity);
			newEntity.update(x, y, this._grid.getCell(x, y), item);
		}
	}

	turnStart() {}

	turnOver() {}
}

export default EntityDirector;
