/*

fromString('a/b/c/')
fromString('a/b/c')
fromString('/a/b/c/')
fromString('/a/b/c')

returns

{
	"a": {
		"b": {
			"c": {}
		}
	}
}

fromArray([
	'a/b/c/',
	'a/b/d',
	'a/b/d/e/f',
	'g'
]
returns
{
	"a": {
		"b": {
			"c": {},
			"d": {
				"e": {
					"f": {}
				}
			}
		}
	},
	"g": {}
}

*/

const defaults = {
	options: {
		delimiter: '/'
	}
};

// Escape special characters in a regular expression
// https://stackoverflow.com/a/9310752/7557538
const escapeRegExp = text => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const populate = (value, delimiter, jsonObject) => {
	jsonObject = jsonObject || {};

	const i = value.indexOf(delimiter);
	if (i > 0) {
		const key = value.substring(0, i);
		value = value.substring(i + delimiter.length);
		if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
			populate(value, delimiter, jsonObject[key]);
		} else {
			jsonObject[key] = populate(value, delimiter);
		}
	} else {
		const key = value;
		jsonObject[key] = {};
	}

	return jsonObject;
};

const fromStrings = (strings, options) => {
	if (Array.isArray(strings) === false) {
		throw new TypeError('I want a strings array!');
	}
	options = Object.assign({}, defaults.options, options);

	const jsonObject = {};
	const {delimiter} = options;

	// Delimiter will be used in some regular expressions. Therefore it must be escaped
	let escapedDelimiter = escapeRegExp(delimiter);

	const consecutiveDelimitersRegExp = new RegExp(`${escapedDelimiter}+`, 'g');
	const leadingAndTrailingDelimitersRegExp = new RegExp(`^${escapedDelimiter}|${escapedDelimiter}$`, 'g');
	const spacesBeforeAndAfterDelimitersRegExp = new RegExp(` *(${escapedDelimiter}+) *`, 'g');

	strings.forEach(string => {
		if (string) {
			string = string
				// Trim string
				.trim()
				// Remove spaces before and after delimiters
				// => `a / b  /c  ` becomes `a/b/c`
				.replace(spacesBeforeAndAfterDelimitersRegExp, delimiter)
				// ignore consecutive delimiters,
				// => `///` or `//` becomes `/`
				// => `:::` or `::` becomes `:`
				.replace(consecutiveDelimitersRegExp, delimiter)
				// Remove leading and trailing spaces
				.replace(leadingAndTrailingDelimitersRegExp, '');

			// Populate JSON object from path
			populate(string, delimiter, jsonObject);
		}
	});

	return jsonObject;
};

const fromString = (string, options) => {
	if (typeof string !== 'string') {
		throw new TypeError('I want a string!');
	}
	return fromStrings([string], options);
};

module.exports = {defaults, fromString, fromStrings};
