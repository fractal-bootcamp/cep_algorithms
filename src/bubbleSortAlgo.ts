// each bubbleStep is one step in the sort
export interface BubbleStep {
  array: number[]; // store current state of sort at each step in an array
  comparing: [number, number];
  swappedOrNot: boolean;
}

export function bubbleSort(initialArray: number[]): BubbleStep[] {
  const steps: BubbleStep[] = [];
  const array = [...initialArray]; // Create a copy of the initial array
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Record the current state before comparison
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swappedOrNot: false,
      });

      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Record the state after swapping
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swappedOrNot: true,
        });
      }
    }
  }

  return steps;
}
