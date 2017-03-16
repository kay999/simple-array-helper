/**
 * checks if v is an array
 * @param v
 * @returns {boolean}
 */
function is(v) {
	return Array.isArray(v);
}

/**
 * wraps v into an array if it isn't an array already
 * @param v
 * @returns {*}
 */
function from(v) {
	if (!v) return [];
	if (Array.isArray(v)) return v;
	return [v];
}

/**
 * appends an element to an object { field:elements }
 * @param obj 	the object
 * @param field the field which contains the array
 * @param val   the new value
 */
function append(obj, field, val) {
	const v = obj[field];
	if (v) v.push(val);
	else obj[field] = [val];
}

/**
 * appends an element to an object { field:elements } but only if it doesn't already exists in the array
 *
 * @param obj 	the object
 * @param field the field which contains the array
 * @param val   the new value
 * @returns true if append was successful, false if it was already in the array
 */
function appendUnique(obj, field, val) {
	const v = obj[field];
	if (v) {
		if (v.indexOf(val) >= 0) return false;
		v.push(val);
	}
	else obj[field] = [val];
	return true;
}

/**
 * splits a string by ','. Always returns an array
 * @param str a string
 * @returns {Array} the array. return [] is str is empty, undefined or null
 */
function fromString(str) {
	if (!str) return [];
	return str.split(/ *, */);
}

/**
 * Creates an index-map name->[entries] from an array
 * Each entry is an array so this works for non-unique keys
 *
 * @param array the array, containing objects { field, ...}
 * @param field the field to index over
 * @return {{}} the map field -> entry
 */
function buildIndex(array, field) {
	const index = {};
	array.forEach(function(el) {
		append(index, el[field], el);
	});
	return index;
}

/**
 * Creates an index-map name->entry from an array
 * Each entry is an object, so this stores the last found element for each name on conflicts
 *
 * @param array the array, containing objects { field, ...}
 * @param field the field to index over
 * @return {{}} the map field -> entry
 */
function buildIndexUnique(array, field) {
	const index = {};
	array.forEach(function(el) {
		index[el[field]] = el;
	});
	return index;
}

/**
 * intersperses a value into an array
 *
 * @param insert an arbitrary value
 * @param arr an array
 * @returns {Array} [a[0], obj, a[1], obj, a[2], ..., obj, a[last]]
 */
function intersperse(insert, arr) {
	const res = [];
	arr.forEach(function (v, i) {
		if (i > 0) res.push(insert);
		res.push(v);
	});
	return res;
}


exports.is = is;
exports.isArray = is;
exports.from = from;
exports.arrayFrom = from;
exports.mk = from;
exports.append = append;
exports.appendUnique = appendUnique;
exports.fromString = fromString;
exports.splitString = fromString;
exports.buildIndex = buildIndex;
exports.buildIndexUnique = buildIndexUnique;
exports.intersperse = intersperse;