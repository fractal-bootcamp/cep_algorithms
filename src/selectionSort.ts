// selectionSortAlgo.ts

export interface Step {
  array: number[];
  comparingIndices: [number, number];
  minIndex: number;
  swapped: boolean;
}

export interface SortResult {
  sortedArray: number[];
  steps: Step[];
}

export function selectionSort(arr: number[]): SortResult {
  const steps: Step[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparingIndices: [minIndex, j],
        minIndex,
        swapped: false,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push({
        array: [...arr],
        comparingIndices: [i, minIndex],
        minIndex,
        swapped: true,
      });
    }
  }

  return {
    sortedArray: arr,
    steps: steps,
  };
}
