# deep-getter-setter

# 1. Introduction

The package deep-getter-setter is a very small but powerful tool. 

# 1.1. What is it for?

Basically:

1. It is used to set values to an object (deeply).
2. It is used get values (deeply) from an object.
3. It is used to modify (ddep) values of an object.

# 2. Installation

Just:

    ~$ npm install deep-getter-setter

### In Node.js:

```js
const DeepGetterSetter = require("deep-getter-setter");
```

### In browsers:
```html
<script src="./node_modules/deep-getter-setter/src/deep-getter-setter.js"></script>
```

# 3. API comment

There are only 3 functions to master here:

1. `get (data, selector)`: returns the item value.
2. `set (data, selector, value)`: redefines the item value.
3. `modify (data, selector, value)`: modifies the item value through a function.

That is all.

# 4. Usage

### a) Start retrieving the 3 functions:

```js
var {get,set,modify} = DeepGetterSetter;
```

### b) Test the example (found at `test/deep-getter-setter-spec.js`):

```js
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
```

# 5. Conclusion

This is a small tool that you can use in any type of your projects, to easily retrieve and reset values.