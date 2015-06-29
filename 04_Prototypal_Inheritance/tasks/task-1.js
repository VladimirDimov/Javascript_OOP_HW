/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * use prototypal inheritance, without function constructors
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of the domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
 * property content of type string
 * sets the content of the element
 * works only if there are no children
 * property attributes
 * each attribute has name and value
 * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
 * property children
 * each child is a domElement or a string
 * property parent
 * parent is a domElement
 * method appendChild(domElement / string)
 * appends to the end of children list
 * method addAttribute(name, value)
 * throw Error if type is not valid
 * // method removeAttribute(attribute)
 */


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/

function solve() {
	if (!Array.prototype.find) {
		Array.prototype.find = function(predicate) {
			if (this == null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		};
	}

	var Validators = (function() {
		function validateType(str) {
			if (!(/^[a-zA-Z\d]+$/.test(str))) {
				throw new Error('Invalid type characters');
			};
		}

		function validateAttributeName(str) {
			if (!(/^[a-zA-Z\d\-]+$/.test(str))) {
				throw new Error('Invalid attribute characters');
			};
		}

		function validateString(str, variableName) {
			if (!str) {
				throw new Error('Missing string value. Variable: ' + variableName);
			};
			if (typeof(str) != 'string') {
				throw new Error('Invalid type of string. Variable: ' + variableName)
			};
			if (str = '') {
				throw new Error('Invalid empty string. Variable: ' + variableName);
			};
		}

		function validateDomElement(elem) {
			if (!elem) {
				throw new Error('Missing DOM element');
			};
		}

		function validateAttributes(att) {
			if (!att || (att.constructor.name != 'Attribute')) {
				throw new Error('Missing attribute')
			};
		}

		function validateValue(val) {

		}

		return {
			validateString: validateString,
			validateDomElement: validateDomElement,
			validateAttributes: validateAttributes,
			validateType: validateType,
			validateAttributeName: validateAttributeName,
			validateValue: validateValue
		}
	}());

	var Attribute = {
		init: function(name, value) {
			Validators.validateString(name, 'atribute name');
			Validators.validateAttributeName(name);
			this.name = name;
			this.value = value;
			return this;
		},
		getAttributeHTML: function() {
			return this.name + '="' + this.value + '"';
		}
	}

	var domElement = (function() {
		var domElement = {
			init: function(type) {
				Validators.validateString(type, 'DomElement type');
				Validators.validateType(type);

				this.type = type;
				this.children = [];
				this.attributes = [];
				this.parent = null;
				this.content = '';
				return this;
			},
			appendChild: function(child) {
				if (typeof(child) != 'string') {
					Validators.validateDomElement(child);
					child.parent = this;
				};

				this.children.push(child);
				return this;
			},
			addAttribute: function(name, value) {
				var index;
				if (this.attributes.some(function(el, i) {
					index = i;
					return el.name == name;
				})) {
					this.attributes[index].value = value;
				} else {
					this.attributes.push(Object.create(Attribute).init(name, value));
				};
				return this;
			},
			removeAttribute: function(attributeName) {
				var attributeIndex = this.attributes.find(function(element) {
					return element.name == attributeName;
				});

				if (attributeIndex) {
					this.attributes.splice(attributeIndex, 1);
					return this;
				} else {
					throw new Error('Attribute is missing');
				};
			},
			get innerHTML() {
				var result = '';
				var spaceBeforeAttributes = this.attributes.length == 0 ? '' : ' ';
				var attributesHtml = this.attributes.sort(function(a, b) {
					if (a.name < b.name) {
						return -1;
					} else if (a.name > b.name) {
						return 1;
					} else {
						return 0;
					};
				}).map(function(elem) {
					return elem.getAttributeHTML();
				}).join(' ');

				result += '<' + this.type + spaceBeforeAttributes + attributesHtml + '>';

				this.children.forEach(function(element) {
					if (typeof(element) != 'string') {
						result += element.innerHTML;
					} else {
						result += element;
					};
				});

				result += this.getContent();

				result += '</' + this.type + '>';

				return result;
			},
			getContent: function() {
				if (this.children.length != 0) {
					return '';
				} else {
					return this.content;
				};
			}
		};

		return domElement;
	}());

	return domElement;
}

try {
	var domElement = solve();
	// var meta = Object.create(domElement)
	// 	.init('meta')
	// 	.addAttribute('charset', 'utf-8')
	// 	.addAttribute('charset', 'utf-8');

	// var head = Object.create(domElement)
	// 	.init('head')
	// 	.appendChild(meta)

	// var div = Object.create(domElement)
	// 	.init('div')
	// 	.addAttribute('style', 'font-size: 42px');

	// div.content = 'Hello, world!';

	// var body = Object.create(domElement)
	// 	.init('body')
	// 	.appendChild(div)
	// 	.addAttribute('id', 'cuki')
	// 	.addAttribute('bgcolor', '#012345');

	// var root = Object.create(domElement)
	// 	.init('html')
	// 	.appendChild(head)
	// 	.appendChild(body);

	// var domElement = solve();
	// var root = Object.create(domElement)
	// 	.init('NqmaTakufTag')
	// 	.addAttribute('xyz', 'some value')
	// 	.addAttribute('zzz', '')
	// 	.addAttribute('abc', 'other value');

	// root.removeAttribute('xyz');

	var root = Object.create(domElement)
		.init('table')
		.addAttribute('style', 'something: beautiful')
		.removeAttribute('style');

	console.log(root.innerHTML);

} catch (err) {
	console.log(err);
}



module.exports = solve;