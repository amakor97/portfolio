"use strict";

import { setBasicOffset, setAdvancedModeLayouts, setProModeLayouts, 
  activeBasicOffset, advancedModeLayouts, proModeLayouts, 
  updateMode } from "./functionalModeSwitcher.js";

const saveToLsBtn = document.querySelector(".js-save-local-storage");
const readFromLsBtn = document.querySelector(".js-read-local-storage");

saveToLsBtn.addEventListener("click", saveToLs);
function saveToLs() {
  console.log(activeBasicOffset);
  console.log(advancedModeLayouts);
  console.log(proModeLayouts);
  localStorage.setItem("basic", activeBasicOffset);
  localStorage.setItem("adv", JSON.stringify(advancedModeLayouts));
  localStorage.setItem("pro", JSON.stringify(proModeLayouts));
}

readFromLsBtn.addEventListener("click", readFromLs);
function readFromLs() {
  setBasicOffset(localStorage.getItem("basic"));
  setAdvancedModeLayouts(JSON.parse(localStorage.getItem("adv")));
  setProModeLayouts(JSON.parse(localStorage.getItem("pro")));
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
  console.log(tmpObj);

  let tmpString = JSON.stringify(tmpObj);
  console.log(tmpString);

  let tmpLink = document.createElement("a");
  tmpLink.href = window.URL.createObjectURL(new Blob([tmpString], 
    {type: "application/json"}));
  tmpLink.download = "SimplePianoLayouts.txt";
  tmpLink.click();
}