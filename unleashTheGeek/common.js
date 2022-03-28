import { AGENTS_MOVE_DISTANCE } from './config.js';

export const distanceBetween = (a, b) => {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const movesToCoverDistance = (distance, addInAdjacency) => {
	distance = distance - (addInAdjacency ? 1 : 0);
	return Math.ceil(distance / AGENTS_MOVE_DISTANCE);
};
