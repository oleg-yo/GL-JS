var M = {},
	V = {},
	C = {};

/*
	- Model loads data from backend http
	- View creates new cards, sets data to cards and makes the animation
	- Controller watches for events (buttons pressed), calls Model's requests,
	waits data from Model, transfers it to View
*/

M.cards_amount = -1;
M.card_params = ['Name', 'Height', 'Mass', 'Hair color', 'Skin color', 'Eye color', 'Birth year', 'Gender'];
M.current_card_id = 1;
M.current_card_data = {};
M.current_card_films_url = [];
M.current_card_films = {};
// loading amount of all cards
M.loadCardsAmount = function () {
	return fetch('http://swapi.co/api/people/')
	.then((response) => response.json())
	.then((response) => M.cards_amount = response.count)
}
// loading main information 
M.loadCardData = function (card_id) {
	M.current_card_data = {};
	M.current_card_films_url = [];
	M.current_card_films = {};

	return fetch('http://swapi.co/api/people/' + card_id)
	.then((response) => response.json())
	.then(function (response) {
		for (var i = 0; i < M.card_params.length; i++) {
			var key = M.card_params[i].toLowerCase().replace(' ', '_');
			var value = response[key].charAt(0).toUpperCase() + response[key].slice(1); // capitalize first letter
			M.current_card_data[M.card_params[i]] = value;
		}
		M.current_card_films_url = response.films;
	})
	.catch(() => M.current_card_data['Info'] = 'Sorry, no data for this hero');
}
// loading one film
M.loadCardFilms = function(film_url, this_card_id) {
	return fetch(film_url)
	.then((response) => response.json())
	.then(function (response) {
		// check if this film belongs to this card (film's loading can be too long)
		if (this_card_id === M.current_card_id) {
			M.current_card_films['Episode ' + response.episode_id] = response.title;
		}
	})
}

V.createCard = function (card_id) {
	var card = document.createElement('div');
	card.classList.add('card');
	card.setAttribute('card_id', card_id);

		var card_title = document.createElement('h1');
		card_title.classList.add('card_title');
		card_title.innerText = 'Star Wars Heroes';

		var card_column_1 = document.createElement('div');
		card_column_1.classList.add('card_column');
		var card_column_2 = card_column_1.cloneNode(false);
		var card_column_3 = card_column_1.cloneNode(false);

			var card_avatar = document.createElement('img');
			card_avatar.classList.add('card_avatar');
			card_avatar.src = 'images/avatar.jpg';

			var card_buttons = document.createElement('div');
			card_buttons.classList.add('card_buttons');

				var button_prev = document.createElement('div');
				button_prev.classList.add('card_button');
				var button_next = button_prev.cloneNode(false);
				button_prev.innerText = 'Prev';
				button_next.innerText = 'Next';

				card_buttons.appendChild(button_prev);
				card_buttons.appendChild(button_next);

			card_column_1.appendChild(card_avatar);
			card_column_1.appendChild(card_buttons);

				var loading_bowl = document.createElement('div');
				loading_bowl.innerHTML = '<div class="bowl_ringG">'
					+ '<div class="ball_holderG">'
						+ '<div class="ballG"></div>'
					+ '</div>'
				+ '</div>';
				loading_bowl.classList.add('loading_bowl');

			card_column_2.appendChild(loading_bowl);
			card_column_3.appendChild(loading_bowl.cloneNode(true));

		card.appendChild(card_title);
		card.appendChild(card_column_1);
		card.appendChild(card_column_2);
		card.appendChild(card_column_3);

	document.body.appendChild(card);
	return card;
}
V.setData = function (card, data, column_number) {
	var card_column = card.getElementsByClassName('card_column')[column_number-1];

	var description_fragment = document.createDocumentFragment();
	for (var key in data) {
		var info_block = document.createElement('div');
		info_block.innerText = key + ': ' + data[key];
		description_fragment.appendChild(info_block);
	}

	card_column.getElementsByClassName('loading_bowl')[0].style.display = 'none';
	card_column.appendChild(description_fragment);
}
V.changeCard = function (old_card, direction) {
	var last_card_id = old_card.getAttribute('card_id');
	var new_card_id = parseInt(last_card_id) + (direction === 'Next' ? 1 : -1);
	var angle = direction === 'Next' ? 72 : -72;

	var new_card = V.createCard(new_card_id);
	new_card.style.transform = 'rotateY(' + angle + 'deg)';
	new_card.style.visibility = 'hidden';

	old_card.style.transform = 'rotateY(' + (-1 * angle) + 'deg)';
	setTimeout(function() {
		new_card.style.visibility = 'visible';
		setTimeout(function() {
			new_card.style.transform = "rotateY(0deg)";
		}, 50);
	}, 200);
	setTimeout(function() {
		document.body.removeChild(old_card);
	}, 600);
	return new_card;
}

C.runOnload = function () {
	var card = V.createCard(M.current_card_id);
	card.getElementsByClassName('card_buttons')[0].addEventListener('click', C.changeCard);

	M.loadCardsAmount()
	.then(() => C.loadData(M.current_card_id, card))
	
	document.addEventListener('keydown', function (event) {
		switch (event.keyCode) {
			case 37:
				document.getElementsByClassName('card_button')[0].click();
				break;
			case 39:
				document.getElementsByClassName('card_button')[1].click();
				break;
		}
	});
}
C.loadData = function(card_id, card) {
	M.loadCardData(card_id)
	.then(function () {
		V.setData(card, M.current_card_data, 2);
		if (M.current_card_films_url.length === 0) {
			V.setData(card, {}, 3);
		}
		else {
			M.current_card_films_url.forEach(function (film_url) {
				M.loadCardFilms(film_url, card_id)
				.then(function() {
					if (Object.keys(M.current_card_films).length === M.current_card_films_url.length) { 
						V.setData(card, M.current_card_films, 3);
					}
				})
			})
		}
	})
}
C.changeCard = function(event) {
	if (document.getElementsByClassName('card').length > 1) {
		return;
	}
	var old_card = document.getElementsByClassName('card')[0];
	var last_card_id = old_card.getAttribute('card_id');

	var button = event.target;
	var direction = button.innerText;
	var new_card_id = parseInt(last_card_id) + (direction === 'Next' ? 1 : -1);

	if (new_card_id < 1 || 
		new_card_id > M.cards_amount && M.cards_amount !== -1) {
		return;
	}
	button.removeEventListener('click', C.changeCard);

	var new_card = V.changeCard(old_card, direction);
	new_card.getElementsByClassName('card_buttons')[0].addEventListener('click', C.changeCard);

	M.current_card_id = new_card_id;
	C.loadData(new_card_id, new_card)
}

window.onload = C.runOnload();