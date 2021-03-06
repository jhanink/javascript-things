
console.log("a. an array is of type 'object'");

console.log("  'typeof([])'", typeof([]));
console.log("  'Array.isArray([])'", Array.isArray([]));
console.log()

console.log("b. a function's arguments is of type 'object', but is not an array; rather it is an 'array-like' object.");

// NOTE: This is for illustration purposes only!
// never leak arguments... it will prevent vm optimizations...
let f = function(a,b,c) {
  return arguments;
}

let args = f(100,200,300);

console.log("  'arguments'", args);
console.log("  'Array.from(arguments)'", Array.from(args));
console.log()

