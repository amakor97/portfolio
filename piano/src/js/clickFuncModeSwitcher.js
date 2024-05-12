"use strict";


import { isEditModeActive, pressedOctave, switchModeType, 
  getOctaveClassByElem, setPressedOctaveName, updateBasicMode, 
  updateAdvancedMode, updateProMode } from "./keyFuncModeSwitcher.js";


const allKeyElems = document.querySelectorAll(".key");
export let clickedProKeyElem = undefined;


allKeyElems.forEach(key => {
  key.addEventListener("click", function tmp(e) {
    switchByClick(e, key);
  });
})


function switchByClick(e, key) {
  if (!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case("basic"): {
      switchBasicModeClickHandler(e);
      break;
    }
    case("advanced"): {
      switchAdvancedModeClickHandler(e, key);
      break;
    }
    case("pro"): {
      switchProModeClickHandler(key);
      break;
    }
  }
}


function switchBasicModeClickHandler(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let num = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);
  updateBasicMode(num);
}


function switchAdvancedModeClickHandler(e, key) {
  if (!pressedOctave) {
    let kbdHint = key.querySelector(".js-kbd-key-hint");
    setPressedOctaveName(getOctaveClassByHint(kbdHint));

    console.log(pressedOctave);
  } else {
    let clickedKeyElem = e.target;
    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count"));
    updateAdvancedMode(pressedOctave, nextOctaveNum);
  }
}


function getOctaveClassByHint(kbdHint) {
  console.log("start");
  console.log(kbdHint);

  const allKeyElems = document.querySelectorAll(".key");
  let clickedOctave = kbdHint.parentNode.parentNode.parentNode;
  let clickedOctaveKeys = clickedOctave.querySelectorAll(".key");
  let targetKeyElem = undefined;

  for (let octaveKeyElem of clickedOctaveKeys) {
    let kbdHint = octaveKeyElem.querySelector(".js-kbd-key-hint");
    if (kbdHint.textContent) {

      for (let keyElem of allKeyElems) {
        if (kbdHint.textContent === keyElem.dataset.symbol) {
          targetKeyElem = keyElem;
        }
      }
    }
  }
  
  console.log(targetKeyElem);
  console.log("finish");

  return getOctaveClassByElem(targetKeyElem);
}


function switchProModeClickHandler(key) {
  let noteForProMode = key.dataset.display;

  if (!clickedProKeyElem) {
    clickedProKeyElem = getClickedProKeyElem(key);
  } else {
    let targetKey = clickedProKeyElem.dataset.key;
    updateProMode(clickedProKeyElem, targetKey, noteForProMode);
    clickedProKeyElem = undefined;
  }
}


function getClickedProKeyElem(key) {
  const allKeyElems = document.querySelectorAll(".key");
  let kbdHint = key.querySelector(".js-kbd-key-hint");

  if (key.dataset && (kbdHint.textContent !== "")) {
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.symbol === kbdHint.textContent) {
        return keyElem;
      }
    }
  }
}