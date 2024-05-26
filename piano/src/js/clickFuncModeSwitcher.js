"use strict";


import { isEditModeActive, pressedOctave, switchModeType, 
  getOctaveClassByElem, setPressedOctaveName, updateBasicMode, 
  updateAdvancedMode, updateProMode } from "./keyFuncModeSwitcher.js";
import { mouseClickHandler } from "./possibleKeysShower.js";


const allKeyElems = document.querySelectorAll(".key");
export let clickedProKeyElem = undefined;


allKeyElems.forEach(keyElem => {
  keyElem.addEventListener("click", function(e) {
    switchByClick(e, keyElem);
    mouseClickHandler(e, keyElem);
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
    const clickedOctaveKeys = getOctaveKeysByKey(key);
    let kbdHint = getKbdHint(clickedOctaveKeys);

    if (kbdHint === "") {
      let isOctaveValid = true;
      allKeyElems.forEach(keyElem => {
        let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
        if (kbdHint.textContent === "]") {
          isOctaveValid = false;
        }
      })

      if (isOctaveValid) {
        setPressedOctaveName("js-key-super");
      } else {
        return;
      }

    } else {
      kbdHint = key.querySelector(".js-kbd-key-hint");
      setPressedOctaveName(getOctaveClassByHint(kbdHint));
    }
  } else {
    let clickedKeyElem = e.target;
    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count"));
    updateAdvancedMode(pressedOctave, nextOctaveNum);
  }
}


function getOctaveKeysByKey(keyElem) {
  const clickedOctave = keyElem.parentNode.parentNode;
  let octaveCountClass = Array.from(clickedOctave.classList).find(
    className => className.startsWith("keyboard--count"));
  const clickedOctaves = document.querySelectorAll(`.${octaveCountClass}`);
  const clickedOctaveKeys = [];

  clickedOctaves.forEach(clickedOctave => {
    const octaveKeys = clickedOctave.querySelectorAll(".key");
    octaveKeys.forEach(keyElem => clickedOctaveKeys.push(keyElem));
  })

  return clickedOctaveKeys;
}


function getOctaveClassByHint(kbdHint) {
  const allKeyElems = document.querySelectorAll(".key");
  const clickedOctaveKeys = getOctaveKeysByKey(kbdHint.parentNode);
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


export function getKbdHint(prevOctaveKeys) {
  let kbdHint = "";
  prevOctaveKeys.forEach(prevOctaveKey => {
    let tmpKbdHint = prevOctaveKey.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent) {
      kbdHint = tmpKbdHint;
    }
  })

  return kbdHint;
}