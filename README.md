# jsonify-paths

[![Build Status](https://travis-ci.org/stephanecodes/jsonify-paths.svg?branch=master)](https://travis-ci.org/stephanecodes/jsonify-paths)

Convert strings representing paths to a JSON object

## Usage

```js
const jsonifyPaths = require('jsonify-paths');
```

### From a string

```js
jsonifyPaths.fromString('a/bb/ccc');
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
jsonifyPaths.fromStrings([
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


### Use custom delimiters

```js
jsonifyPaths.fromString('a>bb>ccc', {delimiter: '>'});
jsonifyPaths.fromString('a|bb|ccc', {delimiter: '|'});
jsonifyPaths.fromString('a»-»bb»-»ccc', {delimiter: '»-»');
```

### Ignore spaces around delimiters

```js
jsonifyPaths.fromString('Lyon ✈ Reykjavik ✈ Vienna', {delimiter: '✈'});
// =>
{
	"Lyon": {
		"Reykjavik": {
			"Vienna": {}
		}
	}
}
```

### Ignore consecutive, leading and trailing delimiters

```js
jsonifyPaths.fromString('a/b/c');
jsonifyPaths.fromString('/a/b/c');
jsonifyPaths.fromString('/a/b/c/');
jsonifyPaths.fromString('//a/b//c');
jsonifyPaths.fromString('/a /  b/ c  /');
jsonifyPaths.fromString('/ a //b / c///');
// =>
{
	"a": {
		"b": {
			"c": {}
		}
	}
}
```
