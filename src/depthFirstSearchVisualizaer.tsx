import React, { useState, useEffect, useCallback } from "react";
import { TreeNode, dfsPreOrder, TraversalStep } from "./depthFirstSearch";

interface NodeProps {
  value: number;
  x: number;
  y: number;
  isActive: boolean;
}

const Node: React.FC<NodeProps> = ({ value, x, y, isActive }) => (
  <div
    className={`absolute w-12 h-12 rounded-full flex items-center justify-center
        transition-all duration-500 ease-in-out
        ${isActive ? "bg-green-300" : "bg-blue-300"}`}
    style={{ left: `${x}px`, top: `${y}px` }}
  >
    {value}
  </div>
);

const TreeVisualizer: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [traversalSteps, setTraversalSteps] = useState<TraversalStep<number>[]>(
    []
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    const steps = dfsPreOrder(root);
    setTraversalSteps(steps);
  }, []);

  const playAnimation = useCallback(() => {
    setIsPlaying(true);
    setActiveNodeIndex(0);
  }, []);

  useEffect(() => {
    if (isPlaying && activeNodeIndex < traversalSteps.length - 1) {
      const timer = setTimeout(() => {
        setActiveNodeIndex(activeNodeIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (activeNodeIndex === traversalSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, activeNodeIndex, traversalSteps]);

  const getNodePosition = (depth: number, index: number) => ({
    x: index * 120,
    y: depth * 100,
  });

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <div className="relative w-full h-96 bg-gray-100 mb-4">
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
      </div>
      <button
        onClick={playAnimation}
        disabled={isPlaying}
        className="flex flex-col mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPlaying ? "playing..." : "Play Animation"}
      </button>
    </div>
  );
};
export default TreeVisualizer;
