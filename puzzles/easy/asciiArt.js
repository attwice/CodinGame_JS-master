/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const L = parseInt(readline());
const H = parseInt(readline());
const T = readline();
const letters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'?',
];
const rep = {};
letters.map((a) => {
	rep[a] = [];
});
const rows = [];
for (let i = 0; i < H; i++) {
	const row = readline();
	let letter = 0;
	for (let j = 0; j < row.length; j = j + L) {
		rep[letters[letter]].push(row.slice(j, j + L));
		letter++;
	}
}
let returnStringArray = new Array(H);
returnStringArray.fill('', 0, H);
for (let j = 0; j < H; j++) {
	for (let i = 0; i < T.length; i++) {
		let lookupChar = T.charAt(i).toUpperCase();
		if (!/[A-Z]/.test(lookupChar)) {
			lookupChar = '?';
		}
		returnStringArray[j] = returnStringArray[j] + rep[lookupChar][j];
	}
}

returnStringArray.map((a) => {
	console.log(a);
});
