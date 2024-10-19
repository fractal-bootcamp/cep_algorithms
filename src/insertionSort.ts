// insertionSort.ts

export interface Step {
  array: number[];
  currentIndex: number;
  comparingIndex: number;
  inserted: boolean;
}

export interface SortResult {
  sortedArray: number[];
  steps: Step[];
}

export function insertionSort(arr: number[]): SortResult {
  const steps: Step[] = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      currentIndex: i,
      comparingIndex: j,
      inserted: false,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;

      steps.push({
        array: [...arr],
        currentIndex: i,
        comparingIndex: j,
        inserted: false,
      });
    }

    arr[j + 1] = key;

    steps.push({
      array: [...arr],
      currentIndex: i,
      comparingIndex: j + 1,
      inserted: true,
    });
  }

  return {
    sortedArray: arr,
    steps: steps,
  };
}
