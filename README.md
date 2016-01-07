# Javascript Things

It's impossible to remember everything, and it's hard to remember everything that's important. Maintaining a list of 'everything' isn't very useful, since that's what google, mdn, and stackoverflow are for. 

But I do want to remember some things. How about those things that I recently learned and rather not forget.

This list will be different for everyone and will change over time, but it's useful to keep track of fresh items and encourages detailed attention and further learning.

Having something to share and compare ain't bad either.

```
npm install
npm link babel-cli
```

## `arrow functions (es6)`

* Arrow functions inherit '`this`' from the enclosing context, also known as 'lexical' or 'static' context. The '`this`' reference is not dynamically determined and is not observed when supplied from a `bind`, `call`, or `apply` method. This is unlike a regular function where '`this`' points to the object in which it is a member and for which '`this`' is dynamically applied when the function is re-wired to a different object.
* Arrow functions do not get their own '`arguments`' object.
* Since arrow functions don't get a proper '`arguments`', use a 'rest' parameter instead.
   * Note that arrays and 'rest' objects can be used to 'spread' out as parameters to another function invocation.
* Use parentheses to return an object literal when using concise syntax
   * `let f = () => ({ a: 1});` // without parens, it's just a function block without a return statement and returns undefined.

```
babel-node code/arrow-functions.js
```


## `arrays`

* An array is of type '`object`' but is printed as '[]' as opposed to '{}'. Check if an object is an array using `Array.isArray(obj)`.
* The '`arguments`' object of a regular function is an 'array-like' object that prints '{}'. 
   * It can be converted to an array with `Array.from(arguments)` (es6)
   * `Array.slice(arguments,0)` (es5) also works but is not recommended
      * (via MDN) "You should not slice on arguments because it prevents optimizations in JavaScript engines (V8 for example)"
* An array-like object is an iterable object; e.g. `{ '0': 10, '1': 20 }` and has a `.length` property
* Array prototype methods may alter or create. 'shift' alters, whereas '`slice`' creates.
   * some methods that return a new array
      * `.concat()`,  `.slice()`,  `.filter()`,  `.map()`
      * note that `.map()` doesn't alter the original array, the supplied callback `fn(curVal,i,origArray)` function can
   * some methods that alter the array
      * `.shift()` - returns the removed (head) element
      * `.unshift()` - returns the new length of the array
      * `.splice()` - returns the removed elements (in an array)
      * `.reverse()` - returns undefined
      * `.sort()` - returns undefined

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

## `browsers`

* circular references aren't garbage collected in IE, leading to memory leaks
* use polyfills to support older browsers
* use transpilers (e.g. babel) to compile down to vanilla js

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
   * Instances inherit directly from other objects
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

## `amazing git projects`

* [es6 features](https://github.com/lukehoban/es6features)
* [VerbalExpressions](https://github.com/VerbalExpressions/JSVerbalExpressions) - Use common language expressions to compose RegEx

## `awesome articles`

* [10 Interview Questions Every Javascript Developer Should Know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.24qhy21h7) - by Eric Elliott
* [The javascript job market](https://medium.com/javascript-scene/forget-the-click-bait-here-s-what-the-javascript-job-market-really-looks-like-in-2016-ddfe0d39b467#.qayjac9w2)

## `misc fun random`

* *Cognates* - words that have the same etymological origin (from Latin `cognatus`, meaning `blood relative`)
   * Example - `memoize` & `memorize` 


