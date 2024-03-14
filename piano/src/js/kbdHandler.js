"use strict";

import { doubleRowsMode, fullKbdMode } from "./kbdChanger.js";


const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;
let switchMode = false;

let isleftPaddleActive = false;

let basInfo = document.querySelector(".bas-info");
let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");

const digits = ["0", "1", "2", "3", "4", "5", "6"];

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");
const editModeToggler = document.querySelector("input[name='toggle-edit-mode']");
const noteInput = document.querySelector("input[name='enter-note']");
const noteValidateBtn = document.querySelector(".js-note-validate-btn");

let pressedKeys = new Set();

let noteForProMode = undefined;

noteValidateBtn.addEventListener("click", function() {
  if (noteInput.value.length === 3) {
    noteInput.value = noteInput.value.slice(0, 1).toUpperCase() + noteInput.value.slice(1).toLowerCase();
  } else {
    noteInput.value = noteInput.value.toUpperCase();
  }
  noteForProMode = noteInput.value;
})

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

function createProModeSingleLayout() {
  const playableKbdKeys = document.querySelectorAll(".key[data-symbol]");
  const symbols = [];
  
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




let activeAdvancedLayout = 0;
let activeProLayout = 0;

const mainOctaveSymbols = ["z", "s", "x"];

let switchModeType = "basic";

modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
    }
  })
})


let isEditModeActive = false;
editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked
});



function playSound(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);
  
  const displayedKey = fullKbdMode ? document.querySelector(`div[data-display="${key.dataset.sound}"]`) :
    document.querySelector(`div[data-display="${key.dataset.display}"]`);

  if (!audio) {
    return;
  }

  if ((key.getAttribute("data-playing") !== "true")) {
    audio.load();
    audio.play();
  }

  key.setAttribute("data-playing", true);
  if ((!fullKbdMode) || (doubleRowsMode)) {
    key.classList.add("key--pressing");
  } else {
    displayedKey.classList.add("key--pressing");
  }
}


function stopPlaying(e) {
  let keyText = getKeyFromEvent(e);

  let key = undefined;
  let displayedKey = undefined;
  const keys = document.querySelectorAll(".key");
  
  keys.forEach(keyElem => {
    if (keyElem.dataset.symbol === keyText) {
      key = keyElem;
    }
  })

  if (key) {
    if ((!fullKbdMode) || (doubleRowsMode)) {
      key.classList.remove("key--pressing");
      key.setAttribute("data-playing", false);
      if (!isleftPaddleActive) {

        const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);
        audio.load();
      }
    } else {
      let playedSound = key.dataset.sound;
      
      keys.forEach(keyElem => {
        if (keyElem.dataset.display === playedSound) {
          displayedKey = keyElem;
        }
      })
      displayedKey.classList.remove("key--pressing");
      if (!isleftPaddleActive) {
        key.setAttribute("data-playing", false);

        const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);
        audio.load();
      }
    }
  }
}



function addKeyToArray(e) {
  let key = getKeyFromEvent(e);
  pressedKeys.add(key);
}


function removeKeyFromArray(e) {
  let key = getKeyFromEvent(e);
  pressedKeys.delete(key);
}


window.addEventListener("keydown", kbdInputHandler);
window.addEventListener("keyup", kbdReleaseHandler);


function kbdInputHandler(e) {
  addKeyToArray(e);
  pressedKeysHandler(e);
}


function kbdReleaseHandler(e) {
  if (e.keyCode === 17) {
    isleftPaddleActive = false;
    leftPaddleRelease();
  }
  removeKeyFromArray(e);
  stopPlaying(e);
}


function pressedKeysHandler(e) {
  if (pressedKeys.has("shift")) {
    switch(switchModeType) {
      case "basic": {
        switchBasicMode();
        break;
      }
      case "advanced": {
        switchAdvancedMode();
        break;
      }
      case "pro": {
        switchProMode();
        break;
      }
    }
  } else {
    if (e.keyCode === 17) {
      isleftPaddleActive = true;
    } else {
      playSound(e);
    }
  }
}


function switchBasicMode() {
  const targetDigit = digits.find(key => pressedKeys.has(key));

  if (targetDigit) {
    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit}`;
      }
      if (keyElem.classList.contains("js-key-sub")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit - 1}`;
      }
      if (keyElem.classList.contains("js-key-sup")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 1}`;
      }
      if (keyElem.classList.contains("js-key-super-sup")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 2}`;
      }
    })
  }

  let displayedHint = `${targetDigit - 1} - ${targetDigit} - ${+targetDigit + 1}`;
  basInfo.textContent = displayedHint;

  updateDisabledKeys();
  updateSoundHints();
  updateKbdHints();
}


let pressedOctave = undefined;

function switchAdvancedMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => ((value !== "shift") && (value !== "ctrl"))));


    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }

    activeAdvancedLayout = targetKey;

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${advancedModeLayouts[activeAdvancedLayout].main}`;
      }
      if (keyElem.classList.contains("js-key-sub")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${advancedModeLayouts[activeAdvancedLayout].sub}`;
      }
      if (keyElem.classList.contains("js-key-sup")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${advancedModeLayouts[activeAdvancedLayout].sup}`;
      }
      if (keyElem.classList.contains("js-key-super-sup")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${advancedModeLayouts[activeAdvancedLayout].super}`;
      }
    })
  } else {
    if (pressedOctave) {
      const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => ((value !== "shift") && (value !== "ctrl"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      if (targetKey) {
        pressedOctaveKeys.forEach(keyElem => {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${targetKey}`;
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
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => ((value !== "shift") && (value !== "ctrl"))));
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
  
        const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
      }
    }
  }

  updateDisabledKeys();
  updateSoundHints();
  updateKbdHints();
}


let pressedProKeyElem = undefined;

function switchProMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => ((value !== "shift") && (value !== "ctrl"))));
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
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => ((value !== "shift") && (value !== "ctrl"))));

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



function getKeyFromEvent(e) {
  let key = undefined;

  switch (e.keyCode) {
    case 16: {
      key = "shift";
      break;
    }
    case 17: {
      key = "ctrl";
      break;
    }
    case 188: {
      key = ",";
      break;
    }
    case 190: {
      key = ".";
      break;
    }
    case 191: {
      key = "/";
      break;
    }
    case 186: {
      key = ";";
      break;
    }
    case 189: {
      key = "-";
      break;
    }
    case 219: {
      key = "[";
      break;
    }
    case 221: {
      key = "]";
      break;
    }
    default: {
      key = e.code.startsWith("D") ? e.code.charAt(5) : e.code.charAt(3).toLowerCase();
      break;
    }
  }

  return key;
}


export function updateDisabledKeys() {
  let playableKbdKeys = document.querySelectorAll("div[data-sound]");
  let playableSounds = [];

  let allPianoKeys = document.querySelectorAll(".key");
  let allSounds = [];
  allPianoKeys.forEach(pianoKey => {
    if (pianoKey.dataset.display) {
      allSounds.push(pianoKey.dataset.display);
    }
  });

  playableKbdKeys.forEach(kbdKey => playableSounds.push(kbdKey.dataset.sound));

  let unplayableSounds = allSounds.filter(sound => !playableSounds.includes(sound));

  let unplayablePianoKeys = [];
  unplayableSounds.forEach(sound => {
    let unplayableKey = Array.from(allPianoKeys).find(key => key.dataset.display === sound);
    unplayablePianoKeys.push(unplayableKey);
  })

  allPianoKeys.forEach(key => key.classList.remove("key--disabled"));
  unplayablePianoKeys.forEach(unplayableKey => {
    if (fullKbdMode && !doubleRowsMode) {
      unplayableKey.classList.add("key--disabled");
    }
  });
}

updateDisabledKeys();


export function updateKbdHints() {
  if (doubleRowsMode || !fullKbdMode) {
    let playableKbdKeys = document.querySelectorAll("div[data-sound]");
    playableKbdKeys.forEach(kbdKey => {
      const hintSpan = kbdKey.querySelector(".js-kbd-key-hint");
    })
  } else {
    const hintSpans = document.querySelectorAll(".js-kbd-key-hint");
  
    hintSpans.forEach(hintSpan => hintSpan.textContent = "");

    const allPianoKeys = document.querySelectorAll(".key");
    let playableKbdKeys = document.querySelectorAll("div[data-sound]");
    let playableSounds = [];
  
    let allSounds = [];
    allPianoKeys.forEach(pianoKey => {
      if (pianoKey.dataset.display) {
        allSounds.push(pianoKey.dataset.display);
      }
    });
  
    allPianoKeys.forEach(pianoKey => {
      const hintSpan = pianoKey.querySelector(".js-kbd-key-hint");
  
      playableKbdKeys.forEach(kbdKey => {
        if (pianoKey.dataset.display === kbdKey.dataset.sound) {
          if (hintSpan) {
            hintSpan.textContent = kbdKey.dataset.symbol;
          }
        }
      })
    });
  }
}

updateKbdHints();


export function updateSoundHints() {
  const allPianoKeys = document.querySelectorAll(".key");
  allPianoKeys.forEach(pianoKey => {
    const soundHint = pianoKey.querySelector(".js-piano-key-hint");
    if (soundHint) {

      if (doubleRowsMode || !fullKbdMode) {
        soundHint.textContent = pianoKey.dataset.sound;
      } else {
        soundHint.textContent = pianoKey.dataset.display;
      }
    }

  })
}


export function restoreKbdHints() {
  const playableKbdKeys = document.querySelectorAll(".key[data-symbol]");

  playableKbdKeys.forEach(kbdKey => {
    const hintSpan = kbdKey.querySelector(".js-kbd-key-hint");
    if (hintSpan) {
      hintSpan.textContent = kbdKey.dataset.symbol;
    }
  })
}

restoreKbdHints();


function leftPaddleRelease() {
  const allPianoKeys = document.querySelectorAll(".key");
  const allPlayedKeys = document.querySelectorAll(".key[data-playing]");

  const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => ((value !== "shift") && (value !== "ctrl"))));



  allPlayedKeys.forEach(playedKey => {
    if (!pressedKeys.has(playedKey.dataset.symbol)) {
      playedKey.dataset.playing = false;
      const targetSound = document.querySelector(`audio[data-sound=${playedKey.dataset.sound}]`);
      targetSound.load();
    }

  })
}


const hideKbdHintsBtn = document.querySelector(".js-hide-kbd-hints");
hideKbdHintsBtn.addEventListener("click", () => {
  const allKbdHints = document.querySelectorAll(".js-kbd-key-hint");
  allKbdHints.forEach(kbdHint => kbdHint.classList.toggle("key__hint--transparent"));
})

const hideSoundHintsBtn = document.querySelector(".js-hide-piano-hints");
hideSoundHintsBtn.addEventListener("click", () => {
  const allSoundHints = document.querySelectorAll(".js-piano-key-hint");
  allSoundHints.forEach(soundHint => soundHint.classList.toggle("key__hint--transparent"));
})