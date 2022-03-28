while (true) {
	let highestIndex = -1;
	let peakH = 0;
	for (let i = 0; i < 8; i++) {
		const mHeight = readline();
		[peakH, highestIndex] =
			peakH > mHeight ? [peakH, highestIndex] : [mHeight, i];
	}

	console.log(highestIndex);
}
