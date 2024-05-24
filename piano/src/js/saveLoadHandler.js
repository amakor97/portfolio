"use strict";

import { setBasicOffset, setAdvancedModeLayouts, setProModeLayouts, 
  activeBasicOffset, advancedModeLayouts, proModeLayouts, 
  updateMode } from "./keyFuncModeSwitcher.js";


const saveToFileBtn = document.querySelector(".js-save-local-file");
const readFromFileBtn = document.querySelector(".js-read-local-file");

//window.onbeforeunload = saveToLs;
//window.onload = readFromLs;
saveToFileBtn.addEventListener("click", saveToFile);
readFromFileBtn.addEventListener("change", readFromFile);


function saveToLs() {
  localStorage.setItem("basic", activeBasicOffset);
  localStorage.setItem("advanced", JSON.stringify(advancedModeLayouts));
  localStorage.setItem("pro", JSON.stringify(proModeLayouts));
}


function readFromLs() {
  if (localStorage.getItem("basic")) {
    setBasicOffset(localStorage.getItem("basic"));
  }
  if (localStorage.getItem("advanced")) {
    setAdvancedModeLayouts(JSON.parse(localStorage.getItem("advanced")));
  }
  if (localStorage.getItem("pro")) {
    setProModeLayouts(JSON.parse(localStorage.getItem("pro")));
  }
  updateMode();
}


function saveToFile() {
  let layouts = {};
  layouts.activeBasicOffset = activeBasicOffset;
  layouts.advancedModeLayouts = advancedModeLayouts;
  layouts.proModeLayouts = proModeLayouts;

  let tmpString = JSON.stringify(layouts);
  let downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(new Blob([tmpString], 
    {type: "application/json"}));
  downloadLink.download = "SimplePianoLayouts.json";
  downloadLink.click();
}


function readFromFile() {
  const file = readFromFileBtn.files[0];
  const reader = new FileReader();

  if (file) {
    reader.readAsText(file);
  }

  reader.addEventListener("load", () => {
    let fileString = reader.result;
    let layouts = JSON.parse(fileString);

    setBasicOffset(layouts.activeBasicOffset);
    setAdvancedModeLayouts(layouts.advancedModeLayouts);
    setProModeLayouts(layouts.proModeLayouts);
    updateMode();
  })
}