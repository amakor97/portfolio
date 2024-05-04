"use strict";


export let pressedKeys = new Set();

import { visualMode } from "./visualModeChanger.js";
import { switchBasicModeKeyHandler, switchAdvancedModeKeyHandler, 
  switchProMode, switchModeType, noteInput, isEditModeActive } from "./functionalModeSwitcher.js";

let isRightPaddleActive = false;


function playSound(e) {
  if (noteInput === document.activeElement) {
    return;
  }

  const key = document.querySelector(`.key[data-key="${e.code}"]`);
  if (!key) {
    return;
  }

  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);
  if (!audio) {
    return;
  }
  
  if (key.dataset.playing !== "true") {
    key.dataset.playing = "true";
    audio.load();
    audio.play();
  }

  const displayedKey = ((visualMode === "full") || isEditModeActive) ? 
    document.querySelector(`div[data-display="${key.dataset.sound}"]`) :
    document.querySelector(`div[data-display="${key.dataset.display}"]`);
  displayedKey.classList.add("key--pressing");
}


function stopPlaying(e) {
  let displayedKey = undefined;
  const allPianoKeys = document.querySelectorAll(".key");
  const key = document.querySelector(`.key[data-key="${e.code}"]`);

  if (key) {
    if ((visualMode !== "full") && !isEditModeActive) {
      key.classList.remove("key--pressing");
      key.setAttribute("data-playing", false);
    } else {
      const playedSound = key.dataset.sound;
      allPianoKeys.forEach(keyElem => {
        if (keyElem.dataset.display === playedSound) {
          displayedKey = keyElem;
        }
      })

      if (displayedKey) {
        displayedKey.classList.remove("key--pressing");
      }
      key.setAttribute("data-playing", false);
    }

    if (!isRightPaddleActive) {
      const audio = document
        .querySelector(`audio[data-sound="${key.dataset.sound}"]`);
      if (audio) {
        audio.load();
      }
    }
  }
}


let getKeyFromEvent = (e) => e.code;
let addKeyToArray = (e) => pressedKeys.add(getKeyFromEvent(e));
let removeKeyFromArray = (e) =>  pressedKeys.delete(getKeyFromEvent(e));


window.addEventListener("keydown", kbdInputHandler);
window.addEventListener("keyup", kbdReleaseHandler);


function kbdInputHandler(e) {
  if (e.code === "Slash") {  //preventing page search in Firefox
    e.preventDefault();
  }
  addKeyToArray(e);
  pressedKeysHandler(e);
}


function pressedKeysHandler(e) {
  console.log(pressedKeys);
  if (pressedKeys.has("ShiftLeft") || (pressedKeys.has("ShiftRight"))) {
    switch(switchModeType) {
      case "basic": {
        switchBasicModeKeyHandler();
        break;
      }
      case "advanced": {
        switchAdvancedModeKeyHandler();
        break;
      }
      case "pro": {
        switchProMode();
        break;
      }
    }
  } else {
    if (e.code === "Space") {
      isRightPaddleActive = true;
    } else {
      playSound(e);
    }
  }
}


function kbdReleaseHandler(e) {
  if (e.code === "Space") {
    isRightPaddleActive = false;
    rightPaddleRelease();
  }
  removeKeyFromArray(e);
  stopPlaying(e);
}


function rightPaddleRelease() {
  const allPlayedKeys = document.querySelectorAll(".key[data-playing]");

  allPlayedKeys.forEach(playedKey => {
    if (!pressedKeys.has(playedKey.dataset.key)) {
      playedKey.dataset.playing = false;
      const targetSound = document.
        querySelector(`audio[data-sound=${playedKey.dataset.sound}]`);
      if (targetSound) {
        targetSound.load();
      }
    }
  })
}