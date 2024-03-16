"use strict";

import { pressedKeys } from "./inputHandler.js";

import { updateSoundHints, updateKbdHints, 
  restoreKbdHints, updateDisabledKeys } from "./hintsUpdater.js";

let basInfo = document.querySelector(".bas-info");
let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");

let digits = ["0", "1", "2", "3", "4", "5", "6"];

export function switchBasicMode() {
  const targetDigit = digits.find(key => pressedKeys.has(key));

  if (targetDigit) {
    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit}`;
      }
      if (keyElem.classList.contains("js-key-sub")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit - 1}`;
      }
      if (keyElem.classList.contains("js-key-sup")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 1}`;
      }
      if (keyElem.classList.contains("js-key-super-sup")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 2}`;
      }
    })
  }

  let displayedHint = `${targetDigit - 1} - ${targetDigit} - ${+targetDigit + 1}`;
  basInfo.textContent = displayedHint;

  updateDisabledKeys();
  updateSoundHints();
  updateKbdHints();
}


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


let advancedModeLayouts = createAdvancedModeLayouts(5);
console.log({advancedModeLayouts});

let noteForProMode = undefined;

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");
const editModeToggler = document.querySelector("input[name='toggle-edit-mode']");
const noteInput = document.querySelector("input[name='enter-note']");
const noteValidateBtn = document.querySelector(".js-note-validate-btn");


noteValidateBtn.addEventListener("click", function() {
  if (noteInput.value.length === 3) {
    noteInput.value = noteInput.value.slice(0, 1).toUpperCase() + 
      noteInput.value.slice(1).toLowerCase();
  } else {
    noteInput.value = noteInput.value.toUpperCase();
  }
  noteForProMode = noteInput.value;
})


function createProModeSingleLayout() {
  const playableKbdKeys = document.querySelectorAll(".key[data-symbol]");  
  let layout = {};

  playableKbdKeys.forEach(kbdKey => {
    let symbol = kbdKey.dataset.symbol;
    let sound = kbdKey.dataset.sound;
    layout[symbol] = sound;
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


let proModeLayouts = createProModeLayouts(2);


export let activeAdvancedLayout = 0;
let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;


modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
    }
  })
})


editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked
});


let pressedOctave = undefined;


export function switchAdvancedMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "shift") && (value !== "ctrl"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    activeAdvancedLayout = targetKey;

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout].main}`;
      }
      if (keyElem.classList.contains("js-key-sub")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout].sub}`;
      }
      if (keyElem.classList.contains("js-key-sup")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout].sup}`;
      }
      if (keyElem.classList.contains("js-key-super-sup")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout].super}`;
      }
    })
  } else {
    if (pressedOctave) {
      const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
        value => ((value !== "shift") && (value !== "ctrl"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }

      if (targetKey) {
        pressedOctaveKeys.forEach(keyElem => {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            targetKey}`;
        })

        let octaveName = undefined;
        switch(pressedOctave) {
          case "js-key-main": {
            octaveName = "main";
            break;
          }
          case "js-key-sub": {
            octaveName = "sub";
            break;
          }
          case "js-key-sup": {
            octaveName = "sup";
            break;
          }
          case "js-key-super-sup": {
            octaveName = "super";
            break;
          }
        }

        advancedModeLayouts[activeAdvancedLayout][octaveName] = +targetKey;
        advInfo.textContent = JSON.stringify(advancedModeLayouts);
      }

      pressedOctave = undefined;
    } else {
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
        value => ((value !== "shift") && (value !== "ctrl"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      pressedKeys.delete(targetKey); //optional?

      if (targetKey) {
        const allKeyElems = document.querySelectorAll(".key");
        allKeyElems.forEach(keyElem => {
          if (keyElem.dataset.symbol === targetKey) {
            keyElem.classList.forEach(className => {
              if (className.startsWith("js-key-")) {
                pressedOctave = className;
              }
            })
          }
        })
      }
    }
  }

  updateDisabledKeys();
  updateSoundHints();
  updateKbdHints();
}


let pressedProKeyElem = undefined;


export function switchProMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "shift") && (value !== "ctrl"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    if (Number.isInteger(+targetKey)) {
      activeProLayout = targetKey;
    }

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.dataset.symbol in proModeLayouts[activeProLayout]) {
        keyElem.dataset.sound = proModeLayouts[activeProLayout][keyElem.dataset.symbol];
      }
    })

  } else {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "shift") && (value !== "ctrl"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    pressedKeys.delete(targetKey); //optional?

    if (targetKey) {
      const allKeyElems = document.querySelectorAll(".key");
      allKeyElems.forEach(keyElem => {
        if (keyElem.dataset.symbol === targetKey) {
          pressedProKeyElem = keyElem;
        }
      })
      pressedProKeyElem.dataset.sound = noteForProMode;
      proModeLayouts[activeProLayout][targetKey] = noteForProMode;
      proInfo.textContent = JSON.stringify(proModeLayouts);
    }
  }

  updateDisabledKeys();
  updateSoundHints();
  updateKbdHints();
}