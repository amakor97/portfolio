"use strict";


import { isEditModeActive, pressedOctave, switchModeType, 
  getOctaveClassByElem, setPressedOctaveName, updateBasicMode, 
  updateAdvancedMode, updateProMode } from "./keyFuncModeSwitcher.js";
import { mouseClickHandler } from "./possibleKeysShower.js";


const allKeyElems = document.querySelectorAll(".key");
export let clickedProKeyElem = undefined;


allKeyElems.forEach(key => {
  key.addEventListener("click", function tmp(e) {
    switchByClick(e, key);
    //mouseClickHandler(e, key);
  });
})


function switchByClick(e, key) {
  if (!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case("basic"): {
      switchBasicModeClickHandler(e);
      break;
    }
    case("advanced"): {
      switchAdvancedModeClickHandler(e, key);
      break;
    }
    case("pro"): {
      switchProModeClickHandler(key);
      break;
    }
  }
}


function switchBasicModeClickHandler(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let num = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);
  updateBasicMode(num);
}


function switchAdvancedModeClickHandler(e, key) {
  if (!pressedOctave) {

    console.log(key.parentNode.parentNode);

    let clickedOctave = key.parentNode.parentNode;

    let clickedOctaveClasses = Array.from(clickedOctave.classList);
    console.log(clickedOctaveClasses);

    let octaveCountClass = clickedOctaveClasses.find(
      className => className.startsWith("keyboard--count"));
    console.log(octaveCountClass);

    let clickedOctaves = document.querySelectorAll(`.${octaveCountClass}`);
    //console.log(clickedOctaves);

    clickedOctaves = Array.from(clickedOctaves);
    console.log(clickedOctaves);

    let clickedOctaveKeys = [];
    clickedOctaves.forEach(clickedOctave => {
      let tmpKeys = clickedOctave.querySelectorAll(".key");
      tmpKeys.forEach(keyElem => clickedOctaveKeys.push(keyElem));
    })
    //clickedOctaveKeys = clickedOctave.querySelectorAll(".key");

    let kbdHint = getKbdHint(clickedOctaveKeys);

    //console.log(kbdHint);
    //let kbdHint = key.querySelector(".js-kbd-key-hint");

    if (kbdHint === "") {
      console.log("HERE");

      /// check if there is no ']' in kbdhint. if yes set pon
      let isOctaveValid = true;
      allKeyElems.forEach(keyElem => {
        let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
        if (kbdHint.textContent === "]") {
          isOctaveValid = false;
        }
      })

      if (isOctaveValid) {
        setPressedOctaveName("js-key-super"); //////?????
      } else {
        return;
      }
         

    } else {
      kbdHint = key.querySelector(".js-kbd-key-hint");
      console.log(kbdHint);
      setPressedOctaveName(getOctaveClassByHint(kbdHint));
    }

    setPressedOctaveName(getOctaveClassByHint(kbdHint));

    //console.log(pressedOctave);
  } else {
    let clickedKeyElem = e.target;
    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count"));
    updateAdvancedMode(pressedOctave, nextOctaveNum);
  }
}


function getOctaveClassByHint(kbdHint) {

  const allKeyElems = document.querySelectorAll(".key");
  let clickedOctave = kbdHint.parentNode.parentNode.parentNode;
  
  let clickedOctaveClasses = Array.from(clickedOctave.classList);
  let octaveCountClass = clickedOctaveClasses.find(
    className => className.startsWith("keyboard--count"));
  let clickedOctaves = document.querySelectorAll(`.${octaveCountClass}`);

  let clickedOctaveKeys = [];
  clickedOctaves.forEach(clickedOctave => {
    let tmpKeys = clickedOctave.querySelectorAll(".key");
    tmpKeys.forEach(keyElem => clickedOctaveKeys.push(keyElem));
  })
  

  //let clickedOctaveKeys = clickedOctave.querySelectorAll(".key");
  let targetKeyElem = undefined;

  for (let octaveKeyElem of clickedOctaveKeys) {
    let kbdHint = octaveKeyElem.querySelector(".js-kbd-key-hint");
    if (kbdHint.textContent) {

      for (let keyElem of allKeyElems) {
        if (kbdHint.textContent === keyElem.dataset.symbol) {
          targetKeyElem = keyElem;
        }
      }
    }
  }
  

  return getOctaveClassByElem(targetKeyElem);
}


function switchProModeClickHandler(key) {
  let noteForProMode = key.dataset.display;

  if (!clickedProKeyElem) {
    clickedProKeyElem = getClickedProKeyElem(key);
  } else {
    let targetKey = clickedProKeyElem.dataset.key;
    updateProMode(clickedProKeyElem, targetKey, noteForProMode);
    clickedProKeyElem = undefined;
  }
}


function getClickedProKeyElem(key) {
  const allKeyElems = document.querySelectorAll(".key");
  let kbdHint = key.querySelector(".js-kbd-key-hint");

  if (key.dataset && (kbdHint.textContent !== "")) {
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.symbol === kbdHint.textContent) {
        return keyElem;
      }
    }
  }
}


function getKbdHint(prevOctaveKeys) {
  let kbdHint = "";
  prevOctaveKeys.forEach(prevOctaveKey => {
    let tmpKbdHint = prevOctaveKey.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent) {
      kbdHint = tmpKbdHint;
    }
  })

  console.log(kbdHint);
  return kbdHint;
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