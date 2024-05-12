"use strict";

import { isEditModeActive, switchModeType, 
  pressedOctave, getOctaveClassByElem } from "./keyFuncModeSwitcher.js";
import { clickedProKeyElem } from "./clickFuncModeSwitcher.js";

const allKeyElems = document.querySelectorAll(".key");
allKeyElems.forEach(keyElem => {
  keyElem.addEventListener("mouseover", function(e) {
    //mouseOverHandler(e);
    updateHightlights(e);
  })

  keyElem.addEventListener("mouseout", function(e) {
    //keyElem.classList.remove("key--next");
    //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
    //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
    updateHightlights(e);
  })

  keyElem.addEventListener("click", function(e) {
    mouseClickHandler(e);
    updateHightlights(e);
  })
})


function mouseOverHandler(e) {
  if(!isEditModeActive) {
    return;
  }
  switch(switchModeType) {
    case "basic": {
      highlightNextBasicKeys(e);
      break;
    }
    case "advanced": {
      if (!pressedOctave) {
        highlightPrevAdvancedKeys(e);
      } else {
        highlightNextAdvancedKeys(e);
      }
      break;
    }
  }
}


let getOctaveKeys = (className) => document.querySelectorAll(
  `.keyboard--count-${className} .key`);

let getOctaveKeysByName = (className) => document.querySelectorAll(
  `.${className}`);

let fillArrayWithOctaveKeys = (arr, num) => {
  let keys = getOctaveKeys(num);
  keys.forEach(keyElem => arr.push(keyElem));
}


// hoverNext...?
function highlightNextBasicKeys(e) {
  let targetOctave = e.target.parentNode.parentNode;
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

function highlightPrevAdvancedKeys(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let targetOctaveClasses = Array.from(targetOctave.classList);

  //console.log({targetOctaveClasses});

  let isOctaveValid = (targetOctaveClasses.find(
    className => className.startsWith("keyboard--count"))) ? true : false;

  //console.log(isOctaveValid);

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
  targetKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
  //console.log("keys with prev classes:");
  //console.log(targetKeys);
}

function highlightNextAdvancedKeys(e) {

  
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));



  let targetKeys = [];
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}

function highlightPrevProKey(e) {
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

function mouseClickHandler(e) {
  if(!isEditModeActive) {
    return;
  }
  switch(switchModeType) {
    case "basic": {
      break;
    }
    case "advanced": {

      if (!pressedOctave) {
        applyPrevAdvancedKeys(e);
      } else {
        applyNextAdvancedKeys();
      }
      break;
    }
    case "pro": {
      if (!clickedProKey) {
        if (e.target.classList.contains("key")) {
          clickedProKey = e.target;
        }
      } else {
        if (e.target.classList.contains("key")) {
          clickedProKey = undefined;
        }
      }
    }
  }
}

function applyPrevAdvancedKeys(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = +(Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1));

  let targetKeys = [];
  fillArrayWithOctaveKeys(targetKeys, targetBasicNum);

  targetKeys.forEach(keyElem => keyElem.classList.add("key--prev"));


  updateHightlights();
}

function applyNextAdvancedKeys(e) {

}


let clickedProKey = undefined;
export let unsetClickedProKey = () => clickedProKey = undefined;

function updateHightlights(e) {
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));

  if (!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case "basic": {
      highlightNextBasicKeys(e);
      break;
    }
    case "advanced": {
      highlightPrevAdvancedKeys(e);
      if (pressedOctave) {
        highlightPrevOctaveKeys(pressedOctave);
        highlightNextAdvancedKeys(e);
      }

      break;
    }
    case "pro": {
      highlightPrevProKey(e);
      if (clickedProKey) {
        clickedProKey.classList.add("key--prev");
        highlightNextProKey(e);
      }
    }
  }
}


export function highlightPrevOctaveKeys(pressedOctave) {
  console.log({pressedOctave});
  let prevOctaveKeys = [];
  prevOctaveKeys = getOctaveKeysByName(pressedOctave);
  console.log(prevOctaveKeys);
  prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


