// Given an array of integers, find two numbers such that they add up to a specific target number.
//
// The function twoSum should return indices of the two numbers such that they add up to the target,
// where index1 must be less than index2. Please note that your returned answers 
// (both index1 and index2) are not zero-based.
//
// You may assume that each input would have exactly one solution.
//
// Input: numbers={2, 7, 11, 15}, target=9
// Output: index1=1, index2=2


// O(n^2) -- bad
var _twoSum = function(nums, target) {
  for (var i=0;i<nums.length;i++) {
    var one = nums[i];
    for (var j=i+1;j<nums.length;j++) {
      var two = nums[j];
      if (one + two === target) {
        var result = [];
        result.push(i+1);
        result.push(j+1);
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
      result.push(first+1);
      result.push(i+1);
      return result;
    } else {
      map[target-next] = i;
    }   
  }
}

