"use strict";

const wrapper = document.querySelector(".timers-wrapper");


import { createNewTimer } from "./app.js";
import { pauseHandler } from "./app.js";
import { deleteTimer } from "./app.js";
import { timerData } from "./app.js";


export function createEmptyTimer() {
  let newTimer = document.createElement("article");
  newTimer.classList.add("timer", "timer_intro-layout");
  wrapper.appendChild(newTimer);
  return newTimer;
}


export function fillEmptyTimer(emptyTimer) {
  let addTimerBtn = document.createElement("button");
  addTimerBtn.classList.add("timer__add-timer-btn", "js-add-timer-btn");
  addTimerBtn.setAttribute("aria-label", "add new timer");

  let plusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plusIcon.classList.add("timer__add-timer-svg");
  plusIcon.setAttribute("width", "24");
  plusIcon.setAttribute("height", "24");
  plusIcon.setAttributeNS(null, "viewBox", "0 0 24 24");
  
  let plusIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  plusIconPath.setAttribute("d", "M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z");
  plusIcon.appendChild(plusIconPath);

  addTimerBtn.appendChild(plusIcon);

  addTimerBtn.addEventListener("click", createNewTimer);

  emptyTimer.appendChild(addTimerBtn);
  
  let introText = document.createElement("p");
  introText.classList.add("timer__text-intro");
  introText.textContent = "Add new timer";
  emptyTimer.appendChild(introText);
}


