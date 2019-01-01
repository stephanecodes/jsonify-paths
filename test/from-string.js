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

test('empty string returns an empty object', t => {
	const res = jsonifyPaths.fromString('');

	t.deepEqual(res, {});
});

test('one level', t => {
	const res = jsonifyPaths.fromString('a');

	t.deepEqual(res, oneLevelResult);
});

test('two levels', t => {
	const res = jsonifyPaths.fromString('a/b');

	t.deepEqual(res, twoLevelsResult);
});

test('multi levels', t => {
	const res = jsonifyPaths.fromString('a/b/c/d');

	t.deepEqual(res, multiLevelsResult);
});

test('use custom delimiter', t => {
	const res = jsonifyPaths.fromString('a:b', {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

test('use 2 character custom delimiter', t => {
	const res = jsonifyPaths.fromString('a::b', {delimiter: '::'});

	t.deepEqual(res, twoLevelsResult);
});

test('use multi character custom delimiter', t => {
	const res = jsonifyPaths.fromString('a(0_0)b', {delimiter: '\\(0_0\\)'});

	t.deepEqual(res, twoLevelsResult);
});

test('use utf-8 character custom delimiter', t => {
	const res = jsonifyPaths.fromString('a☂b', {delimiter: '☂'});

	t.deepEqual(res, twoLevelsResult);
});

test('use utf-8 character custom delimiter (from unicode value)', t => {
	const res = jsonifyPaths.fromString('a☂b', {delimiter: String.fromCharCode(0x2602)});

	t.deepEqual(res, twoLevelsResult);
});

test('use utf-8 multi character custom delimiter', t => {
	const res = jsonifyPaths.fromString('a☁☂b', {delimiter: '☁☂'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading delimiter', t => {
	const res = jsonifyPaths.fromString('/a/b');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore trailing delimiter', t => {
	const res = jsonifyPaths.fromString('a/b/');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading and trailing delimiter', t => {
	const res = jsonifyPaths.fromString('/a/b/');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore leading and trailing delimiter (custom delimiter)', t => {
	const res = jsonifyPaths.fromString(':a:b:', {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

test('ignore consecutive delimiters', t => {
	const res = jsonifyPaths.fromString('a///b');

	t.deepEqual(res, twoLevelsResult);
});

test('ignore consecutive delimiters (custom delimiter)', t => {
	const res = jsonifyPaths.fromString('a:::b', {delimiter: ':'});

	t.deepEqual(res, twoLevelsResult);
});

