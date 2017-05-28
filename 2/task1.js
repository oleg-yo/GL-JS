function extractCharacters(str) {
	if (!str)
		return;

    var output = [];
    for (var i = 0; i < str.length; i++) {
    	var symbol = str[i].toLowerCase();
    	if (output.indexOf(symbol) === -1) {
    		output.push(symbol);
    	}
    }
    return output;
}

extractCharacters('abcd');
    //['a', 'b', 'c', 'd']
extractCharacters('aaaabc');
    //['a', 'b', 'c']
extractCharacters('Hello, world');
    //[ 'h', 'e', 'l', 'o', ',', ' ', 'w', 'r', 'd' ];


function createLogger(prefix) {
	var logger_name = prefix;

	return function() {
		var output_log;
		var time = new Date().toISOString();
	    output_log = time + ' ' + logger_name + ':';

		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] === 'object') {
				output_log += ' Object ' + JSON.stringify(arguments[i]);
			}
			else {
				output_log += ' ' + arguments[i];
			}	
		}
	    console.log(output_log);
	    //return output_log;
	} 
}

var myLogger = createLogger('My Logger');

myLogger('some data');
    // 2016-06-06T09:55:44.162Z My Logger: some data
    // hint: use toISOString method to format Date object
myLogger({ data: 1 });
    // 2016-06-06T09:55:44.162Z My Logger: Object {data: 1}
myLogger('My data is -', { data: 1 });
    // 2016-06-06T09:55:44.162Z My Logger: my data is - Object {data: 1}

myLogger({ data: {text: 'blabla'}, data_2: 5 });
