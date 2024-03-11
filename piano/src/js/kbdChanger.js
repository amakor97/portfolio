"use strict";
export let fullKbdMode = false;
export let doubleRowsMode = true;

import { updateDisabledKeys } from "./kbdHandler.js";
import { updateKbdHints } from "./kbdHandler.js";
import { restoreKbdHints } from "./kbdHandler.js";

const kbdCont = document.querySelector(".js-keyboard-cont");
const leftPart = document.querySelector(".js-keyboard-left");
const rightPart = document.querySelector(".js-keyboard-right");
const centerPart = document.querySelector(".js-keyboard-center");
const toggleModeBtn = document.querySelector(".js-toggle-visual-mode-btn");
const toggleFullKbdBtn = document.querySelector(".js-toggle-full-keyboard-btn");




toggleModeBtn.addEventListener("click", toggleVisualMode);
toggleFullKbdBtn.addEventListener("click", toggleFullKbd);


function toggleVisualMode() {
  doubleRowsMode = !doubleRowsMode;

  if (doubleRowsMode) {
    changeStylesForTwoRows();
  } else {
    changeStylesForOneRow();
  }

  updateFullKbd();
}

function toggleFullKbd() {
  if ((doubleRowsMode === false)) {
    fullKbdMode = !fullKbdMode;
    console.log("chg fkm", {fullKbdMode});
  }
  updateFullKbd();
}


function updateFullKbd() {
  console.log("updating fkb");
  console.log("current", {fullKbdMode});
  if ((fullKbdMode) && (!doubleRowsMode)){
    showFullKbd();
  } else {
    hideFullKbd();
  }
}

function hideFullKbd() {
  kbdCont.classList.remove("keyboard-cont--full-kbd");

  const hidedKeys = document.querySelectorAll(".js-key-hideable");
  hidedKeys.forEach(key => key.classList.add("key--hided"));

  const whiteKeys = document.querySelectorAll(".key--white");
  whiteKeys.forEach(key => key.classList.remove("key--white-narrow"));

  const blackKeys = document.querySelectorAll(".key--black");
  blackKeys.forEach(key => key.classList.remove("key--black-narrow"));

  updateDisabledKeys();
  //updateKbdHints();
  restoreKbdHints();
}


function showFullKbd() {
  console.log("showing");

  kbdCont.classList.add("keyboard-cont--full-kbd");

  const hidedKeys = document.querySelectorAll(".js-key-hideable");
  hidedKeys.forEach(key => key.classList.remove("key--hided"));

  const whiteKeys = document.querySelectorAll(".key--white");
  whiteKeys.forEach(key => key.classList.add("key--white-narrow"));

  const blackKeys = document.querySelectorAll(".key--black");
  blackKeys.forEach(key => key.classList.add("key--black-narrow"));

  updateDisabledKeys();
  updateKbdHints();
}

function changeStylesForOneRow() {
  kbdCont.classList.remove("keyboard-cont--double-rows");
  kbdCont.classList.add("keyboard-cont--single-row");

  leftPart.classList.remove("keyboard-cont__item--left-double");
  leftPart.classList.add("keyboard-cont__item--left-single");

  //rightPart.classList.remove("keyboard-cont__item--right-double");
  //rightPart.classList.add("keyboard-cont__item--right-single");

  centerPart.classList.remove("keyboard-cont__item--full-double");
  centerPart.classList.add("keyboard-cont__item--full-single");
}

function changeStylesForTwoRows() {
  kbdCont.classList.remove("keyboard-cont--single-row");
  kbdCont.classList.add("keyboard-cont--double-rows");

  leftPart.classList.remove("keyboard-cont__item--left-single");
  leftPart.classList.add("keyboard-cont__item--left-double");

  //rightPart.classList.remove("keyboard-cont__item--right-single");
  //rightPart.classList.add("keyboard-cont__item--right-double");

  centerPart.classList.remove("keyboard-cont__item--full-single");
  centerPart.classList.add("keyboard-cont__item--full-double");
}