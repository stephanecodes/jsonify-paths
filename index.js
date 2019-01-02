
const defaults = {
	options: {
		delimiter: '/',
		defaultValue: {}
	}
};

// Escape special characters in a regular expression
// https://stackoverflow.com/a/9310752/7557538
const escapeRegExp = text => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const populate = (data, options, jsonObject) => {
	jsonObject = jsonObject || {};

	let {path} = data;
	const {value} = data;

	const i = path.indexOf(options.delimiter);
	if (i > 0) {
		const key = path.substring(0, i);
		path = path.substring(i + options.delimiter.length);
		// Don't alter original data
		data = {path, value};
		if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
			populate(data, options, jsonObject[key]);
		} else {
			jsonObject[key] = populate(data, options);
		}
	} else if (/false/i.test(value) || value === '' || value) {
		jsonObject[path] = value;
	} else {
		jsonObject[path] = 	options.defaultValue;
	}

	return jsonObject;
};

const from = (arg, options) => {
	const jsonObject = {};

	if (arg === undefined || arg === null) {
		throw new TypeError('I wan\'t something!');
	}
	if (typeof (arg) === 'string') {
		return from([{path: arg}], options);
	}
	if (Array.isArray(arg) === false) {
		if (typeof (arg) === 'object') {
			return from([arg], options);
		}
		throw new TypeError('Unsupported argument type');
	}

	options = Object.assign({}, defaults.options, options);

	const {delimiter} = options;

	// Delimiter will be used in some regular expressions. Therefore it must be escaped
	const escapedDelimiter = escapeRegExp(delimiter);

	const consecutiveDelimitersRegExp = new RegExp(`${escapedDelimiter}+`, 'g');
	const leadingAndTrailingDelimitersRegExp = new RegExp(`^${escapedDelimiter}|${escapedDelimiter}$`, 'g');
	const spacesBeforeAndAfterDelimitersRegExp = new RegExp(` *(${escapedDelimiter}+) *`, 'g');

	arg.forEach(data => {
		if (data) {
			if (typeof (data) === 'string') {
				data = {path: data};
			}
			if (data.path) {
				data.path = data.path
					// Trim string
					.trim()
					// Remove spaces before and after delimiters
					// => `a / b  /c  ` becomes `a/b/c`
					.replace(spacesBeforeAndAfterDelimitersRegExp, delimiter)
					// ignore consecutive delimiters,
					// => `///` or `//` becomes `/`
					.replace(consecutiveDelimitersRegExp, delimiter)
					// Remove leading and trailing spaces
					.replace(leadingAndTrailingDelimitersRegExp, '');

				// Populate JSON object from path
				populate(data, options, jsonObject);
			}
		}
	});

	return jsonObject;
};

module.exports = {defaults, from};
