# Things I didn't know about javascript

```
npm install
npm link babel-cli
```

### Arrow functions

1. Arrow functions inherit 'this' from the enclosing context, also known as 'lexical' or 'static' context. The 'this' reference is not dynamically determined and is not observed when supplied from a bind, call, or apply method.

2. Arrow functions do not get their own 'arguments' object.

3. Since arrow functions don't get a proper 'arguments', use a 'rest' parameter instead

```
babel-node arrow-functions.js
```


### Arrays

1. An array is of type 'object', console.log(typeof([])). Check it using Array.isArray().
2. Contrast that with the "array-like" arguments object of a regular function, which can be converted to an array with Array.from(arguments)

```
babel-node arrays.js
```
