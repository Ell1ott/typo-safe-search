/**
 * This function calculates a score based on the comparison of a query and an item.
 * @param {string} query - The query to compare.
 * @param {string} item - The item to compare.
 * @returns {number} - The calculated score (not normalized).
 */
function compareInner(query: string, item: string): number {
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

		let scores = [] as number[];

		// We will check the characters of the item, and run compareInner with the rest of the query.
		while (i < itemLen) {
			if (query[queryIndex] === item[i]) {
				const gap = i - itemIndex;
				scores.push(
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
				scores.push(
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
		// console.log(item, Math.max(...scores));
		if (scores.length == 0) return score;
		return score + Math.max(...scores);
	}
	return score;
}

/**
 * This function compares a query and an item and returns a normalized score.
 * @param {string} query - The query to compare.
 * @param {string} item - The item to compare.
 * @returns {number} - The normalized score.
 */
function compare(query: string, item: string): number {
	return compareInner(query.toLowerCase(), item.toLowerCase()) / query.length;
}

export { compare };
