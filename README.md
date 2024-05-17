# Typo safe search

typo safe search is a simple and easy-to-use NPM package designed to perform fuzzy comparisons between two strings. It is particularly useful for sorting and searching operations where the input may contain typos or slight variations.

## Installation

To install typo safe search, use the following command:

```bash
npm install typo-safe-search
```

## Usage

The package exports a single function `compare` which takes two strings as arguments and returns a normalized score from 0 to 1, representing the similarity between the two strings. The higher the score, the more similar the strings are.

Here is a basic usage example:

```javascript
import { compare } from "typo-safe-search";

let score = compare("hello", "helo");
console.log(score); // Outputs: 0.85
```

## Sorting

You can use the `compare` function in conjunction with the `Array.prototype.sort()` function to sort an array of strings based on their similarity to a query string. Here is an example:

```javascript
import { compare } from "typo-safe-search";

let items = ["apple", "aple", "appple", "banana"];
let query = "apple";

items.sort((a, b) => compare(b, query) - compare(a, query));

console.log(items); // Outputs: [ "apple", "appple", "aple", "banana" ]
```

## Filtering

If you want to only keep the strings that are related to the query, you can add a threshold using the filter function:

```javascript
import { compare } from "typo-safe-search";

let items = ["apple", "aple", "appple", "banana"];
let query = "apple";

items.filter((item) => compare(item, query) > 0);
```

- Use `> 0` as a threshold to keep all the items that are in some way related to the query.
- Use `> 0.2` to keep all the items that are reasonable realated to the query.

## Contributing

Contributions are welcome. Please submit a pull request with any enhancements.
