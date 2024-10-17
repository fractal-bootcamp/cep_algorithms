import React, { useState, useEffect, useCallback } from "react";
import { TreeNode, dfsPreOrder, TraversalStep } from "./depthFirstSearch";

// define shape
interface NodeProps {
  value: number;
  x: number;
  y: number;
  isActive: boolean;
}
// functional component for rendering individual nodes
const Node: React.FC<NodeProps> = ({ value, x, y, isActive }) => (
  <div
    className={`absolute w-12 h-12 flex items-center justify-center
        transition-all duration-500 ease-in-out text-black font-bold
        ${
          isActive ? "bg-yellow-300" : "bg-green-700"
        } border-2 border-green-400}`}
    style={{
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
    }} // calculated in getNodePositon
    // left: `${x}px` ---> sets horizontal position of node
    // top: `${y}px` ---> sets top position of node
  >
    {value}
  </div>
);

// main visualizer
const TreeVisualizer: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1); // which node is active
  const [traversalSteps, setTraversalSteps] = useState<TraversalStep<number>[]>( // traversal steps
    []
  );
  const [isPlaying, setIsPlaying] = useState(false); // currently playing animation?

  // create tree - perform DFS traverse once on mount
  useEffect(() => {
    // store in use=effect to seperate side effects from render logic
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    // stores traversal steps in state
    const steps = dfsPreOrder(root);
    console.log(steps);
    setTraversalSteps(steps);
  }, []);

  // memoized function to start animation
  const playAnimation = useCallback(() => {
    setIsPlaying(true);
    setActiveNodeIndex(0);
  }, []);

  // connect the nodes!!
  const drawLines = () => {
    return (
      <>
        <line
          x1="200"
          y1="40"
          x2="100"
          y2="120"
          stroke="green"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="40"
          x2="250"
          y2="120"
          stroke="green"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="120"
          x2="50"
          y2="200"
          stroke="green"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="120"
          x2="150"
          y2="200"
          stroke="green"
          strokeWidth="2"
        />
      </>
    );
  };

  // handle animation control and logic
  useEffect(() => {
    if (isPlaying && activeNodeIndex < traversalSteps.length - 1) {
      // use time to move to next node if playing
      const timer = setTimeout(() => {
        // increment activeNodeIndex by 1 to move to the next node in traverse
        setActiveNodeIndex(activeNodeIndex + 1);
        // delay of 1000ms
      }, 1000);
      return () => clearTimeout(timer);
      // stop playing at the end
    } else if (activeNodeIndex === traversalSteps.length - 1) {
      setIsPlaying(false);
    }
    // dependencies for useEffect -- tell react to re-run if any of these values change
  }, [isPlaying, activeNodeIndex, traversalSteps]);

  // calculate the position of each node based on depth and index
  const getNodePosition = (depth: number, index: number) => {
    const positions = [
      { x: 200, y: 40 }, // Root node (1)
      { x: 100, y: 120 }, // Left child of root (2)
      { x: 50, y: 200 }, // Left child of node 2 (4)
      { x: 150, y: 200 }, // Right child of node 2 (5)
      { x: 250, y: 120 }, // Right child of root (3)
    ];

    return positions[index] || { x: 0, y: 0 };
  };

  return (
    <div className="flex flex-col items-center w-fit max-w-4xl mx-auto p-8 bg-black text-green-400 font-['Press_Start_2P']">
      <h1 className="text-2xl mb-6 text-center animate-pulse">
        DFS Visualizer
      </h1>

      <div className="relative w-full h-[300px] bg-black border-4 border-green-400 mb-4">
        <svg className="absolute inset-0 w-full h-full">{drawLines()}</svg>
        {traversalSteps.map((step, index) => {
          const { x, y } = getNodePosition(step.depth, index);
          return (
            <Node
              key={index}
              value={step.node}
              x={x}
              y={y}
              isActive={index === activeNodeIndex}
            />
          );
        })}
        <h2 className="text-l mb-4 mt-60 p-4 text-center text-green-200">
          Pre-Order Traverse
        </h2>
      </div>

      <button
        onClick={playAnimation}
        disabled={isPlaying}
        className="mt-4 px-4 py-2 bg-green-700 text-green-400 border-2 border-green-400 rounded-none hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-400/50"
      >
        {isPlaying ? "PLAYING..." : "PLAY ANIMATION"}
      </button>
    </div>
  );
};
export default TreeVisualizer;
