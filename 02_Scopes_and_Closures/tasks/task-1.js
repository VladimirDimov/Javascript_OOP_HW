/* Task Description */
/* 
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */
function solve() {
	var library = (function() {
		var books = [];
		var categories = [];
		var bookID = 0;
		var categoryID = 0;

		var Book = (function() {
			function Book(newbook) {
				// Validating title;
				if (!newbook.title) {
					throw Error('Title is missing');
				};
				var titleLen = newbook.title.length;
				if (titleLen < 2 || titleLen > 100) {
					throw Error('Title must be between 2 and 100 characters long.');
				};
				this.title = newbook.title;

				// Validating author
				if (!newbook.author || newbook.author.length == 0) {
					throw Error('Author is missing.');
				};
				this.author = newbook.author;

				// Validating ISBN
				var isbnLen = newbook.isbn.length;
				if (!newbook.isbn || !(isbnLen == 10 || isbnLen == 13)) {
					throw Error('Invalid or missing ISBN');
				};
				this.isbn = newbook.isbn;
				this.ID = ++bookID;
				this.category = newbook.category;
			}

			return Book;
		}());

		var Category = (function() {
			function Category(name) {
				var nameLen = name.length;

				if (nameLen < 2 || nameLen > 100) {
					throw Error('Inavlid Category name.')
				};
				this.name = name;
				this.ID = ++categoryID;
				this.books = [];
			}

			return Category;
		}());

		function listBooks(filterByProp) {
			var selection = books;

			if (filterByProp) {
				selection = books.filter(function(curBook) {
					var keys = Object.keys(filterByProp);
					for(var prop in filterByProp){
						if (curBook[prop] != filterByProp[prop]) {
							return false;
						};
					}
					return true;
				});
			};

			if (!selection) {
				selection = []
			};

			return selection.sort(function(a, b) {
				a.ID - b.ID;
			});
		}

		function addBook(book) {

			books.forEach(function(element, index) {
				if (element.title == book.title ||
					element.isbn == book.isbn) {
					throw Error('Title or isbn already exist');
				};
			});

			var addedBook = new Book(book);
			books.push(addedBook);
			var curCategory = book.category;
			var categoryIndex;

			if (categories.some(function(element, index) {
					categoryIndex = index;
					return element.name == curCategory;
				})) {
				categories[categoryIndex].books.push(addedBook);
			} else {
				categories.push(new Category(curCategory));
			};

			return addedBook;
		}

		function listCategories() {
			return categories.sort(function(a, b) {
				return a.ID - b.ID;
			}).map(function(element) {
				return element.name;
			});
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());
	return library;
}

// function test1() {
// 	var library = new solve();
// 	var book = library.books.add({
// 		title: 'CONSTS.VALID.BOOK_TITLE',
// 		isbn: '1234567890',
// 		author: 'CONSTS.VALID.AUTHOR',
// 		category: 'CONSTS.VALID.CATEGORY'
// 	});

// 	var result = library.books.list({category: book.category});
// 	debugger;
// }
// test1();

module.exports = solve;

// 100 %