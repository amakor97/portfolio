"use strict";

const wrapper = document.querySelector(".timers-wrapper");
console.log(wrapper);

let timersCounter = 0;


window.onload = function() {
  let testValue = JSON.parse(localStorage.getItem("data"));
  if ((testValue) && (testValue.length > 0)) {
    timersCounter = testValue.length;
  }
}


export function createEmptyTimer() {
  let newTimer = document.createElement("article");
  newTimer.classList.add("timer");
  wrapper.appendChild(newTimer);
  return newTimer;
}


export function fillEmptyTimer(emptyTimer) {
  let addTimerBtn = document.createElement("button");
  addTimerBtn.classList.add("timer__add-timer-btn", "js-add-timer-btn");
  addTimerBtn.textContent = "+";
  emptyTimer.appendChild(addTimerBtn);
  
  let introText = document.createElement("p");
  introText.classList.add("timer__text");
  introText.textContent = "Add new timer";
  emptyTimer.appendChild(introText);
}


export function fillSettingUpTimer(settingUpTimer) {
  clearChilds(settingUpTimer);

  let addForm = document.createElement("form");
  addForm.classList.add("timer__add-window", "add-form");

  let startTypeFieldset = document.createElement("fieldset");
  startTypeFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(startTypeFieldset);

  let startTypeLabel = document.createElement("label");
  startTypeLabel.textContent = "Start now";
  startTypeFieldset.appendChild(startTypeLabel);
  let forAttrStart = document.createAttribute("for");
  forAttrStart.value = "startType1";
  startTypeLabel.setAttributeNode(forAttrStart);

  let startTypeInput1 = document.createElement("input");
  startTypeInput1.type = "radio";
  startTypeInput1.name = "startType";
  startTypeInput1.id = "startType1";
  startTypeInput1.checked = true;
  startTypeLabel.appendChild(startTypeInput1);

  startTypeLabel = document.createElement("label");
  startTypeLabel.textContent = "Precise start time";
  startTypeFieldset.appendChild(startTypeLabel);
  forAttrStart = document.createAttribute("for");
  forAttrStart.value = "startType2";
  startTypeLabel.setAttributeNode(forAttrStart);

  let startTypeInput2 = document.createElement("input");
  startTypeInput2.type = "radio";
  startTypeInput2.name = "startType";
  startTypeInput2.id = "startType2";
  startTypeLabel.appendChild(startTypeInput2);


  startTypeFieldset = document.createElement("fieldset");
  startTypeFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(startTypeFieldset);

  let inputStartLabel = document.createElement("label");
  inputStartLabel.textContent = "Please, enter start datetime";
  startTypeFieldset.appendChild(inputStartLabel);
  forAttrStart = document.createAttribute("for");
  forAttrStart.value = `inputStartDatetime`;
  inputStartLabel.setAttributeNode(forAttrStart);
  
  let inputStartTime = document.createElement("input");
  inputStartTime.classList.add("add-form__input-time", "js-input-start-time");
  inputStartTime.type = "datetime-local";
  inputStartTime.id = `inputStartDatetime`;
  inputStartTime.disabled = true;
  inputStartLabel.appendChild(inputStartTime);



  let finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(finishTypeFieldset);

  let inputFinishType1Label = document.createElement("label");
  inputFinishType1Label.textContent = "Amount of seconds";
  finishTypeFieldset.appendChild(inputFinishType1Label);
  let forAttrFinish1 = document.createAttribute("for");
  forAttrFinish1.value = `finishType1`;
  inputFinishType1Label.setAttributeNode(forAttrFinish1);

  let inputFinishType1 = document.createElement("input");
  inputFinishType1.type = "radio";
  inputFinishType1.name = "finishType";
  inputFinishType1.id = "finishType1";
  inputFinishType1.checked = true;
  inputFinishType1Label.appendChild(inputFinishType1);
  

  let inputFinishType2Label = document.createElement("label");
  inputFinishType2Label.textContent = "Amount of different units";
  finishTypeFieldset.appendChild(inputFinishType2Label);
  let forAttrFinish2 = document.createAttribute("for");
  forAttrFinish2.value = `finishType2`;
  inputFinishType2Label.setAttributeNode(forAttrFinish2);

  let inputFinishType2 = document.createElement("input");
  inputFinishType2.type = "radio";
  inputFinishType2.name = "finishType";
  inputFinishType2.id = "finishType2";
  inputFinishType2Label.appendChild(inputFinishType2);

  
  let inputFinishType3Label = document.createElement("label");
  inputFinishType3Label.textContent = "Precise finish time";
  finishTypeFieldset.appendChild(inputFinishType3Label);
  let forAttrFinish3 = document.createAttribute("for");
  forAttrFinish3.value = `finishType3`;
  inputFinishType3Label.setAttributeNode(forAttrFinish3);

  let inputFinishType3 = document.createElement("input");
  inputFinishType3.type = "radio";
  inputFinishType3.name = "finishType";
  inputFinishType3.id = "finishType3";
  inputFinishType3Label.appendChild(inputFinishType3);

  
  finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(finishTypeFieldset);

  let inputNumberLabel = document.createElement("label");
  inputNumberLabel.textContent = "Please, enter the amount of seconds";
  finishTypeFieldset.appendChild(inputNumberLabel);
  let forAttr = document.createAttribute("for");
  forAttr.value = `InputOnlySecondsAmount`;
  inputNumberLabel.setAttributeNode(forAttr);

  let inputNumber = document.createElement("input");
  inputNumber.classList.add("add-form__input-time", "js-input-number");
  inputNumber.type = "number";
  inputNumber.min = "0";
  inputNumber.id = `InputOnlySecondsAmount`;
  inputNumberLabel.appendChild(inputNumber);


  
  let inputDaysLabel = document.createElement("label");
  inputDaysLabel.textContent = "Days";
  finishTypeFieldset.appendChild(inputDaysLabel);
  forAttr = document.createAttribute("for");
  forAttr.value = "InputDaysAmount";
  inputDaysLabel.setAttributeNode(forAttr);

  let inputDays = document.createElement("input");
  inputDays.classList.add("add-form__input-amount", "js-input-days");
  inputDays.type = "number";
  inputDays.disabled = true;
  inputDays.min = "0";
  inputDays.addEventListener("input", function() {
    if (this.value < 0) {
      this.value = 0;
    }
  })
  inputDays.id = `InputDaysAmount`;
  inputDaysLabel.appendChild(inputDays);


  let inputHoursLabel = document.createElement("label");
  inputHoursLabel.textContent = "Hours";
  finishTypeFieldset.appendChild(inputHoursLabel);
  forAttr = document.createAttribute("for");
  forAttr.value = "InputHoursAmount";
  inputHoursLabel.setAttributeNode(forAttr);

  let inputHours = document.createElement("input");
  inputHours.classList.add("add-form__input-amount", "js-input-hours");
  inputHours.type = "number";
  inputHours.disabled = true;
  inputHours.min = "0";
  inputHours.max = "23";
  inputHours.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputHours.id = `InputHoursAmount`;
  inputHoursLabel.appendChild(inputHours);


  let inputMinsLabel = document.createElement("label");
  inputMinsLabel.textContent = "Mins";
  finishTypeFieldset.appendChild(inputMinsLabel);
  forAttr = document.createAttribute("for");
  forAttr.value = "InputMinsAmount";
  inputMinsLabel.setAttributeNode(forAttr);

  let inputMins = document.createElement("input");
  inputMins.classList.add("add-form__input-amount", "js-input-mins");
  inputMins.type = "number";
  inputMins.disabled = true;
  inputMins.min = "0";
  inputMins.max = "59";
  inputMins.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputMins.id = `InputMinsAmount`;
  inputMinsLabel.appendChild(inputMins);


  let inputSecsLabel = document.createElement("label");
  inputSecsLabel.textContent = "Secs";
  finishTypeFieldset.appendChild(inputSecsLabel);
  forAttr = document.createAttribute("for");
  forAttr.value = "InputSecsAmount";
  inputSecsLabel.setAttributeNode(forAttr);

  let inputSecs = document.createElement("input");
  inputSecs.classList.add("add-form__input-amount", "js-input-secs");
  inputSecs.type = "number";
  inputSecs.disabled = true;
  inputSecs.min = "0";
  inputSecs.max = "59";
  inputSecs.addEventListener("input", function() {
    if ((this.value < 0) || (this.value > 59)) {
      this.value = 0;
    }
  })
  inputSecs.id = `InputSecsAmount`;
  inputSecsLabel.appendChild(inputSecs);

  
  let inputFinishLabel = document.createElement("label");
  inputFinishLabel.textContent = "Please, enter finish datetime";
  finishTypeFieldset.appendChild(inputFinishLabel);
  forAttr = document.createAttribute("for");
  forAttr.value = `InputFinishTime`;
  inputFinishLabel.setAttributeNode(forAttr);

  let inputFinishTime = document.createElement("input");
  inputFinishTime.classList.add("add-form__input-time", "js-input-finish-time");
  inputFinishTime.type = "datetime-local";
  inputFinishTime.id = `InputFinishTime`;
  inputFinishTime.disabled = true;
  inputFinishLabel.appendChild(inputFinishTime);


  let dataSubmitBtn = document.createElement("button");
  dataSubmitBtn.classList.add("add-form__submit", "btn");
  dataSubmitBtn.type = "submit";
  dataSubmitBtn.textContent = "Add timer";
  addForm.appendChild(dataSubmitBtn);


  startTypeInput1.addEventListener("input", function() {
    inputStartTime.disabled = true;
    inputStartTime.value = "";
  })
  startTypeInput2.addEventListener("input", function() {
    inputStartTime.disabled = false;
  })


  inputFinishType1.addEventListener("input", function() {
    inputFinishTime.value = "";
    inputDays.value = "";
    inputHours.value = "";
    inputMins.value = "";
    inputSecs.value = "";

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

    inputNumber.disabled = true;
    inputDays.disabled = true;
    inputHours.disabled = true;
    inputMins.disabled = true;
    inputSecs.disabled = true;
    inputFinishTime.disabled = false;
  })

  settingUpTimer.appendChild(addForm);
  //timersCounter++;
}



export function fillReadyTimer(readyTimer, id) {
  clearChilds(readyTimer);

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
  timerSecsContainer.textContent = "Rem. time in secs";
  timerTextContainer.appendChild(timerSecsContainer);

  readyTimer.appendChild(timerTextContainer);


  let timerControlsContainer = document.createElement("div");
  timerControlsContainer.classList.add("timer__settings");

  let settingsBtn = document.createElement("button");
  settingsBtn.classList.add("btn");
  settingsBtn.textContent = "*";
  timerControlsContainer.appendChild(settingsBtn);

  let pauseBtn = document.createElement("button");
  pauseBtn.classList.add("js-pause-timer-btn", "btn");
  pauseBtn.textContent = "Pause";
  
  
  
  

  
  timerControlsContainer.appendChild(pauseBtn);  

  let delBtn = document.createElement("button");
  delBtn.classList.add("js-del-timer-btn", "btn");
  delBtn.textContent = "Delete";

  
  timerControlsContainer.appendChild(delBtn);

  readyTimer.appendChild(timerControlsContainer);
}


export function clearChilds(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}