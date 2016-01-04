
console.log()

console.log("1. an array is of type 'object'");

console.log("  'typeof([])'", typeof([]));
console.log("  'Array.isArray([])'", Array.isArray([]));
console.log()

console.log("2. a function's arguments is of type 'object', but is not an array; rather it is an 'array-like' object.");

let f = function(a,b,c) {
  return arguments;
}

let args = f(100,200,300);

console.log("  'arguments'", args);
console.log("  'Array.from(arguments)'", Array.from(args));
console.log()


