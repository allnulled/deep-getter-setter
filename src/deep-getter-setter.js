/**
 * @type {Function}
 * @name modifierEachCommon
 * @param value
 * @param key
 * @param parent
 * @param index
 * @param selector
 * @param data
 * @param accumulation
 * @return {any} the value for the parent next round
 * @description
 * 
 */
function modifierEachCommon (value, key, parent, index, selector, data, acc) {
	if(typeof parent !== "object") {
		throw "Key " + key +" not found because parent is not an object: " + parent;
	}
	if(!(key in parent)) {
		throw "Key " + key + " not found as key in " + parent;
	}
	return value;
}
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
function modifier (data, selector, action, actionEach = modifierEachCommon) {
	var ref = data;
	var acc = [];
	var a = 0;
	for(a=0; a<selector.length-1; a++) {
		var key = selector[a];
		ref = actionEach(ref[key], key, ref, a, selector.slice(0,a), acc, data);
	}
	var key = selector[selector.length-1];
	return action(key in ref ? ref[key] : undefined, key, ref, selector.length-1, selector, acc, data);
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
	return modifier(data, selector, function(value, key, parent, index, selector, acc, data) {
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
function setter (data, selector, valuePassed) {
	return modifier(data, selector, function(value, key, parent, index, selector, acc, data) {
		return parent[key] = valuePassed;
	});
};
/*
 * @type {Function}
 * @name ensurer
 * @param data {Object}
 * @param selector {Array<String>}
 * @param value {any} (optional) value to finally put in selected position
 * @return {any}
 * @descripion 
 * 	·	Finds the selected item
 *		· If it is empty:
 *		 ·	Sets the provided value to the selected path (or {} if not provided)
 *
 */
function ensurer (data, selector, valuePassed={}) {
	return modifier(data, selector, function(value, key, parent, index, selector, acc, data) {
		return (key in parent) ? valuePassed : (parent[key] = valuePassed);
	});
};

/*
 * @type {Function}
 * @name exists
 * @param data {Object}
 * @param selector {Array<String>}
 * @param trueFn {Function} (optional) callback for when the selected path exists.
 * @param falseFn {Function} (optional) callback for when the selected path does not exist.
 * @return {any}
 * @descripion 
 * 	·	Finds the selected item
 *		· If it is empty:
 *		 ·	Calls the falseFn callback, or returns false.
 *		· But if it exists:
 *   · Calls the trueFn callback, or return true.
 *   
 */
function exists (data, selector, trueFn, falseFn) {
	return modifier(data, selector, function(value, key, parent, index, selector, acc, data) {
		if(key in parent) {
			if(trueFn) {
				return trueFn(value, key, parent, selector, data);
			}
			return true;
		} else {
			if(falseFn) {
				return falseFn(value, key, parent, selector, data);
			}
			return false;
		}
	});
};
/*
 * @type {Node.js module}
 * @name deep-getter-setter
 */
module.exports = {
	get: getter,
	set: setter,
	modify: modifier,
	ensure: ensurer,
	exists: exists
};