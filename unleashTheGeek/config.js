const config = {};
export const generate = (readlineFunc) => {
	[config.MAP_WIDTH, config.MAP_HEIGHT] = readlineFunc()
		.split(' ')
		.map((a) => {
			return parseInt(a, 10);
		});
};

export const MAP_WIDTH = 30; // for optimization
export const MAP_HEIGHT = 15;

export const NONE = -1;
export const ROBOT_ALLY = 0;
export const ROBOT_ENEMY = 1;
export const HOLE = 1;
export const RADAR = 2;
export const TRAP = 3;
export const ORE = 4;

// from game source
export const ADJACENCY = [
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
];
export const AGENTS_MOVE_DISTANCE = 4;
export const AGENTS_PER_PLAYER = 5;
export const AGENT_INTERACT_RADIUS = 1;
export const AGENT_RESPAWN_TIME = 999;
export const MAP_CLUSTER_SIZE = 5;
export const MAP_ORE_COEFF_X = 0.55;
export const MAP_CLUSTER_DISTRIBUTION_MAX = 0.064;
export const MAP_CLUSTER_DISTRIBUTION_MIN = 0.032;
export const MAP_ORE_IN_CELL_MAX = 3;
export const MAP_ORE_IN_CELL_MIN = 1;
export const RADAR_COOLDOWN = 5;
export const RADAR_RANGE = 4;
export const ROBOTS_CAN_OCCUPY_SAME_CELL = true;
export const TRAP_CHAIN_REACTION = true;
export const TRAP_FRIENDLY_FIRE = true;
export const TRAP_COOLDOWN = 5;
export const TRAP_RANGE = 1;
export const EUCLIDEAN_RADAR = false;
export const AGENTS_START_PACKED = true;

// debug
export const PRINT_READLINE = false;
export const DEBUG_TIME = false;
export const DEVMSG = false;

// tuning
export const UNKNOWN_CELL_THRESHOLD = 100; // for radar -- higher is more stringent
export const DIG_POS_SCORE_CHANGE_THRESHOLD = 20;
export const ENABLE_TRAPS = false;
export const TOP_CELLS_TO_ANALYZE = 200;

// prettier-ignore
export const PROB_ORE = [0,0,0,1,1,2,2,3,3,4,4,5,5,5,6,6,6,7,7,7,8,8,8,8,9,9,8,6,4,2,0,0,1,2,3,4,6,7,8,9,10,11,12,13,14,14,15,16,17,17,18,19,19,20,21,21,19,15,8,4,0,0,1,3,6,10,12,15,18,20,22,24,26,28,30,32,33,35,36,38,39,41,42,43,45,47,43,36,15,6,0,0,2,4,8,12,16,19,22,25,28,30,33,35,37,39,41,43,45,47,49,50,52,54,55,58,53,44,19,8,0,0,2,5,9,14,18,22,25,28,31,34,37,40,42,44,47,49,51,53,55,57,59,60,62,65,59,48,23,10,0,0,2,5,9,14,18,21,25,28,31,34,37,39,42,44,46,48,50,52,54,56,58,60,62,64,58,48,22,9,0,0,2,5,9,14,18,22,25,28,31,34,37,39,42,44,46,48,50,52,54,56,58,59,61,64,58,48,22,9,0,1,2,5,9,14,18,22,25,28,31,34,37,39,41,44,46,48,50,52,54,56,58,59,61,64,58,48,22,9,0,0,2,5,9,14,18,22,25,28,31,34,37,39,41,44,46,48,50,52,54,56,58,59,61,64,58,48,22,9,0,0,2,5,9,14,18,21,25,28,31,34,37,39,42,44,46,48,50,52,54,56,58,60,61,64,58,48,22,9,0,0,2,5,9,14,18,22,25,28,31,34,37,40,42,44,47,49,51,53,55,57,59,60,62,65,59,48,23,10,0,0,2,4,8,12,16,19,22,25,28,30,32,35,37,39,41,43,45,47,49,50,52,54,55,58,52,43,19,8,0,0,1,3,6,9,12,15,18,20,22,24,26,28,30,32,33,35,36,38,39,41,42,43,45,47,43,36,15,6,0,0,1,2,3,4,6,7,8,9,10,11,12,13,14,14,15,16,17,17,18,19,19,20,21,22,19,15,8,4,0,0,0,1,1,2,2,3,3,4,4,5,5,5,6,6,6,7,7,7,8,8,8,8,9,9,8,6,4,2];
// prettier-ignore
export const OPTIMIZED_DIAMOND_5 = [{x:-5,y:0},{x:-4,y:-1},{x:-4,y:0},{x:-4,y:1},{x:-3,y:-2},{x:-3,y:-1},{x:-3,y:0},{x:-3,y:1},{x:-3,y:2},{x:-2,y:-3},{x:-2,y:-2},{x:-2,y:-1},{x:-2,y:0},{x:-2,y:1},{x:-2,y:2},{x:-2,y:3},{x:-1,y:-4},{x:-1,y:-3},{x:-1,y:-2},{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:-1,y:2},{x:-1,y:3},{x:-1,y:4},{x:0,y:-5},{x:0,y:-4},{x:0,y:-3},{x:0,y:-2},{x:0,y:-1},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:0,y:4},{x:0,y:5},{x:5,y:0},{x:4,y:-1},{x:4,y:0},{x:4,y:1},{x:3,y:-2},{x:3,y:-1},{x:3,y:0},{x:3,y:1},{x:3,y:2},{x:2,y:-3},{x:2,y:-2},{x:2,y:-1},{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:1,y:-4},{x:1,y:-3},{x:1,y:-2},{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:1,y:4}];
//prettier-ignore
export const OPTIMIZED_DIAMOND_4 = [{x:-4,y:0},{x:-3,y:-1},{x:-3,y:0},{x:-3,y:1},{x:-2,y:-2},{x:-2,y:-1},{x:-2,y:0},{x:-2,y:1},{x:-2,y:2},{x:-1,y:-3},{x:-1,y:-2},{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:-1,y:2},{x:-1,y:3},{x:0,y:-4},{x:0,y:-3},{x:0,y:-2},{x:0,y:-1},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:0,y:4},{x:1,y:-3},{x:1,y:-2},{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:-2},{x:2,y:-1},{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:3,y:-1},{x:3,y:0},{x:3,y:1},{x:4,y:0},];
