/* Task description */
/*
	Write a function a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `string`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(start, end) {
	var i, j,
		result = [];

	start = Number(start);
	if (isNaN(start)) {
		throw Error("Invalid min value");
	};

	if (start < 2) {
		start = 2;
	};

	end = Number(end);
	if (isNaN(end)) {
		throw Error("Invalid mx value");
	};

	if (start > end) {
		throw Error("Invalid arguments");
	};

	for (var i = start; i <= end; i += 1) {
		if (isPrime(i)) {
			result.push(i);
		};
	};

	return result;

	function isPrime(num) {
		var sqrInt = Math.sqrt(num) | 0;

		for (var j = 2; j <= sqrInt; j += 1) {
			if (num % j == 0) {
				return false;
			};
		};

		return true;
	}
}

module.exports = findPrimes;

// console.log(findPrimes('1', '5'));