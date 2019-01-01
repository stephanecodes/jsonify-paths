import test from 'ava';
import jsonifyPaths from '..';

const oneLevelResult = {
	a: {},
	b: {}
};

const twoLevelsResult = {
	a: {
		b: {}
	},
	c: {
		d: {},
		e: {}
	}
};

const multiLevelsResult = {
	a: {
		b: {
			c: {
				d: {}
			}
		},
		e: {
			f: {
				g: {},
				h: {},
				i: {}
			}
		},
		j: {}
	},
	k: {}
};

test('empty strings returns an empty object', t => {
	const res = jsonifyPaths.fromStrings(['', '']);

	t.deepEqual(res, {});
});

test('one level', t => {
	const res = jsonifyPaths.fromStrings([
		'a',
		'b'
	]);

	t.deepEqual(res, oneLevelResult);
});

test('two levels', t => {
	const res = jsonifyPaths.fromStrings([
		'a/b',
		'c/d',
		'c/e'
	]);

	t.deepEqual(res, twoLevelsResult);
});

test('multi levels', t => {
	const res = jsonifyPaths.fromStrings([
		'a/b/c/d',
		'a/e/f/g',
		'a/e/f/h',
		'a/e/f/i',
		'a/j',
		'k'

	]);

	t.deepEqual(res, multiLevelsResult);
});

test('use custom delimiter', t => {
	const res = jsonifyPaths.fromStrings([
		'a;b',
		'c;d',
		'c;e'
	], {delimiter: ';'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading delimiter (custom delimiter)', t => {
	const res = jsonifyPaths.fromStrings([
		':a:b',
		'c:d',
		':c:e'
	], {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore trailing delimiter (custom delimiter)', t => {
	const res = jsonifyPaths.fromStrings([
		'a:b:',
		'c:d',
		'c:e:'
	], {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading and trailing delimiter (custom delimiter)', t => {
	const res = jsonifyPaths.fromStrings([
		':a:b:',
		':c:d',
		'c:e:'
	], {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore consecutive delimiters', t => {
	const res = jsonifyPaths.fromStrings([
		'a//b',
		'/c//d///',
		'c////e'
	]);

	t.deepEqual(res, twoLevelsResult);
});

test('ignore consecutive delimiters (custom delimiter)', t => {
	const res = jsonifyPaths.fromStrings([
		'a,,b',
		',c,,d,,,',
		',c,,,e,,'
	], {delimiter: ','});

	t.deepEqual(res, twoLevelsResult);
});

