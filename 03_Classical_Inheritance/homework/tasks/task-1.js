/* Task Description */
/*
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function() {
		function Person(firstname, lastname, age) {			
			// Validate first name
			if (!firstname) {
				throw Error('Missing first name!');
			}
			if (!isValidName(firstname)) {
				throw Error('Invalid first name!')
			}
			this.firstname = firstname;

			// Validate last name
			if (!lastname) {
				throw Error('Missing last name!');
			}
			if (!isValidName(lastname)) {
				throw Error('Invalid last name!')
			}
			this.lastname = lastname;

			// validating age
			if (isNaN(age)) {
				throw Error('Invalid age');
			}
			age = parseInt(age);
			if (age < 0 || age > 150) {
				throw Error('Age must be in the range 0 to 150.');
			}
			this.age = age;
		}

		//Full name
		Object.defineProperty(Person.prototype, 'fullname', {
			get: function() {
				return this.firstname + ' ' + this.lastname;
			},
			set: function(name) {
				var names = name.split(/\s+/);
				if (!isValidName(names[0])) {
					throw Error('Invalid first name');
				};
				this.firstname = names[0];

				if (!isValidName(names[1])) {					
					throw Error('Invalid last name');
				};	
				this.lastname = names[1];			
			}
		});

		Person.prototype.introduce = function() {
			return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
		}

		function isValidName(name){
			return /\b[A-Z]{1}[a-z]{2,19}\b/.test(name);
		}
		return Person;
	}());
	// var pesho = new Person('Petar', 'Petrov', 25);
	// console.log(pesho.firstname);
	// console.log(pesho.lastname);

	// var pencho = new Person('Pencho', 'Penev', 34);
	// pencho.fullName = 'Barbarn Barbaronov';
	// console.log(pencho.introduce());

	// debugger;

	return Person;
}
// solve();
module.exports = solve;

// 100%