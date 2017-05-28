window.onload = function() {
	var clickable_elements = document.getElementsByClassName('battle-field');
	for (var i = 0; i < clickable_elements.length; i++) {
		clickable_elements[i].addEventListener('click', createGame);
	}
}
var blocks_amount = 16;

function createGame(event) {
	var target_element = event.target;
	if (target_element.getAttribute('busy')) {
		return;
	}
	target_element.innerText = '';
	target_element.setAttribute('busy', true);
	target_element.removeEventListener('click', createGame);
	var block_size = (target_element.offsetWidth-blocks_amount*1) / Math.sqrt(blocks_amount);
	
	var block_numbers = generateRandomList(blocks_amount-1);
	block_numbers.push('');

	for (var i = 0; i < blocks_amount; i++) {
		var block = document.createElement('div');
		block.className += 'gameBlock';
		block.style.setProperty('width', block_size + 'px');
		block.style.setProperty('height', block_size + 'px');
		block.style.setProperty('line-height', block_size + 'px');
		if (i === blocks_amount-1) {
			block.style.setProperty('border', '1px solid transparent');
		}
		block.innerText = block_numbers[i];
		block.addEventListener('click', moveBlock);

		target_element.appendChild(block);
		checkPosition(block);
	}
}
function generateRandomList(amount) {
	var list = [];
	for (var i = 0; i < amount; i++) {
		list[i] = 0;
	}
	for (var i = 1; i <= amount; i++) {
		var rand_pos;
		do {
			rand_pos = Math.floor(Math.random()*amount);
		} while (list[rand_pos]);
		list[rand_pos] = i;
	}
	return list;
}
function moveBlock(event) {
	var this_block = event.target;
	var vertical_sibling_num = Math.sqrt(blocks_amount);
	var siblings = [];
	takeBlockSibling(siblings, this_block, 1, true);
	takeBlockSibling(siblings, this_block, vertical_sibling_num, false);
	takeBlockSibling(siblings, this_block, vertical_sibling_num, true);
	takeBlockSibling(siblings, this_block, 1, false);
	for (var i = 0; i < siblings.length; i++) {
		if (siblings[i].innerText === '') {
			siblings[i].innerText = this_block.innerText;
			siblings[i].style.setProperty('border', '1px solid black');
			this_block.innerText = '';
			this_block.style.setProperty('border', '1px solid transparent');

			checkPosition(this_block);
			checkPosition(siblings[i]);
			break;
		}
	}
	checkWin(this_block.parentElement);
}
function takeBlockSibling(array, block, number, next_bool) {
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
}
function checkPosition(block) {
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
}
function checkWin(game_field) {
	var blocks = game_field.children;
	for (var i = 0; i < blocks.length-1; i++) {
		if (blocks[i].innerText != i+1) {
			return;
		}
	}
	for (var i = 0; i < blocks.length-1; i++) {
		blocks[i].removeEventListener('click', moveBlock);
	}
	alert('Well played :)');
}