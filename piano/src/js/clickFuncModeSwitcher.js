"use strict";


import { isEditModeActive, switchModeType, 
  updateBasicSounds } from "./functionalModeSwitcher.js";
import { updateKbdHints, updateSoundHints, 
  updateDisabledKeys } from "./hintsUpdater.js";
import { setBasicOffset, advancedModeLayouts, activeAdvancedLayout, 
  proModeLayouts, activeProLayout, getOctaveClass, assignSoundForAdvancedMode 
} from "./functionalModeSwitcher.js";


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
      switchBasicModeClick(e);
      break;
    }
    case("advanced"): {
      switchAdvancedModeClick(e, key);
      break;
    }
    case("pro"): {
      switchProModeClick(key);
      break;
    }
  }
}


let prevOctave = undefined;
let prevOctaveNum = undefined;
let targetOctave = undefined;
let pressedProKeyElemClick = undefined;


function switchBasicModeClick(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);

  setBasicOffset(+targetBasicNum);
  updateBasicSounds(+targetBasicNum);

  allKeyElems.forEach(key => key.classList.remove("key--pressing"));

  updateKbdHints();
  updateSoundHints();
  updateDisabledKeys();
}


function switchAdvancedModeClick(e, key) {
  if ((prevOctave === undefined)) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {
      prevOctave = e.target.parentNode.parentNode;
      prevOctaveNum = Array.from(prevOctave.classList).find(
        className => className.startsWith("keyboard--count")).slice(-1);
    } 
  } else {
    targetOctave = Array.from(e.target.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1);
    let octaveName = undefined;
    const keyElems = document.querySelectorAll(".key");
    const octaveKeys = prevOctave.querySelectorAll(".key:not(.key--empty)");
    octaveKeys.forEach(key => {
      let kbdHint = key.querySelector(".js-kbd-key-hint");

      keyElems.forEach(keyElem => {
        if (keyElem.dataset.symbol === kbdHint.textContent) {
          let targetClass = getOctaveClass(keyElem);
          if (targetClass) {
            octaveName = targetClass;
          }
        }
      })
    });

    const name = octaveName.slice(7);
    advancedModeLayouts[activeAdvancedLayout][name] = +targetOctave;
    keyElems.forEach(keyElem => assignSoundForAdvancedMode(keyElem));
    allKeyElems.forEach(key => key.classList.remove("key--pressing"));

    updateKbdHints();
    updateSoundHints();
    updateDisabledKeys();

    prevOctave = undefined;
    prevOctaveNum = undefined;
    targetOctave = undefined;
  }
}


function switchProModeClick(key) {
  if (!pressedProKeyElemClick) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {

      const keyElems = document.querySelectorAll(".key");
      keyElems.forEach(keyElem => {
        if (kdbHint.textContent === keyElem.dataset.symbol) {
          pressedProKeyElemClick = keyElem;
        }
      })
    }
  } else {
    if (key) {
      pressedProKeyElemClick.dataset.sound = key.dataset.display;
      proModeLayouts[activeProLayout][pressedProKeyElemClick.dataset.key] = 
        key.dataset.display;
      pressedProKeyElemClick = undefined;
    }
  }

  allKeyElems.forEach(key => key.classList.remove("key--pressing"));

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}