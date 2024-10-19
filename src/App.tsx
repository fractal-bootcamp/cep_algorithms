import React from "react";
import TreeVisualizer from "./dfsPreVisualizaer";
import InOrderVisualizer from "./InOrderVisualizer";
import PostOrderVisualizer from "./PostOrdertVisualizer";
import CombinedSearchVisualization from "./searchSection";
import BubbleSortVisualization from "./bubbleSort";
import SelectionSortVisualization from "./selectionSort.tsx";
import InsertionSortVisualization from "./insertionSort.tsx";
import MergeSortVisualization from "./mergeSort.tsx";

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

        {/* Search Visualization Section */}
        <section className="mb-12">
          <CombinedSearchVisualization />
        </section>

        {/* Sorting Algorithms Section */}
        <section className="mb-12 w-full p-0">
          <h2 className="flex bg-gray-850 p-2 text-xl md:text-3xl mb-4 md:mb-8 text-center text-green-400 font-['Press_Start_2P'] animate-pulse">
            Sorting Algorithms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-2 sm:p-4 rounded-lg shadow-lg overflow-x-auto">
              <BubbleSortVisualization />
            </div>
            <div className="bg-gray-900 p-2 sm:p-4 rounded-lg shadow-lg overflow-x-auto">
              <SelectionSortVisualization />
            </div>
            <div className="bg-gray-900 p-2 sm:p-4 rounded-lg shadow-lg overflow-x-auto">
              <InsertionSortVisualization />
            </div>
            <div className="bg-gray-900 p-2 sm:p-4 rounded-lg shadow-lg overflow-x-auto">
              <MergeSortVisualization />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
