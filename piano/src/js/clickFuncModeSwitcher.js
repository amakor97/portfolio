"use strict";


import { isEditModeActive, pressedOctave, 
  switchModeType } from "./keyFuncModeSwitcher.js";
import { getOctaveClassByElem, setPressedOctaveName, updateBasicMode, 
  updateAdvancedMode, updateProMode } from "./keyFuncModeSwitcher.js";


const allKeyElems = document.querySelectorAll(".key");
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


export let clickedProKeyElem = undefined;


function switchBasicModeClickHandler(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let num = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);
  updateBasicMode(num);
}


function getOctaveClassByHint(kbdHint) {
  let clickedOctave = kbdHint.parentNode.parentNode.parentNode;
  let clickedOctaveKeys = clickedOctave.querySelectorAll(".key");
  let targetKeyElem = undefined;

  for (let keyElem of clickedOctaveKeys) {
    let tmpKbdHint = keyElem.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent) {

      for (let keyElem2 of allKeyElems) {
        if (tmpKbdHint.textContent === keyElem2.dataset.symbol) {
          targetKeyElem = keyElem2; ///
        }
      }
    }
  }
  
  return getOctaveClassByElem(targetKeyElem);
}


function switchAdvancedModeClickHandler(e, key) {
  if (!pressedOctave) {
    let kbdHint = key.querySelector(".js-kbd-key-hint");
    setPressedOctaveName(getOctaveClassByHint(kbdHint));
  } else {
    let clickedKeyElem = e.target;
    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count"));
    updateAdvancedMode(pressedOctave, nextOctaveNum);
  }
}


function getClickedProKeyElem(key) {
  let kbdHint = key.querySelector(".js-kbd-key-hint");
  if (key.dataset && (kbdHint.textContent !== "")) {
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.symbol === kbdHint.textContent) {
        return keyElem;
      }
    }
  }
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