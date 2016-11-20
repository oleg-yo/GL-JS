/*
 1. Создать функцию, которая принимает строку селектор и возвращает:
         - undefined - если ничего не найдено
    	 - найденную ноду - если она одна
    	 - первую найденную ноду - если их несколько
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
 1. Ñîçäàòü ôóíêöèþ, êîòîðàÿ ïðèíèìàåò ñòðîêó ñåëåêòîð è âîçâðàùàåò:
         - undefined - åñëè íè÷åãî íå íàéäåíî
    	 - íàéäåííóþ íîäó - åñëè îíà îäíà
    	 - ïåðâóþ íàéäåííóþ íîäó - åñëè èõ íåñêîëüêî
*/
function findNode(selector_str) {
	var node = document.querySelector(selector_str);
	return node !== null ? node : undefined;
}

/*
2. Ñîçäàòü ôóíêöèþ àíàëîã ôóíêöèè DOM insertBefore, íî âñòàâëÿåò íå äî, à ïîñëå óêàçàííîãî ýëåìåíòà.
*/
function insertAfter(inserted_element, sibling_element, parent_element) {
	if (sibling_element && parent_element) {
		parent_element.insertBefore(inserted_element, sibling_element.nextSibling);
	}
}

/*
3. Ñîçäàòü ôóíêöèþ, êîòîðàÿ âûäàåò çíà÷åíèå àòðèáóòà èëè ñòàâèò åãî çíà÷åíèå.
    	 ×òåíèå.
    	 ×òî èìååòñÿ â âèäó - Äîïóñòèì åñòü ýëåìåíò:
    	 
    	    <titanic style="float:none"></titanic>
    	 
    	    Åñëè ïåðåäàòü â ôóíêöèþ 'style' - îíà äîëæíà âûäàòü "float:none"
    	   
    	    <ninja color="black" visibility="hidden"></ninja>
    	   
    	    Åñëè ïåðåäàòü â ôóíêöèþ 'color' - îíà äîëæíà âûäàòü "black"
    	    
    	 Óñòàíîâêà.
         ×òî èìååòñÿ â âèäó - Äîïóñòèì åñòü ýëåìåíò:
         
            <lego></lego>
            
            Åñëè ïåðåäàòü â ôóíêöèþ äâà ïàðàìåòðà - àòðèáóò è çíà÷åíèå, òî íîäà äîëæíà âûãëÿäåòü
            
            <lego style="display:block"></lego>
           
            
            Åñëè çíà÷åíèå ýòîãî àòðèáóòà óæå çàäàíî, óñòàíàâëèâàåòñÿ íîâîå çíà÷åíèå.
    	    
    	    Áûëî:
    	    <chucknorris speed="5"></chucknorris>
    	    
    	    Ïîñëå âûçîâà ôóíêöèè ñ ïåðåäà÷åé àòðèáóòà è çíà÷åíèÿ (speed Infinity):
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
4. Ñ ïîìîùüþ JS ñîçäàéòå øàõìàòíîå ïîëå:
        - êîíòåéíåð ïîëÿ
        - 64 ðåá¸íêà (ÿ÷åéêè) ýëåìåíòû (ïðîùå ïîçèöèîíèðîâàòü ñ ïîìîùüþ float)
        - ÿ÷åéêè ðàñêðàøåíû áåëûì è ÷åðíûì
        - íóæíûå àòðèáóòû è ñòèëè çàäàâàéòå ñ ïîìîùüþ JS
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
###Çàäàíèå 1 - íåîáÿçàòåëüíîå:
	
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
