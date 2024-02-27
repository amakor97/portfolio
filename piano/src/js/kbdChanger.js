"use strict";

const kbdCont = document.querySelector(".js-keyboard-cont");
const leftPart = document.querySelector(".js-keyboard-left");
const rightPart = document.querySelector(".js-keyboard-right");
const centerPart = document.querySelector(".js-keyboard-center");
const toggleModeBtn = document.querySelector(".js-toggle-visual-mode-btn");

let doubleRowsMode = true;

toggleModeBtn.addEventListener("click", toggleVisualMode);

function toggleVisualMode() {
  doubleRowsMode = !doubleRowsMode;

  if (doubleRowsMode) {
    changeStylesForTwoRows();
  } else {
    changeStylesForOneRow();
  }
}

function changeStylesForOneRow() {
  kbdCont.classList.remove("keyboard-grid--double-rows");
  kbdCont.classList.add("keyboard-grid--single-row");

  leftPart.classList.remove("keyboard-grid__item--left-double");
  leftPart.classList.add("keyboard-grid__item--left-single");

  rightPart.classList.remove("keyboard-grid__item--right-double");
  rightPart.classList.add("keyboard-grid__item--right-single");

  centerPart.classList.remove("keyboard-grid__item--full-double");
  centerPart.classList.add("keyboard-grid__item--full-single");
}

function changeStylesForTwoRows() {
  kbdCont.classList.remove("keyboard-grid--single-row");
  kbdCont.classList.add("keyboard-grid--double-rows");

  leftPart.classList.remove("keyboard-grid__item--left-single");
  leftPart.classList.add("keyboard-grid__item--left-double");

  rightPart.classList.remove("keyboard-grid__item--right-single");
  rightPart.classList.add("keyboard-grid__item--right-double");

  centerPart.classList.remove("keyboard-grid__item--full-single");
  centerPart.classList.add("keyboard-grid__item--full-double");
}