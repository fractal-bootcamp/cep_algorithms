import React from "react";
import TreeVisualizer from "./dfsPreVisualizaer";
import InOrderVisualizer from "./InOrderVisualizer";
import PostOrderVisualizer from "./PostOrdertVisualizer";
import LinearSearchVisualization from "./linearSearchVisualization";
import BinarySearchVisualization from "./binarySearchVisualizer";
import CombinedSearchVisualization from "./searchSection";

function App() {
  return (
    <div className="bg-black min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Binary Tree Traversal Section */}
        <section className="mb-12">
          <h1 className="flex bg-gray-850 p-2 text-xl md:text-3xl mb-4 md:mb-8 text-center text-green-400 font-['Press_Start_2P'] animate-pulse">
            DFS Binary Tree Traversal
          </h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/3 bg-gray-900 p-2 sm:p-3 md:p-4 rounded-lg flex items-center justify-center">
              <TreeVisualizer />
            </div>
            <div className="w-full lg:w-1/3 bg-gray-900 p-2 sm:p-3 md:p-4 rounded-lg flex items-center justify-center">
              <InOrderVisualizer />
            </div>
            <div className="w-full lg:w-1/3 bg-gray-900 p-2 sm:p-3 md:p-4 rounded-lg flex items-center justify-center">
              <PostOrderVisualizer />
            </div>
          </div>
        </section>
        <CombinedSearchVisualization />
        {/* Linear Search Section
        <section className="flex flex-col items-center w-full max-w-4xl mx-auto">
          <h2 className="w-full bg-gray-850 p-2 text-xl sm:text-2xl md:text-3xl mb-4 md:mb-8 text-center text-green-400 font-['Press_Start_2P'] animate-pulse">
            Search Visualization
          </h2>
          <div className="w-full bg-gray-900 p-2 sm:p-4 md:p-6 rounded-lg shadow-lg overflow-x-auto">
            <div className="min-w-[300px]">
              <LinearSearchVisualization />
              <BinarySearchVisualization />
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}

export default App;
