// DFS
// Depth-First Binary Search Tree

// define a Node class to create tree
// use class to define structure and behavior in one place -- create an object with both properties and a constructor
export class TreeNode<T> {
  // node class to represent each node in the tree
  value: T;
  left: TreeNode<T> | null; // left side of the tree will have a TreeNode or be empty
  right: TreeNode<T> | null;

  // constructor is the method to initialzie a new object of the class
  constructor(value: T) {
    // accepts the value of type T
    // this - refers to the current instance of the TreeNode being created
    this.value = value; // assigns this value to the value property of the new node
    this.left = null; // initialize left child of node to null - when first created node has no children
    this.right = null; // initialize right child to null
  }
  // example use of constructor : let node = new TreeNode<number>(5);
}

// capture each step of traversal - this interface represents one node visit
export interface TraversalStep<T> {
  node: T; // value of node being visited
  depth: number; // how deep this node is in the tree
}

// perform the traversal
export function dfsPreOrder<T>(root: TreeNode<T> | null): TraversalStep<T>[] {
  // dfsPreOrder takes parameter root
  // -- returns an array of type T (containing the vlaues of the nodes in the order they were visited)
  const result: TraversalStep<T>[] = [];

  function traverse(node: TreeNode<T> | null, depth: number) {
    if (node === null) return;

    result.push({ node: node.value, depth });
    traverse(node.left, depth + 1);
    traverse(node.right, depth + 1);
  }
  traverse(root, 0);
  return result;
}

// visualize results
export function visualizeDFS<T>(steps: TraversalStep<T>[]) {
  // forEach step -
  steps.forEach((step) => {
    // print each node to console -> .repeat(step.depth) repeats ' ' step.depth number of times
    console.log(`${"  ".repeat(step.depth)}${step.node}`); // {step.node} is the value of the current node
  }); // ` ` allow template literals - combine indentation and node value
}

// Method to perform the DFS traversal
