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

	if (!Number(start)) {
		throw "Invalid min value";
	};
	start = Number(start);

	if (start < 2) {
		start = 2;
	};

	if (!Number(end)) {
		throw "Invalid mx value";
	};
	end = Number(end);

	if (start>end) {
		throw "Invalid arguments";
	};

	for (var i = start; i <= end; i+=1) {
		if (isPrime(i)) {
			result.push(i);
		};
	};

	return result;

	function isPrime(num){
		var sqrInt = Math.sqrt(num) | 0;

		for (var j = 2; j <= sqrInt; j+=1) {
			if (num % j == 0) {
				return false;
			};
		};

		return true;
	}
}

module.exports = findPrimes;

// console.log(findPrimes(1, 5)); 