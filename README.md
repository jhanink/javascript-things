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

## `javascript types`

* built-in data types (as returned from `typeof`)
   * `string`, `number`, `boolean`, `undefined`, `object`, `function` (, `null`)
   * `string` is a special case
      * a string literal is not an object
         * `"abc" instanceof Object // false`
      * a string literal can be used as if it were an object
         * `'abc'.substring(1) // -> 'bc`
         * the js runtime autoboxes the string literal to a String object to perform the operation
         * `'abc'.substring(1)` is logically equivalent to `new String('abc').substring(1) // -> 'bc'`
         * `String.substring` returns a string literal, not a new String object
   * `null` is a special case
      * a "primitive value" that has the formal type of `object`
      * it is not itself an instance of any `Object`
      * it is a value that represents `the absence of an object`
      * a variable assigned to the value null is not a reference to anything
      * `typeof (null) === 'object' // true`
      * `null instanceof Object // false`
      * `null === null // true`
   * `undefined` is a special case
      * a "primitive value that has the formal type of `undefined`
      * it is not
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
   * an object a key/value (hash) data structure
   * a function is a callable object, so some objects are functions
      * the global `Object` object happens to be a function object
         * `typeof Object === 'function' // true`
   * note that object prototypal "inheritance" is really OLOO (objects linking to other objects)
      * `({}).__proto__ === Object.prototype // true`

* built-in objects (provide the prototype for other objects)
   * String, Number, Boolean
      * these provide the prototype for "instance wrappers" around the associated primitive types
   * Array, Function, Object
      * An instance of Array is a regular object that has integer key properties that have a relationship to its `length` property
      * An instance of Function is a callable object
         * can be called/invoked as a function (to execute arbitrary work)
         * can be used with the `new` operator as a constructor to return a new object of the given type
            * `var Person = function() {}; var me = new Person()`
## `arrow functions (es6)`

* Arrow functions inherit '`this`' from the enclosing context, also known as 'lexical' or 'static' context. The '`this`' reference is not dynamically determined and is not observed when supplied from a `bind`, `call`, or `apply` method. 
   * A regular function that isn't already bound can be re-wired to a different object.
   * An arrow function is equivalent to `function() {}.bind(this)` that is statically bound and cannot be re-bound
* Arrow functions do not get their own '`arguments`' object.
* Since arrow functions don't get a proper '`arguments`', use a 'rest' parameter instead.
   * Note that arrays and 'rest' objects can be used to 'spread' out as parameters to another function invocation.
* Use parentheses to return an object literal when using concise syntax
   * `let f = () => ({ a: 1});` // without parens, it's just a function block without a return statement and returns `undefined`.

```
babel-node code/arrow-functions.js
```


## `arrays`

* An array is of type '`object`' but is printed as '[]' as opposed to '{}'. Check if an object is an array using `Array.isArray(obj)`.
* The '`arguments`' object of a regular function is an 'array-like' object that prints '{}'. 
   * It can be converted to a proper array with `Array.from(arguments)` (es6)
   * `Array.slice(arguments,0)` (es5) also works but is not recommended
      * (via MDN) "You should not slice on arguments because it prevents optimizations in JavaScript engines (V8 for example)"
* An array-like object is an iterable object; e.g. `{ '0': 10, '1': 20 }` and has a `.length` property
* Array prototype methods may alter or create. '`shift`' alters, whereas '`slice`' creates.
   * some methods that return a new array
      * `.concat()`,  `.slice()`,  `.filter()`,  `.map()`
      * note that `.map()` doesn't alter the original array, the supplied callback `fn(curVal,i,origArray)` function can
   * some methods that alter the array
      * `.shift()` - returns the removed (head) element
      * `.unshift()` - returns the new length of the array
      * `.splice()` - returns the removed elements (in an array)
      * `.reverse()` - returns `undefined`
      * `.sort()` - returns `undefined`

```
babel-node code/arrays.js
```

## `functions`

* Use default params to change the 'arity' of a function for partial application (and function currying)
   * Use `Function.prototype.bind` to define default leading params (es5)
   * Use default trailing parameters (es6)

```
babel-node code/functions.js
```

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

## `misc fun random`

* *Cognates* - words that have the same etymological origin (from Latin `cognatus`, meaning `blood relative`)
   * Example - `memoize` & `memorize` 

