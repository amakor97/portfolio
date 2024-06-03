"use strict";

const helpDialog = document.querySelector(".js-dialog-help");
const helpDialogToggleBtn = document.querySelector(
  ".js-dialog-help-toggle-btn");
const helpDialogCloseBtn = document.querySelector(
  ".js-dialog-help-close-btn");
const appDialog = document.querySelector(".js-dialog-app");
const appDialogToggleBtn = document.querySelector(
  ".js-dialog-app-toggle-btn");
const appDialogCloseBtn = document.querySelector(
  ".js-dialog-app-close-btn");


let isHelpModalShowed = false;
let isAppModalShowed = false;

helpDialogToggleBtn.addEventListener("click", function() {
  if (isHelpModalShowed) {
    helpDialogToggleBtn.classList.remove("menu__btn--toggled");
    helpDialog.open = false;
  } else {
    helpDialogToggleBtn.classList.add("menu__btn--toggled");
    helpDialog.open = true;
  }
  
  isHelpModalShowed = !isHelpModalShowed;
})

helpDialogCloseBtn.addEventListener("click", function() {
  helpDialogToggleBtn.classList.remove("menu__btn--toggled");
  helpDialog.open = false;
  isHelpModalShowed = false;
})


appDialogToggleBtn.addEventListener("click", () => {
  if (isAppModalShowed) {
    appDialogToggleBtn.classList.remove("menu__btn--toggled");
    appDialog.open = false;
  } else {
    appDialogToggleBtn.classList.add("menu__btn--toggled");
    appDialog.open = true;
  }

  isAppModalShowed = !isAppModalShowed;
})

appDialogCloseBtn.addEventListener("click", () => {
  appDialogToggleBtn.classList.remove("menu__btn--toggled");
  appDialog.open = false;
  isAppModalShowed = false;
})
