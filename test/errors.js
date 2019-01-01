import test from 'ava';
import jsonifyPaths from '..';

test('throws for invalid string value', t => {
	t.throws(() => {
		jsonifyPaths.fromString();
	}, 'I want a string!');

	t.throws(() => {
		jsonifyPaths.fromString(null);
	}, TypeError);

	t.throws(() => {
		jsonifyPaths.fromString(undefined);
	}, TypeError);
});

test('throws for invalid string array', t => {
	t.throws(() => {
		jsonifyPaths.fromStrings();
	}, 'I want a strings array!');

	t.throws(() => {
		jsonifyPaths.fromStrings(null);
	}, TypeError);

	t.throws(() => {
		jsonifyPaths.fromStrings(undefined);
	}, TypeError);
});

