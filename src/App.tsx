import React from "react";
import TreeVisualizer from "./dfsPreVisualizaer";
import InOrderVisualizer from "./InOrderVisualizer";
import PostOrderVisualizer from "./PostOrdertVisualizer";

function App() {
  return (
    <div>
      <div className="flex flex-col items-center bg-gray-800 min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
        <h1 className="text-xl md:text-3xl mb-4 md:mb-8 text-center text-green-400 font-['Press_Start_2P'] animate-pulse px-2">
          DFS BinaryTree Traversal
        </h1>

        {/* Responsive container for visualizers */}
        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-7xl mx-auto px-2 sm:px-4">
          {/* Individual visualizer containers with responsive scaling */}
          <div className="w-full lg:w-1/3 bg-gray-900 p-2 sm:p-3 md:p-4 rounded-lg flex items-center justify-center">
            <TreeVisualizer />
          </div>
          <div className="w-full lg:w-1/3 bg-gray-900 p-2 sm:p-3 md:p-4  rounded-lg flex items-center justify-center">
            <InOrderVisualizer />
          </div>
          <div className="w-full lg:w-1/3 bg-gray-900 p-2 sm:p-3 md:p-4  rounded-lg flex items-center justify-center">
            <PostOrderVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
