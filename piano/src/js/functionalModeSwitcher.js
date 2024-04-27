"use strict";

import { pressedKeys } from "./inputHandler.js";
import { updateVisualHints } from "./hintsUpdater.js";
import { noteInputCont, visualMode, 
  updateVisualMode } from "./visualModeChanger.js";

let basInfo = document.querySelector(".bas-info");
let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");

let textDigits = ["Digit0", "Digit1", "Digit2", 
  "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8"];


export let filterSpecialKeys = () => new Set(([...pressedKeys]).filter(value => 
  ((value !== "ShiftLeft") && 
  (value !== "ShiftRight") && 
  (value !== "Space")
)));


function createAdvancedModeSingleLayout() {
  let layout = {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  };
  return layout;
}


function createAdvancedModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createAdvancedModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}


export let advancedModeLayouts = createAdvancedModeLayouts(5);


function createProModeSingleLayout() {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]");  
  let layout = {};

  playableKbdKeys.forEach(kbdKey => {
    let key = kbdKey.dataset.key;
    let sound = kbdKey.dataset.sound;
    layout[key] = sound;
  })
  return layout;
}


function createProModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createProModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}


export let proModeLayouts = createProModeLayouts(5);


let noteForProMode = undefined;
const modeSelectors = document.querySelectorAll(
  "input[name='select-switch-mode']");
export const editModeToggler = document.querySelector(
  "input[name='toggle-edit-mode']");
export const noteInput = document.querySelector(
  "input[name='enter-note']");
const noteValidateBtn = document.querySelector(
  ".js-note-validate-btn");


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
      `${keyElem.dataset.sound.slice(0, -1)}${base + additionalOffset}`;
  })
}


let activeBasicOffset = 4;
export let activeAdvancedLayout = 0;
export let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;

export let setBasicOffset = (n) => activeBasicOffset = n; 

modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      updateMode();
    }
  })
})


function updateMode() {
  const keyElems = document.querySelectorAll(".key");
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

      keyElems.forEach(keyElem => {
        let targetClass = Array.from(keyElem.classList).find(
          keyClass => ["js-key-main", "js-key-sub", 
          "js-key-sup", "js-key-super"].includes(keyClass));

        if (targetClass) {
          targetClass = targetClass.slice(7);
          let attr = ((visualMode === "double") && (!isEditModeActive)) ? 
            "sound" : "display";
          keyElem.dataset.sound = `${keyElem.dataset[attr].slice(0, -1)}${
            advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
        }
      })
      break;
    }
    case "pro": {
      noteInputCont.classList.remove("control-panel__switch-mode-cont--hided");

      keyElems.forEach(keyElem => {
        if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
          keyElem.dataset.sound = 
            proModeLayouts[activeProLayout][keyElem.dataset.key];
        }
      })
    }
  }

  updateVisualHints();
}


editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked;
  updateVisualMode(isEditModeActive);
});


let pressedOctave = undefined;

export function switchBasicMode() {
  let tmpDigits = [...textDigits];
  tmpDigits.splice(0, 1);
  tmpDigits.splice(-2, 2);
  let targetDigit = tmpDigits.find(key => pressedKeys.has(key));
  if (targetDigit) {
    activeBasicOffset = +(targetDigit.slice(5, 6));
    updateBasicSounds(activeBasicOffset);
  }
  updateVisualHints();
}


function updateAdvancedSounds() {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;

  if ((targetKey) && textDigits.includes(targetKey)) {
    activeAdvancedLayout = targetKey.slice(-1);

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      let targetClass = Array.from(keyElem.classList).find(keyClass => [
        "js-key-main", "js-key-sub", "js-key-sup", "js-key-super"
        ].includes(keyClass));

      if (targetClass) {
        targetClass = targetClass.slice(7);
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
      }
    })
  }
}


function updateAdvancedLayoutAndOctave(pressedOctave) {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;

  if ((targetKey) && (textDigits.includes(targetKey))) {
    targetKey = targetKey.slice(-1);
    updateAdvancedOctaveSounds(pressedOctave, targetKey);

    let octaveName = pressedOctave.slice(7);
    advancedModeLayouts[activeAdvancedLayout][octaveName] = +targetKey;
    advInfo.textContent = JSON.stringify(advancedModeLayouts);
  }
}


function getPressedOctave() {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;

  if (targetKey) {
    const allKeyElems = document.querySelectorAll(".key");
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.key === targetKey) {
        for (let className of keyElem.classList) {
          if (className.startsWith("js-key-")) {
            return className;
          }
        }
      }
    }
  }
}


export function switchAdvancedMode() {
  if (!isEditModeActive) {
    updateAdvancedSounds();
  } else {

    if (pressedOctave) {
      updateAdvancedLayoutAndOctave(pressedOctave);
      pressedOctave = undefined;
    } else {
      pressedOctave = getPressedOctave();
    }
  }

  updateVisualHints();
}


let pressedProKeyElem = undefined;


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


function updateProLayoutAndKey(targetKey) {
  const allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(keyElem => {
    if (keyElem.dataset.key === targetKey) {
      pressedProKeyElem = keyElem;
    }
  })

  pressedProKeyElem.dataset.sound = noteForProMode;
  proModeLayouts[activeProLayout][targetKey] = noteForProMode;
  proInfo.textContent = JSON.stringify(proModeLayouts);
}


export function switchProMode() {
  if (!isEditModeActive) {
    updateProSounds();
  } else {
    const pressedSymbolKeys = filterSpecialKeys();
    let targetKey = (pressedSymbolKeys.size === 1) ? 
      Array.from(pressedSymbolKeys)[0] : undefined;

    if (targetKey && (noteInput !== document.activeElement) && 
      noteForProMode) {
      updateProLayoutAndKey(targetKey);
    }
  }

  updateVisualHints();
}


export let getOctaveClassByElem = (keyElem) => {
  return Array.from(keyElem.classList).find(keyClass => ["js-key-main", 
    "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
}


export function updateAdvancedOctaveSounds(octaveClass, num) {
  const octaveKeys = document.querySelectorAll(`.${octaveClass}`);
  octaveKeys.forEach(keyElem => {
    keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${num}`;
  })
}
