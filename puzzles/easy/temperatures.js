const n = readline();
const inputs = readline().split(' ');
const closest = inputs.reduce((acc, cVal) => {
	if (Math.abs(acc) === Math.abs(cVal)) {
		return Math.max(acc, cVal);
	} else if (Math.abs(acc) < Math.abs(cVal)) {
		return acc;
	} else {
		return cVal;
	}
}, Infinity);
console.log(closest || 0);
