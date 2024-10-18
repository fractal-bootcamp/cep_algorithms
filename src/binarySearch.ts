// binary search algo

// define each step of the binary search -
export interface Step {
  left: number;
  right: number;
  mid: number;
  comparison: "equal" | "less" | "greater";
}
// contains final result
export interface SearchResult {
  foundIndex: number;
  steps: Step[];
}

// takes sorted array and a target value as inputs
export function binarySearch(arr: number[], target: number): SearchResult {
  let left = 0;
  let right = arr.length - 1; // initialize right as last index of array
  let steps: Step[] = [];

  // main loop continues as long as left <= right
  while (left <= right) {
    // calculate middle index
    const mid = Math.floor((left + right) / 2);
    // add current step to step array for visualization
    steps.push({
      left,
      right,
      mid,
      comparison:
        // compare middle index with target
        arr[mid] === target ? "equal" : arr[mid] < target ? "less" : "greater",
    });

    if (arr[mid] === target) {
      return { foundIndex: mid, steps };
    } else if (arr[mid] < target) {
      // if middle value is smaller than what we are looking for - look in right half
      // move left pointer to just after middle
      left = mid + 1;
    } else {
      // if middle value is larger than what we are looking for -- look in left half
      right = mid - 1; // move the right pointer to just before the middle
    }
  }
  // if we get through whole loop without finding target -- target is not in array
  return { foundIndex: -1, steps };
}
