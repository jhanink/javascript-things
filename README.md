# Things I didn't know about javascript

```
npm install
npm link babel-cli
```

### Arrow functions

1. Arrow functions inherit 'this' from the enclosing context, also known as 'lexical' or 'static' context. The 'this' reference is not dynamically determined and is not observed when supplied from a bind, call, or apply method.

2. Arrow functions do not get their own 'arguments'. A reference to arguments would come from the enclosing scope.

3. Since arrow functions don't get a proper 'arguments', use a 'rest' parameter instead

```
babel-node arrow-functions.js
```
