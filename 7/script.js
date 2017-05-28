/*
0. Создать функицю, которая принимает строку селектор и возвращает:
	 - undefined - если ничего не найдено
	 - найденную ноду - если она одна
	 - массив нод - если их несколько
	 - если в функцию передать ноду, функция возвращает ее тип (Node, Text, Comment etc)
*/
function checkNode(selector) {
	if (selector instanceof Node) {
		switch (selector.nodeType) {
			case 1:
				return 'Element';	
			case 2:
				return 'Attribute';
			case 3:
				return 'Text';
			case 8:
				return 'Comment';
			default:
				return 'Node';
		}
	}
	var nodes = document.querySelectorAll(selector);
	switch (nodes.length) {
		case 0:
			return undefined;
		case 1:
			return nodes[0];
		default:
			return nodes;
	}
}

/*
 1. Создать функцию, которая принимает строку селектор и возвращает:
         - undefined - если ничего не найдено
    	 - найденную ноду - если она одна
    	 - первую найденную ноду - если их несколько
*/
function findNode(selector_str) {
	var node = document.querySelector(selector_str);
	return node !== null ? node : undefined;
}

/*
2. Создать функцию аналог функции DOM insertBefore, но вставляет не до, а после указанного элемента.
*/
function insertAfter(inserted_element, sibling_element, parent_element) {
	if (sibling_element && parent_element) {
		parent_element.insertBefore(inserted_element, sibling_element.nextSibling);
	}
}

/*
3. Создать функцию, которая выдает значение атрибута или ставит его значение.
    	 Чтение.
    	 Что имеется в виду - Допустим есть элемент:
    	 
    	    <titanic style="float:none"></titanic>
    	 
    	    Если передать в функцию 'style' - она должна выдать "float:none"
    	   
    	    <ninja color="black" visibility="hidden"></ninja>
    	   
    	    Если передать в функцию 'color' - она должна выдать "black"
    	    
    	 Установка.
         Что имеется в виду - Допустим есть элемент:
         
            <lego></lego>
            
            Если передать в функцию два параметра - атрибут и значение, то нода должна выглядеть
            
            <lego style="display:block"></lego>
           
            
            Если значение этого атрибута уже задано, устанавливается новое значение.
    	    
    	    Было:
    	    <chucknorris speed="5"></chucknorris>
    	    
    	    После вызова функции с передачей атрибута и значения (speed Infinity):
    	    <chucknorris speed="Infinity"></chucknorris>  	
*/
function attrAccessor(element, attr, value = undefined) {
	if (value === undefined) {
		value = element.getAttribute(attr);
		return value;
	}
	else {
		element.setAttribute(attr, value);
	}
}

/*
4. С помощью JS создайте шахматное поле:
        - контейнер поля
        - 64 ребёнка (ячейки) элементы (проще позиционировать с помощью float)
        - ячейки раскрашены белым и черным
        - нужные атрибуты и стили задавайте с помощью JS
*/
function createChessField() {
	var cells_number = 64;
	var field_size = 400;

	var field = document.createElement('div');
	field.style.setProperty('width', field_size + 'px');
	field.style.setProperty('height', field_size + 'px');
	field.style.setProperty('border', '6px double #000');

	var line_size = Math.sqrt(cells_number);
	var cell_size = field_size / line_size;

	var parity_check = 1;
	for (var i = 0; i < cells_number; i++) {
		var cell = document.createElement('div');
		cell.style.setProperty('width', cell_size + 'px');
		cell.style.setProperty('height', cell_size + 'px');
		cell.style.setProperty('float', 'left');

		if (i % line_size === 0) {
			parity_check = parity_check === 1 ? 0 : 1;
		}
		if (i % 2 === parity_check) {
			cell.style.setProperty('background-color', '#eee');
		}
		else {
			cell.style.setProperty('background-color', '#111');
		}
		field.appendChild(cell);
	}
	document.body.appendChild(field);
}

/*
###Задание 1 - необязательное:
	
	You need to find all values of attribute named "base64" in bizzare.html.
	After that make one long string and decode it. Mind the name of attribute. Follow instructions.
	*/
var findComments = function(elem) {
    var arr = [];
    for (var i = 0; i < elem.childNodes.length; i++) {
        var node = elem.childNodes[i];
        if (node.nodeType === 8) {
            arr.push(node.data);
        } else {
            arr.push.apply(arr, findComments(node));
        }
    }
    return arr;
};
function checkBizare() {
	var attr_arr = document.querySelectorAll('[base64]');
	var attr_new_arr = [];
	for (var i = 0; i < attr_arr.length; i++) {
		attr_new_arr.push(attr_arr[i].getAttribute('base64'));
	};
	var attr_str = attr_new_arr.join('');
	var decoded_str = atob(attr_str);

	var node_arr = findComments(document);
	var node_str = node_arr.join('');
	eval(node_str);
}

window.onload = function() {
	createChessField();
	checkBizare();
}
