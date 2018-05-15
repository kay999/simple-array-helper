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

const push = Array.prototype.push;

/**
 * pushes el to arr if el isn't already in arr
 * @param arr
 * @param el
 */
function pushUnique(arr, el) {
	if (arr.indexOf(el) < 0) {
		arr.push(el);
		return true;
	}
	return false;
}

/**
 * pushes all elements in the array els to arr
 * @param arr
 * @param els
 */
function pushAll(arr, els) {
	if (els) push.apply(arr, els);
}

/**
 * pushes all elements in the array els to arr which aren't already in arr
 * @param arr
 * @param els
 */
function pushAllUnique(arr, els) {
	if (els) els.forEach(function(el) {
		if (arr.indexOf(el) < 0) arr.push(el);
	});
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
 * prepends an element to an object { field:elements }
 * @param obj 	the object
 * @param field the field which contains the array
 * @param val   the new value
 */
function prepend(obj, field, val) {
	const v = obj[field];
	if (v) v.unshift(val);
	else obj[field] = [val];
}

/**
 * removes an element from an index
 * @param obj 	the object
 * @param field the field which contains the array
 * @param val   the value to remove
 */
function remove(obj, field, val) {
	const v = obj[field];
	if (v) {
		const index = v.indexOf(val);
		if (index >= 0) {
			if (v.length === 1) {
				delete obj[field];
			}
			else {
				v.splice(index, 1);
			}
			return true;
		}
	}
	return false;
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
	if (arr) arr.forEach(function (v, i) {
		if (i > 0) res.push(insert);
		res.push(v);
	});
	return res;
}

/**
 * get obj[field], if it not exists it creates it with an value of {}
 * @param obj
 * @param field
 * @returns {*}
 */
function ensure(obj, field) {
	const f = obj[field];
	if (!f) {
		return obj[field] = {};
	}
	return f;
}

/**
 * remove ther first element from an array (by identity)
 * @param arr
 * @param el
 * @returns {boolean}
 */
function removeFirst(arr, el) {
	const index = arr.indexOf(el);
	if (index >= 0) {
		arr.splice(index, 1);
		return true;
	}
	return false;
}

/**
 * remove all elements from arr (by identity)
 * @param arr
 * @param el
 */
function removeAll(arr, el) {
	while(removeFirst(arr, el)) {}
}

/**
 * create an array of all pairs in arr
 * [a, b, c] => [[a, b], [b, c]]                // without 'wrap'
 * [a, b, c] => [[a, b], [b, c], [c, a]         // with 'wrap'
 * @param arr [a, b, c]
 * @param wrap also adds a last "wrap-around" pair [last, first]
 */
function pairs(arr, wrap) {
	if (!arr) return [];
	const res = [];
	var prev;
	var first = true;
	arr.forEach(function(el) {
		if (first) first = false;
		else res.push([prev, el]);
		prev = el;
	});
	if (wrap) {
		res.push([prev, arr[0]]);
	}
	return res;
}

/**
 * returns null if array is empty or null, otherwise it returns the array
 * @param arr
 * @returns {*}
 */
function nullForEmpty(arr) {
	if (arr == null) return null;
	if (arr.length) return arr;
	return null;
}

function first(arr) {
	if (arr == null) return undefined;
	return arr[0];
}

function last(arr) {
	if (arr == null || !arr.length) return undefined;
	return arr[arr.length-1];
}

exports.nullForEmpty = nullForEmpty;
exports.pairs = pairs;
exports.pairsWrap = function(arr) { return pairs(arr, true) };
exports.removeFirst = removeFirst;
exports.removeAll = removeAll;
exports.is = is;
exports.isArray = is;
exports.from = from;
exports.arrayFrom = from;
exports.mk = from;
exports.pushUnique = pushUnique;
exports.pushAll = pushAll;
exports.pushAllUnique = pushAllUnique;
exports.append = append;
exports.appendUnique = appendUnique;
exports.prepend = prepend;
exports.remove = remove;
exports.fromString = fromString;
exports.splitString = fromString;
exports.buildIndex = buildIndex;
exports.buildIndexUnique = buildIndexUnique;
exports.intersperse = intersperse;
exports.ensure = ensure;
exports.first = first;
exports.last = last;
