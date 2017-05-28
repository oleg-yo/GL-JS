function getBookById(id) {
	document.getElementById('book').textContent = 'Please wait. Book is loading';

	fetch('api/books/' + id)
	.then(response => document.getElementById('book').textContent = response.name,
		() => document.getElementById('book').textContent = 'Error. Please refresh your browser')
}

function loadPage(bookId) {
	document.getElementById('book').textContent = 'Please wait. Book is loading';
	document.getElementById('author').textContent = 'Please wait. Author details are loading';
	document.getElementById('similar').textContent = 'Please wait. Similar books are loading';

	var similarBooksLoaded = 0;

	fetch('api/books/' + bookId)
	.then(function (response) {
		document.getElementById('book').textContent = response.name;
		return fetch('api/autors' + response.authorId);
	})
	.catch(() => document.getElementById('book').textContent = 'Error. Please refresh your browser')
	.then(function (response) {
		document.getElementById('author').textContent = response.name;
		var similarBooksLoaded = 0;
		var similarBooksAmount = response.books.lenght;

		response.books.forEach(function(similarBookId) {
			fetch('api/bestsellers/similar/' + similarBookId)
			.then(function (response) {
				var p = document.getElementById('similar').appendChild('p').textContent = response;
				similarBooksLoaded += 1;
				if (similarBooksLoaded === similarBooksAmount) {
					alert('Horray everything loaded');
				}
			})
			.catch(() => document.getElementById('similar').textContent = 'Error. Please refresh your browser')
		}
	})
	.catch(() => document.getElementById('author').textContent = 'Error. Please refresh your browser')
}