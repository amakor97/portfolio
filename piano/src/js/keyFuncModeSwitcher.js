"use strict";


import { pressedKeys } from "./inputHandler.js";
import { updateVisualHints, isFullKbdShown } from "./hintsUpdater.js";
import { noteInputCont, updateVisualMode } from "./visualModeSwitcher.js";
import { highlightPrevOctaveKeys, 
  resetClickedVisualProKeyElem } from "./possibleKeysShower.js";
import { basicLayout, createAdvancedModeLayouts, 
  createProModeLayouts } from "./layouts.js";
import { resetClickedProKeyElem} from "./clickFuncModeSwitcher.js";

const textDigits = ["Digit0", "Digit1", "Digit2", "Digit3", 
  "Digit4", "Digit5", "Digit6", "Digit7", "Digit8"];


export let activeBasicOffset = 4;
export let advancedModeLayouts = createAdvancedModeLayouts(5);
export let proModeLayouts = createProModeLayouts(5);

let activeAdvancedLayout = 0;
let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;
export let setEditMode = (bool) => isEditModeActive = bool;

export let setBasicOffset = (n) => activeBasicOffset = n; 
export let setAdvancedModeLayouts = (obj) => advancedModeLayouts = obj;
export let setProModeLayouts = (obj) => proModeLayouts = obj;

export let pressedOctave = undefined;
export let setPressedOctaveName = (str) => pressedOctave = str;

let pressedProKeyElem = undefined;
let noteForProMode = undefined;
let noteValidatorRegEx = /^([a-g]|[A-G])[b|B]?[0-8]$/;

const modeSelectors = document.querySelectorAll(
  "input[name='select-switch-mode']");
export const editModeToggler = document.querySelector(
  "input[name='toggle-edit-mode']");
export const noteInput = document.querySelector(
  "input[name='enter-note']");
const noteValidateBtn = document.querySelector(
  ".js-note-validate-btn");
const resetLayoutsBtn = document.querySelector(".js-reset-layouts");


updateModeLabelNum("advanced");
updateModeLabelNum("pro");


function updateModeLabelNum(type, num = 1) {
  const label = document.querySelector(`.js-${type}-mode-label`);
  const span = label.querySelector("span.js-mode-label-num");
  span.textContent = `(${num})`;
}


export let filterSpecialKeys = () => new Set(([...pressedKeys]).filter(value => 
  ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))
));


resetLayoutsBtn.addEventListener("click", function() {
  localStorage.removeItem("basic");
  localStorage.removeItem("advanced");
  localStorage.removeItem("pro");
  
  activeBasicOffset = 4;
  advancedModeLayouts = createAdvancedModeLayouts(5);
  proModeLayouts = createProModeLayouts(5);

  updateModeLabelNum("advanced", 1);
  updateModeLabelNum("pro", 1);
  updateMode();
})


noteValidateBtn.addEventListener("click", function() {
  if (noteValidatorRegEx.test(noteInput.value)) {
    noteForProMode = noteInput.value;
    noteInput.classList.add("control-panel__note-input--correct");
  } else {
    noteInput.classList.add("control-panel__note-input--incorrect");
  }
})


noteInput.addEventListener("input", () => {
    noteInput.classList.remove("control-panel__note-input--incorrect");
    noteInput.classList.remove("control-panel__note-input--correct");
})


modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      updateMode();
    }
  })
})


editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked;

  if (!isEditModeActive) {
    const allKeyElems = document.querySelectorAll(".key");
    pressedOctave = undefined;

    resetClickedProKeyElem();
    resetClickedVisualProKeyElem();
  
    allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
    allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
  }

  updateVisualMode(isEditModeActive);
});


export function updateMode() {
  const allKeyElems = document.querySelectorAll(".key");
  switch(switchModeType) {
    case "basic": {
      noteInputCont.classList.add(
        "control-panel__switch-mode-cont--hided");
      updateBasicSounds(activeBasicOffset);
      break;
    }

    case "advanced": {
      noteInputCont.classList.add(
        "control-panel__switch-mode-cont--hided");
      let attr = isFullKbdShown() ? "display" : "sound";
      updateAdvancedSounds(attr);
      break;
    }
    
    case "pro": {
      noteInputCont.classList.remove("control-panel__switch-mode-cont--hided");

      allKeyElems.forEach(keyElem => {
        if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
          let note = proModeLayouts[activeProLayout][keyElem.dataset.key];
          updateProKeySound(keyElem, note);
        }
      })
    }
  }

  updateVisualHints();
}


