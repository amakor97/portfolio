"use strict";

const helpDialog = document.querySelector(".js-dialog-help");
const helpDialogContent = document.querySelector(".js-dialog-help-content");
const helpDialogToggleBtn = document.querySelector(
  ".js-dialog-help-toggle-btn");
const helpDialogCloseBtn = document.querySelector(
  ".js-dialog-help-close-btn");

const appDialog = document.querySelector(".js-dialog-app");
const appDialogContent = document.querySelector(".js-dialog-app-content");
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


helpDialog.addEventListener("click", () => toggleDialog("help"));
helpDialogContent.addEventListener("click", e => e.stopPropagation());
helpDialogToggleBtn.addEventListener("click", () => toggleDialog("help"));
helpDialogCloseBtn.addEventListener("click", () => toggleDialog("help"));


appDialog.addEventListener("click", () => toggleDialog("app"));
appDialogContent.addEventListener("click", e => e.stopPropagation());

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

appDialogCloseBtn.addEventListener("click", () => toggleDialog("app"));


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


function toggleDialog(dialogName) {
  let toggleBtn = undefined;
  let dialog = undefined;
  
  switch(dialogName) {
    case "help": {
      toggleBtn = helpDialogToggleBtn;
      dialog = helpDialog;
      isHelpModalShowed = !isHelpModalShowed;
      break;
    }
    case "app": {
      toggleBtn = appDialogToggleBtn;
      dialog = appDialog;
      isAppModalShowed = !isAppModalShowed;
      break;
    }
  }

  toggleBtn.classList.toggle("menu__btn--toggled");
  dialog.open = !dialog.open;
}


const btnCtrlLeft = document.querySelector(".js-modal-ctrl-left");
const btnCtrlRight = document.querySelector(".js-modal-ctrl-right");
const helpDialogCarouselInner = document.querySelector(".js-dialog-carousel-inner");

let helpDialogCarouselInnerPos = 0;

btnCtrlLeft.addEventListener("click", updateDialogContentPos.bind(null, "l"));
btnCtrlRight.addEventListener("click", updateDialogContentPos.bind(null, "r"));

function updateDialogContentPos(dir) {
  const pageNum = document.querySelector(".js-modal-page-num");
  moveDialogContent(dir);
  pageNum.textContent = `${helpDialogCarouselInnerPos + 1}`;
}

function moveDialogContent(dir) {
  console.log(dir);
  console.log(helpDialogCarouselInner);
  if ((dir === "r") && (helpDialogCarouselInnerPos < 2)) {
    helpDialogCarouselInnerPos += 1;
  }
  if ((dir === "l") && (helpDialogCarouselInnerPos > 0)) {
    helpDialogCarouselInnerPos -= 1;
  }
  helpDialogCarouselInner.style.transform = 
    `translateX(${-helpDialogCarouselInnerPos * 33.333}%)`;
}