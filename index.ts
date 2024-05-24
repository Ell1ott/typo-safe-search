function compareInner(
	item: string,
	query: string,
	itemIndex = 0,
	queryIndex = 0,
	scoreToBeat = 0
): number {
	if (item.length <= itemIndex) return 0;
	if (query.length <= queryIndex) return 0;

	const maxPossibleScore = Math.min(
		item.length - itemIndex,
		query.length - itemIndex
	);
	if (scoreToBeat > maxPossibleScore) return 0;

	if (item[itemIndex] == query[queryIndex]) {
		return (
			(itemIndex == 0 ? 1 : 0.9) +
			compareInner(item, query, itemIndex + 1, queryIndex + 1)
		);
	}

	let i = itemIndex + 1;

	let highscore = 0;

	while (i < item.length) {
		if (item[i] === query[queryIndex]) {
			const isSwitcharoo = false;
			const score =
				compareInner(item, query, i, queryIndex, highscore / 0.95 + 0.4) *
					0.95 +
				(isSwitcharoo ? 0.4 : -0.4);

			if (score > highscore) highscore = score;
		}
		i++;
	}

	const score =
		compareInner(item, query, itemIndex, queryIndex + 1, highscore / 0.95) *
		0.95;
	return Math.max(score - 0.25, highscore);
}

export function compare(item: string, query: string): number {
	return (
		compareInner(item.toLowerCase(), query.toLowerCase()) / query.length -
		Math.abs(item.length - query.length) / 100
	);
}
