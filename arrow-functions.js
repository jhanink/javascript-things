console.log("a. regular method of an object ");

// regular method
let p = { 
  outer() {
    return this;
  }
}
 
console.log("  p.outer()", p.outer()) // p object

console.log();
console.log("b. arrow function of an object ");

// arrow
p = { 
  outer: () => this
}
 

console.log("  p.outer()", p.outer()) // undefined
console.log("  p.outer.bind(p)", p.outer.bind(p)()) // still undefined


console.log();
console.log("c. arrow function 'arguments'");

p = {
  outer: (a,b) => arguments.length
}

console.log("  p.outer()", p.outer()) // undefined


console.log();
console.log("d. arrow function using 'rest' parameter");

p = (a, ...b) => { // rest param ...b
   let f = function (w,x,y,z) { // regular function with arguments
     return Array.from(arguments);
   };
   return f(...b, a); // spread b array-like object to the function
}

console.log("  p(1, 2, 3, 4)", p(1, 2, 3, 4));

console.log();


