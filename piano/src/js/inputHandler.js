"use strict";


import { visualMode } from "./visualModeChanger.js";
import { switchBasicMode, switchAdvancedMode, 
  switchProMode, switchModeType, noteInput, editModeToggler } from "./functionalModeSwitcher.js";

let isRightPaddleActive = false;
export let pressedKeys = new Set();


function playSound(e) {
  if (noteInput === document.activeElement) {
    return;
  }

  const key = document.querySelector(`.key[data-key="${e.code}"]`);
  if (!key) {
    return;
  }

  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);
  const displayedKey = ((visualMode === "full") || editModeToggler.checked) ? 
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
  if ((visualMode !== "full") && !editModeToggler.checked) {
    key.classList.add("key--pressing");
  } else {
    displayedKey.classList.add("key--pressing");
  }
}


function stopPlaying(e) {
  let displayedKey = undefined;
  const keys = document.querySelectorAll(".key");
  const key = document.querySelector(`.key[data-key="${e.code}"]`);

  if (key) {
    if ((visualMode !== "full")  && !editModeToggler.checked) {
      key.classList.remove("key--pressing");
      key.setAttribute("data-playing", false);
      if (!isRightPaddleActive) {
        const audio = document.querySelector(
          `audio[data-sound="${key.dataset.sound}"]`);
        if (!audio) {
          return;
        }
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
      key.setAttribute("data-playing", false);
      if (!isRightPaddleActive) {
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
  // e.preventDefault(); devtools lol
  addKeyToArray(e);
  pressedKeysHandler(e);
}


function kbdReleaseHandler(e) {
  if (e.keyCode === 32) {
    isRightPaddleActive = false;
    rightPaddleRelease();
  }
  removeKeyFromArray(e);
  stopPlaying(e);
}


function pressedKeysHandler(e) {
  if (pressedKeys.has("ShiftLeft") || (pressedKeys.has("ShiftRight"))) {
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
    if (e.keyCode === 32) {
      isRightPaddleActive = true;
    } else {
      playSound(e);
    }
  }
}


let getKeyFromEvent = (e) => e.code;


function rightPaddleRelease() {
  const allPlayedKeys = document.querySelectorAll(".key[data-playing]");

  console.log(pressedKeys);

  allPlayedKeys.forEach(playedKey => {
    if (!pressedKeys.has(playedKey.dataset.key)) {
      playedKey.dataset.playing = false;
      const targetSound = document.querySelector(`audio[data-sound=${playedKey.dataset.sound}]`);
      targetSound.load();
    }
  })
}