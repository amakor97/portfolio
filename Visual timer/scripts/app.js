"use strict";
const wrapper = document.querySelector(".timers-wrapper");
let timerData = [];
let allTimers = [];

let timersCounter = 0;
let type = "circle";


function getNewId() {
  let newId = 0;
  let isIdFree = true;
  if (timerData.length > 0) {
    for (let i = 0; i < timerData.length;) {
      if (newId == timerData[i].id) {
        newId++;
        i = 0;
      } else {
        i++;
      }
    }
  } else {
    newId = 0;
  }
  return newId;
}

function showAddTimerWindow(e) {
  let timerContainer = e.currentTarget.parentElement;
  fillSettingUpTimer(timerContainer);

  const inputNumber = timerContainer.querySelector(".js-input-number");
  const inputStartTime = timerContainer.querySelector(".js-input-start-time");
  const inputFinishTime = timerContainer.querySelector(".js-input-finish-time");

  const inputDays = timerContainer.querySelector(".js-input-days");
  const inputHours = timerContainer.querySelector(".js-input-hours");
  const inputMins = timerContainer.querySelector(".js-input-mins");
  const inputSecs = timerContainer.querySelector(".js-input-secs");

  const inputFixed = timerContainer.querySelector(".js-input-fixed");


  const submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();

    let timerInfo = {};
    //timerInfo.id = timersCounter;
    timerInfo.id = getNewId();
    timerInfo.timestamp = new Date().getTime(); //
    timerInfo.type = type;
    timerInfo.fixedNumber = inputFixed.value;

    if (!inputStartTime.value) {
      timerInfo.delayedStart = false;
      if (inputNumber.value) {
        timerInfo.startTimestamp =new Date().getTime();
        timerInfo.initialTime = inputNumber.value;
      } 

       else if ((inputDays.value) || (inputHours.value) || (inputMins.value) || (inputSecs.value)) {

        timerInfo.startTimestamp = new Date().getTime();
        
        timerInfo.initialTime = inputDays.value*60*60*24 + +inputHours.value*60*60 + +inputMins.value*60 + +inputSecs.value;
        timerInfo.status = "running";
        timerInfo.percentValue = 100;
      }
      
      else {
        timerInfo.preciseFinish = true;
        let finish = inputFinishTime.value;
        let finishTimestamp = new Date(finish).getTime();
        let dif = finishTimestamp - timerInfo.timestamp;
        timerInfo.initialTime = Math.round(dif/1000);
      }
      if (timerInfo.initialTime < 0) {
        timerInfo.initialTime = 0;
      }

      timerInfo.remainingTime = timerInfo.initialTime;
      timerInfo.remTimeMs = timerInfo.remainingTime*1000;
      timerInfo.status = "running";
      timerInfo.percentValue = 100;
    } 
    
    else {
      timerInfo.delayedStart = true;
      let start = inputStartTime.value
      let startTimestamp = new Date(start).getTime();
      timerInfo.startTimestamp = new Date(start).getTime();
      
      if (timerInfo.startTimestamp > timerInfo.timestamp) {
        timerInfo.notStartedYet = true;
        timerInfo.timeToStart = timerInfo.startTimestamp - timerInfo.timestamp;
      } else {
        timerInfo.notStartedYet = false;
      }

      if (inputNumber.value) {
        let secs = inputNumber.value;
        let secsInMs = secs*1000;

        timerInfo.finishTimestamp = timerInfo.startTimestamp + secsInMs;
        let dif = timerInfo.finishTimestamp - timerInfo.startTimestamp;
        let dif2 = new Date().getTime();
        //dif = finishTimestamp - dif2;
        timerInfo.initialTime = Math.round(dif/1000);
        timerInfo.status = "running";
        timerInfo.percentValue = 100;
      }

      else if ((inputDays.value) || (inputHours.value) || (inputMins.value) || (inputSecs.value)) {
        ////// fix here 
        //timerInfo.startTimestamp = new Date().getTime();
        let secsAmount = inputDays.value*60*60*24 + +inputHours.value*60*60 + +inputMins.value*60 + +inputSecs.value;
        timerInfo.finishTimestamp = timerInfo.startTimestamp + secsAmount*1000;
        let dif = timerInfo.finishTimestamp - timerInfo.startTimestamp;
        timerInfo.initialTime = Math.round(dif/1000);
        timerInfo.status = "running";
        timerInfo.percentValue = 100;
      }

      else {
        timerInfo.preciseFinish = true;
        let finish = inputFinishTime.value;
        let finishTimestamp = new Date(finish).getTime();
        if (startTimestamp >= finishTimestamp) {
          finishTimestamp = startTimestamp;
        }
        let dif = finishTimestamp - timerInfo.startTimestamp;
        timerInfo.initialTime = Math.round(dif/1000);
        timerInfo.percentValue = 100;
      }
      timerInfo.remainingTime = timerInfo.initialTime;
      timerInfo.remTimeMs = timerInfo.remainingTime*1000;
    }

    
    timerData.push(timerInfo);


    fillReadyTimer(timerContainer, timerInfo.id);

    const settingsBtn = timerContainer.querySelector(".js-settings-btn");
    settingsBtn.addEventListener("click", function(e) {
      let index = getTimerIndex(timerInfo.id);
      let fixedLabel = timerContainer.querySelector(".js-settings-fixed-label");
      let fixedInput = timerContainer.querySelector(".js-settings-fixed-input");
      fixedInput.value = timerData[index].fixedNumber;
      fixedInput.addEventListener("input", function() {
        timerData[index].fixedNumber = fixedInput.value;
      })

      fixedLabel.classList.toggle("add-form__label--hidden");
      fixedInput.classList.toggle("add-form__input-amount--hidden");
    })
    
    const pauseBtn = timerContainer.querySelector(".js-pause-timer-btn");
    pauseBtn.addEventListener("click", function(e){
      let index = getTimerIndex(timerInfo.id);
      pauseHandler(e, index);
    })

    const delBtn = timerContainer.querySelector(".js-del-timer-btn");
    delBtn.addEventListener("click", function(e){
      let index = getTimerIndex(timerInfo.id);
      deleteTimer(timerContainer, index);
      if (timerData.length == 0) {
        timersCounter = 0;
        localStorage.setItem("data", []);
      }
    })


    let newTimer = createEmptyTimer();
    fillEmptyTimer(newTimer);
    let addTimerBtn = newTimer.querySelector(".js-add-timer-btn");
    addTimerBtn.addEventListener("click", showAddTimerWindow);
    timersCounter++;
  })
}

