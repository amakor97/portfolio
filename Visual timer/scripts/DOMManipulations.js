"use strict";

const wrapper = document.querySelector(".timers-wrapper");


import { showAddTimerWindow } from "./app.js";
//import { getTimerIndex } from "./app.js";
import { pauseHandler } from "./app.js";
import { deleteTimer } from "./app.js";
import { timerData } from "./app.js";

export function createEmptyTimer() {
  let newTimer = document.createElement("article");
  newTimer.classList.add("timer", "timer--intro-layout");
  wrapper.appendChild(newTimer);
  return newTimer;
}


export function fillEmptyTimer(emptyTimer) {
  let addTimerBtn = document.createElement("button");
  addTimerBtn.classList.add("timer__add-timer-btn", "js-add-timer-btn");
  addTimerBtn.textContent = "+";
  addTimerBtn.addEventListener("click", showAddTimerWindow);

  emptyTimer.appendChild(addTimerBtn);
  
  let introText = document.createElement("p");
  introText.classList.add("timer__text-intro");
  introText.textContent = "Add new timer";
  emptyTimer.appendChild(introText);
}


function createLabel(text, forAttrValue) {
  let label = document.createElement("label");
  label.textContent = text;
  let forAttr = document.createAttribute("for");
  forAttr.value = forAttrValue;
  label.setAttributeNode(forAttr);
  return label;
}


function createInput(type, name, id, isChecked, isDisabled) {
  let input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;
  input.checked = isChecked;
  input.disabled = isDisabled;
  return input;
}


