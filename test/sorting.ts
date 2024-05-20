import { compare } from "../index";
const query = "pnisen";

const items = [
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
];

let searchedItems = items
	.map((item) => ({
		item: item,
		score: compare(query, item),
	}))
	.sort((a, b) => b.score - a.score);

searchedItems.forEach((item) => {
	console.log(item.item, item.score);
});

console.log(compare("hello", "helo"));

// console.log(compareInner("aura", "kill aura"));
