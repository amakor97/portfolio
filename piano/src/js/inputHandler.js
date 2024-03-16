"use strict";


import { doubleRowsMode, fullKbdMode } from "./visualModeChanger.js";
import { updateSoundHints, updateKbdHints, 
  restoreKbdHints, updateDisabledKeys } from "./hintsUpdater.js";
import { switchBasicMode, switchAdvancedMode, 
  switchProMode, switchModeType,  } from "./functionalModeSwitcher.js";

let isRightPaddleActive = false;
export let pressedKeys = new Set();


function playSound(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);
  const displayedKey = fullKbdMode ? 
    document.querySelector(`div[data-display="${key.dataset.sound}"]`) :
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
      if (!isRightPaddleActive) {
        const audio = document.querySelector(
          `audio[data-sound="${key.dataset.sound}"]`);
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
      if (!isRightPaddleActive) {
        key.setAttribute("data-playing", false);
        const audio = document.querySelector(
          `audio[data-sound="${key.dataset.sound}"]`);
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
    isRightPaddleActive = false;
    rightPaddleRelease();
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
      isRightPaddleActive = true;
    } else {
      playSound(e);
    }
  }
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


function rightPaddleRelease() {
  const allPlayedKeys = document.querySelectorAll(".key[data-playing]");

  allPlayedKeys.forEach(playedKey => {
    if (!pressedKeys.has(playedKey.dataset.symbol)) {
      playedKey.dataset.playing = false;
      const targetSound = document.querySelector(`audio[data-sound=${playedKey.dataset.sound}]`);
      targetSound.load();
    }
  })
}


const hideKbdHintsBtn = document.querySelector(".js-hide-kbd-hints");
const hideSoundHintsBtn = document.querySelector(".js-hide-piano-hints");


hideKbdHintsBtn.addEventListener("click", () => {
  const allKbdHints = document.querySelectorAll(".js-kbd-key-hint");
  allKbdHints.forEach(kbdHint => kbdHint.classList.toggle("key__hint--transparent"));
})


hideSoundHintsBtn.addEventListener("click", () => {
  const allSoundHints = document.querySelectorAll(".js-piano-key-hint");
  allSoundHints.forEach(soundHint => soundHint.classList.toggle("key__hint--transparent"));
})