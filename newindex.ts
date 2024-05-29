const JUMP_CHAR_FALL: number = 1;
const FIRST_CHAR_PENALTY: number = 0.25;

export function compare(item: string, query: string) {
	let array = [] as number[][];
	for (let i = 0; i < item.length; i++) {
		array.push([]);
	}

	let highscore = 0;

	for (let i = 0; i < item.length; i++) {
		for (let j = 0; j < query.length; j++) {
			const old = Math.max(
				i > 0 && j > 0 ? array[i - 1][j - 1] : 0,
				i > 0 && j > 1 ? array[i - 1][j] : 0,
				i > 1 && j > 0 ? array[i][j - 1] : 0
			);
			const r =
				old +
				(item.charCodeAt(i) == query.charCodeAt(j)
					? 1
					: old % 1 == 0.75
					? 0
					: -0.25);
			if (r > highscore) highscore = r;
			array[i].push(r);
		}
	}

	// for (let i = 0; i < array.length; i++) {
	// 	console.log(array[i].join(" "));
	// }
	return highscore;
}
