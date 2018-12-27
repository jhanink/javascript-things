# Javascript Things

```
npm install
npm link babel-cli
```

See the _ECMAScript standard_ by TC39, [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm)

The _JSON standard_ __can be found__ at [ECMA-404](http://www.ecma-international.org/publications/standards/Ecma-404.htm)

## `intro: history`

* `JavaScript` was first called `Mocha`, then `LiveScript`
* First announced in December, 1995
* First released in Netscape Navigator 2.0 in March, 1996
* Delivered to standards body `Ecma International` in November, 1996
* Categorized as `ECMA-262` under working group `TC39`
* Release timeline
   * `es1` was adopted in June, 1997
   * `es2` was adopted in June, 1998
   * `es3` was adopted in December, 1999
   * The 4th edition was never published
   * `es5` was adopted in December, 2009
   * `es5.1` was adopted in June, 2011
   * `es6`, officially `ES2015`, was adopted June 2015
   * `es7`, or `ES2016`, is small and will only contain [2 new features](http://www.2ality.com/2016/01/ecmascript-2016.html)
   * `ES2017` [draft spec](http://www.2ality.com/2016/01/ecmascript-2016.html)
   * [github/tc39/ecma262 official](https://tc39.github.io/ecma262/)

## `intro: implementations`

* es 5.1 implementations
   * `SpiderMonkey`, used in Firefox with the `Gecko` layout engine
   * `V8`, used in Chrome
   * `JavaScriptCore (Nitro)`, used in WebKit, Safari
   * `Chakra`, used in Microsoft Edge
   * `JScript`, used in IE with the `Trident` layout engine
   * `Rhino`, used in Java

## `intro: vm optimization penalties`

See [Optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)

_Highlights_:

* if a construct is not optimizable, the entire containing function becomes unoptimized
   * this is true even if the code is unreachable
   * if necessary, isolate such code to a minimal function
* currently not optimizable (in the major vms)
   * functions with `try{} catch{}` or `try{} finally{}`
   * functions containing object literal having `.__proto__`
      * e.g. as might be done with es6 object literal initializers
   * functions containing object literals having `get` or `set` properties
   * functions with `eval()`
   * functions with `with() {}`
   * functions containing `debugger`
* leaking `arguments`
   * `arguments` object must not be __leaked__ OR __passed__
      * `() => arguments`
      * `[].slice.call(arguments)`
      * Only use `arguments` with `.length` or `[i]` where `i` is a valid integer index into `arguments`
         * i.e. index cannot be out of bounds
      * `fn.apply(y, arguments` is a special case and is OK
* `for...in` with 'non-local' key
   * the referenced 'key' must be a 'pure local variable'
      * don't do `var key; var f=(obj)=>{for (key in obj)}`
      * don't do `var f=(obj)=>{for (var key in obj){}; return ()=>key;}`
* iterating over non `simple enumerable` objects
   * non `simple enumerable` is one using properties that aren't valid identifiers
   * this results in `hash table mode` or `dictionary mode`, backed by a hash table
   * this includes objects containing a property that is an `array index` (a.k.a. an element)
      * never use `for...in` with an `Array`
      * `function() { var a=[1,2]; for (var i in a) {} }` will not be optimized
      * if necessary, use `Object.keys(a)` with a regular `for` loop
* `hash table mode`
   * when re-structuring an object
      * don't use `delete`
         * prefer assignment to `undefined`
      * don't dynamically add properties after initialization
         * prefer a fully predefined structure via constructor or object literal assignment
   * when using properties that aren't `valid identifiers`
      * e.g. `{'-': 3}`
   * when an object has `enumerable properties` in its `prototype chain`
      * e.g. `Object.prototype.fn = function() {}` 

## `variables`

* variables are *loosely typed*, not *statically typed*
* variables can be assigned and reassigned to values of different types
* variable declarations are hoisted to the top of their function scope
* for function declarations
  * the function declaration and definition are hoisted
* for __all__ variable declarations
  * the variable declaration is hoisted, but not the assignment
    * this includes function expression definitions

```javascript
function outer() {
  a(); // -> "a"
  b(); // -> TypeError: b is not a function

  // for this function declaration,
  // both declaration and definition are hoisted
  function a() {
    console.log("a");
  }

  // for this variable declaration,
  // only the variable declaration is hoisted
  var b = function() {
    console.log("b");
  }
}
```

## `types`

* built-in basic data types such as String (as returned from `typeof`)
   * Note: `instanceof` can be used to check constructor types that are not of the basic types
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
      * `Number(null) // 0`
   * `undefined` is a special case
      * a "primitive" value that has the formal type of `undefined`
      * it is not an object
      * `typeof(undefined) === 'undefined' // true`
      * `undefined instanceof Object // false`
      * `undefined === undefined // true`
      * `Number(undefined) // NaN`
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
   * note that object prototypal "inheritance" is delegative OLOO (objects linking to other objects)
      * `({}).__proto__ === Object.prototype // true`
* built-in objects
   * `String`, `Number`, `Boolean`
      * these provide the prototype for "instance wrappers" around the associated primitive types
      * String methods
         * `charAt`, `indexOf`, `concat`, `split`, `slice`, `substring`, `toLowerCase`, `startsWith`, `trim`
         * regex: `match`, `replace`, `search`
   * `Array`, `Function`, `Object`, `RegExp`
      * An instance of Array is a regular object having integer key properties that have a relationship to its `length` property
         * the integer key properties act as a numbered index
      * `Array` type checking
         * `var arr = []`
         * `arr instanceof Array  // true`
         * `arr.constructor === Array  // true`
         * `Array.isArray(arr)  // true`
      * An instance of `Function` is a callable object
         * can be called/invoked as a function (to execute arbitrary work)
         * can be used with the `new` operator as a constructor to return a new object of the given type
            * `var Person = function() {}; var me = new Person()`
         * within the function, `var foo = function bar() {}`, call using `foo()`, `bar()`
         * do not use `arguments.callee` -  not supported in strict mode. Use the function name.
      * `Object` constructor
         * `new Object()` returns the empty object `{}`
         * `new Object(1)` returns a new Number object
         * `new Object(1) === new Object(1) // false` two new objects that happen to have the same value
         * `var a = new Number(1);  new Object(a) === new Object(a) // true` each returns the object `a`
      * `Object.freeze()`
         * `var a = {p:1}; Object.freeze(a)` - `p` cannot be modified or extended 
      * `Object.preventExtensions()`
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

* in operator
  * `x in obj` checks if `x` is a property of `obj`, regardless of the enumerable flag
  * `for (var x in obj)` gets only enumerable properties (own and inherited)
* comma operator
   * `for (var i = 0, j = 9; i <= j; i++, j--){}`
* `delete` operator
   * `var obj = {a:1};  delete obj.a;`
   * [See delete on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
   * NOTE: `delete` has a [degenerative v8 optimization penalty](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#521-objects-that-are-in-hash-table-mode-aka-normalized-objects-dictionary-mode---objects-who-have-a-hash-table-as-a-backing-data-structure-are-not-simple-enumerables)
* void operator
   * `void(0)`
* spread operator
   * `var a=[1,2,3]; var b=[0, ...a] // b: [0,1,2,3]`
   * `var f = (x,y,z) => x + y + z;  f(...a); // calls f(1,2,3) --> returns 6`

## `objects`

* an object literal is an `Object`
   * `var a = {}` is a shortcut for the constructor function `var a = new Object()`
   * `{}.__proto__ === Object.prototype // true`
   * `{}.constructor.prototype === Object.prototype // true`
   * whereas `Object.create(null)` inherites from nothing
   * `Object.create(null).__proto__ // -> undefined`
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
   * by default, the prop will be immutable and not enumerable (excluded from `for...in` loop and `Object.keys()`)
      * `Object.defineProperty(a, 'p', {}) // immutable`
* object property enumeration
   * `for...in` loops over all own enumerable properties and in prototype chain
   * use `obj.hasOwnProperty(key)` to check for only own properties
   * `Object.keys(obj)` array of all own (not in prototype chain) enumerable property names 
   * `Object.getOwnPropertyNames(obj)` array of all own property names (both enumerable and not)
   * note that while `for (var x in obj)` gets only enumerable properties
     * `x in obj` simply checks if `x` is a property of obj, regardless of the enumerable flag
* get object property descriptors
   * to determine `configurable`, `enumerable`, `writable`, `value`
   * `Object.getOwnPropertyDescriptor(obj, prop)`
   * [See this jsbin](http://jsbin.com/zazuzi/edit?js,console)
* create an object of a given type without a constructor function
   * `var Phone = {brand:"generic", getBrand: function() {console.log(this.brand)}}`
   * `var iphone = Object.create(Phone);`
   * `iphone.brand = "iphone"`
   * `iphone.getBrand() // iphone`
   * [jsbin example]{http://jsbin.com/jiruva/1/edit?js,console}
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
      * `var a = [10,,20,,30,40]` contains two __elisions__ at `a[1]` and `a[3]`
      * `[...a.keys()] // -> [0,1,2,3,4,5]`
      * `Object.keys(a) // -> ['0', '2', '4', '5']`
   * `Array.forEach()` visits each __element__ in the array, as opposed to each __index__.
      * `var a = [10,,20]`
      * will visit `a[0]` and `a[2]`, as there is no member a `a[1]`
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
* An __array-like__ object is an iterable object and can be converted to a proper Array
   * `Array.from({'0':10, '1':20, 'length':2} ) // -> [10,20]`
   * `Array.from({'0':10, '1':20}) // -> []`
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
* Function declaration vs function expression
  * A function declaration gets added to the execution context's 'variable object'
    * In the global context, `function f() {}; "f" in window // -> true`
  * A function expression is evaluated inline
    * `(function f() {}); "f" in window // -> false`
* Function currying reduces the 'arity' of a function into an invocation chain of unary functions
* Partial application reduces the 'arity' of a function by binding (applying) some parameter values
* Use default params to change the 'arity' of a function for partial application
   * Use `Function.prototype.bind` to define leading args (es5)
      * `var f = function (a,b,c) {return a+b+c}`
      * `var g = f.bind(null,1,2)`
      * `g(3); // returns 6`
      * or use a fat arrow to create an unary function
      * `var g = c => f(1,2,c);`
   * Use default trailing parameters (es6)
* example of currying
  * `var f = function(x,y) {return x+y}`
  * `var g = function(x) { return function(y) {return x+y}}`
  * `f(2,3) // -> 5`
  * `g(2)(3) // -> 5`

```
babel-node code/functions.js
```

## `prototype, function constructor`

* a traditional class is an abstract definition used to "instantiate" or "realize" a concrete object
* an es6 class is syntactic sugar over the prototype model
```javascript
class Father {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Son extends Father {
  getName() {
    return super.getName() + " Jr.";
  }
}

var boy = new Son("Jack");

boy.getName(); // -> "Jack Jr."
```
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
* `let` and __Temporal Dead Zone__
   * `console.log(foo)`
   * `let foo=1`
   * `foo` is hoisted to the top of its scope, but it is unrecognized until the declaration
      * the above will throw a `ReferenceError`
      * the region between the hoisted position and the declaration is known as a `TDZ` or __Temporal Dead Zone__
* Promises
  * `var p = new Promise(function (resolve,reject){ if (success) resolve(data) else reject(reason) });`
  * [jsbin XMLHttpRequest example](http://jsbin.com/yekodug/edit?html,js,console)
  * [MDN reference and examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* async/await
  * a function can be marked `async`
  * the function can then `await` a Promise
  * the function can be written in synchronous style
  * the function is still async, so can't return the outcome of the Promise
  * [codepen async/await](http://codepen.io/jhanink/pen/YqLJmO?editors=0011)
* Generators, Iterables, Observables
  * TBD
* destructuring
  * Given: `let arr = [1,2,3];`
  * Then - `let [el1, el2] = arr;` is equivalent to `var el1=arr[0], el2=arr[1];`
  * Given: `let obj = {p:1, q:2, r:3};`
  * Then - `let {p, q} = obj;` is equivalent to `var p=obj.p, q=obj.q;`
* `setTimeout` vs `setInterval`
  * `setTimeout`
    * will be called after some specified delay
    * a blocking operation can further delay the execution
    * a nested setTimeout will occur in `delay + block + execution + delay + block`
    * the calls do not 'stack up'
    * there will not be a flurry of calls
  * `setInterval`
    * will be queued every `n` milliseconds
    * a blocking operation that spans multiple intervals will enqueue at most 1 call
    * the delay between calls is not guaranteed
      * if a call is queued, it may execute near the next scheduled call
      * it could be more or less than the specified delay
    * there will not be a "flurry" of calls

## `language core, internals`
* __Execution context__
  * an object used to track progress of the associated code
  * can be __global ec__, __function ec__, __eval ec__
  * maintained on a stack, with the "global ec" at the bottom and the "active ec" at the top 
  * an execution context contains
    * __variable object__ - vars, function decl, args
    * __scope chain__ - Variable object + parent scopes
    * __this value__ - Context object
* __Variable object__
  * contains variables, function declarations
  * in the browser global execution context, the __Variable object__ is the global `window` object
  * in a function call (activation), an object, known as an __Activation object__ is created
    * the __Activation object__ is used as the __Variable object__ for the function context
    * it is a __Variable object__ augmented with the function's __formal parameters__ and `arguments` object
* __Scope chain__
  * like a __prototype chain__, a __scope chain__ is a chain of scope objects
  * in an execution context, the __Scope object__ is the __Variable object__
  * resolving a variable starts in the __own scope__ (Variable/Activation object)
  * lookup continues up the chain of parent variable objects, ending at the global scope
  * __free variables__ (non-local variables) require scope chain lookup
  * a scope chain is the set of own and parent __Variable objects__
  * a scope chain consists of linked scope objects
  * a variable lookup implies a prototype chain search for each scope link
  * a scope object may include dynamically added material (e.g. __with objects__)
      
__See Below:__
* in the `with` block, local scope is that of `{}`
  * `x` is not found in that local scope
  * `x` is sought up the prototype chain and is found at `Object.prototype`
  * the search for `x` does not proceed up the scope chain where `x` has the value `100`
  * a scope search exhausts the local scope object's prototype chain before proceeding along the scope chain
  * a scope search does a `__proto__` lookup before a `__parent__` lookup
```javascript
// the 2-dimensional prototype and scope chain lookup
// can lead to unexpected behavior outside of strict mode

Object.prototype.x = 10; // top of prototype chain
var x = 100; // top of scope chain
with ({}) {
  console.log(x); // prints 10, not 100
}
console.log(x); // prints 100, not 10
```

* __Closures__
  * closures are meant to handle the __funargs__ (functional arguments) problem
  * there are two flavors of funargs problems, __upward__, and __downward__
  * __upward__ refers to how free variables are resolved when a function is returned from a function
    * the inner function saves the parent scope chain __at the time of creation__
    * this kind of scope is known as __static__ or __lexical__ scope
  * __downward__ refers to how a function resolves an _ambiguous_ identifier
    * given a local and global variable, the static scope at the time of function creation is used
    * this is the same __lexical__ scope behavior as above
  * a function, together with its saved __static/lexical__ scope chain is the __definition of a closure__
  * since all functions save lexical scope at creation, all functions are closures
  * a function has a static/lexical scope chain known and saved at the time of creation/definition
    * this is used to resolve free variable lookups
    * the combination of the function and its scope chain form a closure

```javascript
// when a function is created, the current lexical scope is saved with the closure
var a = 10;

function f() {
  return a;
}

function g() {
  var a = 100;
  return f();
}

g(); // -> returns 10
```

```javascript
function x() {
  var b = 50;
  return function() {
    return b;
  }
}

var fx = x();
var b = 500;
fx(); // -> returns 50
```

* __this value__
  * `this` is another property of an execution context
  * it is the __context object__ against which an __execution context__ is __activated__
  * the value of `this` is determined when entering the execution context
  * in the global execution context, `this` is the __global object__ and so equals the __Variable object__
  * in a function context, the value of `this` depends on how the function is activated/called
  * if a function is a property of an owner object and activated via method call, then `this` is the owner object
  * if a function ref is disassociated from any object and then activated, `this` is the global object
    * unless the function was previously bound to some context object
      * as with [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
      * or by the implicit binding of an arrow function

```javascript
function f() {
  let context = {
    val: 10,
    fn: function() {
      return () => this.val;
    }
  }
  return context.fn();
}

let x = {
  test: 100,
  arrow: f.fn()
}

let theArrow = x.arrow;

theArrow(); // -> 10, because the arrow function is innately bound to and thus activated against 'context'
```

* the __language core__ information was extracted from [Dmitry Soshnikov's javascript blog](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)

## `code examples`

* flatten an array using recursive reduce `babel-node code/reduce.js`
* find two numbers in an array that sum up to an input value `babel-node code/two-sum.js`

## `browsers`

* circular references aren't garbage collected in IE, leading to memory leaks
* use polyfills to support older browsers
* use transpilers (e.g. babel) to compile es6 down to vanilla js

## `misc`

* use event delegation, e.g. `$(document).on( "click", "#selector", function() {});`
* interesting difference in the treatment of an explicit vs implicit variable on the global object

```javascript
  var a=1;
  b=1;
  window.c=1;
```
* for the above
  * all three will add a property to the global window object
  * but `a` is not __configurable__ - i.e. does not allow `delete` from the global object
  * [See this jsbin](http://jsbin.com/zazuzi/edit?js,console)

## `js concepts`
* *vm turn*
   * one cycle through the js event loop

* *Functional Programming*
   * Pure functions - idempotent, free of side effects, avoids shared/mutable data
   * First class functions - first class citizens and can be passed around
   * Higher order functions - functions that take or return other functions
   * Encourages immutability and loose coupling; avoids inflexible class hierarchies
* *Prototypal Inheritance*
   * Favors delegation/composition over class inheritance
   * Instances inherit directly from other objects (OLOO - objects linked to other objects)
   * Achieved using function constructors with `new` or via `Object.create(somePrototype)`
* *Concatenative (or Selective) inheritance*
   * Mixin composition from one of more source objects
   * See [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
* *Exemplar Prototypes*
   * Used for flexible cloning as a means of "concatenative inheritance" instead of rigid class libraries

## `general concepts`

* *Memoization*
   * An optimization technique that saves calculated results in a lookup table for repeated access
   * Example: `code/two-sum.js`
      * Given an array of integers, find two numbers such that they add up to a specific target number
      * Avoid the O(n^2) nested loop
      * Use a single pass O(n) loop storing candidates in a map by key `value2 = target - value1` for lookup matching of subsequent entries
* *Virtual DOM*
   * Memory structure for staging DOM changes
   * Performs an efficient before/after diff (a.k.a __reconciliation__ in React)
      * Minimizes expensive DOM updates and thus reduces browser DOM reflow churn
   * Utilizes synthetic events to allow event listeners to run without incurring the cost of browser event propagation
   * Conceptually similar to double-buffering in game programming

## `useful git projects`

* [es6 features](https://github.com/lukehoban/es6features)
* [es6 equivalents in es5](https://github.com/addyosmani/es6-equivalents-in-es5)
* [VerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions) - Use common language expressions to compose RegEx
* [front end developer questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions) - 20k github stars
* [most starred github projects](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)
* [javascript framework resources](https://github.com/vhf/free-programming-books/blob/master/javascript-frameworks-resources.md) - 50k github stars
* [postman commandline](https://github.com/postmanlabs/newman/)
* [v8 optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)

## `helpful resources`

* [30 seconds of code](https://github.com/30-seconds/30-seconds-of-code)
* [10 Interview Questions Every Javascript Developer Should Know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.24qhy21h7) - by Eric Elliott
* [The javascript job market](https://medium.com/javascript-scene/forget-the-click-bait-here-s-what-the-javascript-job-market-really-looks-like-in-2016-ddfe0d39b467#.qayjac9w2)
* [The es6 conundrum](http://www.sitepoint.com/the-es6-conundrum/)
* [leetcode mockinterview](https://leetcode.com/mockinterview/)
* [Job search technical interviewing](http://robertheaton.com/2014/03/07/lessons-from-a-silicon-valley-job-search/)
* [Intervews: CS/Algos vs engineering - Hacker News](http://robertheaton.com/2014/03/07/lessons-from-a-silicon-valley-job-search/)
* [Interview process at Stripe](https://www.quora.com/What-is-the-engineering-interview-process-like-at-Stripe)
* [Inside V8 with Lars Bak](https://channel9.msdn.com/Shows/Going+Deep/Expert-to-Expert-Erik-Meijer-and-Lars-Bak-Inside-V8-A-Javascript-Virtual-Machine)
* [grunt, gulp, webpack](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/)
* [javascript the core, by Dmitry Soshkinov](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)


## `misc fun random`

* *Cognates* - words that have the same etymological origin (from Latin `cognatus`, meaning `blood relative`)
   * Example - `memoize` & `memorize`

![Etymology of cognate](https://github.com/jhanink/javascript-things/blob/master/images/Etymological_Relationships_Tree.png?raw=true)

https://en.wikipedia.org/wiki/Cognate#/media/File:Etymological_Relationships_Tree.png