export function fillSettingUpTimer(settingUpTimer) {
  clearChilds(settingUpTimer);
  settingUpTimer.classList.remove("timer--intro-layout");

  let addForm = document.createElement("form");
  addForm.classList.add("timer__add-window", "add-form");

  
  let startFieldset = document.createElement("fieldset");
  startFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(startFieldset);

  let startTypeFieldset = document.createElement("fieldset");
  startTypeFieldset.classList.add("add-form__fieldset");
  startFieldset.appendChild(startTypeFieldset);

  
  let startTypeLabel1 = createLabel("Start now", "startType1");
  //startTypeLabel1.classList.add("");
  startTypeFieldset.appendChild(startTypeLabel1);
  let startTypeInput1 = createInput("radio", "startType", "startType1", 
  true, false);
  startTypeLabel1.appendChild(startTypeInput1);
  
  
  let startTypeLabel2 = createLabel("Presice start time", "startType2");
  //startTypeLabel2.classList.add("");
  startTypeFieldset.appendChild(startTypeLabel2);
  let startTypeInput2 = createInput("radio", "startType", "startType2", 
  false, false);
  startTypeLabel2.appendChild(startTypeInput2);
  
  
  startTypeFieldset = document.createElement("fieldset");
  startTypeFieldset.classList.add("add-form__fieldset");
  startFieldset.appendChild(startTypeFieldset);

  
  let inputStartLabel = createLabel("Please, enter start datetime", 
  "inputStartDatetime");
  inputStartLabel.classList.add("add-form__label--hidden");
  startTypeFieldset.appendChild(inputStartLabel);
  let inputStartTime = createInput("datetime-local", "startTime", 
  "inputStartDatetime", false, true);
  inputStartTime.classList.add("add-form__input-time", 
  "add-form__input--hidden", "js-input-start-time");
  inputStartLabel.appendChild(inputStartTime);

  
  let finishFieldset = document.createElement("fieldset");
  finishFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(finishFieldset);


  let finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  finishFieldset.appendChild(finishTypeFieldset);

  
  let inputFinishType1Label = createLabel("Amount of seconds", "finishType1");
  //inputFinishTypeLabel1.classList.add("");
  finishTypeFieldset.appendChild(inputFinishType1Label);
  let inputFinishType1 = createInput("radio", "finishType", "finishType1", 
  true, false);
  //inputFinishType1.classList.add("");
  inputFinishType1Label.appendChild(inputFinishType1);

  
  let inputFinishType2Label = createLabel("Amount of different units", 
  "finishType2");
  //inputFinishType2Label.classList.add("");
  finishTypeFieldset.appendChild(inputFinishType2Label);
  let inputFinishType2 = createInput("radio", "finishType", "finishType2", 
  false, false);
  //inputFinishType2.classList.add("");
  inputFinishType2Label.appendChild(inputFinishType2);

  
  let inputFinishType3Label = createLabel("Precise finish time", "finishType3");
  //inputFinishType3Label.classList.add("");
  finishTypeFieldset.appendChild(inputFinishType3Label);
  let inputFinishType3 = createInput("radio", "finishType", "finishType3", 
  false, false);
  //inputFinishType3.classList.add("");
  inputFinishType3Label.appendChild(inputFinishType3);


  finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  finishFieldset.appendChild(finishTypeFieldset);

  
  let inputNumberLabel = createLabel("Please, enter the amount of seconds", 
  "InputOnlySecondsAmount");
  //inputNumberLabel.classList.add("");
  finishTypeFieldset.appendChild(inputNumberLabel);
  let inputNumber = createInput("number", "onlySecsInput", 
  "InputOnlySecondsAmount", false, false);
  inputNumber.classList.add("add-form__input-time", "js-input-number");
  inputNumber.min = "0";
  inputNumberLabel.appendChild(inputNumber);


  let timeUnitsFieldset = document.createElement("fieldset");
  timeUnitsFieldset.classList.add("add-form__fieldset", "add-form__fieldset--hidden", "add-form__fieldset--days");
  finishTypeFieldset.appendChild(timeUnitsFieldset);

  
  let inputDaysLabel = createLabel("Days", "InputDaysAmount");
  //inputDaysLabel.classList.add("");
  timeUnitsFieldset.appendChild(inputDaysLabel);

  let inputDays = createInput("number", "inputDays", "InputDaysAmount", 
  false, true);
  inputDays.classList.add("add-form__input-amount", "js-input-days");
  inputDays.min = "0";
  inputDays.addEventListener("input", function() {
    if (this.value < 0) {
      this.value = 0;
    }
  })
  inputDaysLabel.appendChild(inputDays);

  
  let inputHoursLabel = createLabel("Hours", "InputHoursAmount");
  //inputHoursLabel.classList.add("");
  timeUnitsFieldset.appendChild(inputHoursLabel); 
  
  let inputHours = createInput("number", "InputHours", "InputHoursAmount", 
  false, true);
  inputHours.classList.add("add-form__input-amount", "js-input-hours");
  inputHours.min = "0";
  inputHours.max = "23";
  inputHours.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputHoursLabel.appendChild(inputHours);
  

  let inputMinsLabel = createLabel("Mins", "InputMinsAmount");
  //inputMinsLabel.classList.add("");
  timeUnitsFieldset.appendChild(inputMinsLabel);
  
  let inputMins = createInput("number", "InputMins", "InputMinsAmount", 
  false, true);
  inputMins.classList.add("add-form__input-amount", "js-input-mins");
  inputMins.min = "0";
  inputMins.max = "59";
  inputMins.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputMinsLabel.appendChild(inputMins);


  let inputSecsLabel = createLabel("Secs", "InputSecsAmount");
  //inputSecsLabel.classList.add("");
  timeUnitsFieldset.appendChild(inputSecsLabel);
  
  let inputSecs = createInput("number", "InputSecs", "InputSecsAmount", 
  false, true);
  inputSecs.classList.add("add-form__input-amount", "js-input-secs");
  inputSecs.min = "0";
  inputSecs.max = "59";
  inputSecs.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputSecsLabel.appendChild(inputSecs);

  
  let inputFinishLabel = createLabel("Please, enter finish datetime", 
  "InputFinishTime");
  //inputFinishLabel.classList.add("");
  finishTypeFieldset.appendChild(inputFinishLabel);
  let inputFinishTime = createInput("datetime-local", "inputFinish", 
  "InputFinishTime", false, true);
  inputFinishTime.classList.add("add-form__input-time", 
  "add-form__input--hidden", "js-input-finish-time");
  inputFinishLabel.appendChild(inputFinishTime);

  
  let inputFixedLabel = createLabel("Fixed number", "InputFixedNumber");
  //inputFixedLabel.classList.add("");
  addForm.appendChild(inputFixedLabel);
  
  let inputFixed = createInput("number", "fixedInput", "InputFixedNumber", 
  false, false);
  inputFixed.classList.add("add-form__input-amount", "js-input-fixed");
  inputFixed.min = "0";
  inputFixed.max = "5";
  inputFixed.value = 2;
  inputFixed.addEventListener("change", function() {
    if ((inputFixed.value == "") || (this.value < 0) || (this.value > 5)) {
      this.value = 2;
    }
  })
  inputFixedLabel.appendChild(inputFixed);


  let dataSubmitBtn = document.createElement("button");
  dataSubmitBtn.classList.add("add-form__submit", "btn");
  dataSubmitBtn.type = "submit";
  dataSubmitBtn.textContent = "Add timer";
  addForm.appendChild(dataSubmitBtn);


  startTypeInput1.addEventListener("input", function() {
    inputStartTime.disabled = true;
    inputStartTime.value = "";
    inputStartLabel.classList.toggle("add-form__label--hidden");
    inputStartTime.classList.toggle("add-form__input--hidden");
  })
  startTypeInput2.addEventListener("input", function() {
    inputStartTime.disabled = false;
    inputStartLabel.classList.toggle("add-form__label--hidden");
    inputStartTime.classList.toggle("add-form__input--hidden");
  })


  inputFinishType1.addEventListener("input", function() {
    inputFinishTime.value = "";
    inputDays.value = "";
    inputHours.value = "";
    inputMins.value = "";
    inputSecs.value = "";

    inputNumberLabel.classList.remove("add-form__label--hidden");
    inputNumber.classList.remove("add-form__input--hidden");
    timeUnitsFieldset.classList.add("add-form__fieldset--hidden");
    inputFinishLabel.classList.add("add-form__label--hidden");
    inputFinishTime.classList.add("add-form__input--hidden");

    inputNumber.disabled = false;
    inputDays.disabled = true;
    inputHours.disabled = true;
    inputMins.disabled = true;
    inputSecs.disabled = true;
    inputFinishTime.disabled = true;
  })

  inputFinishType2.addEventListener("input", function() {
    inputFinishTime.value = "";
    inputNumber.value = "";

    inputNumberLabel.classList.add("add-form__label--hidden");
    inputNumber.classList.add("add-form__input--hidden");
    timeUnitsFieldset.classList.remove("add-form__fieldset--hidden");
    inputFinishLabel.classList.add("add-form__label--hidden");
    inputFinishTime.classList.add("add-form__input--hidden");

    inputNumber.disabled = true;
    inputDays.disabled = false;
    inputHours.disabled = false;
    inputMins.disabled = false;
    inputSecs.disabled = false;
    inputFinishTime.disabled = true;
  })

  inputFinishType3.addEventListener("input", function() {
    inputNumber.value = "";
    inputDays.value = "";
    inputHours.value = "";
    inputMins.value = "";
    inputSecs.value = "";

    inputNumberLabel.classList.add("add-form__label--hidden");
    inputNumber.classList.add("add-form__input--hidden");
    timeUnitsFieldset.classList.add("add-form__fieldset--hidden");
    inputFinishLabel.classList.remove("add-form__label--hidden");
    inputFinishTime.classList.remove("add-form__input--hidden");

    inputNumber.disabled = true;
    inputDays.disabled = true;
    inputHours.disabled = true;
    inputMins.disabled = true;
    inputSecs.disabled = true;
    inputFinishTime.disabled = false;
  })

  settingUpTimer.appendChild(addForm);
}



