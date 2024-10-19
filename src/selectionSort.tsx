import React, { useState, useEffect } from "react";
import { selectionSort, SortResult } from "./selectionSort";
import { motion } from "framer-motion";

const SelectionSortVisualization: React.FC = () => {
  const [array] = useState<number[]>([
    64, 34, 25, 12, 22, 11, 90, 40, 37, 27, 51,
  ]);
  const [sortResult, setSortResult] = useState<SortResult | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [resetTimeout, setResetTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleSort = () => {
    try {
      console.log("Starting sort with array:", array);
      const result = selectionSort([...array]);
      console.log("Sort result:", result);
      setSortResult(result);
      setCurrentStep(-1);
      setError(null);
      setIsSorted(false);
      if (resetTimeout) {
        clearTimeout(resetTimeout);
        setResetTimeout(null);
      }
    } catch (err) {
      console.error("Error during sorting:", err);
      setError(
        "An error occurred during sorting. Please check the console for details."
      );
    }
  };

  useEffect(() => {
    if (sortResult && currentStep < sortResult.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else if (sortResult && currentStep === sortResult.steps.length - 1) {
      setIsSorted(true);
      const resetTimer = setTimeout(() => {
        setIsSorted(false);
        setResetTimeout(null);
      }, 500);
      setResetTimeout(resetTimer);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, sortResult]);

  const getElementClass = (index: number) => {
    if (isSorted) return "bg-green-400";
    if (!sortResult || currentStep === -1) return "bg-white";
    const step = sortResult.steps[currentStep];
    if (index === step.minIndex) return "bg-yellow-400";
    if (step.comparingIndices.includes(index)) return "bg-blue-300";
    if (index < sortResult.steps[currentStep].comparingIndices[0])
      return "bg-green-200";
    return "bg-white";
  };

  const getCurrentArray = () => {
    if (
      sortResult &&
      currentStep >= 0 &&
      currentStep < sortResult.steps.length
    ) {
      return sortResult.steps[currentStep].array;
    }
    return array;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 font-['Press_Start_2P']">
      <h1 className="text-xl font-bold mb-6 text-green-200 p-0">
        Selection Sort
      </h1>
      <div className="flex space-x-2 mb-4">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          onClick={handleSort}
          className="px-4 py-2 bg-green-400 text-black rounded hover:bg-blue-400 transition-colors duration-300 text-xs"
        >
          Sort
        </motion.button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex flex-wrap justify-center items-center gap-2 p-4 bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl">
        {getCurrentArray().map((num, index) => (
          <div
            key={`${index}-${num}`}
            className={`w-[10vw] h-[10vw] max-w-[3rem] max-h-[3rem] flex items-center justify-center border-2 border-gray-300 
            rounded ${getElementClass(
              index
            )} transition-colors duration-300 text-black text-xs sm:text-sm`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="h-[4.5rem] overflow-y-auto w-full max-w-2xl bg-gray-800 rounded p-2 mt-4">
        {sortResult &&
          currentStep >= 0 &&
          currentStep < sortResult.steps.length && (
            <div className="text-center text-xs text-green-400">
              <p>
                Comparing indices:{" "}
                {sortResult.steps[currentStep].comparingIndices.join(" and ")}
              </p>
              <p>
                Current minimum index: {sortResult.steps[currentStep].minIndex}
              </p>
              <p>
                Swapped: {sortResult.steps[currentStep].swapped ? "Yes" : "No"}
              </p>
            </div>
          )}
        {isSorted && (
          <div className="text-center text-xs text-green-400">
            <p>Sorting complete!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionSortVisualization;
