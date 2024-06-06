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

const aboutDialog = document.querySelector(".js-dialog-about");
const aboutDialogToggleBtn = document.querySelector(
  ".js-dialog-about-toggle-btn");
const aboutDialogCloseBtn = document.querySelector(
  ".js-dialog-about-close-btn");

let isHelpModalShowed = false;
let isAppModalShowed = false;
let isAboutModalShowed = false;


helpDialog.addEventListener("click", () => closeDialog("help"));

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

function closeDialog(dialogName) {
  switch(dialogName) {
    case "help": {
      helpDialogToggleBtn.classList.remove("menu__btn--toggled");
      helpDialog.open = false;
      isHelpModalShowed = false;
      break;
    }
  }
}

helpDialogCloseBtn.addEventListener("click", () => closeDialog("help"));

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


aboutDialogToggleBtn.addEventListener("click", function() {
  if (isAboutModalShowed) {
    aboutDialogToggleBtn.classList.remove("menu__btn--toggled");
    aboutDialog.open = false;
  } else {
    aboutDialogToggleBtn.classList.add("menu__btn--toggled");
    aboutDialog.open = true;
  }
  
  isAboutModalShowed = !isAboutModalShowed;
})

aboutDialogCloseBtn.addEventListener("click", function() {
  aboutDialogToggleBtn.classList.remove("menu__btn--toggled");
  aboutDialog.open = false;
  isAboutModalShowed = false;
})