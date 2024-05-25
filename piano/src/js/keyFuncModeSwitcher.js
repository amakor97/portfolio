"use strict";


import { pressedKeys } from "./inputHandler.js";
import { updateVisualHints, isFullKbdShown } from "./hintsUpdater.js";
import { noteInputCont, updateVisualMode } from "./visualModeSwitcher.js";
import { highlightPrevOctaveKeys } from "./possibleKeysShower.js";

const textDigits = ["Digit0", "Digit1", "Digit2", "Digit3", 
  "Digit4", "Digit5", "Digit6", "Digit7", "Digit8"];

const basicMap = {
  "q": "C-1",
  "2": "Db-1",
  "w": "D-1",
  "3": "Eb-1",
  "e": "E-1",
  "r": "F-1",
  "5": "Gb-1",
  "t": "G-1",
  "6": "Ab-1",
  "y": "A-1",
  "7": "Bb-1",
  "u": "B-1",
  "z": "C+0",
  "s": "Db+0",
  "x": "D+0",
  "d": "Eb+0",
  "c": "E+0",
  "v": "F+0",
  "g": "Gb+0",
  "b": "G+0",
  "h": "Ab+0",
  "n": "A+0",
  "j": "Bb+0",
  "m": "B+0",
  ",": "C+1",
  "l": "Db+1",
  ".": "D+1",
  ";": "Eb+1",
  "/": "E+1",
  "i": "F+1",
  "9": "Gb+1",
  "o": "G+1",
  "0": "Ab+1",
  "p": "A+1",
  "-": "Bb+1",
  "[": "B+1",
  "]": "C+2"
}

export let activeBasicOffset = 4;
export let advancedModeLayouts = createAdvancedModeLayouts(5);
export let proModeLayouts = createProModeLayouts(5);

let activeAdvancedLayout = 0;
let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;

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


function createAdvancedModeSingleLayout() {
  let layout = {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  };
  return layout;
}


export function createAdvancedModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createAdvancedModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}


function createProModeSingleLayout() {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]");  
  let layout = {};

  playableKbdKeys.forEach(kbdKey => {
    let key = kbdKey.dataset.key;
    let sound = kbdKey.dataset.display;
    layout[key] = sound;
  })
  return layout;
}


export function createProModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createProModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
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
  updateMode();
})


noteValidateBtn.addEventListener("click", function() {
  if (noteValidatorRegEx.test(noteInput.value)) {
    noteForProMode = noteInput.value;
  }
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
  updateVisualMode(isEditModeActive);
});


export function updateMode() {
  const allKeyElems = document.querySelectorAll(".key");
  switch(switchModeType) {
    case "basic": {
      noteInputCont.classList.add(
        "control-panel__switch-mode-cont--hided");
      updateBasicSounds2(activeBasicOffset);
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
  if (Number.isInteger(+targetKey)) {
    activeProLayout = targetKey;
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
  let num = +(tmpDigits.find(key => pressedKeys.has(key)).slice(5, 6));
  if (num) {
    updateBasicMode(num);
  }
}


export function updateBasicMode(num) {
  console.log({num});
  const allKeyElems = document.querySelectorAll(".key");
  switchBasicMode(num);
  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
}


function switchBasicMode(num) {
  setBasicOffset(num);
  updateBasicSounds2(num);
}


function updateBasicSounds2(base) {
  const allPianoKeys = document.querySelectorAll(".key");
  const playableKbdKeys = document.querySelectorAll(".key[data-key]"); 
  playableKbdKeys.forEach(keyElem => {



    //console.log(keyElem.dataset.key.slice(-1).toLowerCase());
    //let pressedKey = keyElem.dataset.key.slice(-1).toLowerCase();
    let pressedKey = keyElem.dataset.symbol;
    for (let key in basicMap) {
      //console.log(key, basicMap[key].slice(0, -2), 
      //basicMap[key].slice(-2));
      if (pressedKey === key) {
        //console.log("match");
        let letter = basicMap[key].slice(0, -2);
        let additionalOffset = parseInt(basicMap[key].slice(-2));
        //console.log(additionalOffset);
        let resultOffset = +base + additionalOffset;
        console.log(resultOffset);
        //console.log(`${letter}${resultOffset}`);

        keyElem.dataset.sound = `${letter}${resultOffset}`;
      }
    }
  })
}


function updateBasicSounds(base) {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]"); 
  playableKbdKeys.forEach(keyElem => {
    let additionalOffset = 0;
    if (keyElem.classList.contains("js-key-sub")) {
      additionalOffset = -1;
    }
    if (keyElem.classList.contains("js-key-sup")) {
      additionalOffset = 1;
    }
    if (keyElem.classList.contains("js-key-super")) {
      additionalOffset = 2;
    }

    keyElem.dataset.sound = 
      `${keyElem.dataset.sound.slice(0, -1)}${+base + additionalOffset}`;
    console.log(keyElem.dataset.sound);
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

  if ((targetKey) && textDigits.includes(targetKey)) {
    activeAdvancedLayout = targetKey.slice(-1);
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

  console.log(proModeLayouts[activeProLayout]);
}