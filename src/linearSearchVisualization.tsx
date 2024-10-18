import React, { useState, useEffect } from "react";
import { linearSearch, SearchResult, Step } from "./linearSearch";

const LinearSearchVisualization: React.FC = () => {
  // State for the array to be searched
  const [array, setArray] = useState<number[]>([
    5, 2, 8, 12, 1, 45, 17, 9, 33, 6,
  ]);
  // State for the target number to find
  const [target, setTarget] = useState<number | "">("");
  // State for the search result
  const [result, setResult] = useState<SearchResult | null>(null);
  // State for tracking the current step of the visualization
  const [currentStep, setCurrentStep] = useState<number>(-1);
  // update displayed array
  const [displayArray, setDisplayedArray] = useState<number[]>([]);

  // Function to handle the search button click
  const handleSearch = () => {
    if (target === "") return;
    const searchResult = linearSearch(array, Number(target));
    setResult(searchResult);
    setCurrentStep(-1);
  };

  // update displayArray based on screen width
  useEffect(() => {
    const updateDisplayedArray = () => {
      if (window.innerWidth < 640) {
        // 640px is typical breaking point for mobile devices
        setDisplayedArray(array.slice(0, 9)); //limit number of elements displayed - create new array by extracting section of og array
      } else {
        setDisplayedArray(array); // setting displayArray to new smaller array of 8 elements
      }
    };
    // call initially
    updateDisplayedArray();
    // setup event listener for window resize
    window.addEventListener("resize", updateDisplayedArray); // 'resize' = name of event we are listening for -> fired when browser is resized
    // updateDisplayedArray is the callback function called everytime resize event occurs
    // clean
    return () => window.removeEventListener("resize", updateDisplayedArray);
  }, [array]); // dependency array means this effect runs when 'array' changes

  // Effect to animate the search process
  useEffect(() => {
    if (result && currentStep < result.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentStep, result]);

  // Function to determine the CSS class for each array element
  const getElementClass = (index: number) => {
    if (!result || currentStep === -1) return "bg-white";
    const step = result.steps[currentStep];
    if (step.index === index) {
      return step.found ? "bg-green-500" : "bg-yellow-300";
    } else if (step.index > index) {
      return "bg-red-200 <border-3></border-3> border-red-400";
    }
    return "bg-white";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 p-4 font-['Press_Start_2P']">
      {/* Top row with search controls and "Sequential Comparison" text */}
      <div className="w-full flex flex-col justify-between items-start sm:items-center mb-6">
        <div className="flex w-[400px] h-[60px] space-x-2 mb-4 sm:mb-0">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            placeholder="target"
            className="px-5 w-[222px] py-1 border-2 border-green-400 rounded bg-gray-900 text-green-400 focus:outline-none focus:border-blue-400 text-xs"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1 bg-green-400 text-black rounded hover:bg-blue-400 transition-colors duration-50 text-xs"
          >
            Search
          </button>
        </div>
        <h2 className="flex flex-row text-md mr-16 text-green-400 p-2">
          Sequential Comparison
        </h2>
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Array visualization (grid) */}
        <div className="inline-grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2 p-4 bg-gray-700 rounded-lg shadow-lg">
          {array.map((num, index) => (
            <div
              key={index}
              className={`w-[10vw] h-[10vw] max-w-[3rem] max-h-[3rem] flex items-center justify-center border-2 border-gray-300 rounded ${getElementClass(
                index
              )} transition-colors duration-300 text-black text-xs sm:text-sm`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Search result display */}
        {result && (
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

export default LinearSearchVisualization;
