"use strict";

import { doubleRowsMode, fullKbdMode } from "./kbdChanger.js";


const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;
let switchMode = false;

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
  console.log({noteForProMode});
})

let advancedModeLayouts = [
  {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  },
  {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  },
  {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  }
]

let proModeLayouts = [
  {
    z: "C4",  //is it really needed?
    x: "D4",
    c: "E4"
  },
  {
    z: "C4",
    x: "D4",
    c: "E4"
  }
]

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

  //const displayedKey = document.querySelector(`div[data-display="${key.dataset.sound}"]`);
  //const displayedKey = document.querySelector(`div[data-display="${key.dataset.display}"]`);
  
  const displayedKey = fullKbdMode ? document.querySelector(`div[data-display="${key.dataset.sound}"]`) :
    document.querySelector(`div[data-display="${key.dataset.display}"]`);

  console.log(displayedKey);

  console.log(key.dataset.sound);

  if (!audio) {
    return;
  }

  if (key.getAttribute("data-playing") !== "true") {
    audio.load();
    audio.play();
  }

  //audio.id = 5; //wtf???
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
    } else {
      let playedSound = key.dataset.sound;
      //let playedSound = key.dataset.display;
      console.log({playedSound});
      
      keys.forEach(keyElem => {
        if (keyElem.dataset.display === playedSound) {
          displayedKey = keyElem;
        }
      })
      displayedKey.classList.remove("key--pressing");
      key.setAttribute("data-playing", false);
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
    playSound(e);
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
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }

    activeAdvancedLayout = targetKey;

    //inp for setting activeAdvLYOUT ???

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
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
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
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
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
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
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
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));

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
  console.log({allSounds});

  playableKbdKeys.forEach(kbdKey => playableSounds.push(kbdKey.dataset.sound));

  let unplayableSounds = allSounds.filter(sound => !playableSounds.includes(sound));
  console.log({unplayableSounds});

  let unplayablePianoKeys = [];
  unplayableSounds.forEach(sound => {
    let unplayableKey = Array.from(allPianoKeys).find(key => key.dataset.display === sound);
    unplayablePianoKeys.push(unplayableKey);
  })
  console.log({unplayablePianoKeys});

  allPianoKeys.forEach(key => key.classList.remove("key--disabled"));
  console.log({fullKbdMode});
  unplayablePianoKeys.forEach(unplayableKey => {
    if (fullKbdMode && !doubleRowsMode) {
      unplayableKey.classList.add("key--disabled");
    }
  });

  /*
  let allKeyElems = document.querySelectorAll(".key");
  allKeyElems.forEach(keyElem => {
    keyElem.classList.remove("key--disabled");
    if ((!playableSounds.includes(keyElem.dataset.display))) { // && fullKbdMode
      keyElem.classList.add("key--disabled");
    }
  })
  */
}

updateDisabledKeys();


export function updateKbdHints() {
  if (doubleRowsMode) {
    let playableKbdKeys = document.querySelectorAll("div[data-sound]");
    playableKbdKeys.forEach(kbdKey => {
      const hintSpan = kbdKey.querySelector(".js-kbd-key-hint");
      //hintSpan.textContent = kbdKey.dataset.symbol;
    })
  } else {
    const hintSpans = document.querySelectorAll(".js-kbd-key-hint");
    console.log({hintSpans});
  
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
    console.log({allSounds});
  
  
  
    allPianoKeys.forEach(pianoKey => {
  
      const hintSpan = pianoKey.querySelector(".js-kbd-key-hint");
      console.log({hintSpan});
  
      playableKbdKeys.forEach(kbdKey => {
        //console.log(kbdKey.dataset.sound);
        if (pianoKey.dataset.display === kbdKey.dataset.sound) {
          console.log("mmm", pianoKey.dataset.display, kbdKey.dataset.symbol);
          console.log(hintSpan, kbdKey.dataset.symbol);
          if (hintSpan) {
  
            hintSpan.textContent = kbdKey.dataset.symbol;
          }
        }
      })
    });
  }
}

updateKbdHints();


function updateSoundHints() {
  const allPianoKeys = document.querySelectorAll(".key");
  allPianoKeys.forEach(pianoKey => {
    const soundHint = pianoKey.querySelector(".js-piano-key-hint");
    if (soundHint) {

      if (doubleRowsMode) {
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

  console.log(playableKbdKeys);
}

restoreKbdHints();  