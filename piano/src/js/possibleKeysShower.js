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

  let targetOctave = keyElem.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  let targetKeys = [];
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum-1);
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum+1);
  let superOctaveKey = document.querySelector(
    `.keyboard--count-${targetBasicNum+2} .key[data-display^="C"]`);
  targetKeys.push(superOctaveKey);

  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}


function highlightPrevAdvancedKeys(e, keyElem) {


  if (!keyElem) {
    return;
  }

  console.log("RED ADV");

  //prevOctaveKeys.forEach();
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  prevOctaveKeys.length = 0;

  console.log(keyElem);

  let targetOctave = keyElem.parentNode.parentNode;
  let targetOctaveClasses = Array.from(targetOctave.classList);



  let isOctaveValid = (targetOctaveClasses.find(
    className => className.startsWith("keyboard--count"))) ? true : false;


  if (!isOctaveValid) {
    return;
  }

  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  let targetKeys = [];
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  

  let isOctaveCorrect = false;
  for (let keyElem of targetKeys) {
    if (keyElem.children[0].textContent !== "") {
      isOctaveCorrect = true;
    }
  }

  if (targetBasicNum === 0) {
    let isZeroOctave = true;
    for (let keyElem of allKeyElems) {
      let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
      if (kbdHint.textContent === "]") {
        isZeroOctave = false;
      }
    }

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
  console.log("GREEN ADV");
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  let targetKeys = [];
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}

function highlightPrevProKey(e) {
  if (e.type === "mouseout") {
    return;
  }
  let targetKey = e.target;
  if (!targetKey.classList.contains("key")) {
    return;
  }

  if (targetKey.children[0].textContent !== "") {
    targetKey.classList.add("key--prev");
    //clickedProKey = targetKey;
  }
}

function highlightNextProKey(e) {
  let targetKey = e.target;
  if (!targetKey.classList.contains("key")) {
    return;
  }
  targetKey.classList.add("key--next");
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
            updateHightlights(e);
          }
        }
      } else {
        if (e.target.classList.contains("key")) {
          clickedProKey = undefined;
          updateHightlights(e);
        }
      }
    }
  }
}


let clickedProKey = undefined;
export let unsetClickedProKey = () => clickedProKey = undefined;


const prevOctaveKeys = [];
const nextOctaveKeys = [];

function updateHightlights(e, keyElem) {


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

      highlightPrevProKey(e);
      if (clickedProKey) {
        clickedProKey.classList.add("key--prev");
        highlightNextProKey(e);
      }
    }
  }
}


export function highlightPrevOctaveKeys(num) {
  let prevOctaveKeys = [];
  prevOctaveKeys = getOctaveKeys(num);
  prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


