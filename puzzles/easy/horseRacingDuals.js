const N = parseInt(readline());
const horses = [];
for (let i = 0; i < N; i++) {
	horses.push(parseInt(readline()));
}
horses.sort((a, b) => {
	return a - b;
});
let diff = Infinity;
for (let i = 1; i < horses.length; i++) {
	let currentDiff = horses[i] - horses[i - 1];
	if (currentDiff < diff) {
		diff = currentDiff;
	}
}
console.log(diff);
