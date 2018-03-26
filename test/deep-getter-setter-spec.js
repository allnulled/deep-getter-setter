// In Node.js:
const DeepGetterSetter = require("../src/deep-getter-setter.js");

// Retrieve the 3 functions:
var {get,set,modify,exists,ensure} = DeepGetterSetter;

// Some random data:
var data = {a:{b:[0,5,10]}};

// Check that that the getter works okay:
console.log(get(data, ["a","b","1"]) === data["a"]["b"]["1"] ? "Passed -  getter 1!" : "Failed -  getter 1!");

// Use the setter:
set(data, ["a","b","1"], 6);

console.log(get(data, ["a","b","1"]));

// Check that the setter worked good:
console.log(get(data, ["a","b","1"]) === 6 ? "Passed -  setter 1!" : "Failed -  setter 1!");

// Use the modifier:
modify(data, ["a","b","1"], function(parent, key) {
 return ++parent[key];
});

// Check that the modifiers worked fine:
console.log(get(data, ["a","b","1"]) === data["a"]["b"]["1"] ? "Passed -  modifier 1!" : "Failed -  modifier 1!");

// Use the exists:
console.log(exists(data, ["a", "b", "5"]) === false ? "Passed -  exists 1!":"Failed -  exists 1!");

// Check that the exists worked fine:
console.log( (!(5 in data["a"]["b"])) ? "Passed -  exists 2!" : "Failed -  exists 2!");

// Use the ensurer:
ensure(data, ["a", "b", "5"]);

// Check that the ensurer worked fine:
console.log(exists(data, ["a", "b", "5"]) === true ? "Passed -  ensurer 1!" : "Failed -  ensurer 1!");
console.log(typeof (get(data, ["a", "b", "5"])) === "object" ? "Passed -  ensurer 2!" : "Failed -  ensurer 2!");