//function 

function getTimerIndex(id) {  
  let timerIndex = undefined;
  timerData.forEach(function(timer, index){
    if (timer.id == id) { 
      timerIndex = index;
    }
  })
  return timerIndex;
}


/* fill functions */

import { createEmptyTimer } from "./DOMManipulations.js";
import { fillEmptyTimer } from "./DOMManipulations.js";
import { fillSettingUpTimer } from "./DOMManipulations.js";
import { fillReadyTimer } from "./DOMManipulations.js";
import { clearChilds } from "./DOMManipulations.js";


function calcValues() {
  if (timerData.length !== 0) {
    let timers = document.querySelectorAll(".timer");

    timerData.forEach(function(timer, index) {
    let timestamp = new Date().getTime();
    if (timer.delayedStart === true) {
      if (timestamp >= timer.startTimestamp) {
        let currentTimer = timers[index];
        if (timer.status !== "paused") {   
          timer.remTimeMs = calcRemainingTimeMs(timer);
          timer.percentValue = calcPercentValue(timer);
          displayInHTML(currentTimer, timer);
        }
      } else {
        if (timer.timeToStart) {
          let currentTimer = timers[index];
          calcTimeToStart(index);
          displayTimeToStart(currentTimer, timer);
        } 
      }
    } else {
        let currentTimer = timers[index];
        if (timer.status !== "paused") {   
          timer.remTimeMs = calcRemainingTimeMs(timer);
          timer.percentValue = calcPercentValue(timer);
          displayInHTML(currentTimer, timer);
        }   
      }
    })
  }
  setTimeout(calcValues, 100);
}

function calcTimeToStart(index) {
  let currentTimestamp = new Date().getTime();
  timerData[index].timeToStart = timerData[index].startTimestamp - currentTimestamp;
}


function displayTimeToStart(timerContainer, timerSingleData) {
  let timeContainer = timerContainer.querySelector(".js-remaining-secs");
  //timeContainer.innerHTML = `Time to start: ${(timerSingleData.timeToStart/1000).toFixed(3)} secs`;
  displayTime(timerContainer, timerSingleData.timeToStart);
}

function displayInHTML(timerContainer, timerSingleData) {
  let canvas = timerContainer.querySelector(".timer__circle");
  let ctx = canvas.getContext("2d");
  let percentContainer = timerContainer.querySelector(".timer__percent");
  let timeContainer = timerContainer.querySelector(".js-remaining-secs");

  if (timerSingleData.percentValue > 0) {
    percentContainer.innerHTML = `${(Math.round(timerSingleData.percentValue*100000)/100000).toFixed(timerSingleData.fixedNumber)}%`;
        //timeContainer.innerHTML = `Rem. time: ${(timerSingleData.remTimeMs/1000).toFixed(3)} secs`;
    let remMins = calcRemainingMins(timerSingleData.remTimeMs);
    //timeContainer.innerHTML = `Rem. time: ${remMins} mins, ${(timerSingleData.remTimeMs/1000).toFixed(3)} secs`;
    displayTime(timerContainer, timerSingleData.remTimeMs);
    drawTimer(ctx, timerSingleData.percentValue);
  } else {
    percentContainer.innerHTML = "Done!";
    timeContainer.innerHTML = "Finished!";
    drawCircle(ctx);
  }
}

