# Things I didn't know about javascript

```
npm install
npm link babel-cli
```

### Arrow functions

* Arrow functions inherit 'this' from the enclosing context, also known as 'lexical' or 'static' context. The 'this' reference is not dynamically determined and is not observed when supplied from a bind, call, or apply method.
* Arrow functions do not get their own 'arguments' object.
* Since arrow functions don't get a proper 'arguments', use a 'rest' parameter instead

```
babel-node arrow-functions.js
```


### Arrays

* An array is of type 'object', but is printed as '[]' as opposed to '{}'. Check if an object is an array using Array.isArray(obj).
* The 'arguments' object of a regular function is an 'array-like' object that prints '{}'. 
   * It can be converted to an array with 'Array.from(arguments)' (es6)
   * 'Array.slice(arguments,0)' (es5) also works but is not recommended
      * (via MDN) "You should not slice on arguments because it prevents optimizations in JavaScript engines (V8 for example)"
* An array-like object is an iterable object; e.g. { '0': 10, '1': 20 } and has a .length property
* Array prototype methods may alter or create. 'shift' alters, whereas 'slice' creates.
   * some methods that return a new array
      * .concat
      * .slice
      * .filter
      * .map
   * some methods that alter the array
      * .shift - returns the removed (head) element
      * .unshift - returns the new length of the array
      * .splice - returns the removed elements (in an array)
      * .reverse - returns undefined 
      * .sort - returns undefined

```
babel-node arrays.js
```

### Functions

* Use default params to change the 'arity' of a function for partial application (and function currying)
   * Use Function.prototype.bind to define default leading params (es5)
   * Use default trailing parameters (es6)

```
babel-node bind.js
```
