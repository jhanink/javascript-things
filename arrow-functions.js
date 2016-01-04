console.log("----------------------------------------");
console.log("Arrow Functions");
console.log("----------------------------------------");

console.log();
console.log("1. regular method of an object ");

// regular method
let p = { 
  outer() {
    return this;
  }
}
 
console.log("  p.outer()", p.outer()) // p object

console.log();
console.log("2. arrow function of an object ");

// arrow
p = { 
  outer: () => this
}
 

console.log("  p.outer()", p.outer()) // undefined in strict mode
console.log("  p.outer.bind(p)", p.outer.bind(p)()) // still undefined


console.log();
