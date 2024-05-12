"use strict";

import { isEditModeActive } from "./functionalModeSwitcher.js";
import { visualMode } from "./visualModeChanger.js";


const toggleKbdHintsBtn = document.querySelector(".js-hide-kbd-hints");
const toggleSoundHintsBtn = document.querySelector(".js-hide-piano-hints");
const toggleDisabledKeysBtn = document.querySelector(".js-hide-disabled-keys");

let areDisabledKeysActive = true;


export function updateVisualHints() {
  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


export function updateSoundHints() {
  const allPianoKeys = document.querySelectorAll(".key");
  
  allPianoKeys.forEach(pianoKey => {
    const soundHint = pianoKey.querySelector(".js-piano-key-hint");
    if (soundHint) {
      soundHint.textContent = isFullKbdShown() ? 
        pianoKey.dataset.display : pianoKey.dataset.sound;
    }
  })
}


export let isFullKbdShown = () => 
  ((visualMode === "full") || isEditModeActive);


export function updateKbdHints() {
  if (isFullKbdShown()) {
    const allKeyElems = document.querySelectorAll(".key");
    const playableKbdKeys = document.querySelectorAll(".key[data-sound]");
    const kbdHintSpans = document.querySelectorAll(".js-kbd-key-hint");
    kbdHintSpans.forEach(kbdHintSpan => kbdHintSpan.textContent = "");
  
    allKeyElems.forEach(keyElem => {
      const kbdHint = keyElem.querySelector(".js-kbd-key-hint");
      playableKbdKeys.forEach(kbdKey => {
        if (keyElem.dataset.display === kbdKey.dataset.sound) {
          kbdHint.textContent = kbdKey.dataset.symbol;
        }
      })
    });
  }
}


export function updateDisabledKeys() {
  const allKeyElems = document.querySelectorAll(".key");
  const unplayablePianoKeys = [];

  allKeyElems.forEach(keyElem => {
    keyElem.classList.remove("key--disabled");
    let kbdHint = keyElem.querySelector(".js-kbd-key-hint");
    if (kbdHint && kbdHint.textContent === "") {
      unplayablePianoKeys.push(keyElem);
    }
  })

  if (isFullKbdShown() && areDisabledKeysActive) {
    unplayablePianoKeys.forEach(unplayableKey => 
      unplayableKey.classList.add("key--disabled"));
  }
}


export function restoreKbdHints() {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]");
  playableKbdKeys.forEach(playableKey => {
    const kbdHint = playableKey.querySelector(".js-kbd-key-hint");
    kbdHint.textContent = playableKey.dataset.symbol;
  })
}


toggleKbdHintsBtn.addEventListener("click", () => {
  const allKbdHints = document.querySelectorAll(".js-kbd-key-hint");
  allKbdHints.forEach(kbdHint => 
    kbdHint.classList.toggle("key__hint--transparent"));
})


toggleSoundHintsBtn.addEventListener("click", () => {
  const allSoundHints = document.querySelectorAll(".js-piano-key-hint");
  allSoundHints.forEach(soundHint => 
    soundHint.classList.toggle("key__hint--transparent"));
})


toggleDisabledKeysBtn.addEventListener("click", () => {
  areDisabledKeysActive = !areDisabledKeysActive;
  updateDisabledKeys();
})