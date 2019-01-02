# jsonify-paths [![Build Status](https://travis-ci.org/stephanecodes/jsonify-paths.svg?branch=master)](https://travis-ci.org/stephanecodes/jsonify-paths)

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
```
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

### Ignore spaces around delimiters (default: `true`)

```js
jsonifyPaths.from('Lyon ✈ Reykjavik ✈ Vienna', {delimiter: '✈'});
// =>
{
	"Lyon": {
		"Reykjavik": {
			"Vienna": {}
		}
	}
}
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

### Change default value (default: `{}`)
```js
jsonifyPaths.from([
	{path: 'France ✈ Germany ✈ Italy'},
	{path: 'France ✈ Germany ✈ Berlin', value: "Town"},
	{path: 'Bangkok ✈ Tokyo', value: "Town"},
], {delimiter: '✈', defaultValue: 'Country'});
// =>
{
	"France": {
		"Germany": {
			"Italy": "Country", // => default value
			"Berlin": 'Town'
		}
	},
	"Bangkok": {
		"Tokyo": 'Town'
	}
};
```

