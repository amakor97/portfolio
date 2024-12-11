"use strict";

const helpDialog = document.querySelector(
  ".js-dialog-help");
const helpDialogContent = document.querySelector(
  ".js-dialog-help-content");
const helpDialogToggleBtn = document.querySelector(
  ".js-dialog-help-toggle-btn");
const helpDialogCloseBtn = document.querySelector(
  ".js-dialog-help-close-btn");

const appDialog = document.querySelector(
  ".js-dialog-app");
const appDialogContent = document.querySelector(
  ".js-dialog-app-content");
const appDialogToggleBtn = document.querySelector(
  ".js-dialog-app-toggle-btn");
const appDialogCloseBtn = document.querySelector(
  ".js-dialog-app-close-btn");

const aboutDialog = document.querySelector(
  ".js-dialog-about");
const aboutDialogContent = document.querySelector(
  ".js-dialog-about-content");
const aboutDialogToggleBtn = document.querySelector(
  ".js-dialog-about-toggle-btn");
const aboutDialogCloseBtn = document.querySelector(
  ".js-dialog-about-close-btn");

export const recorderDialog = document.querySelector(
  ".js-dialog-recorder");
const recorderDialogContent = document.querySelector(
  ".js-dialog-recorder-content");
const recorderDialogToggleBtn = document.querySelector(
  ".js-dialog-recorder-toggle-btn");


export const metronomeDialog = document.querySelector(
  ".js-dialog-metronome");
const metronomeDialogContent = document.querySelector(
  ".js-dialog-metronome-content");
const metronomeDialogToggleBtn = document.querySelector(
  ".js-dialog-metronome-toggle-btn");

let isHelpModalShowed = false;
let isAppModalShowed = false;
let isRecorderModalShowed = false;
let isMetronomeModalShowed = false;
let isAboutModalShowed = false;


helpDialog.addEventListener("click", () => toggleDialog("help"));
helpDialogContent.addEventListener("click", e => e.stopPropagation());
helpDialogToggleBtn.addEventListener("click", () => toggleDialog("help"));
helpDialogCloseBtn.addEventListener("click", () => toggleDialog("help"));

appDialog.addEventListener("click", () => toggleDialog("app"));
appDialogContent.addEventListener("click", e => e.stopPropagation());
appDialogToggleBtn.addEventListener("click", () => toggleDialog("app"));
appDialogCloseBtn.addEventListener("click", () => toggleDialog("app"));

//recorderDialog.addEventListener("click", () => toggleDialog("recorder"));
recorderDialogContent.addEventListener("click", e => e.stopPropagation());
recorderDialogToggleBtn.addEventListener("click", () => toggleDialog("recorder"));

metronomeDialogContent.addEventListener("click", e => e.stopPropagation());
metronomeDialogToggleBtn.addEventListener("click", () => toggleDialog("metronome"));

aboutDialog.addEventListener("click", () => toggleDialog("about"));
aboutDialogContent.addEventListener("click", e => e.stopPropagation());
aboutDialogToggleBtn.addEventListener("click", () => toggleDialog("about"));
aboutDialogCloseBtn.addEventListener("click", () => toggleDialog("about"));


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
    case "recorder": {
      toggleBtn = recorderDialogToggleBtn;
      dialog = recorderDialog;
      isRecorderModalShowed = !isRecorderModalShowed;
      break;
    }
    case "metronome": {
      toggleBtn = metronomeDialogToggleBtn;
      dialog = metronomeDialog;
      isMetronomeModalShowed = !isMetronomeModalShowed;
      break;
    }
    case "about": {
      toggleBtn = aboutDialogToggleBtn;
      dialog = aboutDialog;
      isAboutModalShowed = !isAboutModalShowed;
      break;
    }
  }

  toggleBtn.classList.toggle("menu__btn--toggled");
  dialog.open = !dialog.open;
}


const btnCtrlLeft = document.querySelector(
  ".js-modal-ctrl-left");
const btnCtrlRight = document.querySelector(
  ".js-modal-ctrl-right");
const helpDialogCarouselInner = document.querySelector(
  ".js-dialog-carousel-inner");

let helpDialogCarouselInnerPos = 0;

btnCtrlLeft.addEventListener("click", updateDialogContentPos.bind(null, "l"));
btnCtrlRight.addEventListener("click", updateDialogContentPos.bind(null, "r"));


function updateDialogContentPos(dir) {
  const pageNum = document.querySelector(".js-modal-page-num");
  moveDialogContent(dir);
  pageNum.textContent = `${helpDialogCarouselInnerPos + 1}`;
}


function moveDialogContent(dir) {
  if ((dir === "r") && (helpDialogCarouselInnerPos < 2)) {
    helpDialogCarouselInnerPos += 1;
  }
  if ((dir === "l") && (helpDialogCarouselInnerPos > 0)) {
    helpDialogCarouselInnerPos -= 1;
  }
  helpDialogCarouselInner.style.transform = 
    `translateX(${-helpDialogCarouselInnerPos * 33.333}%)`;
}


export const introSimpleDialog = document.querySelector(
  ".js-dialog-intro-simple");
setTimeout(() => {
  introSimpleDialog.classList.remove("intro__text--hided");
}, 1000);
setTimeout(() => {
  introSimpleDialog.classList.add("intro__text--fading");
}, 2000);

export const introPowerfulDialog = document.querySelector(
  ".js-dialog-intro-powerful");
setTimeout(() => {
  introPowerfulDialog.classList.remove("intro__text--hided");
}, 3000);
setTimeout(() => {
  introPowerfulDialog.classList.add("intro__text--fading");
}, 4000);

export const introPianoDialog = document.querySelector(
  ".js-dialog-intro-piano");
setTimeout(() => {
  introPianoDialog.classList.remove("intro__text--hided");
}, 5000);
setTimeout(() => {
  introPianoDialog.classList.add("intro__text--fading");
}, 6000);

export const introDialog = document.querySelector(
  ".js-dialog-intro");
setTimeout(() => {
  introDialog.classList.add("intro--fading");
}, 7000);
setTimeout(() => {
  introDialog.open = false;
}, 8000);



export const hintDialog = document.querySelector(".js-dialog-hint");
const hintDialogContent = document.querySelector(".js-dialog-hint-content");
const hintDialogCloseBtn = document.querySelector(
  ".js-dialog-hint-close-btn");


hintDialog.addEventListener("click", () => hintDialog.open = false);
hintDialogContent.addEventListener("click", e => e.stopPropagation());
hintDialogCloseBtn.addEventListener("click", () => hintDialog.open = false);