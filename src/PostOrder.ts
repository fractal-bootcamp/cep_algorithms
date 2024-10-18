// Define the TreeNode class for creating the binary tree
export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Define the interface for each step in the traversal
export interface TraversalStep<T> {
  node: T; // The value of the node
  depth: number; // The depth of the node in the tree
}

// Function to perform post-order depth-first search traversal
export function dfsPostOrder<T>(root: TreeNode<T> | null): TraversalStep<T>[] {
  const result: TraversalStep<T>[] = [];

  // Recursive function to traverse the tree
  function traverse(node: TreeNode<T> | null, depth: number) {
    if (node === null) return;

    // First, traverse the left subtree
    traverse(node.left, depth + 1);

    // Then, traverse the right subtree
    traverse(node.right, depth + 1);

    // Finally, visit the current node (root)
    result.push({ node: node.value, depth });
  }

  // Start the traversal from the root
  traverse(root, 0);
  return result;
}
