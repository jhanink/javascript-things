// Given an array of integers, find two numbers such that they add up to a specific target number.
//
// The function twoSum should return indices of the two numbers such that they add up to the target,
// where index1 must be less than index2. Please note that your returned answers 
//
// You may assume that each input would have exactly one solution.
//
// Input: numbers=[2, 7, 11, 15], target=26
// Output: [2,3]

var nums = [2, 7, 11, 15];
var target = 26;
// O(n^2) -- bad
var _twoSum = function(nums, target) {
  for (var i=0;i<nums.length;i++) {
    var one = nums[i];
    for (var j=i+1;j<nums.length;j++) {
      var two = nums[j];
      if (one + two === target) {
        var result = [];
        result.push(i);
        result.push(j);
        return result;
      }
    }
  }
};

// O(n)
var twoSum = function (nums, target) {
  var map = {}; 
  for (var i=0;i<nums.length;i++) {
    var next = nums[i];
    var first = map[next];
    if (first !== undefined) {
      var result = []; 
      result.push(first);
      result.push(i);
      return result;
    } else {
      map[target-next] = i;
    }   
  }
}

var r = twoSum(nums, target);
console.log("input: ", nums);
console.log("target: ", target);
console.log("result indices: ", r);
console.log("result values: ", nums[r[0]], nums[r[1]]);

