import { useCallback, useEffect, useState } from "react";
import { bubbleSort, BubbleStep } from "./bubbleSortAlgo";

// 1
/**
    define the structure of each step in the sort -- store in interface 

        1 - current state ;
        2 - two indices to compare ;
        3 - swap or not 
    */

// // each bubbleStep is one step in the sort
// interface BubbleStep {
//   arrayOfStep: number[]; // store current state of sort at each step in an array
//   comparing: [number, number];
//   swappedOrNot: boolean;
// }

// 2
/**
        create custom hook to manage the state and sorting logic 
    
        stepsAll : contain each step of sorting process -> store in array 
        currentStep : track which step we are on with an index 
------ADD   playToggle
------ADD   speed adj 

------ADD   control visual:
            - next step
            - prev step
            - play/pause
            - change speed
            - reset 
        */

const manageBubbleSortState = (initialArray: number[]) => {
  // create a container to show state of array at each step
  // bubbleStep[] will contain an array of bubbleStep objects
  const [stepsAll, setStepsAll] = useState<BubbleStep[]>([]); // ([]) -> initialize stepsAll as an empty array
  const [currentStep, setCurrentStep] = useState(0); // index of current step were viewing
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    // replace entire stepsAll array with next step
    setStepsAll(bubbleSort(initialArray)); // run bubbleSort on initialArray - store in setStepsAll
  }, [initialArray]); // dependency array - telling react to re-render

  //
  const nextStep = () => {
    // prev represents the current value of currentStep BEFORE update
    setCurrentStep((prevStep) => Math.min(prevStep + 1, stepsAll.length - 1));
    // Math.min(prevStep + 1, stepsAll.length - 1) -- advance through the steps without the risk of trying to access a step that doesn't exist
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying && currentStep < stepsAll.length - 1) {
      intervalId = setInterval(nextStep, speed);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentStep, stepsAll.length, speed, nextStep]);

  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  const changeSpeed = (newSpeed: number) => setSpeed(newSpeed);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return {
    stepsAll,
    currentStep,
    nextStep,
    isPlaying,
    togglePlayPause,
    speed,
    changeSpeed,
    reset,
  };
};

// 3
/**
        render ONE element of array 
        pass props: 
            1- number to display 
            2- is it being currently compared?
            3- was it swapped? 
     */

const SingleElement: React.FC<{
  // props every singleElement should receive
  displayNum: number;
  isComparing: boolean;
  isSwapping: boolean;
  // destructure props
}> = ({ displayNum, isComparing, isSwapping }) => {
  return (
    <div
      className={`
            p-2 m-1 text-white rounded
            ${
              isComparing
                ? isSwapping
                  ? "bg-blue-400"
                  : "bg-red-300"
                : "bg-slate-300"
            }
            `}
    >
      {displayNum}
    </div>
  );
};
// 4
/**
        render the WHOLE array 

        props
            1 - current state of array 
            2 - indices of elements in comparison 
            3 - swapped? 
     */

const ArrayVisualizer: React.FC<{
  numbers: number[];
  beingCompared: [number, number];
  swapped: boolean;
}> = ({ numbers, beingCompared, swapped }) => {
  return (
    <div className="flex flex-wrap justify-center items-center p-4 bg-gray-100 shadow-md">
      {/* // for each number create a singleElement component  */}
      {numbers.map((num, index) => (
        <SingleElement
          // even if two nums are the same - indices will differ
          key={`${num}- ${index}`}
          displayNum={num}
          isComparing={beingCompared.includes(index)}
          isSwapping={swapped && beingCompared.includes(index)}
        />
      ))}
    </div>
  );
};

// 5
/**
        piece all parts together 
     */

const BubbleSortVisualization: React.FC = () => {
  const initialArray = [
    27, 3, 18, 68, 80, 37, 22, 87, 59, 9, 35, 39, 83, 9, 28, 36, 59, 54, 25, 33,
    27, 74, 27, 64, 70, 13, 91, 92, 99, 30, 89, 80, 75, 55, 15, 72, 15, 25, 61,
    48, 15, 45, 78, 52, 97, 54, 23, 21, 25, 96, 69, 27, 22, 90, 40, 1, 2, 68,
    96, 99, 59, 97, 10, 80, 39, 42, 64, 55, 29, 25, 36, 93, 60, 69, 68, 31, 52,
    8, 63, 59, 86, 32, 55, 96, 15, 86, 10, 87, 34, 100, 39, 11, 30, 98, 13, 19,
    43, 63, 57, 50,
  ];

  const {
    stepsAll,
    currentStep,
    isPlaying,
    togglePlayPause,
    speed,
    changeSpeed,
    reset,
  } = manageBubbleSortState(initialArray);

  return (
    <div>
      bubbley sorting
      {stepsAll[currentStep] && (
        <ArrayVisualizer
          numbers={stepsAll[currentStep].array}
          beingCompared={stepsAll[currentStep].comparing}
          swapped={stepsAll[currentStep].swappedOrNot}
        />
      )}
      <div>
        <button
          className="bg-blue-950 font-bold px-4 py-2 rounded text-white mr-2"
          onClick={togglePlayPause}
        >
          {" "}
          {isPlaying ? "stop" : "go"}
        </button>
        <button
          className="bg-yellow-500 font-bold hover:bg-yellow-700 px-4 py-2 rounded text-white"
          onClick={reset}
        >
          reset
        </button>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => changeSpeed(Number(e.target.value))}
          className="ml-2"
        />
        <span className="ml-2">{speed}ms</span>
      </div>
      <div className="mt-2">
        Step: {currentStep + 1} / {stepsAll.length}
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
