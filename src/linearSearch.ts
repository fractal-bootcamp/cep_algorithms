// linear search algo

/**
 * perform linear search on given array
 * {array} - to search
 * {*} target to find
 * return {object}
 */

function linearSearch(arr, target) {
  // initialize empty array to store steps
  let steps = [];

  // iterate through array
  for (let a = 0; a < arr.length; a++) {
    // add current step to steps array
    steps.push({
      index: a, // current position
      value: arr[a], // value at current index
      found: arr[a] === target, // t/f boolean -> true if current element matches target
    });

    // if current element === target -> return object with found index and all steps
    if (arr[a] === target) {
      return {
        foundIndex: a,
        steps: steps,
      };
    }
  }

  // handle target not being found
  return {
    foundIndex: -1, // use -1 because its not a valid array index & therefore clearly signifies "not found"
    steps: steps,
  };
}

const arr = [5, 2, 1, 3, 4, 3, 7, 8];
const target = 4;
const result = linearSearch(arr, target);
console.log(result);
