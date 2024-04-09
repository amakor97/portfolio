"use strict";

import { pressedKeys } from "./inputHandler.js";

import { updateSoundHints, updateKbdHints, 
  updateDisabledKeys } from "./hintsUpdater.js";

import { noteInputCont, showFullKbd, hideFullKbd, 
  changeStylesForOneRow, changeStylesForTwoRows, 
  visualMode } from "./visualModeChanger.js";

let basInfo = document.querySelector(".bas-info");
let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");

let digits = ["0", "1", "2", "3", "4", "5", "6"];
let tDigits = ["Digit0", "Digit1", "Digit2", 
  "Digit3", "Digit4", "Digit5", "Digit6"];


function updateBasicSounds(base) {
  const keyElems = document.querySelectorAll(".key");
  keyElems.forEach(keyElem => {
    if (keyElem.classList.contains("js-key-main")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${base}`;
    }
    if (keyElem.classList.contains("js-key-sub")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${base - 1}`;
    }
    if (keyElem.classList.contains("js-key-sup")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${base + 1}`;
    }
    if (keyElem.classList.contains("js-key-super")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${base + 2}`;
    }
  })
}


export function switchBasicMode() {
  let targetDigit = tDigits.find(key => pressedKeys.has(key));

  if (targetDigit) {
    targetDigit = targetDigit.slice(5, 6);
    activeBasicOffset = +targetDigit;
    updateBasicSounds(activeBasicOffset);
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


let proModeLayouts = createProModeLayouts(5);

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
          if ((visualMode === "double") && (!isEditModeActive)) {
            keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
              advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
          } else {
            keyElem.dataset.sound = `${keyElem.dataset.display.slice(0, -1)}${
              advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
          }
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

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


let prevOctave = undefined;
let prevOctaveNum = undefined;
let targetOctave = undefined;


const allKeyElems = document.querySelectorAll(".key");
allKeyElems.forEach(key => {
  key.addEventListener("click", function test(e) {
    switchByClick(e, key);
  });
})


editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked;
  if (isEditModeActive) {
    changeStylesForOneRow();
    showFullKbd();

    updateKbdHints();
    updateSoundHints();
    updateDisabledKeys();
  } else {
    switch(visualMode) {
      case "double": {
        changeStylesForTwoRows();
        hideFullKbd();
        break;
      }
      case "single": {
        hideFullKbd();
        break;
      }
      case "full": {
        break;
      }
    }
  }
});


function switchByClick(e, key) {
  if (!isEditModeActive) {
    return;
  }

  switch(switchModeType) {
    case("basic"): {
      switchBasicModeClick(e, key);
      break;
    }
    case("advanced"): {
      switchAdvancedModeClick(e, key);
      break;
    }
    case("pro"): {
      switchProModeClick(e, key);
      break;
    }
  }
}


function switchBasicModeClick(e, key) {
  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = Array.from(targetOctave.classList);
  targetBasicNum = targetBasicNum.find(
    className => className.startsWith("keyboard--count")).slice(-1);

  let targetDigit = +targetBasicNum;
  updateBasicSounds(targetDigit);

  updateKbdHints();
  updateSoundHints();
  updateDisabledKeys();
}


function switchAdvancedModeClick(e, key) {
  if ((prevOctave === undefined)) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {
      prevOctave = e.target.parentNode.parentNode;
      prevOctaveNum = Array.from(prevOctave.classList);
      prevOctaveNum = prevOctaveNum.find(
        className => className.startsWith("keyboard--count")).slice(-1);
    } 
  } else {
    targetOctave = Array.from(e.target.parentNode.parentNode.classList);
    targetOctave = targetOctave.find(
      className => className.startsWith("keyboard--count")).slice(-1);
    const octaveKeys = prevOctave.querySelectorAll(".key");

    let octaveName = undefined;
    const keyElems = document.querySelectorAll(".key");
    octaveKeys.forEach(key => {
      let kbdHint = key.querySelector(".js-kbd-key-hint");
      if (kbdHint) {
        keyElems.forEach(allKey => {
          if (allKey.dataset.symbol === kbdHint.textContent) {
            
            let classes = Array.from(allKey.classList);
            classes = classes.filter(className => (className.startsWith("js-key-") && (className !== "js-key-hideable")));
            if (classes.length === 1) {
              octaveName = classes[0];
            }
          }
        })
      };
    });

    const name = octaveName.slice(7);
    advancedModeLayouts[activeAdvancedLayout][name] = +targetOctave;

    keyElems.forEach(keyElem => {
      let targetClass = Array.from(keyElem.classList).find(keyClass => ["js-key-main", "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
      if ((targetClass)) {
        targetClass = targetClass.slice(7);
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
      }
    })
    updateKbdHints();
    updateSoundHints();

    updateDisabledKeys();

    prevOctave = undefined;
    prevOctaveNum = undefined;
    targetOctave = undefined;
  }
}


let pressedProKeyElemClick = undefined;


function switchProModeClick(e, key) {
  if (!pressedProKeyElemClick) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {

      const keyElems = document.querySelectorAll(".key");
      keyElems.forEach(key => {
        if (kdbHint.textContent === key.dataset.symbol) {
          pressedProKeyElemClick = key;
        }
      })
    } else {
      console.log("fail");
    }
  } else {
    if (key) {
      pressedProKeyElemClick.dataset.sound = key.dataset.display;
      proModeLayouts[activeProLayout][pressedProKeyElemClick.dataset.key] = key.dataset.display;

      pressedProKeyElemClick = undefined;
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


let pressedOctave = undefined;


export function switchAdvancedMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
      targetKey = targetKey.slice(-1);
    }

    if ((targetKey) && digits.includes(targetKey)) {
      activeAdvancedLayout = targetKey;

      const keyElems = document.querySelectorAll(".key");
      keyElems.forEach(keyElem => {
        let targetClass = Array.from(keyElem.classList).find(keyClass => ["js-key-main", "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
        if (targetClass) {
          targetClass = targetClass.slice(7);
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
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
        targetKey = Array.from(pressedSymbolKeys)[0];
        targetKey = targetKey.slice(-1);
      }

      if (!(new RegExp(/[0-8]/)).test(targetKey.slice(-1))) {
        targetKey = undefined;
      }

      if (targetKey) {
        pressedOctaveKeys.forEach(keyElem => {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            targetKey}`;
        })

        let octaveName = pressedOctave.slice(7);

        advancedModeLayouts[activeAdvancedLayout][octaveName] = +targetKey;
        advInfo.textContent = JSON.stringify(advancedModeLayouts);
      }

      pressedOctave = undefined;
    } else {
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
        value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      pressedKeys.delete(targetKey); //optional?

      if (targetKey) {
        const allKeyElems = document.querySelectorAll(".key");
        allKeyElems.forEach(keyElem => {
          if (keyElem.dataset.key === targetKey) {
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
    }
    pressedKeys.delete(targetKey); //optional?

    if ((targetKey) && (noteInput !== document.activeElement) && noteForProMode) {
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
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}