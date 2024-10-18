import React, { useState, useEffect } from "react";
import { binarySearch, SearchResult, Step } from "./binarySearch";
import { Tag } from "lucide-react";

const BinarySearchVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([
    3, 5, 6, 7, 8, 9, 12, 15, 17, 18, 19, 22, 26, 29, 38, 42, 49, 51, 58, 63,
    68, 76,
  ]);
  const [target, setTarget] = useState<number | "">("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  const handleSearch = () => {
    if (target === "") return;
    const searchResult = binarySearch(array, Number(target));
    setResult(searchResult);
    setCurrentStep(-1);
  };

  useEffect(() => {
    if (result && currentStep < result.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, result]);

  const getElementClass = (index: number) => {
    if (!result || currentStep === -1) return "bg-gray-200";
    const step = result.steps[currentStep];
    if (index === step.mid) return "bg-yellow-400";
    if (index >= step.left && index <= step.right) return "bg-red-200";
    return "bg-gray-200";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 font-['Press_Start_2P']">
      <h1 className="text-xl font-bold mb-6 text-green-400 p-0">
        {" "}
        Binary Search
      </h1>
      <div className="flex h-[50px] sm:mb-4 space-x-2 mb-4">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder="target"
          className="px-2 py-1 border-2 border-green-400 rounded bg-gray-900 text-green-400 
            focus:outline-none focus:border-blue-400 w-[222px] text-xs"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-1 bg-green-400 text-black rounded hovere:bg-blue-400 transition-colors duration-300 text-xs"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 p-4 bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl">
        {array.map((num, index) => (
          <div
            key={index}
            className={`w-[10vw] h-[10vw] max-w-[2rem] max-h-[3rem] flex items-center justify-center border-2 border-grat-300 
            rounded ${getElementClass(
              index
            )} transition-colors duration-300 text-black text-xs sm:text-sm`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="h-[4.5rem] overflow-y-auto w-full max-w-2xl bg-gray-800 rounded p-2">
        {result && currentStep >= 0 && currentStep < result.steps.length && (
          <div className="mt-4 text-center text-xs text-green-400">
            <p>Left: {result.steps[currentStep].left}</p>
            <p>Right: {result.steps[currentStep].right}</p>
            <p>Comparison: {result.steps[currentStep].comparison}</p>
          </div>
        )}
        {result && currentStep === result.steps.length - 1 && (
          <div className="mt-4 text-center text-xs">
            {result.foundIndex !== -1 ? (
              <p className="text-green-400">
                Found {target} at index {result.foundIndex}
              </p>
            ) : (
              <p className="text-red-400">{target} not found in the array</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BinarySearchVisualization;
