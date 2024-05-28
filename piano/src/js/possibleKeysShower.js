"use strict";


import { isEditModeActive, switchModeType, 
  pressedOctave } from "./keyFuncModeSwitcher.js";


const allKeyElems = document.querySelectorAll(".key");


allKeyElems.forEach(keyElem => {
  keyElem.addEventListener("mouseover", function(e) {
    updateHightlights(e, keyElem);
  })

  keyElem.addEventListener("mouseout", function(e) {
    updateHightlights(e);
  })
})


let getOctaveKeys = (className) => document.querySelectorAll(
  `.keyboard--count-${className} .key`);


let fillArrayWithOctaveKeys = (arr, num) => {
  let keys = getOctaveKeys(num);
  keys.forEach(keyElem => arr.push(keyElem));
}


function highlightNextBasicKeys(e, keyElem) {
  if (!keyElem) {
    return;
  }

  const targetOctave = keyElem.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  const targetKeys = [];
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum-1);
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum+1);
  let superOctaveKey = document.querySelector(
    `.keyboard--count-${targetBasicNum+2} .key[data-display^="C"]`);
  
  if (superOctaveKey) {
    targetKeys.push(superOctaveKey);
  }
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}


function highlightPrevAdvancedKeys(e, keyElem) {
  if (!keyElem) {
    return;
  }

  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  prevOctaveKeys.length = 0;

  const targetOctave = keyElem.parentNode.parentNode;
  const targetOctaveClasses = Array.from(targetOctave.classList);
  let isOctaveValid = (targetOctaveClasses.find(
    className => className.startsWith("keyboard--count"))) ? true : false;

  if (!isOctaveValid) {
    return;
  }

  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));
  const targetKeys = [];
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
  targetKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


function highlightNextAdvancedKeys(e) {
  const targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  const targetKeys = [];
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
  console.log("mh");
  if(!isEditModeActive) {
    return;
  }
  switch(switchModeType) {
    case "basic": {
      updateHightlights(e, keyElem);
      break;
    }
    case "advanced": {
      console.log("PON at click adv:", {pressedOctave});
      if (!pressedOctave) {
        prevOctaveKeys.length = 0;
        updateHightlights(e, keyElem);
        
      } else {
        updateHightlights(e, keyElem);
      }
      break;
    }
    case "pro": {
      if (!clickedProKey) {
        if (e.target.classList.contains("key")) {
          let kbdHint = e.target.querySelector(".js-kbd-key-hint");
          if (kbdHint.textContent !== "") {
            clickedProKey = e.target;
            updateHightlights(e, keyElem);
          }
        }
      } else {
        if (e.target.classList.contains("key")) {
          clickedProKey = undefined;
          updateHightlights(e, keyElem);
        }
      }
    }
  }
}


let clickedProKey = undefined;
export let unsetClickedProKey = () => clickedProKey = undefined;


const prevOctaveKeys = [];
const nextOctaveKeys = [];

function updateHightlights(e, keyElem = undefined) {


  if (!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case "basic": {
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
      highlightNextBasicKeys(e, keyElem);
      break;
    }
    case "advanced": {
      console.log("PON at UH adv enter:", {pressedOctave});

      if (e.relatedTarget && e.relatedTarget.tagName === "BODY" && !pressedOctave) {
        prevOctaveKeys.length = 0;
      }

      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
      prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));

      console.log(prevOctaveKeys.length);

      if (!pressedOctave) {
        allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
        prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
        highlightPrevAdvancedKeys(e, keyElem);
        //highlightNextAdvancedKeys(e);
      } else {
        allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
        prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
        highlightNextAdvancedKeys(e);
      }

      break;
    }
    case "pro": {
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));

      highlightPrevProKey(e, keyElem);
      if (clickedProKey) {
        clickedProKey.classList.add("key--prev");
        highlightNextProKey(e, keyElem);
      }
    }
  }
}


export function highlightPrevOctaveKeys(num) {
  let prevOctaveKeys = [];
  prevOctaveKeys = getOctaveKeys(num);
  prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


