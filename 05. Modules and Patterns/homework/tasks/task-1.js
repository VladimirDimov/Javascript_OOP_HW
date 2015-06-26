/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
	var lastId = 1;

	var Validators = {
		validateTitle: function(title) {
			if (!(/^([^ ]+(\s{1})?[^ ]+)+$/.test(title))) {
				throw Error('Invalid title');
			};
		},
		validateNonEmptyArray: function(arr) {
			if (!Array.isArray(arr)) {
				throw new Error('Invalid array argument');
			};
			if (arr.length == 0) {
				throw new Error('Invalid empty array');
			};
		},
		validatePersonName: function(name) {
			if (!name) {
				throw new Error('Missing name');
			};
			if (!(/^[A-Z]{1}[a-z]*$/.test(name))) {
				throw new Error('Invalid name format');
			};
		},
		validateIdFormat: function(id) {
			if (!id) {
				throw new Error('Missing homework id');
			};
			if (isNaN(id)) {
				throw new Error('Homework id must be a number');
			};
		}
	};
	var Student = (function() {
		var Student = {
			init: function(name) {
				var names;
				names = parseNames(name);
				this.firstname = names[0];
				this.lastname = names[1];
				this.id = generateId();
				return this;
			},
			toString: function() {
				return 'firstname: ' + this.firstname +
					', lastname: ' + this.lastname +
					', id: ' + this.id;
			}
		}

		function parseNames(name) {
			var names = name.split(' ');
			if (names.length != 2) {
				throw new Error('Student must have two names');
			};
			Validators.validatePersonName(names[0]);
			Validators.validatePersonName(names[1]);

			return names;
		}

		function generateId() {
			return lastId++;
		}

		return Student;
	}());


	var newCourse = (function() {
		var Course = {
			init: function(title, presentations) {
				this.title = title;
				this.presentations = presentations;
				this._students = [];
				return this;
			},
			addStudent: function(name) {
				this._students.push(Object.create(Student).init(name));
				return lastId - 1;
			},
			getAllStudents: function() {
				return this._students;
			},
			submitHomework: function(studentID, homeworkID) {
				Validators.validateIdFormat(studentID);
				Validators.validateIdFormat(homeworkID);
				isExistingStudentId.call(this, studentID);
				isExistingHomeworkId.call(this, homeworkID);
			},
			pushExamResults: function(results) {},
			getTopStudents: function() {}
		};

		Object.defineProperty(Course, 'title', {
			get: function() {
				return this._title;
			},
			set: function(value) {
				Validators.validateTitle(value);
				this._title = value;
			}
		});

		Object.defineProperty(Course, 'presentations', {
			get: function() {
				return this._presentations;
			},
			set: function(value) {
				Validators.validateNonEmptyArray(value);
				value.forEach(function(element) {
					Validators.validateTitle(element);
				});

				this._presentations = value;
			}
		});

		function isExistingHomeworkId(id) {
			id = Number(id);
			if (id < 1 || id > this.presentations.length) {
				throw new Error('Homework id is out of range');
			};
		}

		function isExistingStudentId(id) {
			id = Number(id);
			if (!this._students.some(function(element) {
					return element.id === id;
				})) {
				throw new Error('Not existing student id');
			};
		}

		return Course;
	}());

	return newCourse;
}

var Course = solve;
var mycourse = Course()
	.init('Asfsdfasdf', ['Valid presentation', 'asdfasdfasdf']);
mycourse.addStudent('Pesho Petrov');
mycourse.addStudent('Penka Pencheva');
mycourse.addStudent('Adfdfxb Fdfgdfbg');
mycourse.addStudent('Fsdfsd Pencheva');
mycourse.addStudent('Ssdfsdf Gsdfsdf');

var testId = mycourse.addStudent('Qsdfsdf Tasdasd');

mycourse.submitHomework(testId, 1);
mycourse.submitHomework(2, 2);

console.log(mycourse.getAllStudents());



module.exports = solve;