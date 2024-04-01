"use strict";


export let fullKbdMode = false;
export let doubleRowsMode = true;

import { updateSoundHints, updateKbdHints, 
  restoreKbdHints, updateDisabledKeys } from "./hintsUpdater.js";

const kbdCont = document.querySelector(".js-keyboard-cont");
const leftPart = document.querySelector(".js-keyboard-left");
const centerPart = document.querySelector(".js-keyboard-center");
const toggleModeBtn = document.querySelector(".js-toggle-visual-mode-btn");
const toggleFullKbdBtn = document.querySelector(".js-toggle-full-keyboard-btn");
const controlPanel = document.querySelector(".js-control-panel");

export const assignModeCont = document.querySelector(".js-control-assign-mode-cont");
export const noteInputCont = document.querySelector(".js-control-note-input-cont");

toggleModeBtn.addEventListener("click", toggleVisualMode);
toggleFullKbdBtn.addEventListener("click", toggleFullKbd);


export function toggleVisualMode() {
  doubleRowsMode = !doubleRowsMode;

  if (doubleRowsMode) {
    changeStylesForTwoRows();
  } else {
    changeStylesForOneRow();
  }
  updateFullKbd();
}


export function toggleFullKbd() {
  if ((doubleRowsMode === false)) {
    fullKbdMode = !fullKbdMode;
  }
  updateFullKbd();
}


function updateFullKbd() {
  if ((fullKbdMode) && (!doubleRowsMode)){
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

  if (doubleRowsMode) {
    controlPanel.classList.remove("control-panel--hided-bottom")
    if (controlPanel.classList.contains("control-panel--hided-right")) {
      controlPanel.classList.remove("control-panel--hided-right");
    } else {
      controlPanel.classList.add("control-panel--hided-right");
    }
  } else {
    controlPanel.classList.remove("control-panel--hided-right");
    if (controlPanel.classList.contains("control-panel--hided-bottom")) {
      controlPanel.classList.remove("control-panel--hided-bottom");
    } else {
      controlPanel.classList.add("control-panel--hided-bottom");
    }
  }
})