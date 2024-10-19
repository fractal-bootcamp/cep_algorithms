// Bubble Sort Algorithm

export interface Step {
  array: number[];
  comparingIndices: [number, number];
  swapped: boolean;
}

export interface SortResult {
  sortedArray: number[];
  steps: Step[];
}

export function bubbleSort(arr: number[]): SortResult {
  const steps: Step[] = [];
  const n = arr.length;
  let swapped: boolean;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Create a step for each comparison
      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        swapped: false,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Create a step for the swap
        steps.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          swapped: true,
        });
      }
    }

    // If no swapping occurred, array is sorted
    if (!swapped) {
      break;
    }
  }

  return {
    sortedArray: arr,
    steps: steps,
  };
}

// Example usage:
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const result = bubbleSort(unsortedArray);
console.log(result.sortedArray);
console.log(result.steps);
