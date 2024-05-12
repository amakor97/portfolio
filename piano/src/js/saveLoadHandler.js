"use strict";

import { setBasicOffset, setAdvancedModeLayouts, setProModeLayouts, 
  activeBasicOffset, advancedModeLayouts, proModeLayouts, 
  updateMode } from "./keyFuncModeSwitcher.js";

const saveToLsBtn = document.querySelector(".js-save-local-storage");
const readFromLsBtn = document.querySelector(".js-read-local-storage");

//window.onbeforeunload = saveToLs;
function saveToLs() {
  localStorage.setItem("basic", activeBasicOffset);
  localStorage.setItem("adv", JSON.stringify(advancedModeLayouts));
  localStorage.setItem("pro", JSON.stringify(proModeLayouts));
}

//window.onload = readFromLs;
function readFromLs() {
  if (localStorage.getItem("basic")) {
    setBasicOffset(localStorage.getItem("basic"));
  }
  if (localStorage.getItem("adv")) {
    setAdvancedModeLayouts(JSON.parse(localStorage.getItem("adv")));
  }
  if (localStorage.getItem("pro")) {
    setProModeLayouts(JSON.parse(localStorage.getItem("pro")));
  }
  updateMode();
}


const saveToFileBtn = document.querySelector(".js-save-local-file");
const readFromFileBtn = document.querySelector(".js-read-local-file");

saveToFileBtn.addEventListener("click", saveToFile);
function saveToFile() {
  let tmpObj = {};
  tmpObj.activeBasicOffset = activeBasicOffset;
  tmpObj.advancedModeLayouts = advancedModeLayouts;
  tmpObj.proModeLayouts = proModeLayouts;

  let tmpString = JSON.stringify(tmpObj);
  let tmpLink = document.createElement("a");
  tmpLink.href = window.URL.createObjectURL(new Blob([tmpString], 
    {type: "application/json"}));
  tmpLink.download = "SimplePianoLayouts.json";
  tmpLink.click();
}

readFromFileBtn.addEventListener("change", readFromFile);
function readFromFile() {
  const file = readFromFileBtn.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    let fileString = reader.result;
    let jsonObj = JSON.parse(fileString);

    setBasicOffset(jsonObj.activeBasicOffset);
    setAdvancedModeLayouts(jsonObj.advancedModeLayouts);
    setProModeLayouts(jsonObj.proModeLayouts);
    updateMode();
  })

  if (file) {
    reader.readAsText(file);
  }
}