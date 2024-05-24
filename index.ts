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
		query.length - queryIndex
	);

	// Here we do something simular to alpha-beta pruning in chess bots
	// We can stop the search, if we already know that we got a better score than the maximum possible score in this branch
	if (scoreToBeat > maxPossibleScore) return 0;

	if (item[itemIndex] == query[queryIndex]) {
		const score =
			(itemIndex == 0 ? 1 : 0.9) +
			compareInner(item, query, itemIndex + 1, queryIndex + 1);
		return score;
	}
	let i = itemIndex + 1;

	let highscore = 0;

	while (i < item.length) {
		if (item[i] === query[queryIndex]) {
			const score =
				compareInner(
					item,
					query,
					i,
					queryIndex,
					scoreToBeat + highscore / 0.95 + 0.25
				) *
					0.95 -
				0.25;

			if (score > highscore) highscore = score;
		}
		i++;
	}

	const score =
		compareInner(
			item,
			query,
			itemIndex,
			queryIndex + 1,
			scoreToBeat + highscore / 0.95 + 0.25
		) * 0.95;
	return Math.max(score - 0.25, highscore);
}

export function compare(item: string, query: string): number {
	return (
		compareInner(item.toLowerCase(), query.toLowerCase()) / query.length -
		Math.abs(item.length - query.length) / 100
	);
}
