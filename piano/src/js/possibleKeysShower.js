"use strict";

import { isEditModeActive, switchModeType } from "./functionalModeSwitcher.js";
import { prevOctaveNum } from "./clickFuncModeSwitcher.js";

const allKeyElems = document.querySelectorAll(".key");
allKeyElems.forEach(keyElem => {
  keyElem.addEventListener("mouseover", function(e) {
    mouseOverHandler(e);
    updateHightlights(e);
  })

  keyElem.addEventListener("mouseout", function(e) {
    //keyElem.classList.remove("key--next");
    //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
    //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
    updateHightlights(e);
  })

  keyElem.addEventListener("click", function(e) {
    console.log(e);
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
        highlightNextAdvancedKeys();
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

function highlightNextAdvancedKeys() {

}

function highlightPrevProKey() {

}

function highlightNextProKey() {

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
  //console.log({prevOctaveNum});
  //console.log({targetBasicNum});
}

function applyNextAdvancedKeys(e) {

}


function updateHightlights(e) {
  console.log("x");
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));

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
      }

      break;
    }
  }
}