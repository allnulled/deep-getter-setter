// In Node.js:
const DeepGetterSetter = require("../src/deep-getter-setter.js");

// Retrieve the 3 functions:
var {get,set,modify} = DeepGetterSetter;

// Some random data:
var data = {a:{b:[0,5,10]}};

// Check that that the getter works okay:
console.log(get(data, ["a","b","1"]) === 5 ? "Passed!" : "Failed!");

// Use the setter:
set(data, ["a","b","1"], 6);

// Check that the setter worked good:
console.log(get(data, ["a","b","1"]) === 6 ? "Passed!" : "Failed!");

// Use the modifier:
modify(data, ["a","b","1"], function(parent, key) {
 return ++parent[key];
});

// Check that the modifiers worked fine:
console.log(get(data, ["a","b","1"]) === 7 ? "Passed!" : "Failed!");
