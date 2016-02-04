// Given an array of integers, find two numbers such that they add up to a specific target number.
// Assume that each input has exactly one solution.
//
// The function twoSum should
//   * return indices of the two numbers such that they add up to the target,
//   * index1 < index2 (1-based, not 0-based)
//
// Input: nums=[2, 7, 11, 15], target=26
// Output: [3,4]

// O(n) -- good, uses memoization
var twoSum = function (nums, target) {
  var hash = {}; 
  for (var i=0;i<nums.length;i++) {
    var found = hash[nums[i]];
    if (found) {
      return [found, i+1]; 
    } else {
      hash[target-nums[i]] = i+1;
    }   
  }
  return [];
}

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

// ---------- test
var nums = [2, 7, 11, 15];
var target = 26;
var r = twoSum(nums, target);
console.log("input: ", nums);
console.log("target: ", target);
console.log("result indices: ", r);
console.log("result values: ", nums[r[0]], nums[r[1]]);

