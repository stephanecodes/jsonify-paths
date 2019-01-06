import test from 'ava';
import jsonifyPaths from '..';

const oneLevelResult = {
	a: {}
};

const twoLevelsResult = {
	a: {
		b: {}
	}
};

const multiLevelsResult = {
	a: {
		b: {
			c: {
				d: {}
			}
		}
	}
};

const wordsResult = {
	'I am': {
		not: {
			'a number': {}
		}
	}
};

test('empty string returns an empty object', t => {
	const res = jsonifyPaths.from('');

	t.deepEqual(res, {});
});

test('one level', t => {
	const res = jsonifyPaths.from('a');

	t.deepEqual(res, oneLevelResult);
});

test('two levels', t => {
	const res = jsonifyPaths.from('a/b');

	t.deepEqual(res, twoLevelsResult);
});

test('multi levels', t => {
	const res = jsonifyPaths.from('a/b/c/d');

	t.deepEqual(res, multiLevelsResult);
});

test('use custom delimiter', t => {
	const res = jsonifyPaths.from('a:b', {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

test('use 2 character custom delimiter', t => {
	const res = jsonifyPaths.from('a>b', {delimiter: '>'});

	t.deepEqual(res, twoLevelsResult);
});

test('use multi character custom delimiter', t => {
	const res = jsonifyPaths.from('a=>b', {delimiter: '=>'});

	t.deepEqual(res, twoLevelsResult);
});

test('use utf-8 character custom delimiter', t => {
	const res = jsonifyPaths.from('a»b', {delimiter: '»'});

	t.deepEqual(res, twoLevelsResult);
});

test('use utf-8 character custom delimiter (from unicode value)', t => {
	const res = jsonifyPaths.from('a✈b', {delimiter: String.fromCharCode(0x2708)});

	t.deepEqual(res, twoLevelsResult);
});

test('use utf-8 multi character custom delimiter', t => {
	const res = jsonifyPaths.from('a»-»b', {delimiter: '»-»'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading delimiter', t => {
	const res = jsonifyPaths.from('/a/b');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore trailing delimiter', t => {
	const res = jsonifyPaths.from('a/b/');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading and trailing delimiter', t => {
	const res = jsonifyPaths.from('/a/b/');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading and trailing delimiter (custom delimiter)', t => {
	const res = jsonifyPaths.from('>a>b>', {delimiter: '>'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore consecutive delimiters', t => {
	const res = jsonifyPaths.from('a///b');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore consecutive delimiters (custom delimiter)', t => {
	const res = jsonifyPaths.from('a>>>b', {delimiter: '>'});

	t.deepEqual(res, twoLevelsResult);
});

test('consecutive, leading and trailing delimiters', t => {
	const res = jsonifyPaths.from('/a // b  ///c/d ///');

	t.deepEqual(res, multiLevelsResult);
});

test('ignore spaces around delimiters', t => {
	const res = jsonifyPaths.from('a / b  /   c');

	t.deepEqual(res, {
		a: {
			b: {
				c: {}
			}
		}
	});
});

test('do not ignore spaces around delimiters', t => {
	const res = jsonifyPaths.from('I / am not a / number', {ignoreSpacesAroundDelimiters: false});

	t.deepEqual(res, {
		'I ': {
			' am not a ': {
				' number': {}
			}
		}
	});
});

test('ignore spaces around delimiters (custom delimiter)', t => {
	const res = jsonifyPaths.from('Lyon ✈ Reykjavik ✈ Vienna', {delimiter: '✈'});

	t.deepEqual(res, {
		Lyon: {
			Reykjavik: {
				Vienna: {}
			}
		}
	});
});

test('use words', t => {
	const res = jsonifyPaths.from('I am/not/a number');

	t.deepEqual(res, wordsResult);
});

test('use words (custom delimiter)', t => {
	const res = jsonifyPaths.from('I am|not|a number', {delimiter: '|'});

	t.deepEqual(res, wordsResult);
});

