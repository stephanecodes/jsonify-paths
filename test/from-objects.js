import test from 'ava';
import jsonifyPaths from '..';

const multiLevelsWithValues = {
	'I am': {
		not: {
			'a number': {
				like: 1985
			}
		},
		'a free man': true
	}
};

test('multi levels with values', t => {
	const res = jsonifyPaths.from([
		{path: 'I am/not/a number/like', value: 1985},
		{path: 'I am/a free man', value: true}
	]);

	t.deepEqual(res, multiLevelsWithValues);
});

test('change default value', t => {
	const res = jsonifyPaths.from([
		{path: 'Lyon ✈ Berlin ✈ Rome'},
		{path: 'Lyon ✈ Berlin ✈ Geneva', value: 'On Time'},
		{path: 'Bangkok ✈ Tokyo', value: 'Delayed'}
	], {delimiter: '✈', defaultValue: 'Scheduled'});

	t.deepEqual(res, {
		Lyon: {
			Berlin: {
				Rome: 'Scheduled', // => default value
				Geneva: 'On Time'
			}
		},
		Bangkok: {
			Tokyo: 'Delayed'
		}
	});
});

