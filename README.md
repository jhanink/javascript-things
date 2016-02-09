# Javascript Things

It's impossible to remember everything, and it's hard to remember everything that's important.

Maintaining a list of 'everything' isn't very useful, since that's what google, mdn, and stackoverflow are for. 

But I do want to remember some things. This acts as a reference for particular information that may or may not be useful to other persons. 

```
npm install
npm link babel-cli
```

## `javascript variables`

* variables are "loosely typed", not "statically typed"
* variables can be assigned and reassigned to values of different types
* variable declarations are hoisted to the top of their function scope

## `javascript types`

* built-in data types (as returned from `typeof`)
   * `string`, `number`, `boolean`, `null`, `undefined`, `object`, (`function`)
   * `string` is a special case
      * a string literal primitive is not an object
         * `typeof('abc') === 'string' // true`
         * `'abc' instanceof Object // false`
      * a string literal can be used as if it were an object
         * `'abc'.substring(1) // -> 'b`
         * the js runtime autoboxes the string literal to a String object to perform the operation
         * `'abc'.substring(1)` is logically equivalent to `new String('abc').substring(1) // -> 'bc'`
         * `String.substring` returns a string literal, not a new String object
   * `number`, `boolean`, `string` literal primitives can be autoboxed
      * `(1).toFixed(2) // '1.00'`
      * `true.valueOf() // true`
      * `'abc'.indexOf('b') // 1`
   * `null` is a special case
      * a global primitive property that has a formal type of `object` but with no properties or methods
      * it is not itself an instance of any `Object`
      * it is a value that represents `the absence of an object`
      * a variable assigned to the value `null` is not a reference to anything
      * `typeof (null) === 'object' // true`
      * `null instanceof Object // false`
      * `null === null // true`
   * `undefined` is a special case
      * a "primitive" value that has the formal type of `undefined`
      * it is not an object
      * `typeof(undefined) === 'undefined' // true`
      * `undefined instanceof Object // false`
      * `undefined === undefined // true`
   * `NaN` is an especially special case
      * `typeof (NaN) === 'number' // true`
      * `NaN instanceof Number // false`
      * `NaN === NaN // false`
      * `NaN == NaN // false`
      * `isNaN(1) // false`
      * `isNaN("a") // true`
   * `function` is a special case
      * a function is a regular object with the additional capability of being `callable`
      * `typeof (function(){}) === 'function'` - a function literal of type `function`
      * `(function(){}) instanceof Object // true`
      * `(function(){}) instanceof Function // true`
   * `new function(){}` creates a new object via the function literal's constructor
      * returns `{}` -  a plain `object` 
      * `typeof (new function(){}) === 'object'`
      * `(new function(){}) instanceof Object // true`
      * `(new function(){}) instanceof Function // false`
* javascript primitive data types
   * `string`, `number`, `boolean`, `null`, `undefined`
   * primitives are **discrete** types
   * simple value types as opposed to **complex** object types
* javascript `object` data type
   * an object is a key/value (hash) data structure
   * a function is a callable object, so some objects are functions
      * objects that are `function` types can be constructors with `new`
         * `typeof Object === 'function' // true`
         * `typeof Number === 'function' // true`
         * `typeof String === 'function' // true`
         * `typeof Boolean === 'function' // true`
         * `typeof Array === 'function' // true`
   * note that object prototypal "inheritance" is really OLOO (objects linking to other objects)
      * `({}).__proto__ === Object.prototype // true`
