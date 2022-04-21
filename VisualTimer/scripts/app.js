"use strict";
const wrapper = document.querySelector(".timers-wrapper");
export let timerData = [];


/* drawing functions */

import { drawTimer } from "./drawing.js";
import { drawCircle } from "./drawing.js";


/* filling functions */

import { createEmptyTimer } from "./DOMManipulations.js";
import { fillEmptyTimer } from "./DOMManipulations.js";
import { fillSettingUpTimer } from "./DOMManipulations.js";
import { fillReadyTimer } from "./DOMManipulations.js";


/* localStorage functions */

window.onload = function() {
  let testValue = JSON.parse(localStorage.getItem("data_vt"));
  if ((testValue) && (testValue.length > 0)) {
    timerData = [...testValue];
  } else {
    timerData = [];
  }

  if (timerData.length > 0) {
    timerData.forEach(function(timer) {
      let emptyTimer = createEmptyTimer();
      fillReadyTimer(emptyTimer, timer.id);

      const pauseBtn = emptyTimer.querySelector(".js-pause-timer-btn");
      let index = getTimerIndex(timer.id);
      if (timerData[index].status == "paused") {
        pauseBtn.textContent = "Run";
      }

      displayInHTML(emptyTimer, timer);
    })
  }

  let initialTimer = createEmptyTimer();
  fillEmptyTimer(initialTimer);
}


window.onbeforeunload = function(){
  let testkey = "data_vt";
  let testvalue = JSON.stringify(timerData);
  localStorage.setItem(testkey, testvalue);
};


/* main */

export function createNewTimer(e) {
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


  const submitBtn = timerContainer.querySelector(".js-create-ready-timer");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();

    let timerInfo = {};
    timerInfo.id = getNewId();
    timerInfo.timestamp = new Date().getTime(); 
    timerInfo.fixedNumber = inputFixed.value;

    if (!inputStartTime.value) {
      timerInfo.delayedStart = false;
      timerInfo.startTimestamp = new Date().getTime();
      if (inputNumber.value) {
        //timerInfo.startTimestamp = new Date().getTime();
        timerInfo.initialTime = inputNumber.value;
      } 
      else if ((inputDays.value) || (inputHours.value) || (inputMins.value) 
      || (inputSecs.value)) {
        //timerInfo.startTimestamp = new Date().getTime();
        timerInfo.initialTime = inputDays.value*60*60*24 
        + +inputHours.value*60*60 + +inputMins.value*60 + +inputSecs.value;
        //timerInfo.status = "running";
        //timerInfo.percentValue = 100;
      }
      else if (inputFinishTime.value) {
        timerInfo.preciseFinish = true;
        //timerInfo.startTimestamp = new Date().getTime();
        let finish = inputFinishTime.value;
        timerInfo.finishTimestamp = new Date(finish).getTime();
        let dif = timerInfo.finishTimestamp - timerInfo.timestamp;
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
      let start = inputStartTime.value;
      timerInfo.startTimestamp = new Date(start).getTime();
      
      if (timerInfo.startTimestamp > timerInfo.timestamp) {
        timerInfo.notStartedYet = true;
        timerInfo.timeToStart = timerInfo.startTimestamp 
        - timerInfo.timestamp;
      } else {
        timerInfo.notStartedYet = false;
      }

      if (inputNumber.value) {
        let secs = inputNumber.value;
        let secsInMs = secs*1000;

        timerInfo.finishTimestamp = timerInfo.startTimestamp + secsInMs;
        let dif = timerInfo.finishTimestamp - timerInfo.startTimestamp;
        //timerInfo.initialTime = Math.round(dif/1000);
        timerInfo.initialTime = Math.round(secs);
        timerInfo.status = "running";
        //timerInfo.percentValue = 100;
      }

      else if ((inputDays.value) || (inputHours.value) || (inputMins.value) 
      || (inputSecs.value)) {
        console.log("xx");
        ////// fix here 
        let secsAmount = inputDays.value*60*60*24 + +inputHours.value*60*60 
        + +inputMins.value*60 + +inputSecs.value;
        timerInfo.finishTimestamp = timerInfo.startTimestamp 
        + secsAmount*1000;
        let dif = timerInfo.finishTimestamp - timerInfo.startTimestamp;
        //timerInfo.initialTime = Math.round(dif/1000);
        timerInfo.initialTime = Math.round(secsAmount);
        timerInfo.status = "running";
        //timerInfo.percentValue = 100;
      }

      else {
        timerInfo.preciseFinish = true;
        let finish = inputFinishTime.value;
        timerInfo.finishTimestamp = new Date(finish).getTime();
        if (timerInfo.startTimestamp >= timerInfo.finishTimestamp) {
          timerInfo.finishTimestamp = timerInfo.startTimestamp;
        }
        let dif = timerInfo.finishTimestamp - timerInfo.startTimestamp;
        timerInfo.initialTime = Math.round(dif/1000);
        //timerInfo.percentValue = 100;
        //timerInfo.status = "Running"; 
      }

      //timerInfo.status = "running"; 
      timerInfo.percentValue = 100;
      timerInfo.remainingTime = timerInfo.initialTime;
      timerInfo.remTimeMs = timerInfo.remainingTime*1000;
    }

    timerData.push(timerInfo);

    let testkey = "data_vt";
    let testvalue = JSON.stringify(timerData);
    localStorage.setItem(testkey, testvalue);

    fillReadyTimer(timerContainer, timerInfo.id);

    let newTimer = createEmptyTimer();
    fillEmptyTimer(newTimer);
  })
}


