"use strict";


import { isEditModeActive, switchModeType, 
  pressedOctave } from "./keyFuncModeSwitcher.js";


const allKeyElems = document.querySelectorAll(".key");
const prevOctaveKeys = [];
export let clickedProKey = undefined;
export let resetClickedProKey = () => clickedProKey = undefined;


allKeyElems.forEach(keyElem => {
  keyElem.addEventListener("mouseover", function(e) {
    if (!isEditModeActive) {
      return;
    }
    updateHightlights(e, keyElem);
  })

  keyElem.addEventListener("mouseout", function(e) {
    if (!isEditModeActive) {
      return;
    }
    updateHightlights(e);
  })
})


let getOctaveKeys = (num) => document.querySelectorAll(
  `.keyboard--count-${num} .key`);


let fillArrayWithOctaveKeys = (arr, num) => {
  let keys = getOctaveKeys(num);
  keys.forEach(keyElem => arr.push(keyElem));
}


function highlightNextBasicKeys(keyElem) {
  if (!keyElem) {
    return;
  }

  const targetKeys = [];
  const targetOctave = keyElem.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  fillArrayWithOctaveKeys(targetKeys, targetBasicNum-1);
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum+1);
  const superOctaveKey = document.querySelector(
    `.keyboard--count-${targetBasicNum+2} .key[data-display^="C"]`);
  
  if (superOctaveKey) {
    targetKeys.push(superOctaveKey);
  }
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}


function highlightPrevAdvancedKeys(keyElem) {
  if (!keyElem) {
    return;
  }

  const targetKeys = [];
  const targetOctave = keyElem.parentNode.parentNode;
  const targetOctaveClasses = Array.from(targetOctave.classList);

  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  prevOctaveKeys.length = 0;

  let targetBasicNum = +(targetOctaveClasses.find(
    className => className.startsWith("keyboard--count")).slice(-1));
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);

  let isOctaveCorrect = false;
  targetKeys.forEach(keyElem => {
    if (keyElem.children[0].textContent !== "") {
      isOctaveCorrect = true;
    }
  })

  if (targetBasicNum === 0) {
    let isZeroOctave = true;

    allKeyElems.forEach(keyElem => {
      let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
      if (kbdHint.textContent === "]") {
        isZeroOctave = false;
      }
    })

    if (isZeroOctave) {
      isOctaveCorrect = true;
    }
  }

  if (!isOctaveCorrect) {
    return;
  }

  targetKeys.forEach(keyElem => prevOctaveKeys.push(keyElem));
  prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


function highlightNextAdvancedKeys(e) {
  const targetKeys = [];
  const targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}


function highlightPrevProKey(e, keyElem) {
  if (e.type === "mouseout") {
    return;
  }

  if (keyElem.children[0].textContent !== "") {
    keyElem.classList.add("key--prev");
  }
}


function highlightNextProKey(e, keyElem) {
  if (e.type === "mouseout") {
    return;
  }

  keyElem.classList.add("key--next");
}


export function mouseClickHandler(e, keyElem) {
  if(!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case "basic": {
      updateHightlights(e, keyElem);
      break;
    }

    case "advanced": {
      if (!pressedOctave) {
        prevOctaveKeys.length = 0;
      }
      updateHightlights(e, keyElem);
      break;
    }

    case "pro": {
      if (!clickedProKey) {
        let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
        if (kbdHint.textContent !== "") {
          clickedProKey = keyElem;
          updateHightlights(e, keyElem);
        }
      } else {
        clickedProKey = undefined;
        updateHightlights(e, keyElem);
      }
      break;
    }
  }
}


function updateHightlights(e, keyElem = undefined) {
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));

  switch(switchModeType) {
    case "basic": {
      highlightNextBasicKeys(keyElem);
      break;
    }

    case "advanced": {
      if (e.relatedTarget && e.relatedTarget.tagName === "BODY" && !pressedOctave) {
        prevOctaveKeys.length = 0;
      }
      prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));

      if (!pressedOctave) {
        highlightPrevAdvancedKeys(keyElem);
      } else {
        highlightNextAdvancedKeys(e);
      }

      break;
    }

    case "pro": {
      if (!clickedProKey) {
        highlightPrevProKey(e, keyElem);
      } else {
        clickedProKey.classList.add("key--prev");
        highlightNextProKey(e, keyElem);
      }

      break;
    }
  }
}


export function highlightPrevOctaveKeys(num) {
  let prevOctaveKeys = getOctaveKeys(num);
  prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


