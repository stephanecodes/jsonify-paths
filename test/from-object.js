import test from 'ava';
import jsonifyPaths from '..';

const oneLevelResult = {
	a: {}
};

const oneLevelWithValueResult = {
	a: 'bttf'
};

const twoLevelsResult = {
	a: {
		b: {}
	}
};

const twoLevelsWithValueResult = {
	a: {
		b: 1985
	}
};

test('one level', t => {
	const res = jsonifyPaths.from('a');

	t.deepEqual(res, oneLevelResult);
});

test('one level with value', t => {
	const res = jsonifyPaths.from({path: 'a', value: 'bttf'});

	t.deepEqual(res, oneLevelWithValueResult);
});

test('two levels', t => {
	const res = jsonifyPaths.from('a/b');

	t.deepEqual(res, twoLevelsResult);
});

test('two levels with value', t => {
	const res = jsonifyPaths.from({path: 'a/b', value: 1985});

	t.deepEqual(res, twoLevelsWithValueResult);
});

test('change defaut value ', t => {
	const res = jsonifyPaths.from({path: 'a/b'}, {defaultValue: '😊'});

	t.deepEqual(res, {
		a: {
			b: '😊'
		}
	});
});

test('use custom delimiter', t => {
	const res = jsonifyPaths.from({path: 'Lyon ✈ Reykjavik ✈ Vienna', value: 'On Time'}, {delimiter: '✈'});

	t.deepEqual(res, {
		Lyon: {
			Reykjavik: {
				Vienna: 'On Time'
			}
		}
	});
});

