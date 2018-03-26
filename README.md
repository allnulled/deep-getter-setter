# deep-getter-setter

# 1. Introduction

The package deep-getter-setter is a very small but powerful tool. 

# 1.1. What is it for?

Basically:

Understanding that...

0. a nesteable is any object or array.

...then it is used to...

1. get deep values from a nesteable.
2. set deep values to a nesteable.
3. modify deep values of a nesteable.
4. check deep values of a nesteable.
5. ensure deep values of a nesteable.

...or in other words...

1. From this:

	`{a:{b:{c:{d:{e:{f:{g:{h:{i:{j:{k:{l:{m:888}}}}}}}}}}}}}`

2. And this:

	`'a b c d e f g h i j k l m'.split(' ')`

3. You can get this: 

	`888`

And from this simple idea, you can:

· `get`

· `set`

· `modify`

· `check`

· `ensure`


Note: Pssst!!! All of them are done by the `modify` method under the hood!

# 2. Installation

Just:

    ~$ npm install deep-getter-setter

### In Node.js (include literally to compatibilize the examples):

```js
const DeepGetterSetter = require("deep-getter-setter");
```

### In browsers:
```html
<script src="./node_modules/deep-getter-setter/src/deep-getter-setter.js"></script>
```

# 3. API comment

The API to master here:

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

#### The other parameters:

3. The `modifier` at `modify (data, selector, modifier)`:

Function that can return whatever in the last moment of the function.

```js
modify(someData, someSelector, function forLastNode (
	value /* any */,
	key /* string */, 
	parent /* object */, 
	index /* integer */,
	selector /* array of strings */
	accumulated /* array */,
	data /* object */,
	) {
	// Our modifier's code.
} 
[, function forEachNode (
	value /* any */,
	key /* string */, 
	parent /* object */, 
	index /* integer */,
	selector /* array of strings */
	accumulated /* array */,
	data /* object */,
) {
	// Our modifiers's iterative (from parents to leaves) code.
}]
```

4. The `value` at `set (data, selector, value)`:

Value (of any type) that is going to set at the selected holder.

```js
set(x, ["a"], 4) // Then x.a === 4
```

5. The `success` and `error` at `exists(data, selector, success, error)`:

Both are functions, and none obligatory. 

By default, it will return true when exists, and false when it does not exist.

```js
exists(x, ["a"]) // Then true if a is in x.
```

6, The `value` at `ensure (data, selector, value)`

When the selected node does not exist, it is created.

```js
ensure(x, ["a"]) // Then x.a will be something, or {}.
ensure(x, ["a"], 50) // Then x.a will be something, or 50.
```


# 4. Usage

### a) Start retrieving the API from the master object:

```js
var {get,set,modify,exists,ensure} = DeepGetterSetter;
```

### b) Test the example (found at `test/deep-getter-setter-spec.js`):

~$ `npm run test`

Which will execute some examples that demonstrate what we can expect from the API:


```js

// In Node.js:
const DeepGetterSetter = require("../src/deep-getter-setter.js");

// Retrieve the 3 functions:
var {get,set,modify,exists,ensure} = DeepGetterSetter;

// Some random data:
var data = {a:{b:[0,5,10]}};

// Check that that the getter works okay:
console.log(get(data, ["a","b","1"]) === data["a"]["b"]["1"] ? "Passed!" : "Failed -  getter 1!");

// Use the setter:
set(data, ["a","b","1"], 6);

console.log(get(data, ["a","b","1"]));

// Check that the setter worked good:
console.log(get(data, ["a","b","1"]) === 6 ? "Passed!" : "Failed -  setter 1!");

// Use the modifier:
modify(data, ["a","b","1"], function(parent, key) {
 return ++parent[key];
});

// Check that the modifiers worked fine:
console.log(get(data, ["a","b","1"]) === data["a"]["b"]["1"] ? "Passed!" : "Failed -  modifier 1!");

// Use the exists:
console.log(exists(data, ["a", "b", "5"]) === false ? "Passed!":"Failed -  exists 1!");

// Check that the exists worked fine:
console.log( (!(5 in data["a"]["b"])) ? "Passed!" : "Failed -  exists 2!");

// Use the ensurer:
ensure(data, ["a", "b", "5"]);

// Check that the ensurer worked fine:
console.log(exists(data, ["a", "b", "5"]) === true ? "Passed!" : "Failed -  ensurer 1!");
console.log(typeof (get(data, ["a", "b", "5"])) === "object" ? "Passed!" : "Failed -  ensurer 2!");
```

It must print everything "Passed!", and nothing "Failed - ...".


# 5. Conclusion

This is a small tool that you can use in any type of your projects, to easily retrieve and reset values, among other operations.
