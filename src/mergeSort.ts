// mergeSort.ts

export interface Step {
  array: number[];
  leftIndex: number;
  rightIndex: number;
  merging: boolean;
}

export interface SortResult {
  sortedArray: number[];
  steps: Step[];
}

function merge(
  arr: number[],
  left: number,
  middle: number,
  right: number,
  steps: Step[]
): void {
  const leftArr = arr.slice(left, middle + 1);
  const rightArr = arr.slice(middle + 1, right + 1);

  let i = 0,
    j = 0,
    k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    steps.push({
      array: [...arr],
      leftIndex: left + i,
      rightIndex: middle + 1 + j,
      merging: true,
    });
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    steps.push({
      array: [...arr],
      leftIndex: left + i,
      rightIndex: right,
      merging: true,
    });
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    steps.push({
      array: [...arr],
      leftIndex: middle + 1,
      rightIndex: middle + 1 + j,
      merging: true,
    });
    j++;
    k++;
  }
}

function mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  steps: Step[]
): void {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      leftIndex: left,
      rightIndex: middle,
      merging: false,
    });
    mergeSortHelper(arr, left, middle, steps);

    steps.push({
      array: [...arr],
      leftIndex: middle + 1,
      rightIndex: right,
      merging: false,
    });
    mergeSortHelper(arr, middle + 1, right, steps);

    merge(arr, left, middle, right, steps);
  }
}

export function mergeSort(arr: number[]): SortResult {
  const steps: Step[] = [];
  mergeSortHelper([...arr], 0, arr.length - 1, steps);
  return {
    sortedArray: steps[steps.length - 1].array,
    steps: steps,
  };
}
