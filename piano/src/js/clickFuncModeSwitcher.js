"use strict";


import { isEditModeActive, switchModeType, 
  updateBasicSounds } from "./functionalModeSwitcher.js";
import { updateVisualHints } from "./hintsUpdater.js";
import { setBasicOffset, advancedModeLayouts, activeAdvancedLayout, 
  proModeLayouts, activeProLayout, getOctaveClassByElem, 
  updateAdvancedOctaveSounds } from "./functionalModeSwitcher.js";

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


export let prevOctaveNum = undefined;
export let clickedProKeyElem = undefined;


function switchBasicModeClick(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);

  setBasicOffset(+targetBasicNum);
  updateBasicSounds(+targetBasicNum);

  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
}


function getPrevOctaveNum(key) {
  console.log(key.parentNode.parentNode);

  let prevOctave = key.parentNode.parentNode;
  console.log(prevOctave);

  let prevOctaveKeys = prevOctave.querySelectorAll(".key");
  console.log(prevOctaveKeys);

  for (let keyElem of prevOctaveKeys) {
    let kdbHint = keyElem.querySelector(".js-kbd-key-hint");
    if (keyElem.dataset && (kdbHint.textContent !== "")) {
      prevOctaveNum = Array.from(prevOctave.classList).find(
        className => className.startsWith("keyboard--count")).slice(-1);
        return prevOctaveNum;
      }
  }

  console.log("marl");

  let isZeroOctave = true;

  const allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(keyElem => {
    let kbdHint = keyElem.querySelector(".js-kbd-key-hint"); ///??
    if (kbdHint.textContent === "]") {
      isZeroOctave = false;
    }
  })

  console.log({isZeroOctave});

  if (isZeroOctave) {
    prevOctaveNum = 0;
    return "0";
  }

  let rbKey = document.querySelector(".key[data-symbol=']']");
  console.log(rbKey);
  let rbHint = rbKey.querySelector(".js-piano-key-hint");
  console.log(rbHint.textContent);

  let kdbHint = key.querySelector(".js-kbd-key-hint");
  if (key.dataset && (kdbHint.textContent !== "")) {
    prevOctaveNum = Array.from(key.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1);
  }
  return prevOctaveNum; 
}


function getKbdHint(prevOctaveNum) {
  let prevOctaveKeys = document.querySelectorAll(
    `.keyboard--count-${prevOctaveNum} .key:not(.key--empty)`);
  let kbdHint = "";
  prevOctaveKeys.forEach(prevOctaveKey => {
    let tmpKbdHint = prevOctaveKey.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent) {
      kbdHint = tmpKbdHint;
    }
  })

  return kbdHint;
}


function getOctaveClassByHint(kbdHint) {
  for (let keyElem of allKeyElems) {
    if (keyElem.dataset.symbol === kbdHint.textContent) {
      return getOctaveClassByElem(keyElem);
    }
  }
}


function switchAdvancedModeClick(e, key) {
  let clickedKeyElem = e.target;
  if (!prevOctaveNum) {
   prevOctaveNum = getPrevOctaveNum(key);
   console.log({prevOctaveNum});
  } else {
    console.log("hh");
    let kbdHint = getKbdHint(prevOctaveNum);
    console.log({kbdHint});
    let octaveName = (kbdHint === "") ? "js-key-super" : getOctaveClassByHint(kbdHint);
    console.log({octaveName});
    const name = octaveName.slice(7);
    console.log({name});

    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1);
    advancedModeLayouts[activeAdvancedLayout][name] = +nextOctaveNum;

    updateAdvancedOctaveSounds(octaveName, nextOctaveNum);

    allKeyElems.forEach(key => key.classList.remove("key--pressing"));
    updateVisualHints();
    prevOctaveNum = undefined;
  }
}


function getClickedProKeyElem(key) {
  console.log("x");
  let kbdHint = key.querySelector(".js-kbd-key-hint");
  if (key.dataset && (kbdHint.textContent !== "")) {
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.symbol === kbdHint.textContent) {
        return keyElem;
      }
    }
  }
}


function switchProModeClick(key) {
  if (!clickedProKeyElem) {
    clickedProKeyElem = getClickedProKeyElem(key);
  } else {
    clickedProKeyElem.dataset.sound = key.dataset.display;
    proModeLayouts[activeProLayout][clickedProKeyElem.dataset.key] = 
      key.dataset.display;
      
    allKeyElems.forEach(key => key.classList.remove("key--pressing"));
    updateVisualHints();
    clickedProKeyElem = undefined;
    console.log(clickedProKeyElem);
  }
}