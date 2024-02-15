import React, { useState, useEffect } from "react";
import colors from "./colorCodes";
// import GithubIcon from "../Icons/GithubIcon";
import { mergeSortAnimation } from "../algorithms/mergesort";
import { insertionSort } from "../algorithms/insertion";
import { selectionSort } from "../algorithms/selectionsort";
import { bubbleSort } from "../algorithms/bubblesort";
import { quicksort } from "../algorithms/quicksort";
import { heapsort } from "../algorithms/heapsort";
// stylesheet
import "./SortingVisualizer.css";
// Sounds
// import ResetEffect from "./sounds/resetEffect.mp3";
// import CompletedEffect from "./sounds/completedEffect.mp3";
// import SortingStart from "./sounds/sortingStart.mp3";
// import SortingCompleted from "./sounds/sortingCompleted.mp3";
// Icon

import githubIcon from "../Icons/github-icon.png";

// Random Number Genrator
const generateRandomNumber = (i, j) => {
  return Math.floor(i + Math.random() * (j - i));
};

const Visualizer = () => {
  // state of the array
  const [mainArray, setMainArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [algo, setAlgo] = useState("mergesort");
  const [able, setAble] = useState(true);

  //Project Sounds

  // let resetEffect = new Audio(ResetEffect); // Play audio when bar reset
  // let completedEffect = new Audio(CompletedEffect);
  // let sortingStart = new Audio(SortingStart);
  // let sortingCompleted = new Audio(SortingCompleted);

  //Render the Array Before DOM loades
  useEffect(() => {
    if (able) populateArray(arrayLength);
  }, [arrayLength, algo]);

  // ABLE / DISABLE BUTTONS ETC.
  useEffect(() => {
    const items = document.getElementsByClassName("able");

    if (!able) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.pointerEvents = "none";
        items[i].disabled = true;
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].style.pointerEvents = "auto";
        items[i].disabled = false;
      }
    }
  }, [able]);

  const populateArray = (size) => {
    // resetEffect.play(); // play resetEffect here
    const tempArr = [];
    for (let i = 0; i < size; i++) {
      const item = {
        idx: i,
        val: generateRandomNumber(25, 500),
      };
      tempArr.push(item);
      if (document.getElementsByClassName("arrayBar")[i] != null) {
        document.getElementsByClassName("arrayBar")[i].style.backgroundColor =
          colors.primaryColor;
      }
    }
    if (able) setMainArray(tempArr);
  };

  // colors every elements afte sorting
  const colorEveryElement = (arr, counter) => {
    setTimeout(() => {
      // completedEffect.play(); // Play audion when bar will sorted
      // sortingCompleted.play();
      const sortedArray = [];
      for (let i = 0; i < arr.length; i++) {
        document.getElementsByClassName("arrayBar")[i].style.backgroundColor =
          colors.afterSortingColor;

        sortedArray.push({
          idx: i,
          val: arr[i],
        });
      }

      setMainArray(sortedArray);
      setAble(true);
    }, counter * animationSpeed);
  };

  // BUBBLE SORT
  const bubbleSortAnimate = () => {
    setAble(false);
    const { arr, count } = bubbleSort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };

  // MERGE SORT
  const mergeSort = () => {
    setAble(false);
    const { sortedArray, count } = mergeSortAnimation(
      mainArray,
      animationSpeed
    );
    colorEveryElement(sortedArray, count + 5);
  };

  // INSERTION SORT
  const insertionSortAnimate = () => {
    setAble(false);
    const { arr, count } = insertionSort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };

  // SELECTION SORT
  const selectionSortAnimate = () => {
    setAble(false);
    const { arr, count } = selectionSort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 2);
  };

  //QUICK SORT
  const quicksortAnimate = () => {
    setAble(false);
    const { arr, count } = quicksort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };

  // HEAP SORT
  const heapsortAnimate = () => {
    setAble(false);
    const { arr, count } = heapsort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };
  const startSorting = (algo) => {
    // sortingStart.play();
    switch (algo) {
      case "bubblesort":
        bubbleSortAnimate();
        break;

      case "mergesort":
        mergeSort();
        break;

      case "selectionsort":
        selectionSortAnimate();
        break;

      case "insertionsort":
        insertionSortAnimate();
        break;
      case "quicksort":
        quicksortAnimate();
        break;
      case "heapsort":
        heapsortAnimate();
        break;
      default:
        mergeSort();
        break;
    }
  };

  return (
    <>
      <div className="container">
        <div className="visualizeContainer">
          {mainArray.map((item) => {
            return (
              <div
                className="arrayBar"
                style={{
                  height: `${item.val}px`,
                  backgroundColor: colors.primaryColor,
                }}
                key={item.idx}
              >
                {arrayLength < 31 && able && <span>{item.val}</span>}
              </div>
            );
          })}
        </div>
        <div className="sidebar">
          <header>
            Sorting Algorithm <br /> Visualizer
          </header>
          <div className="select-box able">
            <label htmlFor="algo">Select Algorithm</label>

            <select
              name="algo"
              id="select"
              value={algo}
              onChange={(e) => setAlgo(e.target.value)}
              className="slt"
            >
              <option value="mergesort">Merge Sort</option>
              <option value="bubblesort">Bubble Sort</option>
              <option value="insertionsort">Insertion Sort</option>
              <option value="selectionsort">Selection Sort</option>
              <option value="quicksort">Quick Sort</option>
              <option value="heapsort">Heap Sort</option>
            </select>
          </div>
          <button className="button able" onClick={() => startSorting(algo)}>
            Sort
          </button>

          <button
            onClick={() => populateArray(arrayLength)}
            className="new-arr-btn button able"
          >
            Random Bar
          </button>

          <div className="slider-container">
            <label>Length of Array : {arrayLength} </label>
            <input
              className="input-range able"
              type="range"
              value={arrayLength}
              onChange={(e) => setArrayLength(e.target.value)}
              min="7"
              max="150"
            />
          </div>
          <div className="slider-container">
            <label>Speed : {animationSpeed}</label>
            <label>
              Fast
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Slow
            </label>

            <input
              className="input-range able"
              type="range"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(e.target.value)}
              min="100"
              max="1000"
            />
          </div>
          <div className="social">
            <a
              href="https://www.linkedin.com/in/programmershri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect with me...
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualizer;
