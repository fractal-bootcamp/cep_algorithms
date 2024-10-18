// linear search algo

/**
 * perform linear search on given array
 * {array} - to search
 * {*} target to find
 * return {object}
 */

export interface Step {
  index: number;
  value: number;
  found: boolean;
}

export interface SearchResult {
  foundIndex: number;
  steps: Step[];
}

export function linearSearch(arr: number[], target: number): SearchResult {
  // initialize empty array to store steps
  let steps: Step[] = [];

  // iterate through array
  for (let i = 0; i < arr.length; i++) {
    // add current step to steps array
    steps.push({
      index: i, // current position
      value: arr[i], // value at current index
      found: arr[i] === target, // t/f boolean -> true if current element matches target
    });

    // if current element === target -> return object with found index and all steps
    if (arr[i] === target) {
      return {
        foundIndex: i,
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
