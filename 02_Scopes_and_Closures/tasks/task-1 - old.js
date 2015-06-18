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
	var Library = (function() {
			function Library() {
				var books = [];
				var categories = [];

				function listBooks() {
					return books;
				}

				function addBook(book) {
					book.ID = books.length + 1;
					books.push(book);
					return book;
				}

				function listCategories() {
					return categories;
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
			};
		return Library;
	}());

var Book = (function() {
	function Book(title, author, isbn) {
		// Validating title;
		if (!title) {
			throw Error('Title is missing');
		};
		var titleLen = title.length;
		if (titleLen < 2 || titleLen > 100) {
			throw Error('Title must be between 2 and 100 characters long.');
		};
		this.Title = title;

		// Validating author
		if (!author || author.length == 0) {
			throw Error('Author is missing.');
		};
		this.Author = author;

		// Validating ISBN
		var isbnLen = isbn.length;
		if (!isbn || !(isbnLen == 10 || sibnLen == 13)) {
			throw Error('Invalid or missing ISBN');
		};
		this.ISBN = isbn;
	}

	return Book;
}());

// Testing
// var myLibrary = new Library();
// var testBook1 = new Book('The life of Pesho', 'Gosho', '123456789a');
// var testBook2 = new Book('Razkazi ot Pencho', 'Gencho', '23456789xq')
// myLibrary.books.add(testBook1);
// myLibrary.books.add(testBook2);

// console.log(myLibrary.books.list());


// debugger;
// }
// solve();
module.exports = solve;