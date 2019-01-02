import test from 'ava';
import jsonifyPaths from '..';

test('throws for null or undefined argument', t => {
	const err = 'I wan\'t something!';

	t.throws(() => {
		jsonifyPaths.from();
	}, err);

	t.throws(() => {
		jsonifyPaths.from(null);
	}, err);

	t.throws(() => {
		jsonifyPaths.from(undefined);
	}, err);
});

test('throws for unsupported argument type', t => {
	t.throws(() => {
		jsonifyPaths.from(7353);
	}, 'Unsupported argument type');
});

