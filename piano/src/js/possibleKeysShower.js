"use strict";

import { isEditModeActive, switchModeType } from "./functionalModeSwitcher.js";
import { prevOctaveNum, clickedProKeyElem } from "./clickFuncModeSwitcher.js";

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
      if (!prevOctaveNum) {
        highlightPrevAdvancedKeys(e);
      } else {
        highlightNextAdvancedKeys(e);
      }
      break;
    }
  }
}


let getOctaveKeys = (num) => document.querySelectorAll(
  `.keyboard--count-${num} .key`);

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
  if (!isOctaveCorrect) {
    return;
  }
  console.log({isOctaveCorrect});
  targetKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}

function highlightNextAdvancedKeys(e) {
  console.log(e);
  console.log(e.target);
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
      //console.log(e);

      if (!prevOctaveNum) {
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
      if (prevOctaveNum) {
        console.log({prevOctaveNum});
        let prevOctaveKeys = [];
        prevOctaveKeys = getOctaveKeys(prevOctaveNum);
        prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
        
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