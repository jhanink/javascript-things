let a = [1,2,[3,4],5,[6,7,[8,9],10],11]

// use reduce to flatten an array
let reduce = (arr) => {
  return arr.reduce((a,b)=>{
    return a.concat(Array.isArray(b)?reduce(b):b);
  }, []);
} 

console.log("use reduce to flatten an array");
console.log("INPUT: ", a);
console.log("OUTPUT: ", reduce(a));