/* calculating functions */

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
  timerData[index].timeToStart = timerData[index].startTimestamp 
  - currentTimestamp;
}


let calcPercentValue = (timer) => timer.remainingTime*100/timer.initialTime;


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


/* displaying functions */

function displayTimeToStart(timerContainer, timerSingleData) {
  displayTime(timerContainer, timerSingleData.timeToStart);
}


function displayInHTML(timerContainer, timerSingleData) {
  let canvas = timerContainer.querySelector(".timer__circle");
  let ctx = canvas.getContext("2d");
  let percentContainer = timerContainer.querySelector(".timer__percent");
  let timeContainer = timerContainer.querySelector(".js-remaining-secs");

  if (timerSingleData.percentValue > 0) {
    percentContainer.innerHTML = 
    `${(Math.round(timerSingleData.percentValue*100000)/100000).toFixed(timerSingleData.fixedNumber)}%`;
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
  let remainingMins = Math.floor(remTimeMs/1000/60 - remainingDays*60*24 
    - remainingHours*60);
  let remainingSecs = (remTimeMs/1000 - remainingDays*60*60*24 
    - remainingHours*60*60 - remainingMins*60).toFixed(3);

  if (remainingDays > 0) {
    timeContainer.innerHTML = `Rem. time: ${remainingDays} days, 
    ${remainingHours} hours, ${remainingMins} mins, ${remainingSecs} secs`;
  } else if (remainingHours > 0) {
    timeContainer.innerHTML = `Rem. time: ${remainingHours} hours, 
    ${remainingMins} mins, ${remainingSecs} secs`;
  } else if (remainingMins > 0) {
    timeContainer.innerHTML = `Rem. time: ${remainingMins} mins, 
    ${remainingSecs} secs`;
  } else {
    timeContainer.innerHTML = `Rem. time: ${remainingSecs} secs`;
  }
}


/* first calculating */

calcValues();


/* support functions */

export function pauseHandler(e, index) {
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
  
  let testkey = "data_vt";
  let testvalue = JSON.stringify(timerData);
  localStorage.setItem(testkey, testvalue);
}


function getNewId() {
  let newId = 0;
  if (timerData.length > 0) {
    for (let i = 0; i < timerData.length;) {
      if (newId == timerData[i].id) {
        newId++;
        i = 0;
      } else {
        i++;
      }
    }
  }
  return newId;
}


export function getTimerIndex(id) {  
  let timerIndex = undefined;
  timerData.forEach(function(timer, index){
    if (timer.id == id) { 
      timerIndex = index;
    }
  })
  return timerIndex;
}


export function deleteTimer(timer, index) {
  wrapper.removeChild(timer);
  timerData.splice(index, 1);
}