* built-in objects
   * String, Number, Boolean
      * these provide the prototype for "instance wrappers" around the associated primitive types
      * String methods
         * `charAt`, `indexOf`, `concat`, `split`, `slice`, `substring`, `toLowerCase`, `startsWith`, `trim`
         * regex: `match`, `replace`, `search`
   * Array, Function, Object, RegExp
      * An instance of Array is a regular object integer key properties that have a relationship to its `length` property
         * the integer key properties act as a numbered index
      * Array type checking
         * `var arr = []`
         * `arr instanceof Array  // true`
         * `arr.constructor === Array  // true`
         * `Array.isArray(arr)  // true`
      * An instance of Function is a callable object
         * can be called/invoked as a function (to execute arbitrary work)
         * can be used with the `new` operator as a constructor to return a new object of the given type
            * `var Person = function() {}; var me = new Person()`
         * within the function, `var foo = function bar() {}`, call using `foo()`, `bar()`
         * do not use `arguments.callee` -  not supported in strict mode. Use the function name.
      * Object constructor
         * `new Object()` returns the empty object `{}`
         * `new Object(1)` returns a new Number object
         * `new Object(1) === new Object(1) // false` two new objects that happen to have the same value
         * `var a = new Number(1);  new Object(a) === new Object(a) // true` each returns the object `a`
      * Object.freeze
         * `var a = {p:1}; Object.freeze(a)` - `p` cannot be modified or extended 
      * Object.preventExtensions
         * `var a = {p:1}; Object.preventExtensions(a)` - `p` can be changed but `q` can't be added
      * Object creation by copying (shallow clone) an object (not prototypal inheritance)
         * `var b = Object.assign({}, a)` copies own properties from `a` to target and returns the target
      * Object creation with prototypal inheritance
         * `function Shape() {this.x=0, this.y=1}`
         * `Shape.prototype.move = function(x,y) {this.x += x; this.y += y;}`
         * `function Rectangle() {Shape.call(this)}`
         * `Rectangle.prototype = Object.create(Shape.prototype)`
         * `Rectangle.prototype.constructor = Rectangle`
         * `var r = new Rectangle();  r.move(1,1)`
      * RegExp literal expression
         * start and end with `/`
         * `var r = /ab+c/`
         * `r instanceof RegExp // true`

## `operators`

* comma operator
   * `for (var i = 0, j = 9; i <= j; i++, j--){}`
* delete operator
   * `var obj = {a:1};  delete obj.a;`
* void operator
   * `void(0)`
* spread operator
   * `var a=[1,2,3]; var b=[0, ...a] // b: [0,1,2,3]`
   * `var f = (x,y,z) => a+b;  f(...a); // calls f(1,2,3)`

## `objects`

* consider properties to be like variables attached to an object
   * a property can be an identifier, string literal, or a number
   * a property that is not a valid identifier can only be accessed via bracket notation
   * `var a = {a:1, 20:"twenty", "":"empty", "@-^": "works"}`
   * `a.a // 1`
   * `a[20] // 'twenty'`
   * `a["20"] // 'twenty`
   * `a[""] // 'empty'`
   * `a["@-^"] // 'works'`
