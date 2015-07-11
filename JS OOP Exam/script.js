function solve() {

	var module = (function() {

		var validators = {
			validateNumber: function(value, variableName) {
				variableName = variableName || 'Value';
				this.validateNonNullOrUndefined(value, variableName);
				if (typeof value !== 'number') {
					throw new Error(variableName + ' must be a number. Invalid value: ' + value);
				}
			},

			validateNonNullOrUndefined: function(value, variableName) {
				variableName = variableName || 'Value';
				if (value === undefined || value === null) {
					throw new Error(variableName + ' is null or undefined.');
				}
			},

			validateInteger: function(value, variableName) {
				variableName = variableName || 'Value';
				this.validateNumber(value, variableName);
				if (value % 1 !== 0) {
					throw new Error(variableName + ' is not an integer number. Invalid value: ' + value);
				}
			},

			validateNonEmptyString: function(value, variableName) {
				variableName = variableName || 'Value';
				this.validateNonNullOrUndefined(value, variableName);
				if (value === '') {
					throw new Error(variableName + ' is an empty string');
				}
			},

			validateIntegerInRange: function(value, variableName, minValue, maxValue) {
				variableName = variableName || 'Value';
				this.validateInteger(value, variableName);
				this.validateNumberInRange(value, variableName, minValue, maxValue);
			},

			validateNumberInRange: function(value, minValue, maxValue, variableName) {
				variableName = variableName || 'Value';

				this.validateNumber(value, variableName);

				if (value < minValue || maxValue < value) {
					throw new Error(variableName + ' must be in the range ' + minValue + ' to ' + maxValue + '. Invalid value: ' + value);
				}
			},

			validateNumberByMinValue: function(value, minValue, variableName) {
				variableName = variableName || 'Value';

				this.validateNumber(value, variableName);

				if (value < minValue) {
					throw new Error(variableName + ' must be greater than ' + minValue + '. Invalid value: ' + value);
				}
			},

			validateNumberByMaxValue: function(value, maxValue, variableName) {
				variableName = variableName || 'Value';

				this.validateNumber(value, variableName);

				if (value > maxValue) {
					throw new Error(variableName + ' must not be greater than ' + maxValue + '. Invalid value: ' + value);
				}
			},

			validateNonNegative: function(value, variableName) {
				variableName = variableName || 'Value';
				this.validateNumber(value, variableName);
				if (value < 0) {
					throw new Error(variableName + ' must not be less than zero. Invalid value: ' + value);
				}
			},

			validateNonEmptyObject: function(value, variableName) {
				this.validateNonNullOrUndefined(value, variableName);
				if (typeof value !== 'object') {
					throw new Error(variableName + ' must be an object. Invalid value: ' + value);
				}
			},

			validateStringByMinMaxLength: function(value, minLength, maxLength, variableName) {
				var len = value.length;
				this.validateNonEmptyString(value, variableName);
				if (len < minLength || len > maxLength) {
					throw new Error(variableName + ' must be a string with ' + minLength + ' to ' + maxLength + ' characters. Invalid number of characters: ' + len);
				}
			},

			isNullOrUndefined: function(value) {
				return (typeof(value) === 'undefined') || (value === null);
			}
		};

		var Item = (function() {
			var _lastId = 1;

			var Item = {
				init: function(name, description) {
					this.name = name;
					this.description = description;
					this.id = _lastId++;

					return this;
				},
				set name(value) {
					validators.validateStringByMinMaxLength(value, 2, 40, 'Item name');
					this._name = value;
				},
				get name() {
					return this._name;
				},
				set description(value) {
					validators.validateNonEmptyString(value);
					this._description = value;
				},
				get description() {
					return this._description;
				},
				set id(value) {
					validators.validateNumber(value);
					this._id = value;
				},
				get id() {
					return this._id;
				}
			};

			return Item;
		})();

		var Book = (function(parent) {
			var Book = Object.create(parent, {
				init: {
					value: function(name, description, isbn, genre) {
						parent.init.call(this, name, description);
						this.isbn = isbn;
						this.genre = genre;

						return this;
					}
				},
				isbn: {
					set: function(value) {
						validators.validateNonEmptyString(value, 'Book isbn');
						if (!(/^[0-9]+$/.test(value))) {
							throw new Error('Book isbn can contain only digits');
						}
						if (!(value.length === 10 || value.length === 13)) {
							throw new Error('Isbn length must be 10 or 13 characters');
						}
						this._isbn = value;
					},
					get: function() {
						return this._isbn;
					}
				},
				genre: {
					set: function(value) {
						validators.validateStringByMinMaxLength(value, 2, 20, 'Book genre');
						this._genre = value;
					},
					get: function() {
						return this._genre;
					}
				}
			});

			return Book;
		}(Item));

		var Media = (function(parent) {
			var Media = Object.create(Item, {
				init: {
					value: function(name, description, duration, rating) {
						parent.init.call(this, name, description);
						this.duration = duration;
						this.rating = rating;

						return this;
					}
				},
				duration: {
					set: function(value) {
						validators.validateNumber(value, 'Media duration');
						if (value <= 0) {
							throw new Error('Duration must be > 0');
						}
						this._duration = value;
					},
					get: function() {
						return this._duration;
					}
				},
				rating: {
					set: function(value) {
						validators.validateNumberInRange(value, 1, 5, 'Media rating');
						this._rating = value;
					},
					get: function() {
						return this._rating;
					}
				}
			});

			return Media;
		})(Item);

		var Catalog = (function() {
			var _lastId = 1;

			var Catalog = {
				init: function(name) {
					this.name = name;
					this.id = _lastId++;
					this._items = [];

					return this;
				},
				set name(value) {
					validators.validateStringByMinMaxLength(value, 2, 40, 'Catalog name');
					this._name = value;
				},
				get name() {
					return this._name;
				},
				set id(value) {
					validators.validateNumber(value);
					this._id = value;
				},
				get id() {
					return this._id;
				},
				addArrayOfItems: function() {
					var array = arguments[0];
					for (var i in array) {
						if (!Item.isPrototypeOf(array[i]) && (!array[i].name || !array[i].id || !array[i].description)) {
							throw new Error('Invalid Item argument');
						}
						var repeatedId = this._items.filter(function(elem) {
							return elem.id === array[i].id;
						})
						if (repeatedId.length !== 0) {
							throw new Error('Item with that id already added');
						}
					}

					this._items.push(array);
				},

				add: function() {
					if (!arguments[0]) {
						throw new Error('Catalog.add must have arguments');
					}
					if (Object.prototype.toString.call(arguments[0]) === '[object Array]') {
						if (arguments[0].length === 0) {
							throw new Erro('Array of arguments cannot be empty');
						}

						this.addArrayOfItems(arguments[0]);
					} else {
						var passedArray = [];
						for (var i in arguments) {
							passedArray.push(i);
						}
						this.addArrayOfItems(passedArray);
					}
				},

				find: function(value) {
					if (typeof value === 'object') {
						return this.findOptions(value);
					}
					validators.validateNumber(value);
					return getObjectFromCollectionById(this._items, value);
				},

				findOptions: function(value) {
					var keys = Object.keys(value);

					var selectedItems = this._items.filter(function(item) {
						for (var i in keys) {
							if (item[keys[i]] !== value[keys[i]]) {
								return false;
							}
							return true;
						}
					});

					return selectedItems || [];
				},
				search: function(pattern) {
					var selection = [];
					selection = this._items.filter(function(item) {
						return item.name.indexOf(pattern) >= 0 ||
							item.description.indexOf(pattern) >= 0;
					});

					return selection;
				}
			};

			function getObjectFromCollectionById(collection, value) {
				for (var index in collection) {
					if (collection[index].id === value) {
						return collection[index];
					}
				}

				return null;
			}

			return Catalog;
		})();

		var BookCatalog = (function(parent) {
			var BookCatalog = Object.create(Catalog, {
				init: {
					value: function(name) {
						parent.init.call(this, name);

						return this;
					}
				},
				add: {
					value: function() {
						if (arguments.length === 0) {
							throw new Error('Catalog.add must have arguments');
						}
						if (Object.prototype.toString.call(arguments[0]) === '[object Array]') {
							var len = arguments[0].length,
								arr = arguments[0];

							for (var i = 0; i < len; i++) {
								if (!Book.isPrototypeOf(arr[i])) {
									throw new Error('Invalid book argument');
								}
							}

							parent.add.apply(this, arguments[0]);
						} else {
							for (var i in arguments) {
								if (!Book.isPrototypeOf(arguments[i])) {
									throw new Error('Invalid book argument');
								}

								var passedArray = [];
								for (var i in arguments) {
									passedArray.push(arguments[i]);
								}
								parent.add.call(this, passedArray);
							}
						}
					}
				},
				getGenres: {
					value: function() {
						var selectedGenres = [];
						this._items.forEach(function(element) {
							if (selectedGenres.indexOf(element.genre) < 0) {
								selectedGenres.push(element.genre);
							}
						});

						return selectedGenres.sort();
					}
				}
			});

			return BookCatalog;
		})(Catalog);

		var MediaCatalog = (function(parent) {
			var MediaCatalog = Object.create(Catalog, {
				init: {
					value: function(name) {
						parent.init.call(this, name);

						return this;
					}
				},
				add: {
					value: function() {
						if (arguments.length === 0) {
							throw new Error('Media.add must have arguments');
						}
						if (Object.prototype.toString.call(arguments[0]) === '[object Array]') {
							var len = arguments[0].length,
								arr = arguments[0];

							for (var i = 0; i < len; i++) {
								if (!Media.isPrototypeOf(arr[i])) {
									throw new Error('Invalid media argument');
								}
							}

							parent.add.apply(this, arguments[0]);
						} else {
							for (var i in arguments) {
								if (!Media.isPrototypeOf(arguments[i])) {
									throw new Error('Invalid media argument');
								}

								var passedArray = [];
								for (var i in arguments) {
									passedArray.push(arguments[i]);
								}
								parent.add.call(this, passedArray);
							}
						}
					}
				},
				getTop: {
					value: function(count) {
						var sortedItems;
						validators.validateNumberByMinValue(count, 1, 'Get top count');
						count = Math.min(count, this._items.length);
						sortedItems = this._items.sort(function(a, b) {
							return b.rating - a.rating;
						});

						return sortedItems.slice(0, count);
					}
				}
			});

			return MediaCatalog;
		})(Catalog);

		return {
			getBook: function(name, isbn, genre, description) {
				return Object.create(Book).init(name, description, isbn, genre);
			},
			getMedia: function(name, rating, duration, description) {
				return Object.create(Media).init(name, description, duration, rating);
			},
			getBookCatalog: function(name) {
				return Object.create(BookCatalog).init(name);
			},
			getMediaCatalog: function(name) {
				return Object.create(MediaCatalog).init(name);
			}
		};
	})();

	return module;
}

var module = solve();

var books = [];
for (var i = 1; i < 5; i++) {
	books.push(module.getBook('Name' + i,'1234567890', 'genre', 'description ' + i));
}

var medias = [];
for (var i = 1; i < 5; i++) {
	medias.push(module.getMedia('Name' + i, 2 + i / 20, i, 'description ' + i));
}

var bookCat = module.getBookCatalog('Book Cat 1');
bookCat.add(books[0], books[1]);


var mediaCat = module.getMediaCatalog('Media Cat 1');
mediaCat.add(medias[0], medias[1]);


var newBook = module.getBook('as', '1234567890', 'as', 'ad');

debugger;