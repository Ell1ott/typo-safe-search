/**
 * This function calculates a score based on the comparison of a query and an item.
 * @param {string} query - The query to compare.
 * @param {string} item - The item to compare.
 * @returns {number} - The calculated score (not normalized).
 */
function compareInner(item: string, query: string): number {
	let queryLen = query.length;
	let itemLen = item.length;

	let queryIndex = -1;
	let itemIndex = -1;

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

		// We will check the characters of the item, and run compareInner with the rest of the query.
		while (i < itemLen) {
			if (query[queryIndex] === item[i]) {
				const gap = i - itemIndex;
				improveScore(
					compareInner(query.slice(queryIndex + 1), item.slice(i + 1)) *
						((1 / (0.77 + gap / 4.3) + 4) / 5) +
						0.2 +
						0.2 / gap
				);
			}
			i += 1;
		}

		// Do the same for the query. usefull if we accidently placed a character in the wrong place. (e.g. "javsascript")
		while (q < queryLen) {
			if (query[q] === item[itemIndex]) {
				const gap = q - queryIndex;
				improveScore(
					compareInner(query.slice(q + 1), item.slice(itemIndex + 1)) *
						// the further away the characters are, the lower score they will give
						((1 / (0.77 + gap / 4.3) + 2) / 3) +
						// We want to prioritice connected characters,
						// therefore we only add a small score for the first character.
						0.2 +
						0.2 / gap
				);
			}
			q += 1;
		}

		improveScore(
			compareInner(query.slice(queryIndex + 1), item.slice(itemIndex + 1)) * 0.9
		);
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

export { compare };