* add a property using `defineProperty`
   * `var a = {}`
   * `Object.defineProperty(a, 'p', {configurable:true, enumerable:true, writable:true}) // {p: undefined}`
   * `Object.defineProperty(a, 'p', {configurable:true, enumerable:true, value:'val'}) // {p: 'val'}`
   * by default, the prop will be immutable and not enumerable (excluded from `for...in` loop and `Object.keys()`
      * `Object.defineProperty(a, 'p', {}) // immutable`
* object property enumeration
   * `for...in` loops over all own enumerable properties and in prototype chain
   * use `obj.hasOwnProperty(key)` to check for only own properties
   * `Object.keys(obj)` array of all own (not in prototype chain) enumerable property names 
   * `Object.getOwnPropertyNames(obj)` array of all own property names (both enumerable and not)
* create an object of a given type without a constructor function
   * `var Phone = {brand:"generic", getBrand: function() {console.log(this.brand)}}`
   * `var iphone = Object.create(Phone);`
   * `iphone.brand = "iphone"`
   * `iphone.getBrand() // iphone`
* getters and setters
   * `var a = {a: 1, get propA() {return this.a}, set propA(x) {this.a = x}}`
   * `a.a // 1`
   * `a.propA // 1`
   * `a.propA = 100`
   * `a.a // 100`
* object literals in ES2015 (es6)
   * can declare the target prototype, equivalent to the imperative `Object.create(targetProtoObject)`
   * can use compact function notation
   * can use computed property names
```
  var obj = {
    // __proto__
    __proto__: targetProtoObject,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
      // Super calls
      return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
  };
```

## `arrays`

* An array is of type '`object`' but is printed as '[]' as opposed to '{}'
   * An Array is an iterable object with index keys and a length property
   * es6 array iterators have a `.next()` method
      * `var a = [10,20,30]`
      * `var aIter = a.keys()`
      * `aIter.next().value // -> 10`
   * An iterator `a.keys()` is sparse (doesn't skip holes); `Object.keys()` is dense
      * `var a = [10,,20,,30,40]`
      * `[...a.keys()] // -> [0,1,2,3,4,5]`
      * `Object.keys() // -> [0,2,4,5]`
   * Check if an object is an array
      * `Array.isArray(obj)`
      * `obj instanceof Array`
* An array literal is a kind of object initializer
* Extra commas in array literals
   * `var a = [1,2,,4,5,,,]`
   * the unspecified elements will be `undefined`
      * `a[2] // undefined`
      * `Object.keys(a) // [ '0', '1', '3', '4' ]`
   * the last of any trailing commas is ignored
      * `a.length // -> 7`
      * `[10,].length // -> 1`
      * `[10,,].length // -> 2`
* The `length` property
   * setting length can resize an array
   * `var a = [1,2]`
   * `a.length // 2`
   * `a.length = 5 // -> [1, 2, , , ]`
   * `a.length = 1 // -> [1]`
* The `arguments` object of a regular function is an 'array-like' object that prints `{}`. 
   * It can be converted to a proper array with `Array.from(arguments)` (es6)
   * `Array.slice(arguments,0)` (es5) also works but is not recommended
      * (via MDN) "You should not slice on arguments because it prevents optimizations in JavaScript engines (V8 for example)"
* An array-like object is an iterable object; e.g. `{ '0': 10, '1': 20 }` and has a `.length` property
* Array prototype methods may alter or create. '`shift`' alters, whereas '`slice`' creates.
   * some methods that return a new array
      * `.concat()`, `.slice()`, `.filter()`, `.map()`, `.reduce()`
      * note that while `.map()` doesn't alter the original array, it can be modified from the callback function `fn(curVal,i,origArray)`
   * some methods that alter the array
      * `.shift()` - returns the removed (head) element
      * `.unshift()` - returns the new length of the array
      * `.splice()` - returns the removed elements (in an array)
      * `.reverse()` - returns `undefined`
      * `.sort()` - returns `undefined`

```
babel-node code/arrays.js
```

## `arrow functions (es6)`

* Arrow functions inherit `this` from the enclosing context, also known as 'lexical' or 'static' context. The '`this`' reference is not dynamically determined and is not observed when supplied from a `bind`, `call`, or `apply` method. 
   * A regular function that isn't already bound can be re-wired to a different object.
   * An arrow function is equivalent to `function() {}.bind(this)` that is statically bound and cannot be re-bound
* Arrow functions do not get their own `arguments` object.
* Since arrow functions don't get a proper `arguments`, use a 'rest' parameter instead.
   * Note that arrays and 'rest' objects can be used to 'spread' out as parameters to another function invocation.
* Use parentheses to return an object literal when using concise syntax
   * `let f = () => ({ a: 1});` // without parens, it's just a function block without a return statement and returns `undefined`.

```
babel-node code/arrow-functions.js
```

## `functions`

* Use default params to change the 'arity' of a function for partial application (and function currying)
   * Use `Function.prototype.bind` to define leading args (es5)
      * `var f = function (a,b,c) {console.log(arguments)}`, `f.bind(null,1,2)(999)`
   * Use default trailing parameters (es6)

```
babel-node code/functions.js
```

## `prototype, function constructor`

* a class is an abstract definition used to "instantiate" or "realize" a concrete object
* a prototype is an existing object that acts as a template to initialize a new object
   * `var P = function() {this.test = 500}`
   * `var b = new P()`
      * creates an object from the constructor function of `P`
      * `b` is a new object, initialized to the value `{test: 500}`
      * `b.__proto__ === P.prototype` now b has a pointer to `P`
      * `b` has its own object value but also inherits from `P`
      * `b.__proto__` can be assigned to another parent, `b.__proto__ = Q.prototype`
      * `.prototype` changes are dynamic and visible to all children
      * `var c = new P()`
      * `P.prototype.hi=10`
      * `b.hi === 10 && c.hi === 10 // true`
   * use `Object.create`
      * `var a = {hi: function() {return "hi"}}`
      * `var b = Object.create(a)`
      * `b.__proto__ === a // true`
      * `b.hi() // -> "hi"`
   * create a type hierarchy
      * `var Animal = function() {this.alive = true}`
      * `var Mammal = function() {Animal.call(this); this.warm = true}`
      * `var dog = new Mammal()`
      * `dog.alive && dog.warm // true`

## `undefined`

* A variable can be undefined, and a value can be undefined
   * `var a` // a declared, b not declared
   * `typeof(a) // 'undefined'`
   * `typeof(b) // 'undefined'`
   * `a == null // true`
   * `b == null // in strict mode throws ReferenceError: b is not defined`

## `language features`

* `for...of` (es2015) - like `for...in` but iterates over the property values instead of the keys
* strict mode
   * place `use strict` at the head of a file
   * or place `use strict` at the beginning of a function
   * do not concatenate mixed strict and non-strict files (whichever is first wins)
* template strings
   * string literals with embedded expressions
   * `var num = 22`
   * ``var t = `the number is ${num}` ``

## `code examples`

* flatten an array using recursive reduce `babel-node code/reduce.js`
* find two numbers in an array that sum up to an input value `babel-node code/two-sum.js`

## `browsers`

* circular references aren't garbage collected in IE, leading to memory leaks
* use polyfills to support older browsers
* use transpilers (e.g. babel) to compile es6 down to vanilla js

## `misc`

* use event delegation, e.g. `$(document).on( "click", "#selector", function() {});`

## `js concepts`

* *Exemplar Prototypes*
   * Used for flexible cloning as a means of "concatenative inheritance" instead of rigid class libraries
* *Functional Programming*
   * Pure functions - idempotent, free of side effects, avoids shared/mutable data
   * First class functions - first class citizens and can be passed around
   * Higher order functions - functions that take or return other functions
   * Encourages immutability and loose coupling; avoids inflexible class hierarchies
* *Prototypal Inheritance*
   * Favors delegation/composition over class inheritance
   * Instances inherit directly from other objects (OLOO - objects linked to other objects)
   * Supports "selective" or "concatenative" inheritance (mixin composition from many objects)
      * see [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## `general concepts`

* *Memoization*
   * An optimization technique that saves calculated results in a lookup table for repeated access
   * Example: `code/two-sum.js`
      * Given an array of integers, find two numbers such that they add up to a specific target number
      * Avoid the O(n^2) nested loop
      * Use a single pass O(n) loop storing candidates in a map by key `value2 = target - value1` for lookup matching of subsequent entries
* *Virtual DOM*
   * Memory structure for staging DOM changes
   * Performs an efficient before/after diff (a.k.a 'reconciliation' in React)
      * Minimizes expensive DOM updates and thus reduces browser DOM reflow churn
   * Utilizes synthetic events to allow event listeners to run without incurring the cost of browser event propagation
   * Conceptually similar to double-buffering in game programming 

## `great git projects`

* [es6 features](https://github.com/lukehoban/es6features)
* [es6 equivalents in es5](https://github.com/addyosmani/es6-equivalents-in-es5)
* [VerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions) - Use common language expressions to compose RegEx
* [front end developer questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions) - 20k github stars!
* [most starred github projects](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)
* [javascript framework resources](https://github.com/vhf/free-programming-books/blob/master/javascript-frameworks-resources.md) - 50k github stars
* [postman commandline](https://github.com/postmanlabs/newman/)
* [grunt gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/)

## `good articles, sites`

* [10 Interview Questions Every Javascript Developer Should Know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.24qhy21h7) - by Eric Elliott
* [The javascript job market](https://medium.com/javascript-scene/forget-the-click-bait-here-s-what-the-javascript-job-market-really-looks-like-in-2016-ddfe0d39b467#.qayjac9w2)
* [The es6 conundrum](http://www.sitepoint.com/the-es6-conundrum/)
* [leetcode mockinterview](https://leetcode.com/mockinterview/)
* [Job search technical interviewing](http://robertheaton.com/2014/03/07/lessons-from-a-silicon-valley-job-search/)
* [Intervews: CS/Algos vs engineering - Hacker News](http://robertheaton.com/2014/03/07/lessons-from-a-silicon-valley-job-search/)
* [Interview process at Stripe](https://www.quora.com/What-is-the-engineering-interview-process-like-at-Stripe)


## `misc fun random`

* *Cognates* - words that have the same etymological origin (from Latin `cognatus`, meaning `blood relative`)
   * Example - `memoize` & `memorize` 

