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

const allKeyElems = document.querySelectorAll(".key");


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


export function createAdvancedModeLayouts(num) {
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


export let proModeLayouts = createProModeLayouts(5);


const resetLayoutsBtn = document.querySelector(".js-reset-layouts");
resetLayoutsBtn.addEventListener("click", resetLayouts);
function resetLayouts() {
  activeBasicOffset = 4;
  advancedModeLayouts = createAdvancedModeLayouts(5);
  proModeLayouts = createProModeLayouts(5);
  updateMode();
}



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
  console.log(base);
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


export let activeBasicOffset = 4;
export let activeAdvancedLayout = 0;
export let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;

export let setBasicOffset = (n) => activeBasicOffset = n; 
export let setAdvancedModeLayouts = (obj) => advancedModeLayouts = obj;
export let setProModeLayouts = (obj) => proModeLayouts = obj;

modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      updateMode();
    }
  })
})


export function updateMode() {
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

export function switchBasicModeKeyHandler() {
  let tmpDigits = [...textDigits];
  tmpDigits.splice(0, 1);
  tmpDigits.splice(-2, 2);
  let num = +(tmpDigits.find(key => pressedKeys.has(key)).slice(5, 6));
  if (num) {
    switchBasicMode(num);
  }
}


export function switchBasicMode(num) {
  setBasicOffset(num);
  updateBasicSounds(num);
  const allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
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


export function updateAdvancedLayoutAndOctave2(octaveName, nextOctaveNum) {
  updateAdvancedOctaveSounds(octaveName, nextOctaveNum);
  const name = octaveName.slice(7);
  advancedModeLayouts[activeAdvancedLayout][name] = +nextOctaveNum;
  allKeyElems.forEach(key => key.classList.remove("key--pressing"));
  updateVisualHints();
}



function getPressedOctave() {
  let targetKey = getPressedSymbolKey();

  if (targetKey) {
    const allKeyElems = document.querySelectorAll(".key");
    for (let keyElem of allKeyElems) {
      if (keyElem.dataset.key === targetKey) {
        return getOctaveClassByElem(keyElem);
      }
    }
  }
}


export function switchAdvancedModeKeyHandler() {
  if (!isEditModeActive) {
    updateAdvancedSounds();
  } else {
    let targetKey = getPressedSymbolKey();
    console.log({targetKey});
    switchAdvancedMode();
  }

  updateVisualHints();
}


function getPressedSymbolKey() {
  const pressedSymbolKeys = filterSpecialKeys();
  let targetKey = (pressedSymbolKeys.size === 1) ? 
    Array.from(pressedSymbolKeys)[0] : undefined;
  return targetKey;
}


export let prevOctaveNum = undefined;
export let setPrevOctaveNum = (n) => prevOctaveNum = n;

function getPrevOctaveNumFromKey(key) {
  if (!key) {
    return;
  }

  let num = undefined;

  console.log(key);
  allKeyElems.forEach(keyElem => {
    if (keyElem.dataset.key === key) {
      console.log(keyElem.dataset.sound.slice(-1));
      num = keyElem.dataset.sound.slice(-1);
    }
  })
  return num;
}


function getPressedKeyElemByKey(key) {
  let tmpKey = undefined;
  allKeyElems.forEach(keyElem => {
    if (keyElem.dataset.key === key) {
      tmpKey = key;
    }
  })
  return tmpKey;
}



//bug here
//prevOctaveNum => prevOctaveName

function getKbdHint(prevOctaveNum) {
  let prevOctaveKeys = document.querySelectorAll(
    `.keyboard--count-${prevOctaveNum} .key:not(.key--empty)`);
  let kbdHint = "";

  console.log(prevOctaveKeys);

  prevOctaveKeys.forEach(prevOctaveKey => {
    let tmpKbdHint = prevOctaveKey.querySelector(".js-kbd-key-hint");
    if (tmpKbdHint.textContent) {
      kbdHint = tmpKbdHint;
    }
  })

  let lolHint = kbdHint.cloneNode(true);
  console.log("KH while retrieving: ");
  console.log(lolHint);

  return kbdHint;
}

function getOctaveClassByHint(kbdHint) {
  console.log(kbdHint);
  console.log(kbdHint.textContent);
  console.log(kbdHint.innerHTML);
  for (let keyElem of allKeyElems) {
    if (keyElem.dataset.symbol === kbdHint.textContent) {
      console.log(keyElem);
      console.log(keyElem.dataset.symbol);
      console.log(kbdHint.textContent);
      return getOctaveClassByElem(keyElem);
    }
  }
}





export function switchAdvancedMode() {
  let pressedKey = getPressedSymbolKey();
  
  console.log("PK at SWA enter:", pressedKey);



  if (!prevOctaveNum) {
    prevOctaveNum = getPrevOctaveNumFromKey(pressedKey);
    console.log("PON when no PON: ", prevOctaveNum);


    //pressedOctave = getPressedOctave();

    /*
    console.log({pressedOctave});
    {
      let t = document.querySelector(`.${pressedOctave}`);
      console.log(t);
      console.log(t.dataset.sound.slice(-1));

      let num = t.dataset.sound.slice(-1);
      let octaveKeys = document.querySelectorAll(`.keyboard--count-${num} .key`);
      console.log(octaveKeys);

      octaveKeys.forEach(keyElem => keyElem.classList.add("key--prev"));
    }
    */

  } else {
    console.log("PON when is PON: ", prevOctaveNum);
    let kbdHint = getKbdHint(prevOctaveNum);
    console.log("KH when is PON: ", kbdHint);
    let octaveName = (kbdHint === "") ? "js-key-super" : 
      getOctaveClassByHint(kbdHint);
    console.log("ON when is PON: ", octaveName);

      //let nextOctaveNum = Array.from(
        //clickedKeyElem.parentNode.parentNode.classList).find(
        //className => className.startsWith("keyboard--count")).slice(-1);

    let nextOctaveNum = getPressedSymbolKey();
    if (textDigits.includes(nextOctaveNum)) {
      nextOctaveNum = nextOctaveNum.slice(-1);
      updateAdvancedLayoutAndOctave2(octaveName, nextOctaveNum);
    }
    prevOctaveNum = undefined;
  }
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