function createLabel(text) {
  let label = document.createElement("label");
  label.textContent = text;
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
  settingUpTimer.classList.remove("timer_intro-layout");

  let addForm = document.createElement("form");
  addForm.classList.add("timer__add-window", "add-form");

  
  let startFieldset = document.createElement("fieldset");
  startFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(startFieldset);

  let startLegeng = document.createElement("legend");
  startLegeng.textContent = "Start settings";
  startFieldset.appendChild(startLegeng);

  let startTypeFieldset = document.createElement("fieldset");
  startTypeFieldset.classList.add("add-form__fieldset");
  startFieldset.appendChild(startTypeFieldset);

  let startTypeLabel1 = createLabel("Start now");
  //startTypeLabel1.classList.add("");
  startTypeFieldset.appendChild(startTypeLabel1);
  let startTypeInput1 = createInput("radio", "startType", "startType1", 
  false, false);
  startTypeLabel1.appendChild(startTypeInput1);
  
  
  let startTypeLabel2 = createLabel("Presice start time");
  //startTypeLabel2.classList.add("");
  startTypeFieldset.appendChild(startTypeLabel2);
  let startTypeInput2 = createInput("radio", "startType", "startType2", 
  false, false);
  startTypeLabel2.appendChild(startTypeInput2);
  
  
  let startTimeFieldset = document.createElement("fieldset");
  startTimeFieldset.classList.add("add-form__fieldset", "add-form__fieldset_no-displayed");
  startFieldset.appendChild(startTimeFieldset);

  
  let inputStartLabel = createLabel("Please, enter start datetime");
  //inputStartLabel.classList.add("add-form__label_no-displayed");
  inputStartLabel.classList.add("add-form__label_big-input");
  startTimeFieldset.appendChild(inputStartLabel);
  let inputStartTime = createInput("datetime-local", "startTime", 
  "inputStartDatetime", false, true);
  inputStartTime.classList.add("add-form__input-time", 
  "add-form__input_hidden", "js-input-start-time");
  inputStartLabel.appendChild(inputStartTime);

  
  let finishFieldset = document.createElement("fieldset");
  finishFieldset.classList.add("add-form__fieldset", "add-form__fieldset_hidden");
  addForm.appendChild(finishFieldset);

  let finishLegend = document.createElement("legend");
  finishLegend.textContent = "Finish settings";
  finishFieldset.appendChild(finishLegend);


  let finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  finishFieldset.appendChild(finishTypeFieldset);

  
  let inputFinishType1Label = createLabel("Amount of seconds");
  //inputFinishTypeLabel1.classList.add("");
  finishTypeFieldset.appendChild(inputFinishType1Label);
  let inputFinishType1 = createInput("radio", "finishType", "finishType1", 
  false, false);
  //inputFinishType1.classList.add("");
  inputFinishType1Label.appendChild(inputFinishType1);

  
  let inputFinishType2Label = createLabel("Amount of different units");
  //inputFinishType2Label.classList.add("");
  finishTypeFieldset.appendChild(inputFinishType2Label);
  let inputFinishType2 = createInput("radio", "finishType", "finishType2", 
  false, false);
  //inputFinishType2.classList.add("");
  inputFinishType2Label.appendChild(inputFinishType2);

  
  let inputFinishType3Label = createLabel("Precise finish time");
  //inputFinishType3Label.classList.add("");
  finishTypeFieldset.appendChild(inputFinishType3Label);
  let inputFinishType3 = createInput("radio", "finishType", "finishType3", 
  false, false);
  //inputFinishType3.classList.add("");
  inputFinishType3Label.appendChild(inputFinishType3);


  finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  finishFieldset.appendChild(finishTypeFieldset);

  
  let inputNumberLabel = createLabel("Please, enter the amount of seconds");
  //inputNumberLabel.classList.add("");
  inputNumberLabel.classList.add("add-form__label_big-input", "add-form__label_no-displayed");
  finishTypeFieldset.appendChild(inputNumberLabel);
  let inputNumber = createInput("number", "onlySecsInput", 
  "InputOnlySecondsAmount", false, false);
  inputNumber.classList.add("add-form__input-time", "js-input-number", "js-input-finish");
  inputNumber.min = "0";
  inputNumberLabel.appendChild(inputNumber);


  let timeUnitsFieldset = document.createElement("fieldset");
  timeUnitsFieldset.classList.add("add-form__fieldset", "add-form__fieldset_no-displayed", "add-form__fieldset_days");
  finishTypeFieldset.appendChild(timeUnitsFieldset);

  
  let inputDaysLabel = createLabel("Days");
  //inputDaysLabel.classList.add("");
  inputDaysLabel.classList.add("add-form__label_small-input");
  timeUnitsFieldset.appendChild(inputDaysLabel);

  let inputDays = createInput("number", "inputDays", "InputDaysAmount", 
  false, true);
  inputDays.classList.add("add-form__input-amount", "js-input-days", "js-input-finish");
  inputDays.min = "0";
  inputDays.addEventListener("input", function() {
    if (this.value < 0) {
      this.value = 0;
    }
  })
  inputDaysLabel.appendChild(inputDays);

  
  let inputHoursLabel = createLabel("Hours");
  //inputHoursLabel.classList.add("");
  inputHoursLabel.classList.add("add-form__label_small-input");
  timeUnitsFieldset.appendChild(inputHoursLabel); 
  
  let inputHours = createInput("number", "InputHours", "InputHoursAmount", 
  false, true);
  inputHours.classList.add("add-form__input-amount", "js-input-hours", "js-input-finish");
  inputHours.min = "0";
  inputHours.max = "23";
  inputHours.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputHoursLabel.appendChild(inputHours);
  

  let inputMinsLabel = createLabel("Mins");
  //inputMinsLabel.classList.add("");
  inputMinsLabel.classList.add("add-form__label_small-input");
  timeUnitsFieldset.appendChild(inputMinsLabel);
  
  let inputMins = createInput("number", "InputMins", "InputMinsAmount", 
  false, true);
  inputMins.classList.add("add-form__input-amount", "js-input-mins", "js-input-finish");
  inputMins.min = "0";
  inputMins.max = "59";
  inputMins.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputMinsLabel.appendChild(inputMins);


  let inputSecsLabel = createLabel("Secs");
  //inputSecsLabel.classList.add("");
  inputSecsLabel.classList.add("add-form__label_small-input");
  timeUnitsFieldset.appendChild(inputSecsLabel);
  
  let inputSecs = createInput("number", "InputSecs", "InputSecsAmount", 
  false, true);
  inputSecs.classList.add("add-form__input-amount", "js-input-secs", "js-input-finish");
  inputSecs.min = "0";
  inputSecs.max = "59";
  inputSecs.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputSecsLabel.appendChild(inputSecs);

  
  let inputFinishLabel = createLabel("Please, enter finish datetime");
  //inputFinishLabel.classList.add("");
  inputFinishLabel.classList.add("add-form__label_no-displayed", "add-form__label_big-input");
  finishTypeFieldset.appendChild(inputFinishLabel);
  let inputFinishTime = createInput("datetime-local", "inputFinish", 
  "InputFinishTime", false, true);
  inputFinishTime.classList.add("add-form__input-time", 
  "add-form__input_hidden", "js-input-finish-time", "js-input-finish");
  inputFinishLabel.appendChild(inputFinishTime);

  
  let inputFixedLabel = createLabel("Mantissa digits");
  //inputFixedLabel.classList.add("");
  inputFixedLabel.classList.add("add-form__label_hidden");
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
  dataSubmitBtn.classList.add("js-create-ready-timer", "add-form__button_hidden", "btn", "timer__settings-btn");
  dataSubmitBtn.type = "submit";
  dataSubmitBtn.textContent = "Add timer";
  addForm.appendChild(dataSubmitBtn);


  startTypeInput1.addEventListener("input", function() {
    inputStartTime.disabled = true;
    inputStartTime.value = "";
    startTimeFieldset.classList.add("add-form__fieldset_no-displayed");
    inputStartTime.classList.add("add-form__input_hidden");
    finishFieldset.classList.remove("add-form__fieldset_hidden");
  })
  startTypeInput2.addEventListener("input", function() {
    inputStartTime.disabled = false;
    startTimeFieldset.classList.remove("add-form__fieldset_no-displayed");
    inputStartTime.classList.remove("add-form__input_hidden");
  })
  inputStartTime.addEventListener("change", function() {
    finishFieldset.classList.remove("add-form__fieldset_hidden");
  })


  inputFinishType1.addEventListener("input", function() {
    inputFinishTime.value = "";
    inputDays.value = "";
    inputHours.value = "";
    inputMins.value = "";
    inputSecs.value = "";

    inputNumberLabel.classList.remove("add-form__label_no-displayed");
    inputNumber.classList.remove("add-form__input_hidden");
    timeUnitsFieldset.classList.add("add-form__fieldset_no-displayed");
    inputFinishLabel.classList.add("add-form__label_no-displayed");
    inputFinishTime.classList.add("add-form__input_hidden");

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

    inputNumberLabel.classList.add("add-form__label_no-displayed");
    inputNumber.classList.add("add-form__input_hidden");
    timeUnitsFieldset.classList.remove("add-form__fieldset_no-displayed");
    inputFinishLabel.classList.add("add-form__label_no-displayed");
    inputFinishTime.classList.add("add-form__input_hidden");

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

    inputNumberLabel.classList.add("add-form__label_no-displayed");
    inputNumber.classList.add("add-form__input_hidden");
    timeUnitsFieldset.classList.add("add-form__fieldset_no-displayed");
    inputFinishLabel.classList.remove("add-form__label_no-displayed");
    inputFinishTime.classList.remove("add-form__input_hidden");

    inputNumber.disabled = true;
    inputDays.disabled = true;
    inputHours.disabled = true;
    inputMins.disabled = true;
    inputSecs.disabled = true;
    inputFinishTime.disabled = false;
  })

  let finishInputs = addForm.querySelectorAll(".js-input-finish");
  console.log(finishInputs);
  finishInputs.forEach(function(input){
    input.addEventListener("input", function(){
      inputFixedLabel.classList.remove("add-form__label_hidden");
      dataSubmitBtn.classList.remove("add-form__button_hidden");
    })
  })

  settingUpTimer.appendChild(addForm);
}



