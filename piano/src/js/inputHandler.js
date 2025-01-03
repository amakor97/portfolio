"use strict";


import { visualMode } from "./visualModeSwitcher.js";
import { switchBasicModeKeyHandler, switchAdvancedModeKeyHandler, 
  switchProModeKeyHandler, switchModeType, noteInput, 
  isEditModeActive } from "./keyFuncModeSwitcher.js";
import { updateRecorder } from "./recorder.js";

export let pressedKeys = new Set();

let isRightPaddleActive = false;

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
  if ((pressedKeys.has("ShiftLeft") || (pressedKeys.has("ShiftRight"))) 
    && (pressedKeys.size > 1)) {
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
        switchProModeKeyHandler();
        break;
      }
    }
  } else {
    switch(e.code) {
      case "Space": {
        isRightPaddleActive = true;
        break;
      }
      case "Backspace": {
        updateRecorder("toggle");
      }
      default: {
        playSound(e);
      }
    }
  }
}

function playSound(e) {
  if (noteInput === document.activeElement) {
    return;
  }

  const key = document.querySelector(`.key[data-key="${e.code}"]`);
  if (!key) {
    return;
  }

  const audio = document.querySelector(
    `audio[data-sound="${key.dataset.sound}"]`);
  if (!audio) {
    return;
  }

  if (key.dataset.playing !== "true") {
    key.dataset.playing = "true";

    audio.load();
    audio.volume = 1;
    audio.play();
  }

  const displayedKey = ((visualMode === "full") || isEditModeActive) ? 
    document.querySelector(`div[data-display="${key.dataset.sound}"]`) :
    document.querySelector(`div[data-display="${key.dataset.display}"]`);
  displayedKey.classList.add("key--pressing");
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
      const targetSound = document.querySelector(
        `audio[data-sound=${playedKey.dataset.sound}]`);
      if (targetSound) {
        targetSound.load();
      }
    }
  })
}


function stopPlaying(e) {
  const allPianoKeys = document.querySelectorAll(".key");
  const key = document.querySelector(`.key[data-key="${e.code}"]`);

  if (key) {
    if ((visualMode !== "full") && !isEditModeActive) {
      key.classList.remove("key--pressing");
    } else {
      const playedSound = key.dataset.sound;
      allPianoKeys.forEach(keyElem => {
        if (keyElem.dataset.display === playedSound) {
          keyElem.classList.remove("key--pressing");;
        }
      })
    }
    key.setAttribute("data-playing", false);

    if (!isRightPaddleActive) {
      const audio = document.querySelector(
        `audio[data-sound="${key.dataset.sound}"]`);
      if (audio) {
        soundFade(audio, key);
      }
    }
  }
}


function soundFade(audioElem, key) {
  audioElem.volume = 0.66;
  
  setTimeout(() => {
    if (key.dataset.playing === "false") {
      audioElem.volume = 0.33;
    }
  }, 125);

  setTimeout(() => {
    if ((key.dataset.playing === "false") && 
      (audioElem.currentTime > 0.250)) {
      audioElem.pause();
    }
  }, 250);
}