"use strict";

import { editModeToggler, isEditModeActive } from "./functionalModeSwitcher.js";
import { doubleRowsMode, fullKbdMode, visualMode } from "./visualModeChanger.js";

export function updateSoundHints() {
  const allPianoKeys = document.querySelectorAll(".key");
  allPianoKeys.forEach(pianoKey => {
    const soundHint = pianoKey.querySelector(".js-piano-key-hint");
    
    if (soundHint) {
      //console.log((doubleRowsMode || !fullKbdMode) && !editModeToggler.checked);
      if ((visualMode === "double") && !editModeToggler.checked) {
        soundHint.textContent = pianoKey.dataset.sound;
      } else {
        soundHint.textContent = pianoKey.dataset.display;
      }
    }
  })
}


export function updateKbdHints() {
  if ((visualMode === "full") || (editModeToggler.checked === true)) {
    const hintSpans = document.querySelectorAll(".js-kbd-key-hint");
    hintSpans.forEach(hintSpan => hintSpan.textContent = "");
    const allPianoKeys = document.querySelectorAll(".key");
    let playableKbdKeys = document.querySelectorAll("div[data-sound]");
  
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
          hintSpan.textContent = kbdKey.dataset.symbol;
        }
      })
    });
  }
}


export function updateDisabledKeys() {
  let allPianoKeys = document.querySelectorAll(".key");
  let unplayablePianoKeys = [];

  allPianoKeys.forEach(key => {
    let kbdHint = key.querySelector(".js-kbd-key-hint");
    if (kbdHint && kbdHint.textContent === "") {
      unplayablePianoKeys.push(key);
    }
  })

  allPianoKeys.forEach(key => key.classList.remove("key--disabled"));
  unplayablePianoKeys.forEach(unplayableKey => {
    if ((visualMode === "full") || (editModeToggler.checked === true)) {
      unplayableKey.classList.add("key--disabled");
    }
  });
}


export function restoreKbdHints() {
  const playableKbdKeys = document.querySelectorAll(".key[data-symbol]");
  playableKbdKeys.forEach(kbdKey => {
    const hintSpan = kbdKey.querySelector(".js-kbd-key-hint");
    hintSpan.textContent = kbdKey.dataset.symbol;
  })
}


const hideKbdHintsBtn = document.querySelector(".js-hide-kbd-hints");
const hideSoundHintsBtn = document.querySelector(".js-hide-piano-hints");


hideKbdHintsBtn.addEventListener("click", () => {
  const allKbdHints = document.querySelectorAll(".js-kbd-key-hint");
  allKbdHints.forEach(kbdHint => kbdHint.classList.toggle(
    "key__hint--transparent"));
})


hideSoundHintsBtn.addEventListener("click", () => {
  const allSoundHints = document.querySelectorAll(".js-piano-key-hint");
  allSoundHints.forEach(soundHint => soundHint.classList.toggle(
    "key__hint--transparent"));
})