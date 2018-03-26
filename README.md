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

1. `get (data, selector)`: 

Returns the item value.

2. `set (data, selector, value)`: 

Redefines the item value.

3. `modify (data, selector, modifier)`: 

Modifies the item value through a function.

4. `exists (data, selector, success, error)`: 

Do different things depending on its existence.

5. `ensure (data, selector, value)`: 

Same than set but when value is not provided, it sets a {}.

That is all.


# 3.1. How does it work?

#### The 2 common parameters:

1. The `data`: nestable object or array with the data to be searched in.

2. The `selector`: array with strings for each nested property to be accessed.

#### The other commands:

3. The `modifier` at `modify (data, selector, modifier)`:

Function that can return whatever in the last moment of the function.

```js
function modify (
	parent /* object */, 
	key /* string */, 
	data /* object */, 
	selector /* array of strings */
	) {
	// ...
}
```.

# 4. Usage

### a) Start retrieving the 3 functions:

```js
var {get,set,modify} = DeepGetterSetter;
```

### b) Test the example (found at `test/deep-getter-setter-spec.js`):

```js
// Retrieve the 3 functions:
var {get,set,modify,exists,ensure} = DeepGetterSetter;

// Some random data:
var data = {a:{b:[0,5,10]}};

// Check that that the getter works okay:
console.log(get(data, ["a","b","1"]) === data["a"]["b"]["1"] ? "Passed getter 1!" : "Failed!");

// Use the setter:
set(data, ["a","b","1"], 6);

// Check that the setter worked good:
console.log(get(data, ["a","b","1"]) === 6 ? "Passed setter 1!" : "Failed!");

// Use the modifier:
modify(data, ["a","b","1"], function(parent, key) {
 return ++parent[key];
});

// Check that the modifiers worked fine:
console.log(get(data, ["a","b","1"]) === data["a"]["b"]["1"] ? "Passed modifier 1!" : "Failed!");

// Use the exists:
console.log(exists(data, ["a", "b", "5"]) === false ? "Passed exists 1!":"Failed!");

// Check that the exists worked fine:
console.log( (!(5 in data["a"]["b"])) ? "Passed exists 2!" : "Failed");

// Use the ensurer:
ensure(data, ["a", "b", "5"]);

// Check that the ensurer worked fine:
console.log(exists(data, ["a", "b", "5"]) === true ? "Passed ensurer 1!" : "Failed!");
console.log(typeof (get(data, ["a", "b", "5"])) === "object" ? "Passed ensurer 2!" : "Failed!");
```

# 5. Conclusion

This is a small tool that you can use in any type of your projects, to easily retrieve and reset values, among other operations.
