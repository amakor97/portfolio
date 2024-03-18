"use strict";

import { doubleRowsMode, fullKbdMode } from "./visualModeChanger.js";

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


export function updateKbdHints() {
  if (doubleRowsMode || !fullKbdMode) {
  } else {
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
          if (hintSpan) {
            hintSpan.textContent = kbdKey.dataset.symbol;
          }
        }
      })
    });
  }
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
  let unplayableSounds = allSounds.filter(
    sound => !playableSounds.includes(sound));
  let unplayablePianoKeys = [];
  unplayableSounds.forEach(sound => {
    let unplayableKey = Array.from(allPianoKeys).find(
      key => key.dataset.display === sound);
    unplayablePianoKeys.push(unplayableKey);
  })

  allPianoKeys.forEach(key => key.classList.remove("key--disabled"));
  unplayablePianoKeys.forEach(unplayableKey => {
    if (fullKbdMode && !doubleRowsMode) {
      unplayableKey.classList.add("key--disabled");
    }
  });
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