function updateAdvancedSounds(attr = "sound") {
  const allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(keyElem => {
    let targetClass = getOctaveClassByElem(keyElem);

    if (targetClass) {
      targetClass = targetClass.slice(7);
      keyElem.dataset.sound = `${keyElem.dataset[attr].slice(0, -1)}${
        advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
    }
  })
}


function updateProSounds() {
  const pressedSymbolKeys = filterSpecialKeys();

  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0].slice(-1) : undefined;
  if (Number.isInteger(+targetKey) && proModeLayouts[+targetKey - 1]) {
    activeProLayout = targetKey - 1;
    updateModeLabelNum("pro", activeProLayout + 1);
  }

  const allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(keyElem => {
    if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
      keyElem.dataset.sound = 
        proModeLayouts[activeProLayout][keyElem.dataset.key];
    }
  })
}


export function switchBasicModeKeyHandler() {
  let tmpDigits = [...textDigits];
  tmpDigits.splice(0, 1);
  tmpDigits.splice(-2, 2);
  let targetDigit = tmpDigits.find(key => pressedKeys.has(key));
  if (!targetDigit) {
    return;
  }
  let num = +(tmpDigits.find(key => pressedKeys.has(key)).slice(5, 6));
  if (num) {
    updateBasicMode(num);
  }
}


export function updateBasicMode(num) {
  const allKeyElems = document.querySelectorAll(".key");
  switchBasicMode(num);
  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
}


function switchBasicMode(num) {
  setBasicOffset(num);
  updateBasicSounds(num);
}


function updateBasicSounds(base) {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]"); 
  playableKbdKeys.forEach(keyElem => {
    let pressedKey = keyElem.dataset.symbol;
    
    for (let key in basicLayout) {
      if (pressedKey === key) {
        let letter = basicLayout[key].slice(0, -2);
        let additionalOffset = parseInt(basicLayout[key].slice(-2));
        let resultOffset = +base + additionalOffset;
        keyElem.dataset.sound = `${letter}${resultOffset}`;
      }
    }
  })
}


export function switchAdvancedModeKeyHandler() {
  const allKeyElems = document.querySelectorAll(".key");

  if (!isEditModeActive) {
    updateAdvancedSoundsHandler();
    updateVisualHints();
  } else {
    if (filterSpecialKeys().size === 0) {
      return;
    }
  
    if (!pressedOctave) {
      pressedOctave = getPressedOctave();
      let prevOctaveNum = getPrevOctaveNumByName(pressedOctave);
      highlightPrevOctaveKeys(prevOctaveNum);
    } else {
      let nextOctaveNum = getPressedSymbolKey();
      if (textDigits.includes(nextOctaveNum)) {
        updateAdvancedMode(pressedOctave, nextOctaveNum);
        allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
      }
    }
  }
}


function updateAdvancedSoundsHandler() {
  const pressedSymbolKeys = filterSpecialKeys();

  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;

  if ((targetKey) && (advancedModeLayouts[targetKey.slice(-1) - 1])) {
    activeAdvancedLayout = targetKey.slice(-1) - 1;
    updateModeLabelNum("advanced", activeAdvancedLayout + 1);
    updateAdvancedSounds();
  }
}


function getPressedOctave() {
  const allKeyElems = document.querySelectorAll(".key");
  let targetKey = getPressedSymbolKey();

  if (targetKey) {
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.key === targetKey) {
        return getOctaveClassByElem(keyElem);
      }
    }
  }
}


function getPressedSymbolKey() {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;
  return targetKey;
}


export let getOctaveClassByElem = (keyElem) => {
  return Array.from(keyElem.classList).find(keyClass => ["js-key-main", 
    "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
}


function getPrevOctaveNumByName(pressedOctave) {
  const allKeyElems = document.querySelectorAll(".key");
  let prevOctaveNum = undefined;
  let tmpSymbol = undefined;

  allKeyElems.forEach(keyElem => {
    if (keyElem.classList.contains(pressedOctave)) {
      tmpSymbol = keyElem.dataset.symbol;
    }
  })

  allKeyElems.forEach(keyElem => {
    let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
    if (kbdHint.textContent === tmpSymbol) {
      let tmpOctave = keyElem.parentNode.parentNode;
      prevOctaveNum = Array.from(tmpOctave.classList);
      prevOctaveNum = prevOctaveNum.find(className => 
        className.startsWith("keyboard--count-")).slice(-1);
    }
  })

  prevOctaveNum = +prevOctaveNum || 0;
  return prevOctaveNum;
}


export function updateAdvancedMode(name, num) {
  const allKeyElems = document.querySelectorAll(".key");
  switchAdvancedMode(name, num);

  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
  setPressedOctaveName(undefined);
}


function switchAdvancedMode(name, num) {
  num = num.slice(-1);
  updateAdvancedOctaveSounds(name, num);
  updateAdvancedLayout(name, num);
}


function updateAdvancedOctaveSounds(octaveClass, num) {
  const octaveKeys = document.querySelectorAll(`.${octaveClass}`);
  octaveKeys.forEach(keyElem => {
    keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${num}`;
  })
}


function updateAdvancedLayout(octaveName, num) {
  const name = octaveName.slice(7);
  advancedModeLayouts[activeAdvancedLayout][name] = +num;
}


export function switchProModeKeyHandler() {
  const allKeyElems = document.querySelectorAll(".key");

  if (!isEditModeActive) {
    updateProSounds();
    updateVisualHints();
  } else {
    if (!noteForProMode) {
      return;
    }
    const pressedSymbolKeys = filterSpecialKeys();
    let targetKey = (pressedSymbolKeys.size === 1) ? 
      Array.from(pressedSymbolKeys)[0] : undefined;

    if (targetKey && (noteInput !== document.activeElement)) {
      allKeyElems.forEach(keyElem => {
        if (keyElem.dataset.key === targetKey) {
          pressedProKeyElem = keyElem;
        }
      })
      updateProMode(pressedProKeyElem, targetKey, noteForProMode);
      noteForProMode = undefined;
    }
  }
}


export function updateProMode(keyElem, targetKey, note) {
  const allKeyElems = document.querySelectorAll(".key");
  switchProMode(keyElem, targetKey, note);
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--pressing"));
  updateVisualHints();
}


function switchProMode(keyElem, targetKey, note) {
  updateProKeySound(keyElem, note);
  updateProLayout(targetKey, note);
}


function updateProKeySound(keyElem, note) {
  keyElem.dataset.sound = note;
}


function updateProLayout(targetKey, note) {
  proModeLayouts[activeProLayout][targetKey] = note;
}