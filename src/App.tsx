import React from "react";
import Sorts from "./sorts";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto p-4"></main>
      <footer className="bg-gray-200 text-center p-4"></footer>
      <Sorts />
    </div>
  );
};

export default App;
