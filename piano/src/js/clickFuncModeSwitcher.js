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
let prevOctaveName = undefined;
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
  if (!prevOctaveNum) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {
      let clickedKey = e.target;
      prevOctaveNum = Array.from(clickedKey.parentNode.parentNode.classList).find(
        className => className.startsWith("keyboard--count")).slice(-1);
    } 
  } else {
    let clickedKey = e.target;
    let nextOctaveNum = Array.from(clickedKey.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1);
    console.log({nextOctaveNum});

    prevOctave = document.querySelectorAll(`.keyboard--count-${prevOctaveNum}`);
    let prevOctaveKeys = document.querySelectorAll(
      `.keyboard--count-${prevOctaveNum} .key:not(.key--empty)`);

    let nextOctave = document.querySelector(`.keyboard--count-${nextOctaveNum}`);
    let nextOctaveKeys =  document.querySelectorAll(
      `.keyboard--count-${nextOctaveNum} .key:not(.key--empty)`);

    prevOctaveNum = undefined;

    targetOctave = Array.from(e.target.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1);
    let octaveName = undefined;
    const keyElems = document.querySelectorAll(".key");

    let kbdHint = "";
    for (let prevOctaveKey of prevOctaveKeys) {
      let tmpKbdHint = prevOctaveKey.querySelector(".js-kbd-key-hint");
      console.log({tmpKbdHint});
      if (tmpKbdHint.textContent) {
        kbdHint = tmpKbdHint;
      }
    }


    for (let keyElem of keyElems) {
      if (keyElem.dataset.symbol === kbdHint.textContent) {
        octaveName = getOctaveClass(keyElem);
        break;
      }
    }
    const name = octaveName.slice(7);
    advancedModeLayouts[activeAdvancedLayout][name] = +nextOctaveNum;

    let playableOctaveKeys =  document.querySelectorAll(`.${octaveName}`);

    playableOctaveKeys.forEach(playableOctaveKey => {
      playableOctaveKey.dataset.sound = 
        `${playableOctaveKey.dataset.sound.slice(0, -1)}${nextOctaveNum}`;
    })
    octaveName = undefined;
    allKeyElems.forEach(key => key.classList.remove("key--pressing"));

    updateKbdHints();
    updateSoundHints();
    updateDisabledKeys();

    prevOctave = undefined;
    prevOctaveNum = undefined;
    nextOctaveNum = undefined;
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