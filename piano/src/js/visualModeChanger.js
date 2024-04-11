"use strict";

export let visualMode = "double";
export const assignModeCont = document
  .querySelector(".js-control-assign-mode-cont");
export const noteInputCont = document
  .querySelector(".js-control-note-input-cont");

import { updateSoundHints, updateKbdHints, 
  restoreKbdHints, updateDisabledKeys } from "./hintsUpdater.js";
import { isEditModeActive } from "./functionalModeSwitcher.js";

const kbdCont = document.querySelector(".js-keyboard-cont");
const leftPart = document.querySelector(".js-keyboard-left");
const centerPart = document.querySelector(".js-keyboard-center");
const controlPanel = document.querySelector(".js-control-panel");
const visualModeSelectors = document
  .querySelectorAll("input[name='select-visual-mode']");


visualModeSelectors.forEach(input => {
  input.addEventListener("change", () => {
    if (input.checked) {
      visualMode = input.value;
    }
    toggleVisualMode();
  })
})


export function toggleVisualMode() {
  updateKbdRows();
  updateFullKbd();
}


function updateKbdRows() {
  if ((visualMode === "double") && !isEditModeActive) {
    changeStylesForTwoRows();
  } else {
    changeStylesForOneRow();
  }
}


function updateFullKbd() {
  if ((visualMode === "full") || isEditModeActive) {
    showFullKbd();
  } else {
    hideFullKbd();
  }
}


export function hideFullKbd() {
  kbdCont.classList.remove("keyboard-cont--full-kbd");

  const hidedKeys = document.querySelectorAll(".js-key-hideable");
  hidedKeys.forEach(key => key.classList.add("key--hided"));
  const whiteKeys = document.querySelectorAll(".key--white");
  whiteKeys.forEach(key => key.classList.remove("key--white-narrow"));
  const blackKeys = document.querySelectorAll(".key--black");
  blackKeys.forEach(key => key.classList.remove("key--black-narrow"));

  restoreKbdHints();
  updateSoundHints();
  updateDisabledKeys();
}


export function showFullKbd() {
  kbdCont.classList.add("keyboard-cont--full-kbd");

  const hidedKeys = document.querySelectorAll(".js-key-hideable");
  hidedKeys.forEach(key => key.classList.remove("key--hided"));
  const whiteKeys = document.querySelectorAll(".key--white");
  whiteKeys.forEach(key => key.classList.add("key--white-narrow"));
  const blackKeys = document.querySelectorAll(".key--black");
  blackKeys.forEach(key => key.classList.add("key--black-narrow"));

  updateKbdHints();
  updateSoundHints();
  updateDisabledKeys();
}


export function changeStylesForOneRow() {
  kbdCont.classList.remove("keyboard-cont--double-rows");
  kbdCont.classList.add("keyboard-cont--single-row");

  leftPart.classList.remove("keyboard-cont__item--left-double");
  leftPart.classList.add("keyboard-cont__item--left-single");

  centerPart.classList.remove("keyboard-cont__item--full-double");
  centerPart.classList.add("keyboard-cont__item--full-single");
  
  controlPanel.classList.add("control-panel--single-row");
}


export function changeStylesForTwoRows() {
  kbdCont.classList.remove("keyboard-cont--single-row");
  kbdCont.classList.add("keyboard-cont--double-rows");

  leftPart.classList.remove("keyboard-cont__item--left-single");
  leftPart.classList.add("keyboard-cont__item--left-double");

  centerPart.classList.remove("keyboard-cont__item--full-single");
  centerPart.classList.add("keyboard-cont__item--full-double");
  
  controlPanel.classList.remove("control-panel--single-row");
}


const controlToggleBtn = document.querySelector(".js-control-toggle-btn");
controlToggleBtn.addEventListener("click", function() {
  controlToggleBtn.classList.toggle("control-toggle-btn--rotated");

  if (visualMode === "double") {
    controlPanel.classList.remove("control-panel--hided-bottom")
    controlPanel.classList.toggle("control-panel--hided-right");
  } else {
    controlPanel.classList.remove("control-panel--hided-right");
    controlPanel.classList.toggle("control-panel--hided-bottom");
  }
})