"use strict";

import { pressedKeys } from "./inputHandler.js";

import { updateSoundHints, updateKbdHints, 
  restoreKbdHints, updateDisabledKeys } from "./hintsUpdater.js";

let basInfo = document.querySelector(".bas-info");
let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");

let digits = ["0", "1", "2", "3", "4", "5", "6"];
let tDigits = ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"];

export function switchBasicMode() {
  console.log("bas mod");
  let targetDigit = tDigits.find(key => pressedKeys.has(key));
  console.log({targetDigit});

  if (targetDigit) {
    targetDigit = targetDigit.slice(5, 6);
    activeBasicOffset = +targetDigit;
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
      if (keyElem.classList.contains("js-key-super")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 2}`;
      }
    })

    let displayedHint = `${targetDigit - 1} - ${targetDigit} - ${+targetDigit + 1}`;
    basInfo.textContent = displayedHint;
  }



  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
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

let noteForProMode = undefined;

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");
const editModeToggler = document.querySelector("input[name='toggle-edit-mode']");
export const noteInput = document.querySelector("input[name='enter-note']");
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


let proModeLayouts = createProModeLayouts(2);

let activeBasicOffset = 4;
export let activeAdvancedLayout = 0;
let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;


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
      keyElems.forEach(keyElem => {
        if (keyElem.classList.contains("js-key-main")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset}`;
        }
        if (keyElem.classList.contains("js-key-sub")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset - 1}`;
        }
        if (keyElem.classList.contains("js-key-sup")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset + 1}`;
        }
        if (keyElem.classList.contains("js-key-super")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset + 2}`;
        }
      })
      break;
    }
    case "advanced": {
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
        if (keyElem.classList.contains("js-key-super")) {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            advancedModeLayouts[activeAdvancedLayout].super}`;
        }
      })
      break;
    }
    case "pro": {
      keyElems.forEach(keyElem => {
        if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
          console.log(keyElem.dataset.key, proModeLayouts[activeProLayout][keyElem.dataset.key]);
          keyElem.dataset.sound = proModeLayouts[activeProLayout][keyElem.dataset.key];
        }
      })
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}



editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked
});


let pressedOctave = undefined;


export function switchAdvancedMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
      console.log({targetKey});
      targetKey = targetKey.slice(-1);
    }

    if ((targetKey) && digits.includes(targetKey)) {
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
        if (keyElem.classList.contains("js-key-super")) {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            advancedModeLayouts[activeAdvancedLayout].super}`;
        }
      })
    }

  } else {
    if (pressedOctave) {
      const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
        value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        console.log(pressedSymbolKeys);
        targetKey = Array.from(pressedSymbolKeys)[0];
        console.log({targetKey});
        targetKey = targetKey.slice(-1);
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
          case "js-key-super": {
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
        value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        console.log(pressedSymbolKeys);
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      console.log({targetKey});
      pressedKeys.delete(targetKey); //optional?

      if (targetKey) {
        const allKeyElems = document.querySelectorAll(".key");
        allKeyElems.forEach(keyElem => {
          if (keyElem.dataset.key === targetKey) {
            keyElem.classList.forEach(className => {
              if (className.startsWith("js-key-")) {
                pressedOctave = className;
                console.log({pressedOctave});
              }
            })
          }
        })
      }
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


let pressedProKeyElem = undefined;


export function switchProMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
      targetKey = targetKey.slice(-1);
    }
    if (Number.isInteger(+targetKey)) {
      activeProLayout = targetKey;
    }

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
        keyElem.dataset.sound = proModeLayouts[activeProLayout][keyElem.dataset.key];
      }
    })

  } else {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
      console.log({targetKey});
    }
    pressedKeys.delete(targetKey); //optional?

    if ((targetKey) && (noteInput !== document.activeElement) && noteForProMode) {
      const allKeyElems = document.querySelectorAll(".key");
      allKeyElems.forEach(keyElem => {
        if (keyElem.dataset.key === targetKey) {
          pressedProKeyElem = keyElem;
        }
      })
      console.log(pressedProKeyElem);
      pressedProKeyElem.dataset.sound = noteForProMode;
      console.log(proModeLayouts[activeProLayout][targetKey.slice(-1).toLowerCase()]);
      proModeLayouts[activeProLayout][targetKey] = noteForProMode;
      proInfo.textContent = JSON.stringify(proModeLayouts);
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}