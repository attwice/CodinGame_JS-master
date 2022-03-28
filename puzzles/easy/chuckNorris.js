const MESSAGE = readline();
let answer = '';
let binary = MESSAGE.split('')
	.map((a) =>
		a
			.charCodeAt(0)
			.toString(2)
			.padStart(7, '0')
	)
	.join('');
let binUsing = '';
for (let j = 0, len = binary.length; j < len; j++) {
	const current = binary.charAt(j);
	if (current !== binUsing) {
		binUsing = current;
		answer = answer + (current === '0' ? ' 00 ' : ' 0 ');
	}
	answer = answer + '0';
}

console.log(answer.substr(1));
