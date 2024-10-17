import React from "react";
import TreeVisualizer from "./dfsPreVisualizaer";
import InOrderVisualizer from "./InOrderVisualizer";

function App() {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen p-8">
      <h1 className="text-3xl mb-8 text-center text-green-400 font-['Press_Start_2P'] animate-pulse">
        DFS Visualizer
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        <TreeVisualizer />
        <InOrderVisualizer />
      </div>
    </div>
  );
}

export default App;
