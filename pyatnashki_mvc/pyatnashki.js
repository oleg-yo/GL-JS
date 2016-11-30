var M = {
	blocks_amount: 16,
	blocks_list: [],
	generateRandomBlocks: function() {
		localStorage.removeItem("pyatnashki_blocks_list");

		var numbers_amount = this.blocks_amount - 1;
		var list = [];
		for (var i = 0; i < numbers_amount; i++) {
			list[i] = 0;
		}
		for (var i = 1; i <= numbers_amount; i++) {
			var rand_pos;
			do {
				rand_pos = Math.floor(Math.random()*numbers_amount);
			} while (list[rand_pos]);
			list[rand_pos] = i;
		}
		list.push('');
		this.blocks_list = list;
	},
	saveGame: function(list) {
		this.blocks_list = list;
		localStorage.setItem("pyatnashki_blocks_list", JSON.stringify(this.blocks_list));
	},
	loadGame: function() {
		var data = localStorage.getItem("pyatnashki_blocks_list");
		data = JSON.parse(data);
		if (data.length === this.blocks_amount) {
			this.blocks_list = data;
		}
		else {
			this.generateRandomBlocks();
		}
	}
}

var V = {
	blockMovedEventListener: {},
	createGameBlock: function(newGameEvent, loadGameEvent) {
		var game_field = document.createElement('div');
		game_field.classList.add('battle-field');

		var top_button = document.createElement('div');
		top_button.classList.add('gameButton');
		top_button.innerText = 'New game';
		top_button.addEventListener('click', newGameEvent);

		var bottom_button = document.createElement('div');
		bottom_button.classList.add('gameButton');
		bottom_button.innerText = 'Load game';
		bottom_button.addEventListener('click', loadGameEvent);

		game_field.appendChild(top_button);
		game_field.appendChild(bottom_button);

		document.body.appendChild(game_field);
	},
	createGameField: function(block_numbers, blockMovedEvent) {
		var game_field = document.getElementsByClassName('battle-field')[0];
		while (game_field.firstElementChild) {
			game_field.removeChild(game_field.firstElementChild);
		}
		
		var blocks_amount = block_numbers.length;
		var block_size = (game_field.offsetWidth-blocks_amount*1) / Math.sqrt(blocks_amount);

		for (var i = 0; i < blocks_amount; i++) {
			var block = document.createElement('div');
			block.className += 'gameBlock';
			block.style.setProperty('width', block_size + 'px');
			block.style.setProperty('height', block_size + 'px');
			block.style.setProperty('line-height', block_size + 'px');
			if (block_numbers[i] === '') {
				block.style.setProperty('border', '1px solid transparent');
			}
			block.innerText = block_numbers[i];

			game_field.appendChild(block);
			this.checkPosition(block);
		}
		this.blockMovedEventListener = blockMovedEvent;
		game_field.addEventListener('click', blockMovedEvent);
	},
	getNumbersList: function() {
		var list = [];
		var game_field = document.getElementsByClassName('battle-field')[0];
		var blocks = game_field.children;
		for (var i = 0; i < blocks.length; i++) {
			list.push(blocks[i].innerText);
		}
		return list;
	},
	moveBlock: function(this_block, blocks_amount) {
		var vertical_sibling_num = Math.sqrt(blocks_amount);
		var siblings = [];
		this.takeBlockSibling(siblings, this_block, 1, true);
		this.takeBlockSibling(siblings, this_block, vertical_sibling_num, false);
		this.takeBlockSibling(siblings, this_block, vertical_sibling_num, true);
		this.takeBlockSibling(siblings, this_block, 1, false);
		for (var i = 0; i < siblings.length; i++) {
			if (siblings[i].innerText === '') {
				siblings[i].innerText = this_block.innerText;
				siblings[i].style.setProperty('border', '1px solid black');
				this_block.innerText = '';
				this_block.style.setProperty('border', '1px solid transparent');

				this.checkPosition(this_block);
				this.checkPosition(siblings[i]);
				break;
			}
		}
	},
	takeBlockSibling: function(array, block, number, next_bool) {
		var direction_sibling = next_bool ? 'nextSibling' : 'previousSibling';
		for (var i = 0; i < number; i++) {
			if (block[direction_sibling]) {
				block = block[direction_sibling];
			}
			else {
				return;
			}
		}
		array.push(block);
	},
	checkPosition: function(block) {
		if (block.innerText == '') {
			block.style.setProperty('background-color', 'transparent');
			return;
		}
		var current_pos = 1;
		var counter_sibling = block;
		while ((counter_sibling = counter_sibling.previousSibling) != null ) {
			current_pos++;
		};
		block.style.setProperty('background-color', 
			'rgba' + (current_pos == block.innerText ? '(0, 255, 0, .2)' : '(255, 0, 0, .2)'));
	},
	checkWin: function() {
		var game_field = document.getElementsByClassName('battle-field')[0];
		var blocks = game_field.children;
		for (var i = 0; i < blocks.length-1; i++) {
			if (blocks[i].innerText != i+1) {
				return;
			}
		}
		game_field.removeEventListener('click', this.blockMovedEventListener);
		alert('Well played :)');
	}
}

var C = {
	runOnload: function() {
		V.createGameBlock(C.newGame, C.loadGame);
	},
	newGame: function() {
		M.generateRandomBlocks();
		V.createGameField(M.blocks_list, C.blockMovedEvent);
	},
	loadGame: function() {
		M.loadGame();
		V.createGameField(M.blocks_list, C.blockMovedEvent);
	},
	blockMovedEvent: function(event) {
		var this_block = event.target;
		if (!this_block.classList.contains("gameBlock")) {
			return;
		}
		V.moveBlock(this_block, M.blocks_amount);
		M.saveGame(V.getNumbersList());

		setTimeout(function() {
			V.checkWin(this_block.parentElement);
		}, 500);
	}
}

window.onload = C.runOnload(); 