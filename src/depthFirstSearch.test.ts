// Import Jest
// Jest allows simulating real world scenarious in controlled environment
// test environments, making assertions about outcomes, mocking functions, simulating inputs and edge cases
// npm install --save-dev jest ts-jest @types/jest
// run with npm test

import {
  TreeNode,
  dfsPreOrder,
  visualizeDFS,
  TraversalStep,
} from "./depthFirstSearch";

// create group of related tests
describe("Depth-First Search", () => {
  let root: TreeNode<number>;

  beforeEach(() => {
    // Set up a sample tree before each test // controlled 'play' environment
    root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.left.right = new TreeNode(9);
    root.left.right = new TreeNode(12);
  });

  // individual tests - each test() describes a test case
  test("TreeNode creation", () => {
    // check if the actual values match the expected values
    expect(root.value).toBe(1);
    expect(root.left?.value).toBe(2);
    expect(root.right?.value).toBe(3);
    expect(root.left?.left?.value).toBe(4);
    expect(root.left?.right?.value).toBe(5);
  });

  // check if the DFS traversal returns the correct order of notes and depths
  test("dfsPreOrder traversal", () => {
    const result = dfsPreOrder(root);
    const expectedTraversal: TraversalStep<number>[] = [
      { node: 1, depth: 0 },
      { node: 2, depth: 1 },
      { node: 4, depth: 2 },
      { node: 5, depth: 2 },
      { node: 3, depth: 1 },
    ];
    expect(result).toEqual(expectedTraversal);
  });

  // test how function handles a null input
  test("dfsPreOrder with null root", () => {
    const result = dfsPreOrder(null);
    expect(result).toEqual([]);
  });

  // test corrext strings being logged
  test("Visualize DFS traversal", () => {
    // consoleSpy allows jest to intercept and check tests
    const consoleSpy = jest.spyOn(console, "log");
    const steps = dfsPreOrder(root);
    visualizeDFS(steps);
    // check correct strings in correct order
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "1");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "  2");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "    4");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "    5");
    expect(consoleSpy).toHaveBeenNthCalledWith(5, "  3");
    consoleSpy.mockRestore();
  });
});
