/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

		*/

function sum(array) {
	var result = 0;
	if (array == undefined) {
		throw "Array missing";
	};

	if (array.length == 0) {
		return null;
	};

	array.forEach(function(element, index) {
		if (Number(element)) {
			result += Number(element);
		} else {
			throw "Error";
		};
	});

	return result;
}

module.exports = sum;

/*
function solve () { 
    return function (arr) { 
        // your solution for arr 
    } 
}
 */