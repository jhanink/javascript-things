console.log("----------------------------------------");
console.log("Arrow Functions");
console.log("----------------------------------------");

console.log();
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