function displayTime(timerContainer, remTimeMs) {
  let timeContainer = timerContainer.querySelector(".js-remaining-secs");

  let remainingDays = Math.floor(remTimeMs/1000/60/60/24);
  let remainingHours = Math.floor(remTimeMs/1000/60/60 - remainingDays*24);
  let remainingMins = Math.floor(remTimeMs/1000/60 - remainingDays*60*24 - remainingHours*60);
  let remainingSecs = (remTimeMs/1000 - remainingDays*60*60*24 - remainingHours*60*60 - remainingMins*60).toFixed(3);

  if (remainingDays > 0) {
    timeContainer.innerHTML = `Rem. time: ${remainingDays} days, ${remainingHours} hours, ${remainingMins} mins, ${remainingSecs} secs`;
  } else if (remainingHours > 0) {
    timeContainer.innerHTML = `Rem. time: ${remainingHours} hours, ${remainingMins} mins, ${remainingSecs} secs`;
  } else if (remainingMins > 0) {
    timeContainer.innerHTML = `Rem. time: ${remainingMins} mins, ${remainingSecs} secs`;
  } else {
    timeContainer.innerHTML = `Rem. time: ${remainingSecs} secs`;
  }
}

function calcRemainingMins(timeMs) {
  return Math.floor(timeMs/1000/60);
}

let calcPercentValue = (timer) => timer.remainingTime*100/timer.initialTime;

function calcPercentValue2(timer) {

}

function calcRemainingTimeMs(timer) {
  let currentTimestamp = new Date().getTime();
  let timeDif = undefined;
  if (timer.delayedStart === true) {
    timeDif = currentTimestamp - timer.startTimestamp;
  } else {
    timeDif = currentTimestamp - timer.timestamp;
  }

  let remTimeMs = timer.initialTime*1000 - timeDif;
  timer.remainingTime = remTimeMs/1000;
  return remTimeMs;
}

calcValues();


function pauseHandler(e, index) {
  let btn = e.currentTarget;
  if (timerData[index].preciseFinish !== true) {
    if (timerData[index].status == "running") {
      timerData[index].status = "paused";
      timerData[index].timestampWhenPaused = new Date().getTime();
      btn.textContent = "Run";
    } else {
      timerData[index].status = "running";
      timerData[index].timestampWhenRunned = new Date().getTime();
      
      timerData[index].pauseDelayTimeMs = 
      timerData[index].timestampWhenRunned - 
      timerData[index].timestampWhenPaused;
      
      timerData[index].timestamp += 
      timerData[index].pauseDelayTimeMs;

      timerData[index].startTimestamp = timerData[index].startTimestamp + 
      timerData[index].pauseDelayTimeMs;

      timerData[index].finishTimestamp += 
      timerData[index].pauseDelayTimeMs;
      btn.textContent = "Pause";
    }
  }
}


function deleteTimer(timer, index) {
  wrapper.removeChild(timer);
  timerData.splice(index, 1);
}


/* drawing functions */

import { drawTimer } from "./drawing.js";
import { drawCircle } from "./drawing.js";


/* localStorage functions */

window.onload = function() {
  let testValue = JSON.parse(localStorage.getItem("data"));
  if ((testValue) && (testValue.length > 0)) {
    timerData = [...testValue];
    timersCounter = timerData.length;
  } else {
    timerData = [];
  }

  if (timerData.length > 0) {
    timerData.forEach(function(timer) {
      let emptyTimer = createEmptyTimer();
      fillReadyTimer(emptyTimer, timer.id);

      const settingsBtn = emptyTimer.querySelector(".js-settings-btn");
      settingsBtn.addEventListener("click", function(e) {
      let index = getTimerIndex(timer.id);
      let fixedLabel = emptyTimer.querySelector(".js-settings-fixed-label");
      let fixedInput = emptyTimer.querySelector(".js-settings-fixed-input");
      fixedInput.value = timer.fixedNumber;
      fixedInput.addEventListener("input", function() {
        timer.fixedNumber = fixedInput.value;
      })

      fixedLabel.classList.toggle("add-form__label--hidden");
      fixedInput.classList.toggle("add-form__input-amount--hidden");
    })



      const pauseBtn = emptyTimer.querySelector(".js-pause-timer-btn");
      let index = getTimerIndex(timer.id);
      if (timerData[index].status == "paused") {
        pauseBtn.textContent = "Run";
      }
      pauseBtn.addEventListener("click", function(e){
        let index = getTimerIndex(timer.id);
        pauseHandler(e, index);
      })

      const delBtn = emptyTimer.querySelector(".js-del-timer-btn");
      delBtn.addEventListener("click", function(e){
        let index = getTimerIndex(timer.id);
        deleteTimer(emptyTimer, index);
        if (timerData.length == 0) {
          timersCounter = 0;
          localStorage.setItem("data", []);
        }
      })

      displayInHTML(emptyTimer, timer);
    })
  }

  let initialTimer = createEmptyTimer();
  fillEmptyTimer(initialTimer);
  let addTimerBtn = initialTimer.querySelector(".js-add-timer-btn");
  addTimerBtn.addEventListener("click", showAddTimerWindow);
}


window.onbeforeunload = function(){
  let testkey = "data";
  let testvalue = JSON.stringify(timerData);
  localStorage.setItem(testkey, testvalue)
};
