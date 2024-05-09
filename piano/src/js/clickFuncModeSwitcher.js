"use strict";


import { isEditModeActive, pressedOctave, switchModeType, 
  updateBasicSounds} from "./functionalModeSwitcher.js";
import { updateVisualHints } from "./hintsUpdater.js";
import { setBasicOffset, advancedModeLayouts, activeAdvancedLayout, 
  proModeLayouts, activeProLayout, getOctaveClassByElem, 
  updateAdvancedOctaveSounds,
  switchBasicMode, updateAdvancedLayoutAndOctave2,
  prevOctaveNum, setPrevOctaveNum, setPressedOctaveName, switchProMode3,
  switchAdvancedMode2, updateBasicMode, updateAdvancedMode, 
  updateProMode } from "./functionalModeSwitcher.js";

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
      switchBasicModeClickHandler(e);
      break;
    }
    case("advanced"): {
      switchAdvancedModeClickHandler(e, key);
      break;
    }
    case("pro"): {
      switchProModeClick(key);
      break;
    }
  }
}


//export let prevOctaveNum = undefined;
export let clickedProKeyElem = undefined;


function switchBasicModeClickHandler(e) {
  let targetOctave = e.target.parentNode.parentNode;
  let num = Array.from(targetOctave.classList).find(
    className => className.startsWith("keyboard--count")).slice(-1);
  updateBasicMode(num);
}


function getPrevOctaveNum(key) {
  console.log(key.parentNode.parentNode);

  let prevOctave = key.parentNode.parentNode;
  console.log(prevOctave);

  let prevOctaveKeys = prevOctave.querySelectorAll(".key");
  //console.log(prevOctaveKeys);

  for (let keyElem of prevOctaveKeys) {
    let kdbHint = keyElem.querySelector(".js-kbd-key-hint");
    if (keyElem.dataset && (kdbHint.textContent !== "")) {
      setPrevOctaveNum(Array.from(prevOctave.classList).find(
        className => className.startsWith("keyboard--count")).slice(-1));
        console.log("exit");
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
    setPrevOctaveNum(0);
    return "0";
  }

  let rbKey = document.querySelector(".key[data-symbol=']']");
  let rbHint = rbKey.querySelector(".js-piano-key-hint");

  let kdbHint = key.querySelector(".js-kbd-key-hint");
  if (key.dataset && (kdbHint.textContent !== "")) {
    setPrevOctaveNum(Array.from(key.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count")).slice(-1));
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

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(kbdHint.parentNode);

  let clickedOctave = kbdHint.parentNode.parentNode.parentNode;

  console.log(clickedOctave.classList);

  let clickedOctaveNum = Array.from(clickedOctave.classList).find(
    className => className.startsWith("keyboard--count"));
  console.log(clickedOctaveNum);

  clickedOctave = document.querySelector(`.${clickedOctaveNum}`);

  let clickedOctaveKeys = clickedOctave.querySelectorAll(".key");

  let targetKeyElem = undefined;

  for (let keyElem of clickedOctaveKeys) {
    let tmpKbdHint = keyElem.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent) {
      console.log("found");

      for (let keyElem2 of allKeyElems) {
        if (tmpKbdHint.textContent === keyElem2.dataset.symbol) {
          targetKeyElem = keyElem2; ////////////////////////
        }
      }

      //targetKeyElem = tmpKbdHint.parentNode;
    }
  }


  if (targetKeyElem) {
    console.log("ttg");
    return getOctaveClassByElem(targetKeyElem);
  }


  for (let keyElem of allKeyElems) {
    if (keyElem.dataset.symbol === kbdHint.textContent) {
      return getOctaveClassByElem(keyElem);
    }
  }

  for (let keyElem of allKeyElems) {
    let tmpKbdHint = keyElem.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent === "]") {
      console.log("rb is found");
      return;
    }
  }

  
  return "js-key-super";
}


function switchAdvancedModeClickHandler(e, key) {
  if (!pressedOctave) {
    let kbdHint = key.querySelector(".js-kbd-key-hint");
    setPressedOctaveName(getOctaveClassByHint(kbdHint));
  } else {
    let clickedKeyElem = e.target;
    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count"));
    updateAdvancedMode(pressedOctave, nextOctaveNum);
  }
}



function switchAdvancedModeClick(e, key) {
  let clickedKeyElem = e.target;

  if (!pressedOctave) {
    let tmpKbdHint = key.querySelector(".js-kbd-key-hint");

    allKeyElems.forEach(keyElem => {
      if (keyElem.dataset.key) {
        let keyCo = keyElem.dataset.key;
        if (tmpKbdHint.textContent === keyCo.slice(-1).toLowerCase()) {
          console.log(keyElem.classList); //////
        }
      }
    })

    setPressedOctaveName(getOctaveClassByHint(tmpKbdHint));
  } else {

    let nextOctaveNum = Array.from(
      clickedKeyElem.parentNode.parentNode.classList).find(
      className => className.startsWith("keyboard--count"));

    nextOctaveNum = nextOctaveNum.slice(-1);
    updateAdvancedLayoutAndOctave2(pressedOctave, nextOctaveNum);

    setPressedOctaveName(undefined);
  }
}


function getClickedProKeyElem(key) {
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
  let noteForProMode = key.dataset.display;

  if (!clickedProKeyElem) {
    clickedProKeyElem = getClickedProKeyElem(key);
  } else {
    let targetKey = clickedProKeyElem.dataset.key;
    switchProMode3(clickedProKeyElem, targetKey, noteForProMode);
    clickedProKeyElem = undefined;
  }
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