export function fillReadyTimer(readyTimer, id) {
  clearChilds(readyTimer);
  readyTimer.classList.add("timer--ready-layout");

  let canvas = document.createElement("canvas");
  canvas.classList.add("timer__circle", "js-timer-canvas");
  canvas.width = "200";
  canvas.height = "200";
  readyTimer.appendChild(canvas);
  
  let timerTextContainer = document.createElement("div");
  timerTextContainer.classList.add("timer__text-wrapper");

  let timerPercentContainer = document.createElement("div");
  timerPercentContainer.classList.add("timer__percent");
  timerPercentContainer.textContent = "Percent";
  timerTextContainer.appendChild(timerPercentContainer);

  let timerSecsContainer = document.createElement("div");
  timerSecsContainer.classList.add("timer__text", "timer__text--remaining",
  "js-remaining-secs");
  timerSecsContainer.textContent = "Rem. time:";
  timerTextContainer.appendChild(timerSecsContainer);

  readyTimer.appendChild(timerTextContainer);


  let timerControlsContainer = document.createElement("div");
  timerControlsContainer.classList.add("timer__settings");

  let settingsBtn = document.createElement("button");
  settingsBtn.classList.add("btn", "js-settings-btn");
  settingsBtn.textContent = "*";
  

  timerControlsContainer.appendChild(settingsBtn);

  let pauseBtn = document.createElement("button");
  pauseBtn.classList.add("js-pause-timer-btn", "btn");
  pauseBtn.textContent = "Pause";

  pauseBtn.addEventListener("click", function(e){
    let index = getTimerIndex(id);
    pauseHandler(e, index);
  })

  
  let uniqueId = new Date().getTime();
  let inputFixedLabel = createLabel("Fixed number", uniqueId);
  inputFixedLabel.classList.add("add-form__label--hidden", "js-settings-fixed-label");
  timerControlsContainer.appendChild(inputFixedLabel);


  let inputFixed = createInput("number", "inputFixed", uniqueId, false, false);
  inputFixed.classList.add("add-form__input-amount", "add-form__input-amount--hidden", "js-settings-fixed-input");
  inputFixed.min = "0";
  inputFixed.max = "5";
  inputFixed.addEventListener("change", function() {
    if ((this.value < 0) || (this.value > 5)) {
      this.value = 2;
    }
  })
  inputFixedLabel.appendChild(inputFixed);

  settingsBtn.addEventListener("click", function(e) {
    let index = getTimerIndex(id);
    inputFixed.value = timerData[index].fixedNumber;
    inputFixed.addEventListener("input", function() {
      timerData[index].fixedNumber = inputFixed.value;
    })

    inputFixedLabel.classList.toggle("add-form__label--hidden");
    inputFixed.classList.toggle("add-form__input-amount--hidden");
  })

  
  timerControlsContainer.appendChild(pauseBtn);  

  let delBtn = document.createElement("button");
  delBtn.classList.add("js-del-timer-btn", "btn");
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", function(e){
    let index = getTimerIndex(id);
    deleteTimer(readyTimer, index);
    if (timerData.length == 0) {
      localStorage.setItem("data", []);
    }
  })

  timerControlsContainer.appendChild(delBtn);
  readyTimer.appendChild(timerControlsContainer);
}


function clearChilds(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}


function getTimerIndex(id) {  
  let timerIndex = undefined;
  timerData.forEach(function(timer, index){
    if (timer.id == id) { 
      timerIndex = index;
    }
  })
  return timerIndex;
}