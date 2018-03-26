/*
 * @type {Function}
 * @name modifier
 * @param data {Object}
 * @param selector {Array<String>}
 * @param data {Function}
 * @return {any}
 * @descripion Method to visit an item from a set of data,
 * that will execute a provided function against the matched node
 * and return what it retuns
 */
function modifier (data, selector, action) {
	var ref = data;
	for(var a=0; a<selector.length-1; a++) {
		var key = selector[a];
		if(typeof ref !== "object") {
			throw "Key " + key +" not found because parent is not an object: " + ref;
		}
		if(!(key in ref)) {
			throw "Key " + key + " not found in " + ref;
		}
		ref = ref[key];
	}
	return action(ref, selector[selector.length-1], selector, data);
};
/*
 * @type {Function}
 * @name getter
 * @param data {Object}
 * @param selector {Array<String>}
 * @return {any}
 * @descripion Method to visit an item from a set of data,
 * that will return the matched node
 */
function getter (data, selector) {
	return modifier(data, selector, function(parent, key, selector, data) {
		return parent[key];
	});
};
/*
 * @type {Function}
 * @name setter
 * @param data {Object}
 * @param selector {Array<String>}
 * @param value {any} value to finally put in selected position
 * @return {any}
 * @descripion Method to visit an item from a set of data,
 * that will try to set a new provided value to a matched node
 * and return the new value
 */
function setter (data, selector, value) {
	return modifier(data, selector, function(parent, key, selector, data) {
		return parent[key] = value;
	});
};
/*
 * @type {Node.js module}
 * @name deep-getter-setter
 */
module.exports = {
	get: getter,
	set: setter,
	modify: modifier
};