export function fillReadyTimer(readyTimer, id) {
  clearChilds(readyTimer);
  readyTimer.classList.add("timer_ready-layout");

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
  timerSecsContainer.classList.add("timer__text", "timer__text_remaining",
  "js-remaining-secs");
  timerSecsContainer.textContent = "Rem. time:";
  timerTextContainer.appendChild(timerSecsContainer);

  readyTimer.appendChild(timerTextContainer);


  let timerControlsContainer = document.createElement("div");
  timerControlsContainer.classList.add("timer__settings");

  let settingsBtn = document.createElement("button");
  settingsBtn.classList.add("btn", "js-settings-btn", "timer__settings-btn", "timer__settings-btn_icon");
  settingsBtn.setAttribute("aria-label", "settings");
  
  let settingIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  settingIcon.classList.add("timer__settings-btn-svg");
  settingIcon.setAttribute("width", "24");
  settingIcon.setAttribute("height", "24");
  settingIcon.setAttributeNS(null, "viewBox", "0 0 24 24");

  let settingIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  settingIconPath.setAttribute("d", `M 10.490234 2 C 10.011234 2 9.6017656 2.3385938 9.5097656 2.8085938 L 9.1757812 4.5234375 C 8.3550224 4.8338012 7.5961042 5.2674041 6.9296875 5.8144531 L 5.2851562 5.2480469 C 4.8321563 5.0920469 4.33375 5.2793594 4.09375 5.6933594 L 2.5859375 8.3066406 C 2.3469375 8.7216406 2.4339219 9.2485 2.7949219 9.5625 L 4.1132812 10.708984 C 4.0447181 11.130337 4 11.559284 4 12 C 4 12.440716 4.0447181 12.869663 4.1132812 13.291016 L 2.7949219 14.4375 C 2.4339219 14.7515 2.3469375 15.278359 2.5859375 15.693359 L 4.09375 18.306641 C 4.33275 18.721641 4.8321562 18.908906 5.2851562 18.753906 L 6.9296875 18.1875 C 7.5958842 18.734206 8.3553934 19.166339 9.1757812 19.476562 L 9.5097656 21.191406 C 9.6017656 21.661406 10.011234 22 10.490234 22 L 13.509766 22 C 13.988766 22 14.398234 21.661406 14.490234 21.191406 L 14.824219 19.476562 C 15.644978 19.166199 16.403896 18.732596 17.070312 18.185547 L 18.714844 18.751953 C 19.167844 18.907953 19.66625 18.721641 19.90625 18.306641 L 21.414062 15.691406 C 21.653063 15.276406 21.566078 14.7515 21.205078 14.4375 L 19.886719 13.291016 C 19.955282 12.869663 20 12.440716 20 12 C 20 11.559284 19.955282 11.130337 19.886719 10.708984 L 21.205078 9.5625 C 21.566078 9.2485 21.653063 8.7216406 21.414062 8.3066406 L 19.90625 5.6933594 C 19.66725 5.2783594 19.167844 5.0910937 18.714844 5.2460938 L 17.070312 5.8125 C 16.404116 5.2657937 15.644607 4.8336609 14.824219 4.5234375 L 14.490234 2.8085938 C 14.398234 2.3385937 13.988766 2 13.509766 2 L 10.490234 2 z M 12 8 C 14.209 8 16 9.791 16 12 C 16 14.209 14.209 16 12 16 C 9.791 16 8 14.209 8 12 C 8 9.791 9.791 8 12 8 z`);
  settingIcon.appendChild(settingIconPath);
  settingsBtn.appendChild(settingIcon);

  settingsBtn.addEventListener("click", function(){
    timerControlsContainer.classList.toggle("timer__settings_wide");
  })

  timerControlsContainer.appendChild(settingsBtn);

  let pauseBtn = document.createElement("button");
  pauseBtn.classList.add("js-pause-timer-btn", "btn", "timer__settings-btn");
  pauseBtn.textContent = "Pause";

  pauseBtn.addEventListener("click", function(e){
    let index = getTimerIndex(id);
    pauseHandler(e, index);
  })

  
  let uniqueId = new Date().getTime();
  let inputFixedLabel = createLabel("Mantissa digits", uniqueId);
  inputFixedLabel.classList.add("timer__settings-label", 
  "add-form__label_no-displayed", "js-settings-fixed-label");
  timerControlsContainer.appendChild(inputFixedLabel);


  let inputFixed = createInput("number", "inputFixed", uniqueId, false, false);
  inputFixed.classList.add("timer__settings-input",
  "timer__settings-input_hidden", "js-settings-fixed-input");
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

    inputFixedLabel.classList.toggle("add-form__label_no-displayed");
    inputFixed.classList.toggle("timer__settings-input_hidden");
  })

  
  timerControlsContainer.appendChild(pauseBtn);  

  let delBtn = document.createElement("button");
  delBtn.classList.add("js-del-timer-btn", "btn", "timer__settings-btn");
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