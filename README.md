# jsonify-paths [![Build Status](https://travis-ci.org/stephanecodes/jsonify-paths.svg?branch=master)](https://travis-ci.org/stephanecodes/jsonify-paths) [![Coverage Status](https://coveralls.io/repos/github/stephanecodes/jsonify-paths/badge.svg?branch=master)](https://coveralls.io/github/stephanecodes/jsonify-paths?branch=master)

Convert strings representing paths or objects with a path and optional value to a JSON object.

## Install

```
$ npm install jsonify-paths
```

## Usage

```js
const jsonifyPaths = require('jsonify-paths');
```

### From a string

```js
jsonifyPaths.from('a/bb/ccc');
// =>
{
	"a": {
		"bb": {
			"ccc": {}
		}
	}
}
```

### From an array of strings

```js
jsonifyPaths.from([
	'I am/not/a number',
	'I am/a/free man!'
]);
// =>
{
	"I am": {
		"not": {
			"a number": {}
		},
		"a": {
			"free man!": {}
		}
	}
}
```

### From an object

```js
jsonifyPaths.from({path: 'a/bb/ccc'});
// =>
{
	"a": {
		"bb": {
			"ccc": {}
		}
	}
}
```

Providing value

```js
jsonifyPaths.from({path: 'a/bb/ccc', value: 'foo'});
// =>
{
	"a": {
		"bb": {
			"ccc": "foo"
		}
	}
}
```


### From an array of objects

```js
jsonifyPaths.from([
	{path: 'a/bb/ccc'},
	{path: 'a/bb/d'},
	{path: 'e'},
]);
// =>
{
	"a": {
		"bb": {
			"ccc": {},
			"d": {}
		}
	},
	"e": {}
}
```
Providing values (optional)

```js
jsonifyPaths.from([
	{path: 'a/bb/ccc', value: "foo"},
	{path: 'a/bb/d'},
	{path: 'e', value: false},
	{path: 'f/g', value: ""}
	{path: 'f/h', value: 123}
]);
// =>
{
	"a": {
		"bb": {
			"ccc": "foo",
			"d": {} // => default value
		}
	},
	"e": false,
	"f": {
		"g": "",
		"h": 123
	}
}
```


## Options

### Use custom delimiters (default: `slash`)

```js
jsonifyPaths.from('a>bb>ccc', {delimiter: '>'});
jsonifyPaths.from('a|bb|ccc', {delimiter: '|'});
jsonifyPaths.from('a»-»bb»-»ccc', {delimiter: '»-»');
```

### Ignore consecutive, leading and trailing delimiters (default: `true`)

```js
jsonifyPaths.from('a/b/c');
jsonifyPaths.from('/a/b/c');
jsonifyPaths.from('/a/b/c/');
jsonifyPaths.from('//a/b//c');
jsonifyPaths.from('/a /  b/ c  /');
jsonifyPaths.from('/ a //b / c///');
// =>
{
	"a": {
		"b": {
			"c": {}
		}
	}
}
```

### Ignore spaces around delimiters (default: `true`)

```js
jsonifyPaths.from({path: 'Lyon ✈ Reykjavik ✈ Vienna', value:"On Time"}, {delimiter: '✈'});
// =>
{
	"Lyon": {
		"Reykjavik": {
			"Vienna": "On Time"
		}
	}
}
```

Forcing option to `false`

```js
jsonifyPaths.from('I / am not a / number', {ignoreSpacesAroundDelimiters: false});
// =>
'I ': {
	' am not a ': {
		' number': {}
	}
}
```

### Change default value (default: `{}`)

Default value is used when value is not set for an object

```js
jsonifyPaths.from([
	{path: 'Lyon ✈ Berlin ✈ Rome'},
	{path: 'Lyon ✈ Berlin ✈ Geneva', value: "On Time"},
	{path: 'Bangkok ✈ Tokyo', value: "Delayed"},
], {delimiter: '✈', defaultValue: 'Scheduled'});
// =>
{
	"Lyon": {
		"Berlin": {
			"Rome": "Scheduled", // => default value
			"Geneva": 'On Time'
		}
	},
	"Bangkok": {
		"Tokyo": 'Delayed'
	}
};
```

