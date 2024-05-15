"use strict";

import { isEditModeActive, switchModeType, 
  pressedOctave, getOctaveClassByElem } from "./keyFuncModeSwitcher.js";
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
  console.log(keyElem);

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


  console.log("===");
  console.log(targetKeys);
  targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
}

function highlightPrevAdvancedKeys(e, keyElem) {
  prevOctaveKeys.length = 0;
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

  console.log({isOctaveCorrect});

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
  targetKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}

function highlightNextAdvancedKeys(e) {
  console.log("high");
  console.log(e);
  let targetOctave = e.target.parentNode.parentNode;
  console.log({targetOctave});
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

function mouseClickHandler(e, keyElem) {
  if(!isEditModeActive) {
    return;
  }
  switch(switchModeType) {
    case "basic": {
      updateHightlights(e, keyElem);
      break;
    }
    case "advanced": {
      console.log({pressedOctave});
      if (!pressedOctave) {
        console.log("gegege");
        let tmpE = e;
        console.log(tmpE);
        prevOctaveKeys.length = 0;
        console.log(e.target);
        e.target.classList.add("key--next");
        highlightPrevAdvancedKeys(e, e.target);
/*
        {
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
        
          console.log({isOctaveCorrect});
        
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

          targetKeys.forEach(keyElem => keyElem.classList.add("key--next"));
        }
*/
        highlightNextAdvancedKeys(e);
        //updateHightlights();
        //applyPrevAdvancedKeys(e);
      } else {
        //console.log(e.target);
        updateHightlights(e);
      }
      break;
    }
    case "pro": {
      if (!clickedProKey) {
        if (e.target.classList.contains("key")) {
          let kbdHint = e.target.querySelector(".js-kbd-key-hint");
          if (kbdHint.textContent !== "") {
            clickedProKey = e.target;
          }
        }
      } else {
        if (e.target.classList.contains("key")) {
          clickedProKey = undefined;
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
  //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
  //allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));

  //console.log(e);

  if (!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case "basic": {
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
      console.log("bas");
      highlightNextBasicKeys(e, keyElem);
      break;
    }
    case "advanced": {
      console.log(e.type);
      if (e.type === "mouseout") {
        console.log(prevOctaveKeys);
        prevOctaveKeys.length = 0;
      }
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));


      prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
      if (!pressedOctave) {
        allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
        prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
        highlightPrevAdvancedKeys(e, keyElem);
      } else {
        allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
        prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
        //highlightPrevOctaveKeys(pressedOctave);
        console.log("upd");
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
  console.log({num});
  let prevOctaveKeys = [];
  prevOctaveKeys = getOctaveKeys(num);
  prevOctaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
}


export function getPrevOctaveNumByName(pressedOctave) {
  console.log(pressedOctave);
  const allKeyElems = document.querySelectorAll(".key");

  let prevOctaveNum = undefined;

  let tmpKey = undefined;

  allKeyElems.forEach(keyElem => {
    if (keyElem.classList.contains(pressedOctave)) {
      tmpKey = keyElem;
    }
  })

  console.log(tmpKey);
  let tmpSymbol = tmpKey.dataset.symbol;
  console.log({tmpSymbol});
  console.log("==");

  allKeyElems.forEach(keyElem => {
    let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
    if (kbdHint.textContent === tmpSymbol) {
      console.log(keyElem);
      console.log("=====");
      let tmpOctave = keyElem.parentNode.parentNode;
      console.log(tmpOctave);
      prevOctaveNum = Array.from(tmpOctave.classList);
      prevOctaveNum = prevOctaveNum.find(className => 
        className.startsWith("keyboard--count-")).slice(-1);
      console.log({prevOctaveNum});
    }
  })

  if (!prevOctaveNum) {
    prevOctaveNum = 0;
  }

  return +prevOctaveNum;
}