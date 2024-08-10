"use strict";

const settings = {};


const btnsLang = document.querySelectorAll(".js-settings-lang-input");
btnsLang.forEach(btn => {
  btn.addEventListener("input", () => {
    settings.lang = btn.value;
    saveSettingsToLS();
  })
});


const btnsStyle = document.querySelectorAll(".js-settings-style-input");
btnsStyle.forEach(btn => {
  btn.addEventListener("input", () => {
    settings.style = btn.value;
    saveSettingsToLS();
  })
})


const btnIntro = document.querySelector(".js-settings-intro-input");
btnIntro.addEventListener("input", () => {
  settings.showIntro = btnIntro.checked;
})


const btnHint = document.querySelector(".js-settings-hint-input");
btnHint.addEventListener("input", () => {
  settings.showHint = btnHint.checked;
})


window.addEventListener("load", () => {
  readSettingsFromLS();
  initSetInputs();
});
window.addEventListener("beforeunload", saveSettingsToLS);


function readSettingsFromLS() {
  const settingsStr = localStorage.getItem("settings");
  const settingsFromLs = JSON.parse(settingsStr) ?? {};

  if (!settingsFromLs.lang) {
    settingsFromLs.lang = "en";
  }
  if (!settingsFromLs.style) {
    settingsFromLs.style = "classic";
  }
  if (!settingsFromLs.showIntro) {
    settingsFromLs.showIntro = true;
  }
  if (!settingsFromLs.showHint) {
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