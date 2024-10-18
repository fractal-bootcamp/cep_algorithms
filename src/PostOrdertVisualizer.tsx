import React, { useState, useEffect, useCallback } from "react";
import { TreeNode, dfsPostOrder, TraversalStep } from "./PostOrder";

// Define the props for the Node component
interface NodeProps {
  value: number;
  x: number;
  y: number;
  isActive: boolean;
  isSmall: boolean;
}

// Node component to render each tree node
const Node: React.FC<NodeProps> = ({ value, x, y, isActive, isSmall }) => (
  <div
    className={`absolute ${
      isSmall ? "w-8 h-8" : "w-12 h-12"
    } rounded-sm flex items-center justify-center 
          transition-all duration-500 ease-in-out text-green-800 ${
            isSmall ? "text-xs" : "text-sm"
          } font-bold
          ${
            isActive ? "bg-yellow-300" : "bg-green-950"
          } border-2 border-green-800}`}
    style={{
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%)",
    }}
  >
    {value}
  </div>
);

// Main PostOrderVisualizer component
const PostOrderVisualizer: React.FC = () => {
  // State for tracking the active node in the animation
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  // State for storing the traversal steps
  const [traversalSteps, setTraversalSteps] = useState<TraversalStep<number>[]>(
    []
  );
  // State for tracking if the animation is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect to initialize the tree and perform the traversal
  useEffect(() => {
    // Create the tree structure
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    root.left.right.left = new TreeNode(10);
    root.right.left.right = new TreeNode(11);
    root.right.right.left = new TreeNode(12);

    // Perform post-order traversal and store the steps
    const steps = dfsPostOrder(root);
    setTraversalSteps(steps);
  }, []);

  // Callback to start the animation
  const playAnimation = useCallback(() => {
    setIsPlaying(true);
    setActiveNodeIndex(0);
  }, []);

  // Effect to handle the animation logic
  useEffect(() => {
    if (isPlaying && activeNodeIndex < traversalSteps.length - 1) {
      // Set a timer to move to the next node
      const timer = setTimeout(() => {
        setActiveNodeIndex(activeNodeIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (activeNodeIndex === traversalSteps.length - 1) {
      // Stop playing when reaching the end of traversal
      setIsPlaying(false);
    }
  }, [isPlaying, activeNodeIndex, traversalSteps]);

  // Function to get the position of each node
  const getNodePosition = (index: number) => {
    const positions = [
      { x: 200, y: 30 }, // 1
      { x: 140, y: 90 }, // 2
      { x: 260, y: 90 }, // 3
      { x: 110, y: 150 }, // 4
      { x: 170, y: 150 }, // 5
      { x: 230, y: 150 }, // 6
      { x: 290, y: 150 }, // 7
      { x: 95, y: 210 }, // 8
      { x: 125, y: 210 }, // 9
      { x: 185, y: 210 }, // 10
      { x: 245, y: 210 }, // 11
      { x: 315, y: 210 }, // 12
    ];

    return positions[index] || { x: 0, y: 0 };
  };

  // Function to draw the lines connecting the nodes
  const drawLines = () => (
    <>
      <line x1="200" y1="30" x2="140" y2="90" stroke="green" strokeWidth="2" />
      <line x1="200" y1="30" x2="260" y2="90" stroke="green" strokeWidth="2" />
      <line x1="140" y1="90" x2="110" y2="150" stroke="green" strokeWidth="2" />
      <line x1="140" y1="90" x2="170" y2="150" stroke="green" strokeWidth="2" />
      <line x1="260" y1="90" x2="230" y2="150" stroke="green" strokeWidth="2" />
      <line x1="260" y1="90" x2="290" y2="150" stroke="green" strokeWidth="2" />
      <line x1="110" y1="150" x2="95" y2="210" stroke="green" strokeWidth="2" />
      <line
        x1="110"
        y1="150"
        x2="125"
        y2="210"
        stroke="green"
        strokeWidth="2"
      />
      <line
        x1="170"
        y1="150"
        x2="185"
        y2="210"
        stroke="green"
        strokeWidth="2"
      />
      <line
        x1="230"
        y1="150"
        x2="245"
        y2="210"
        stroke="green"
        strokeWidth="2"
      />
      <line
        x1="290"
        y1="150"
        x2="315"
        y2="210"
        stroke="green"
        strokeWidth="2"
      />
    </>
  );

  // Render the component
  return (
    <div className="flex flex-col p-16 items-center w-full bg-black text-green-200 font-['Press_Start_2P']">
      <h1 className="text-xl mb-4 text-center p-4">Post-order Traverse</h1>

      <div className="relative w-[400px] h-[300px] bg-black border-4 border-green-400 mb-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          {drawLines()}
        </svg>
        {traversalSteps.map((step, index) => {
          const { x, y } = getNodePosition(step.node - 1);
          const isSmall = step.node > 3;
          return (
            <Node
              key={index}
              value={step.node}
              x={x}
              y={y}
              isActive={index === activeNodeIndex}
              isSmall={isSmall}
            />
          );
        })}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <h2 className="text-sm mb-0 text-green-300">left-right-root</h2>
        </div>
      </div>

      <button
        onClick={playAnimation}
        disabled={isPlaying}
        className="mt-4 px-4 py-2 bg-green-700 text-green-400 border-2 border-green-400 rounded-none hover:bg-green-600 
        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 disabled:opacity-50 
        disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 
        active:scale-95 shadow-lg hover:shadow-green-400/50 animate-bounce [animation-duration:1.7s]"
      >
        {isPlaying ? "PLAYING..." : "PLAY ANIMATION"}
      </button>
    </div>
  );
};

export default PostOrderVisualizer;
