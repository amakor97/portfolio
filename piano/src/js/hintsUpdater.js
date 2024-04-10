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
    const playableKbdKeys = document.querySelectorAll(".key[data-sound]");
  
    allPianoKeys.forEach(pianoKey => {
      const kbdHintSpan = pianoKey.querySelector(".js-kbd-key-hint");
      playableKbdKeys.forEach(kbdKey => {
        if (pianoKey.dataset.display === kbdKey.dataset.sound) {
          kbdHintSpan.textContent = kbdKey.dataset.symbol;
        }
      })
    });
  }
}


export function updateDisabledKeys() {
  let allPianoKeys = document.querySelectorAll(".key");
  let unplayablePianoKeys = [];

  allPianoKeys.forEach(key => {
    key.classList.remove("key--disabled");
    let kbdHint = key.querySelector(".js-kbd-key-hint");
    if (kbdHint && kbdHint.textContent === "") {
      unplayablePianoKeys.push(key);
    }
  })

  if ((visualMode === "full") || isEditModeActive) {
    unplayablePianoKeys.forEach(unplayableKey => unplayableKey.classList
      .add("key--disabled"));
  }
}


export function restoreKbdHints() {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]");
  playableKbdKeys.forEach(kbdKey => {
    const kbdHintSpan = kbdKey.querySelector(".js-kbd-key-hint");
    kbdHintSpan.textContent = kbdKey.dataset.symbol;
  })
}


const hideKbdHintsBtn = document.querySelector(".js-hide-kbd-hints");
hideKbdHintsBtn.addEventListener("click", () => {
  const allKbdHints = document.querySelectorAll(".js-kbd-key-hint");
  allKbdHints.forEach(kbdHint => kbdHint.classList
    .toggle("key__hint--transparent"));
})


const hideSoundHintsBtn = document.querySelector(".js-hide-piano-hints");
hideSoundHintsBtn.addEventListener("click", () => {
  const allSoundHints = document.querySelectorAll(".js-piano-key-hint");
  allSoundHints.forEach(soundHint => soundHint.classList
    .toggle("key__hint--transparent"));
})