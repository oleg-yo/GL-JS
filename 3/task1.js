/*
Deep copy
*/
function deepCopy(target, source) {
	for (var p in source) {
		if (!source.hasOwnProperty(p)) {
			continue;
		}
		if (source[p] instanceof Object) {
			target[p] = {};
			deepCopy(target[p], source[p]);
		}
		else {
			target[p] = source[p];
		}
	}
}
object_target = {
	old: 5
}

deepCopy(object_target, { a: { b: { c: 123 } } });
console.log(object_target);


/*
��������� �������� �� ��������
�������� ������� compareObjects, ������� ��������� 2 ������� � �������� ��������� ��������, �� �������� ����� ��������� ��������� ��������, � ������� � ������� �������� name ���� �������,  � �������� �������� ����������� �������� ������.
�������� ���� ������ � ������� ��������, ������ ����� �����������.
�������� ���������� ������� � ��������� ��� ��������� ������� � �������� ��� ���������
*/
function compareObjects(ob1, ob2, compare_property) {
	if (!compare_property in ob1 || !compare_property in ob2) {
		return;
	}
	var output_name;
	if (ob1[compare_property] > ob2[compare_property]) {
		output_name = ob1.name;
	}
	else if (ob1[compare_property] < ob2[compare_property]) {
		output_name = ob2.name;
	}
	else {
		output_name = 'properties are equal';
	}
	console.log(output_name);
}

var compare_object_1 = {
	name: 'Object_1_name',
	size: 4
}
function Constructor(name, size) {
	this.name = name;
	this.size = size;
}
var compare_object_2 = new Constructor('Object_2_name', 10);

compareObjects(compare_object_1, compare_object_2, 'size');


/*
����� ������� �����
�������� ��������� �� 5 ����������� �����, ��� ������ ����� �������� ��������� ����������: played - ���������� ��� ����� ���� ��������� (���������� ��������� �������), name - ��� �����
�������� ������� favoriteSong, ������� ��������� ��������� �� �����, � ���������� ��������� ����������: �������� �����, ������� ��� ����� ���� ���������, ������ ����� � ���������.
�������� ������� favoriteSong � ��������� �� ��������� ���������
*/
var songs_names = ['TNT', 'Highway to hell', 'Moneytalks', 'War machine', 'Hells bells'];

var songs_list = [];
for (var i = 0; i < 5; i++) {
	songs_list.push( {
		name: songs_names[i],
		played: Math.floor(Math.random() * 10)
	});
}
function favoriteSong(songs_list) {
	var most_played_num = 0;
	var most_played_song_index = -1;
	for (var i = 0; i < songs_list.length; i++) {
		if (songs_list[i].played > most_played_num) {
			most_played_num = songs_list[i].played;
			most_played_song_index = i;
		}
	}
	if (most_played_song_index === -1) {
		return null;
	}
	else {
		return {
			name: songs_list[most_played_song_index].name,
			played: songs_list[most_played_song_index].played,
			index: most_played_song_index
		}
	}
}

console.log(favoriteSong(songs_list));


/*
����� �����������
������� ����������� �������� (�����) Calculator � ����� ��������: add - ��������� ����� � ���������� ��� � �����������, getCurrentSum - ��������� ������ � ���������� �������������� ����� �� ���� ��������� � ������� (���� ������� ���, ���������� ������� �����)
�������� ��� ���������� ������ Calculator
�������� � ������ ������ ����� 3,8,11 � �� ������ 5,12,17.
�������� � ������� �����:
���� ����� ���� ��������, ��������� (56)
����� ����� ���� �������� �� ������ ���� (28)
��� ������ ������� ����� ����� �������� ���� � ����� �������������� ����� (������ ���������)
*/
function Calculator() {
	var sum_arr = [];
	this.add = function(a) {
		sum_arr.push(a);
	}
	this.getCurrentSum = function(index = sum_arr.length) {
		var sum = 0;
		for (var i = 0; i < index; i++) {
			sum += sum_arr[i];
		};
		return sum;
	}
}

var calc1 = new Calculator();
calc2 = new Calculator();
calc1.add(3);
calc1.add(8);
calc1.add(11);
calc2.add(5);
calc2.add(12);
calc2.add(17);

console.log(calc1.getCurrentSum() + calc2.getCurrentSum());
console.log(calc1.getCurrentSum(2) + calc2.getCurrentSum(2));
console.log(calc1.getCurrentSum(3), calc1.getCurrentSum());
