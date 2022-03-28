const inputs = readline().split(' ');
const [lightX, lightY, initialTx, initialTy] = inputs.map((x) =>
	parseInt(x, 10)
);
let [tX, tY] = [initialTx, initialTy];

while (true) {
	const remainingTurns = +readline();

	let toMove = '';
	if (tY > lightY) {
		toMove = toMove + 'N';
		tY--;
	} else if (tY !== lightY) {
		toMove = toMove + 'S';
		tY++;
	}
	if (tX > lightX) {
		toMove = toMove + 'W';
		tX--;
	} else if (tX !== lightX) {
		toMove = toMove + 'E';
		tX++;
	}
	console.log(toMove);
}
