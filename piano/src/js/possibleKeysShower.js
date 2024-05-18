"use strict";

import { isEditModeActive, switchModeType, 
  pressedOctave, getOctaveClassByElem,  } from "./keyFuncModeSwitcher.js";
import { clickedProKeyElem } from "./clickFuncModeSwitcher.js";

const allKeyElems = document.querySelectorAll(".key");
allKeyElems.forEach(keyElem => {
  keyElem.addEventListener("mouseover", function(e) {
    //mouseOverHandler(e);
    updateHightlights(e, keyElem);
  })

  keyElem.addEventListener("mouseout", function(e) {
    //keyElem.classList.remove("key--next");
    //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
    //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
    updateHightlights(e);
  })

  keyElem.addEventListener("click", function(e) {
    mouseClickHandler(e, keyElem);
    //updateHightlights(e);
  })
})



let getOctaveKeys = (className) => document.querySelectorAll(
  `.keyboard--count-${className} .key`);

let getOctaveKeysByName = (className) => document.querySelectorAll(
  `.${className}`);

let fillArrayWithOctaveKeys = (arr, num) => {
  let keys = getOctaveKeys(num);
  keys.forEach(keyElem => arr.push(keyElem));
}


// hoverNext...?
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


  console.log("GREEN BASIC");
  //console.log(targetKeys);
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}

function highlightPrevAdvancedKeys(e, keyElem) {
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
  //prevOctaveKeys.map(targetKeys);

  targetKeys.forEach(keyElem => prevOctaveKeys.push(keyElem));
  console.log(prevOctaveKeys.length);
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
        console.log("hii");
        prevOctaveKeys.length = 0;
        updateHightlights(e, keyElem);
        
      } else {
        console.log("POK ", prevOctaveKeys.length);
        //prevOctaveKeys.length = 0;
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
      
      if (e.relatedTarget && e.relatedTarget.tagName === "BODY" && !pressedOctave) {
        prevOctaveKeys.length = 0;
      }

      console.log("PON at UH adv enter:", {pressedOctave});

      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
      prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));

      console.log(prevOctaveKeys.length);

      if (!pressedOctave) {
        console.log(prevOctaveKeys.length);
        allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
        prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
        highlightPrevAdvancedKeys(e, keyElem);
        //highlightNextAdvancedKeys(e);
      } else {
        
        console.log("POK len: ", prevOctaveKeys.length);
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


