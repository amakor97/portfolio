"use strict";


import { pressedKeys } from "./inputHandler.js";
import { updateVisualHints } from "./hintsUpdater.js";
import { noteInputCont, visualMode, 
  updateVisualMode } from "./visualModeChanger.js";


const textDigits = ["Digit0", "Digit1", "Digit2", "Digit3", 
  "Digit4", "Digit5", "Digit6", "Digit7", "Digit8"];

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

const modeSelectors = document.querySelectorAll(
  "input[name='select-switch-mode']");
export const editModeToggler = document.querySelector(
  "input[name='toggle-edit-mode']");
export const noteInput = document.querySelector(
  "input[name='enter-note']");
const noteValidateBtn = document.querySelector(
  ".js-note-validate-btn");


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


const resetLayoutsBtn = document.querySelector(".js-reset-layouts");
resetLayoutsBtn.addEventListener("click", resetLayouts);
function resetLayouts() {
  activeBasicOffset = 4;
  advancedModeLayouts = createAdvancedModeLayouts(5);
  proModeLayouts = createProModeLayouts(5);
  updateMode();
}


noteValidateBtn.addEventListener("click", function() {
  if ((/^([a-g]|[A-G])[b|B]?[0-8]$/).test(noteInput.value)) {
    noteForProMode = noteInput.value;
  }
})


export function updateBasicSounds(base) {
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
  })
}


modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      updateMode();
    }
  })
})


function updateMode() {
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
      let attr = ((visualMode === "double") && (!isEditModeActive)) ? 
        "sound" : "display";
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


editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked;
  updateVisualMode(isEditModeActive);
});



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
  switchBasicMode(num);
  const allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
}


function switchBasicMode(num) {
  setBasicOffset(num);
  updateBasicSounds(num);
}


export function switchAdvancedModeKeyHandler() {
  if (!isEditModeActive) {
    updateAdvancedSoundsHandler();
    updateVisualHints();
  } else {
    if (filterSpecialKeys().size === 0) {
      return;
    }
  
    if (!pressedOctave) {
      pressedOctave = getPressedOctave();
    } else {
      let nextOctaveNum = getPressedSymbolKey();
      if (textDigits.includes(nextOctaveNum)) {
        updateAdvancedMode(pressedOctave, nextOctaveNum);
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


export let filterSpecialKeys = () => new Set(([...pressedKeys]).filter(value => 
  ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))
));


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


export let getOctaveClassByElem = (keyElem) => {
  return Array.from(keyElem.classList).find(keyClass => ["js-key-main", 
    "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
}


function getPressedSymbolKey() {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;
  return targetKey;
}


export function updateAdvancedMode(name, num) {
  switchAdvancedMode(name, num);
  updateVisualHints();
  setPressedOctaveName(undefined);
}


function switchAdvancedMode(name, num) {
  const allKeyElems = document.querySelectorAll(".key");

  num = num.slice(-1);
  updateAdvancedOctaveSounds(name, num);
  updateAdvancedLayout(name, num);
  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
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
    }
  }
}


function updateProSounds() {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0].slice(-1) : undefined;
  if (Number.isInteger(+targetKey)) {
    activeProLayout = targetKey;
  }

  const keyElems = document.querySelectorAll(".key");
  keyElems.forEach(keyElem => {
    if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
      keyElem.dataset.sound = 
        proModeLayouts[activeProLayout][keyElem.dataset.key];
    }
  })
}


export function updateProMode(keyElem, targetKey, note) {
  switchProMode(keyElem, targetKey, note);
  updateVisualHints();
}


function updateProKeySound(keyElem, note) {
  keyElem.dataset.sound = note;
}


function updateProLayout(targetKey, note) {
  proModeLayouts[activeProLayout][targetKey] = note;
}


export function switchProMode(keyElem, targetKey, note) {
  const allKeyElems = document.querySelectorAll(".key");

  updateProKeySound(keyElem, note);
  updateProLayout(targetKey, note);
  allKeyElems.forEach(keyElem => keyElem.classList.remove("key--pressing"));
  updateVisualHints();
}


export function updateAdvancedOctaveSounds(octaveClass, num) {
  const octaveKeys = document.querySelectorAll(`.${octaveClass}`);
  octaveKeys.forEach(keyElem => {
    keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${num}`;
  })
}
