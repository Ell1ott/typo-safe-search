/**
 * This function calculates a score based on the comparison of a query and an item.
 * @param {string} query - The query to compare.
 * @param {string} item - The item to compare.
 * @returns {number} - The calculated score (not normalized).
 */
function compareInner(item: string, query: string): number {
	let queryIndex = -1;
	let itemIndex = -1;

	const queryLen = query.length;
	const itemLen = item.length;

	let score = 0;

	while (queryIndex + 1 < queryLen && itemIndex + 1 < itemLen) {
		queryIndex += 1;
		itemIndex += 1;

		// Is it an exact match?
		if (query[queryIndex] === item[itemIndex]) {
			score += 1;
			continue;
		}

		// If it is not an exact match, we will try to find the next match.
		// We will check the next characters of the query and the item.

		let i = itemIndex + 1;
		let q = queryIndex + 1;

		let highScore = 0;

		const improveScore = (newScore: number) => {
			if (newScore > highScore) highScore = newScore;
		};

		improveScore(
			compareInner(item.slice(itemIndex + 1), query.slice(queryIndex + 1)) * 0.9
		);

		// We will check the characters of the item, and run compareInner with the rest of the query.
		while (i < itemLen) {
			if (query[queryIndex] === item[i]) {
				const gap = i - itemIndex;
				const falloff = offsetFalloff(gap);
				const maxPossibleScore = Math.min(
					itemLen - i - 1,
					queryLen - queryIndex - 1
				);
				if (highScore > maxPossibleScore * falloff) break;

				improveScore(
					compareInner(item.slice(i + 1), query.slice(queryIndex + 1)) * falloff
				);
			}
			i += 1;
		}

		// Do the same for the query. usefull if we accidently placed a character in the wrong place. (e.g. "javsascript")
		while (q < queryLen) {
			if (query[q] === item[itemIndex]) {
				const gap = q - queryIndex;
				const falloff = offsetFalloff(gap);
				const maxPossibleScore = Math.min(
					queryLen - q - 1,
					itemLen - itemIndex - 1
				);
				if (highScore > maxPossibleScore * falloff) break;
				improveScore(
					compareInner(item.slice(itemIndex + 1), query.slice(q + 1)) * falloff
				);
			}
			q += 1;
		}

		// console.log(item, Math.max(...scores));
		return score + highScore;
	}
	return score;
}

/**
 * This function compares a query and an item and returns a normalized score.
 * @param {string} query - The query to compare.
 * @param {string} item - The item to compare.
 * @returns {number} - The normalized score.
 */
function compare(item: string, query: string): number {
	return compareInner(item.toLowerCase(), query.toLowerCase()) / query.length;
}

const offsetFalloff = (gap: number) =>
	// the further away the characters are, the lower score they will give
	(1 / (0.77 + gap / 4.3) + 2) / 3 +
	// We want to prioritice connected characters,
	// therefore we only add a small score for the first character.
	0.2 +
	0.2 / gap;

export { compare };
