"use strict";


import { isEditModeActive, switchModeType, 
  updateBasicSounds } from "./functionalModeSwitcher.js";
import { updateVisualHints } from "./hintsUpdater.js";
import { setBasicOffset, advancedModeLayouts, activeAdvancedLayout, 
  proModeLayouts, activeProLayout, getOctaveClass } from "./functionalModeSwitcher.js";


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


let prevOctaveNum = undefined;
let clickedProKeyElem = undefined;


function switchBasicModeClick(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);

  setBasicOffset(+targetBasicNum);
  updateBasicSounds(+targetBasicNum);

  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
}


function switchAdvancedModeClick(e, key) {
  let clickedKeyElem = e.target;
  if (!prevOctaveNum) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {
      prevOctaveNum = Array.from(clickedKeyElem.parentNode.parentNode.classList).find(
        className => className.startsWith("keyboard--count")).slice(-1);
    } 
  } else {
    let nextOctaveNum = Array.from(clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1);
    let prevOctaveKeys = document.querySelectorAll(
      `.keyboard--count-${prevOctaveNum} .key:not(.key--empty)`);
    let octaveName = undefined;

    let kbdHint = "";
    prevOctaveKeys.forEach(prevOctaveKey => {
      let tmpKbdHint = prevOctaveKey.querySelector(".js-kbd-key-hint");
      if (tmpKbdHint.textContent) {
        kbdHint = tmpKbdHint;
      }
    })

    allKeyElems.forEach(keyElem => {
      if (keyElem.dataset.symbol === kbdHint.textContent) {
        octaveName = getOctaveClass(keyElem);
      }
    })
    const name = octaveName.slice(7);
    advancedModeLayouts[activeAdvancedLayout][name] = +nextOctaveNum;

    let playableOctaveKeys =  document.querySelectorAll(`.${octaveName}`);
    playableOctaveKeys.forEach(playableOctaveKey => {
      playableOctaveKey.dataset.sound = 
        `${playableOctaveKey.dataset.sound.slice(0, -1)}${nextOctaveNum}`;
    })

    allKeyElems.forEach(key => key.classList.remove("key--pressing"));
    updateVisualHints();
    prevOctaveNum = undefined;
  }
}


function switchProModeClick(key) {
  if (!clickedProKeyElem) {
    let kbdHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kbdHint.textContent !== "")) {
      allKeyElems.forEach(keyElem => {
        if (keyElem.dataset.symbol === kbdHint.textContent) {
          clickedProKeyElem = keyElem;
        }
      })
    }

  } else {
    clickedProKeyElem.dataset.sound = key.dataset.display;
    proModeLayouts[activeProLayout][clickedProKeyElem.dataset.key] = 
      key.dataset.display;
    allKeyElems.forEach(key => key.classList.remove("key--pressing"));
    updateVisualHints();
    clickedProKeyElem = undefined;
  }
}