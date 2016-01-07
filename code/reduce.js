let a = [1,2,[3,4],5,[6,7,[8,9],10],11]

let reduce = (arr) => {
  return arr.reduce((a,b)=>{
    return a.concat(Array.isArray(b)?reduce(b):b);
  }, []);
} 

console.log(reduce(a));
