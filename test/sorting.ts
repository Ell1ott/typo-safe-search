import { compare } from "../index";
const query = "poison";
function test(): { item: string; score: number }[] {
	const items: string[] = [
		"fist",
		"context",
		"ditch",
		"distortion",
		"silence",
		"spit",
		"gene",
		"painter",
		"likely",
		"elaborate",
		"war",
		"excavate",
		"skilled",
		"prescription",
		"relate",
		"poison",
		"promote",
		"philosophy",
		"dose",
		"nofall",
		"stable",
		"literature",
		"economist",
		"man",
		"proof",
		"enlarge",
		"expertise",
		"brainstorm",
		"weak",
		"jelly",
		"anxiety",
		"guess",
		"meet",
		"hesitate",
		"order",
		"permanent",
		"smash",
		"trouble",
		"lump",
		"pupil",
		"slide",
		"storage",
		"gallon",
		"modest",
		"productive",
		"troop",
		"architecture",
		"cause",
		"fast",
		"integration",
		"deserve",
		"horse",
		"concert",
		"size",
		"drama",
		"revoke",
		"society",
		"rib",
		"breakfast",
		"unity",
		"taxi",
		"main",
		"hang",
		"aware",
		"personal",
		"plane",
		"feast",
		"score",
		"audience",
		"drill",
		"foundation",
		"destruction",
		"cafe",
		"explode",
		"settle",
		"terrace",
		"office",
		"word",
		"straighten",
		"unfair",
		"carpet",
		"extort",
		"venture",
		"judgment",
		"agreement",
		"soup",
		"shadow",
		"relation",
		"pool",
		"grateful",
		"shareholder",
		"battlefield",
		"therapist",
		"introduction",
		"cake",
		"structure",
		"drag",
		"patient",
		"resolution",
		"drum",
		"matrix",
		"flash",
		"abridge",
		"expect",
		"notorious",
		"river",
		"revolution",
		"herb",
		"rhetoric",
		"conspiracy",
		"epicalyx",
		"omission",
		"proportion",
		"revival",
		"quality",
		"spare",
		"mobile",
		"punch",
		"generation",
		"orientation",
		"enter",
		"liability",
		"continental",
		"curl",
		"muggy",
		"talented",
		"Sunday",
		"file",
		"improvement",
		"develop",
		"headline",
		"mistreat",
		"resignation",
		"old",
		"slap",
		"cry",
		"set",
		"terminal",
		"reverse",
		"cruelty",
	];
	items.forEach((q) => {
		let searchedItems = items
			.map((item) => ({
				item: item,
				score: compare(item, q),
			}))
			.sort((a, b) => b.score - a.score);
	});

	let searchedItems = items
		.map((item) => ({
			item: item,
			score: compare(item, query),
		}))
		.sort((a, b) => b.score - a.score);

	return searchedItems;
}

test()
	.slice(0, 20)
	.forEach((item) => {
		console.log(item.item, item.score);
	});

performance.mark("start");
for (let i = 0; i < 500; i++) {
	test();
}
// searchedItems.forEach((item) => {
// 	console.log(item.item, item.score);
// });
performance.mark("end");
performance.measure("search", "start", "end");
console.log("it took", performance.getEntriesByName("search")[0].duration);

console.log(compare("hello", "helo"));

// console.log(compareInner("aura", "kill aura"));
