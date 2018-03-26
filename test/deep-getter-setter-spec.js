// In Node.js:
const DeepGetterSetter = require("../src/deep-getter-setter.js");
var {get,set,modify} = DeepGetterSetter;
var data = {a:{b:[0,5,10]}};
console.log(get(data, ["a","b","1"]) === 5 ? "Passed!" : "Failed!");
set(data, ["a","b","1"], 6);
console.log(get(data, ["a","b","1"]) === 6 ? "Passed!" : "Failed!");
modify(data, ["a","b","1"], function(parent, key) {
 return ++parent[key];
});
console.log(get(data, ["a","b","1"]) === 7 ? "Passed!" : "Failed!");