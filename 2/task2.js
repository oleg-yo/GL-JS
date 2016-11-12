/*
1. Create a function that will take any number of arguments and return their sum.
2. Make this function be able to take array as argument.
*/

function sumAll(input_array) {
	var sum = 0;
	if (input_array instanceof Array) {
		input_array.forEach(function (item, i, array) {
			sum += item;
		});
	}
	else {
		for (var i = 0; i < arguments.length; i++) {
			sum += arguments[i];
		}
	}
	return sum;
}

console.log(sumAll(1, 2, 3));
console.log(sumAll([1, 2, 3]));


/*
1. Declare a private variable using IIFE.
2. Is there any other ways how to declare private variables in JavaScript ?
*/
;(function() {
	var myVar = { key: 'value' };
})();

// Closure
function createVar(variable) {
	return {
		setVar: function(newValue) {
			variable = newValue;
		},
		getVar: function() {
			return variable;
		}
	}
}
var myVar = createVar('string');


/*
1. Create a function called celsiusToFahrenheit:
          Store a celsius temperature into a variable.
          Convert it to fahrenheit and output "NN°C is NN°F".
 
2. Create a function called fahrenheitToCelsius:
          Now store a fahrenheit temperature into a variable.
   Convert it to celsius and output "NN°F is NN°C."
 
F = C * 1.8 + 32
*/
function celsiusToFahrenheit(celsius) {
	if (isNaN(celsius)) {
		return;
	}
	var fahrenheit_value = celsius * 1.8 + 32;
	var fahrenheit = celsius + '\u00B0C is ' + Math.round(fahrenheit_value*10)/10 + '\u00B0F';
	console.log(fahrenheit);
	return fahrenheit;
}
function fahrenheitToCelsius(fahrenheit) {
	if (isNaN(fahrenheit)) {
		return;
	}
	var celsius_value = (fahrenheit - 32) / 1.8;
	var celsius = fahrenheit + '\u00B0F is ' + Math.round(celsius_value*10)/10 + '\u00B0C';
	console.log(celsius);
	return celsius;
}

celsiusToFahrenheit(10);
fahrenheitToCelsius(50);


/*
Write a JavaScript function that accepts a string as a parameter and find the longest word within the string.
Example string : 'Hello, GlobalLogic!'
Expected Output : 'GlobalLogic'
*/
function findLongestWord(input_string) {
	var max_length = 0;
	var longest_word_index = -1;

	var input_array = input_string.replace(/[^a-zA-Z0-9 ]/g, '').split(' ');
	input_array.forEach(function (item, i, array) {
		if (item.length > max_length) {
			max_length = item.length;
			longest_word_index = i;
		}
	});
	return (longest_word_index == -1 ? '' : input_array[longest_word_index]);
}

console.log(findLongestWord('Hello, GlobalLogic!'));
console.log(findLongestWord('abcde , .........., 123456789aaa  /dlsgkp 2i w/. '));


/*
1. Write a function that can print entity details based on next model:
{
  name: String,
  type: String,
  age: Number
}
Expected output: "%NAME%(%TYPE%) - %AGE%."
2. Rewrite that function to use this instead of argument (use apply, call and bind to print the details of different entities).
*/
function modelDetails() {
	return this.name + '(' + this.type + ')' + ' - ' + this.age + '.';
}

var model1 = {
	name: 'Mmm',
	type: 'Good',
	age: '100'
}
console.log(modelDetails.call(model1));
