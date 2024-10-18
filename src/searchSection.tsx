import React from "react";
import LinearSearchVisualization from "./linearSearchVisualization";
import BinarySearchVisualization from "./binarySearchVisualizer";

const CombinedSearchVisualization: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-8 bg-gray-950 p-2 text-green-400 font-['Press_Start_2P'] animate-pulse">
        Search Visualization
      </h1>
      <div className="w-full max-w-7xl mx-auto p-4 bg-gray-900">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <LinearSearchVisualization />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <BinarySearchVisualization />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CombinedSearchVisualization;
