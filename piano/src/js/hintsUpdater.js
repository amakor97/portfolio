"use strict";

import { isEditModeActive } from "./functionalModeSwitcher.js";
import { visualMode } from "./visualModeChanger.js";


export function updateSoundHints() {
  const allPianoKeys = document.querySelectorAll(".key");
  allPianoKeys.forEach(pianoKey => {
    const soundHint = pianoKey.querySelector(".js-piano-key-hint");
    
    if (soundHint) {
      if ((visualMode === "full") || isEditModeActive) {
        soundHint.textContent = pianoKey.dataset.display;
      } else {
        soundHint.textContent = pianoKey.dataset.sound;
      }
    }
  })
}



export function updateKbdHints() {
  if ((visualMode === "full") || isEditModeActive) {
    const kbdHintSpans = document.querySelectorAll(".js-kbd-key-hint");
    kbdHintSpans.forEach(kbdHintSpan => kbdHintSpan.textContent = "");
    const allPianoKeys = document.querySelectorAll(".key");
    const playableKbdKeys = document.querySelectorAll("div[data-sound]");
  


    //const allSounds = Array.from(document.querySelectorAll("audio"))
      //.map(elem => elem.dataset.sound);


  
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
    if ((visualMode === "full") || isEditModeActive) {
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