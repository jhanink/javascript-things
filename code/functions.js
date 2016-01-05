console.log("a. (es5) Use bind to assign default leading parameters");

let f = (a,b,c) => a+b+c;

let f2 = f.bind(null, "a", "b"); // assign default leading parameters

console.log("  'f2(\"c\")'", f2("c"));

console.log();

console.log("b. (es6) Use default trailing parameters");

f = (a, b="b", c="c") => a+b+c;

console.log("  'f(\"a\")'", f("a"));
console.log();

