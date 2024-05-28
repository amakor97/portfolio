"use strict";


import { updateVisualHints, updateSoundHints, restoreKbdHints, 
  updateDisabledKeys  } from "./hintsUpdater.js";
import { isEditModeActive, setEditMode, 
  editModeToggler, setPressedOctaveName } from "./keyFuncModeSwitcher.js";
import { resetClickedProKeyElem} from "./clickFuncModeSwitcher.js";
import { resetClickedVisualProKeyElem } from "./possibleKeysShower.js";

export let visualMode = "double";
export const noteInputCont = document.querySelector(
  ".js-control-note-input-cont");

const visualModeSelectors = document.querySelectorAll(
  "input[name='select-visual-mode']");
const controlToggleBtn = document.querySelector(
  ".js-control-toggle-btn");


visualModeSelectors.forEach(input => {
  input.addEventListener("change", () => {
    if (input.checked) {
      visualMode = input.value;
    }
    toggleVisualMode();
  })
})


function toggleVisualMode() {
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


function changeStylesForOneRow() {
  const kbdCont = document.querySelector(".js-keyboard-cont");
  const leftPart = document.querySelector(".js-keyboard-left");
  const centerPart = document.querySelector(".js-keyboard-center");
  const controlPanel = document.querySelector(".js-control-panel");

  kbdCont.classList.remove("keyboard-cont--double-rows");
  kbdCont.classList.add("keyboard-cont--single-row");

  leftPart.classList.remove("keyboard-cont__item--left-double");
  leftPart.classList.add("keyboard-cont__item--left-single");

  centerPart.classList.remove("keyboard-cont__item--full-double");
  centerPart.classList.add("keyboard-cont__item--full-single");
  
  controlPanel.classList.add("control-panel--single-row");
}


function changeStylesForTwoRows() {
  const kbdCont = document.querySelector(".js-keyboard-cont");
  const leftPart = document.querySelector(".js-keyboard-left");
  const centerPart = document.querySelector(".js-keyboard-center");
  const controlPanel = document.querySelector(".js-control-panel");

  kbdCont.classList.remove("keyboard-cont--single-row");
  kbdCont.classList.add("keyboard-cont--double-rows");

  leftPart.classList.remove("keyboard-cont__item--left-single");
  leftPart.classList.add("keyboard-cont__item--left-double");

  centerPart.classList.remove("keyboard-cont__item--full-single");
  centerPart.classList.add("keyboard-cont__item--full-double");
  
  controlPanel.classList.remove("control-panel--single-row");
}


function updateFullKbd() {
  if ((visualMode === "full") || isEditModeActive) {
    showFullKbd();
  } else {
    hideFullKbd();
  }
}


function showFullKbd() {
  const kbdCont = document.querySelector(".js-keyboard-cont");
  const hidedKeys = document.querySelectorAll(".js-key-hideable");
  const whiteKeys = document.querySelectorAll(".key--white");
  const blackKeys = document.querySelectorAll(".key--black");

  kbdCont.classList.add("keyboard-cont--full-kbd");
  hidedKeys.forEach(key => key.classList.remove("key--hided"));
  whiteKeys.forEach(key => key.classList.add("key--white-narrow"));
  blackKeys.forEach(key => key.classList.add("key--black-narrow"));

  updateVisualHints();
}


function hideFullKbd() {
  const kbdCont = document.querySelector(".js-keyboard-cont");
  const hidedKeys = document.querySelectorAll(".js-key-hideable");
  const whiteKeys = document.querySelectorAll(".key--white");
  const blackKeys = document.querySelectorAll(".key--black");

  kbdCont.classList.remove("keyboard-cont--full-kbd");
  hidedKeys.forEach(key => key.classList.add("key--hided"));
  whiteKeys.forEach(key => key.classList.remove("key--white-narrow"));
  blackKeys.forEach(key => key.classList.remove("key--black-narrow"));

  updateSoundHints();
  restoreKbdHints();
  updateDisabledKeys();
}


controlToggleBtn.addEventListener("click", function() {
  const controlPanel = document.querySelector(".js-control-panel");
  controlToggleBtn.classList.toggle("menu__btn--toggled");

  if (isEditModeActive && visualMode === "double") {
    const allKeyElems = document.querySelectorAll(".key");

    setEditMode(false);
    setPressedOctaveName(undefined);
    resetClickedProKeyElem();
    resetClickedVisualProKeyElem();
    editModeToggler.checked = false;
    controlPanel.classList.remove("control-panel--single-row");

    allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
    allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
    updateVisualMode(isEditModeActive);
  }

  if (isEditModeActive && visualMode !== "double") {
    const allKeyElems = document.querySelectorAll(".key");

    setEditMode(false);
    setPressedOctaveName(undefined);
    resetClickedProKeyElem();
    resetClickedVisualProKeyElem();
    editModeToggler.checked = false;

    allKeyElems.forEach(keyElem => keyElem.classList.remove("key--prev"));
    allKeyElems.forEach(keyElem => keyElem.classList.remove("key--next"));
    updateVisualMode(isEditModeActive);
  }

  if (visualMode === "double") {
    controlPanel.classList.remove("control-panel--hided-bottom")
    controlPanel.classList.toggle("control-panel--hided-right");
  } else {
    controlPanel.classList.remove("control-panel--hided-right");
    controlPanel.classList.toggle("control-panel--hided-bottom");
  }
})


export function updateVisualMode(isEditModeActive) {
  if (isEditModeActive) {
    changeStylesForOneRow();
    showFullKbd();
    updateVisualHints();
  } else {
    switch(visualMode) {
      case "double": {
        changeStylesForTwoRows();
        hideFullKbd();
        break;
      }
      case "single": {
        hideFullKbd();
        break;
      }
      case "full": {
        break;
      }
    }
  }
}