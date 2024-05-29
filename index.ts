const JUMP_CHAR_FALL: number = 0.98;
const FIRST_CHAR_PENALTY: number = 0.25;
let i = 0;
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
	// This uses only 73% of the time compared to no pruning
	if (scoreToBeat > maxPossibleScore) return 0;

	if (item[itemIndex] == query[queryIndex]) {
		const score =
			(itemIndex == 0 && queryIndex == 0 ? 0.9 : 1) +
			compareInner(item, query, itemIndex + 1, queryIndex + 1);
		return score;
	}
	let i = itemIndex + 1;

	let highscore = 0;

	while (i < item.length) {
		if (item[i] === query[queryIndex]) {
			const score =
				(compareInner(
					item,
					query,
					i + 1,
					queryIndex + 1,
					scoreToBeat + highscore / JUMP_CHAR_FALL + FIRST_CHAR_PENALTY
				) +
					1) *
					JUMP_CHAR_FALL -
				FIRST_CHAR_PENALTY;

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
			scoreToBeat + highscore / JUMP_CHAR_FALL + FIRST_CHAR_PENALTY
		) * JUMP_CHAR_FALL;
	return Math.max(score - FIRST_CHAR_PENALTY, highscore);
}

export function compare(item: string, query: string): number {
	return (
		compareInner(item.toLowerCase(), query.toLowerCase()) / query.length -
		Math.abs(item.length - query.length) / 100
	);
}
