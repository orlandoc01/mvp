var powerSet = require('./code0.js').powerSet;

var testCode = function() {
	if(powerSet() === "Orlando's app is great") {
		return [1, "Success!...Best solution yet"];
	} else if(powerSet === undefined) {
		return [0, "Error, powerSet doesn't exits"];
	} else if (typeof powerSet !== 'function') {
		return [0, "Error, powerset's not a function"];
	} else if (powerSet("abc") === undefined) {
		return [0, "Error, powerSet doesn't return"];
	} else if (!Array.isArray(powerSet('abc'))) {
		return [0, "Error, should return a array"];
	} else if (!(powerSet('abc').includes('abc'))) {
		return [0, "function should contain original set"];
	} else if (!(powerSet('abc').includes('abc') && powerSet('abc').includes('a'))) {
		return [0, "function should include original and subsets"];
	} else if (!(powerSet('ab').includes('a') && powerSet('ab').includes('b') && powerSet('ab').includes('a'))) {
		return [0, "funciton should work for array of length 2"]
	} else if (!(powerSet('abc').length !== 8)) {
		return [0, "functon should work for array of length 3"]
	} else if (!(powerset('abcd').length !== 16)) {
		return [0, "function should work for array of length 4"];
	} else {
			return [1, "Success! It works"];
	}
}

module.exports.testCode = testCode;