"use strict";

import { setLang } from "./tranlator.js";

const settings = {};

import { introDialog, hintDialog } from "./dialogHandlers.js";


const btnsLang = document.querySelectorAll(".js-settings-lang-input");
btnsLang.forEach(btn => {
  btn.addEventListener("input", () => {
    settings.lang = btn.value;

    setLang(settings.lang);

    saveSettingsToLS();
  })
});


const btnsStyle = document.querySelectorAll(".js-settings-style-input");
btnsStyle.forEach(btn => {
  btn.addEventListener("input", () => {
    settings.style = btn.value;

    setStyles();

    saveSettingsToLS();
  })
})


const btnIntro = document.querySelector(".js-settings-intro-input");
btnIntro.addEventListener("input", () => {
  settings.showIntro = btnIntro.checked;
  console.log(settings);
  saveSettingsToLS();
})


const btnHint = document.querySelector(".js-settings-hint-input");
btnHint.addEventListener("input", () => {
  settings.showHint = btnHint.checked;
  saveSettingsToLS();
})


const stylesLink = document.querySelector("#stylesLink");
console.log(stylesLink);

window.addEventListener("load", () => {
  readSettingsFromLS();
  initSetInputs();
  setLang(settings.lang);
  setStyles();
  setIntro();
  setHint();
});
window.addEventListener("beforeunload", saveSettingsToLS);

function setStyles() {
  if (settings.style === "classic") {
    stylesLink.href = "pianoStylesClassic.css";
  }
  if (settings.style === "original") {
    stylesLink.href = "pianoStylesOriginal.css";
  }
}


function setIntro() {
  const body = document.querySelector(".body");
  body.classList.add("body--content-visible");
  if (settings.showIntro === false) {
    introDialog.open = false;
    //introSimpleDialog.open = false;
    //introPowerfulDialog.open = false;
    //introPianoDialog.open = false;
  }
}


function setHint() {
  if (settings.showHint === false) {
    hintDialog.open = false;
  }
}


function readSettingsFromLS() {
  const settingsStr = localStorage.getItem("settings");
  const settingsFromLs = JSON.parse(settingsStr) ?? {};

  if (!Object.hasOwn(settingsFromLs, "lang")) {
    settingsFromLs.lang = "en";
  }
  if (!Object.hasOwn(settingsFromLs, "style")) {
    settingsFromLs.style = "classic";
  }

  if (!Object.hasOwn(settingsFromLs, "showIntro")) {
    settingsFromLs.showIntro = true;
  }
  if (!Object.hasOwn(settingsFromLs, "showHint")) {
    settingsFromLs.showHint = true;
  }

  Object.assign(settings, settingsFromLs);
}

function saveSettingsToLS() {
  const settingsStr = JSON.stringify(settings);
  localStorage.setItem("settings", settingsStr);
}


function initSetInputs() {
  if (settings.lang === "en") {
    const inp = document.querySelector("#id-input-lang-en");
    inp.checked = true;
  }
  if (settings.lang === "ru") {
    const inp = document.querySelector("#id-input-lang-ru");
    inp.checked = true;
  }

  if (settings.style === "classic") {
    const inp = document.querySelector("#id-input-style-classic");
    inp.checked = true;
  }
  if (settings.style === "original") {
    const inp = document.querySelector("#id-input-style-original");
    inp.checked = true;
  }

  if (settings.showIntro === true) {
    btnIntro.checked = true;
  }
  if (settings.showHint === true) {
    btnHint.checked = true;
  }
}