"use strict";
const wrapper = document.querySelector(".timers-wrapper");
let timerData = [];
let allTimers = [];

let timersCounter = 0;
let type = "circle";


function showAddTimerWindow(e) {
  let timerContainer = e.currentTarget.parentElement;
  fillSettingUpTimer(timerContainer);

  const inputNumber = timerContainer.querySelector(".js-input-number");
  const inputStartTime = timerContainer.querySelector(".js-input-start-time");
  const inputFinishTime = timerContainer.querySelector(".js-input-finish-time");

  const submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();

    let timerInfo = {};
    timerInfo.id = timersCounter;
    timerInfo.timestamp = new Date().getTime(); //
    timerInfo.type = type;
    

    if (!inputStartTime.value) {
      timerInfo.delayedStart = false;
      if (inputNumber.value) {
        timerInfo.startTimestamp =new Date().getTime();
        timerInfo.initialTime = inputNumber.value;
      } else {
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
      console.log("precise start time was entered");
      let start = inputStartTime.value;
      console.log(start);
      let startTimestamp = new Date(start).getTime();
      timerInfo.startTimestamp = new Date(start).getTime();
      console.log(timerInfo.startTimestamp, typeof(timerInfo.startTimestamp));
      
      if (timerInfo.startTimestamp > timerInfo.timestamp) {
        console.log("timer will start soon");
      } else {
        console.log("timer is already running");
      } 
      console.log("start:", timerInfo.startTimestamp);

      if (inputNumber.value) {
        console.log("amount of secs");
        let secs = inputNumber.value;
        let secsInMs = secs*1000;

        timerInfo.finishTimestamp = timerInfo.startTimestamp + secsInMs;
        console.log("finish:", timerInfo.finishTimestamp);
        let dif = timerInfo.finishTimestamp - timerInfo.startTimestamp;
        let dif2 = new Date().getTime();
        //dif = finishTimestamp - dif2;
        timerInfo.initialTime = Math.round(dif/1000);
        timerInfo.status = "running";
        timerInfo.percentValue = 100;
        console.log(timerInfo.percentValue);
      }
      if (inputFinishTime.value) {
        console.log("precise finish time");
        timerInfo.preciseFinish = true;
        let finish = inputFinishTime.value;
        let finishTimestamp = new Date(finish).getTime();
        let dif = finishTimestamp - timerInfo.startTimestamp;
        timerInfo.initialTime = Math.round(dif/1000);
      }
      timerInfo.remainingTime = timerInfo.initialTime;
      timerInfo.remTimeMs = timerInfo.remainingTime*1000;
    }

    
    timerData.push(timerInfo);

    fillReadyTimer(timerContainer, timerInfo.id);

    let newTimer = createEmptyTimer();
    fillEmptyTimer(newTimer);
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

function createEmptyTimer() {
  let newTimer = document.createElement("article");
  newTimer.classList.add("timer");
  wrapper.appendChild(newTimer);
  return newTimer;
}


function fillEmptyTimer(emptyTimer) {
  let addTimerBtn = document.createElement("button");
  addTimerBtn.classList.add("timer__add-timer-btn", "js-add-timer-btn");
  addTimerBtn.textContent = "+";
  addTimerBtn.addEventListener("click", showAddTimerWindow);
  emptyTimer.appendChild(addTimerBtn);
  
  let introText = document.createElement("p");
  introText.classList.add("timer__text");
  introText.textContent = "Add new timer";
  emptyTimer.appendChild(introText);
}


function clearChilds(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}


function fillSettingUpTimer(settingUpTimer) {
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
  forAttrStart.value = `inputStart`;
  inputStartLabel.setAttributeNode(forAttrStart);
  
  let inputStartTime = document.createElement("input");
  inputStartTime.classList.add("add-form__input-time", "js-input-start-time");
  inputStartTime.type = "datetime-local";
  inputStartTime.id = `inputStart`;
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
  inputFinishType2Label.textContent = "Precise finish time";
  finishTypeFieldset.appendChild(inputFinishType2Label);
  let forAttrFinish2 = document.createAttribute("for");
  forAttrFinish2.value = `finishType2`;
  inputFinishType2Label.setAttributeNode(forAttrFinish2);

  let inputFinishType2 = document.createElement("input");
  inputFinishType2.type = "radio";
  inputFinishType2.name = "finishType";
  inputFinishType2.id = "finishType2";
  inputFinishType2Label.appendChild(inputFinishType2);

  
  finishTypeFieldset = document.createElement("fieldset");
  finishTypeFieldset.classList.add("add-form__fieldset");
  addForm.appendChild(finishTypeFieldset);

  let inputNumberLabel = document.createElement("label");
  inputNumberLabel.textContent = "Please, enter the amount of seconds";
  finishTypeFieldset.appendChild(inputNumberLabel);
  let forAttr = document.createAttribute("for");
  forAttr.value = `InputNumber${timersCounter}`;
  inputNumberLabel.setAttributeNode(forAttr);

  let inputNumber = document.createElement("input");
  inputNumber.classList.add("add-form__input-time", "js-input-number");
  inputNumber.type = "number";
  inputNumber.min = "0";
  inputNumber.id = `InputNumber${timersCounter}`;
  inputNumberLabel.appendChild(inputNumber);


  let inputFinishLabel = document.createElement("label");
  inputFinishLabel.textContent = "Please, enter finish datetime";
  finishTypeFieldset.appendChild(inputFinishLabel);
  forAttr = document.createAttribute("for");
  forAttr.value = `InputFinishTime${timersCounter}`;
  inputFinishLabel.setAttributeNode(forAttr);


  let inputFinishTime = document.createElement("input");
  inputFinishTime.classList.add("add-form__input-time", "js-input-finish-time");
  inputFinishTime.type = "datetime-local";
  inputFinishTime.id = `InputFinishTime${timersCounter}`;
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
    inputNumber.disabled = false;
    inputFinishTime.disabled = true;
  })
  inputFinishType2.addEventListener("input", function() {
    inputNumber.value = "";
    inputNumber.disabled = true;
    inputFinishTime.disabled = false;
  })

  settingUpTimer.appendChild(addForm);
}


function fillReadyTimer(readyTimer, id) {
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
  let index = getTimerIndex(id);
  if (timerData[index].status == "paused") {
    pauseBtn.textContent = "Run";
  }
  
  pauseBtn.addEventListener("click", function(e){
    let index = getTimerIndex(id);
    pauseHandler(e, index);
  })
  timerControlsContainer.appendChild(pauseBtn);  

  let delBtn = document.createElement("button");
  delBtn.classList.add("js-del-timer-btn", "btn");
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", function(e){
    let index = getTimerIndex(id);
    deleteTimer(readyTimer, index);
    if (timerData.length == 0) {
      timersCounter = 0;
      localStorage.setItem("data", []);
    }
  })
  timerControlsContainer.appendChild(delBtn);

  readyTimer.appendChild(timerControlsContainer);
}



function calcValues() {
  if (timerData.length !== 0) {
    console.log(timerData[0].startTimestamp, typeof(timerData[0].startTimestamp));
    let timers = document.querySelectorAll(".timer");

    timerData.forEach(function(timer, index) {
    let timestamp = new Date().getTime();
    console.log(timestamp);
    console.log(timer.startTimestamp);
    console.log(timer.percentValue);
    console.log(timer.remainingTime);
    if (timer.delayedStart === true) {
      if (timestamp >= timer.startTimestamp) {
        let currentTimer = timers[index];
          if (timer.status !== "paused") {   
            console.log("calculating");  
            timer.remTimeMs = calcRemainingTimeMs(timer);
            timer.percentValue = calcPercentValue(timer);
            displayInHTML(currentTimer, timer);
          } 
        }
      }
      else {
        let currentTimer = timers[index];
          if (timer.status !== "paused") {   
            console.log("calculating");  
            timer.remTimeMs = calcRemainingTimeMs(timer);
            timer.percentValue = calcPercentValue(timer);
            displayInHTML(currentTimer, timer);
          } 
      }
    })
  }
  setTimeout(calcValues, 100);
}


function displayInHTML(timerContainer, timerSingleData) {
  let canvas = timerContainer.querySelector(".timer__circle");
  let ctx = canvas.getContext("2d");
  let percentContainer = timerContainer.querySelector(".timer__percent");
  let timeContainer = timerContainer.querySelector(".js-remaining-secs");

  if (timerSingleData.percentValue > 0) {
    percentContainer.innerHTML = `${(Math.round(timerSingleData.percentValue*100)/100).toFixed(2)}%`;
    timeContainer.innerHTML = `Rem. time: ${(timerSingleData.remTimeMs/1000).toFixed(3)} secs`;
    drawTimer(ctx, timerSingleData.percentValue);
  } else {
    percentContainer.innerHTML = "Done!";
    timeContainer.innerHTML = "Finished!";
    drawCircle(ctx);
  }
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
  console.log("pause is called");
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

      console.log("start timestamp", timerData[index].startTimestamp);
      console.log("pause delay", timerData[index].pauseDelayTimeMs);
      timerData[index].startTimestamp = timerData[index].startTimestamp + 
      timerData[index].pauseDelayTimeMs;
      console.log("start timestamp",timerData[index].startTimestamp);

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

function drawTimer(ctx, percentValue) {
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.moveTo(100,100);
  ctx.lineWidth = 2;
  ctx.lineTo(100,0);

  if((2*Math.PI/100*(1-percentValue)) < 0) {
    ctx.arc(100,100, 100, 3*Math.PI/2, ((2*Math.PI/100*(100-percentValue)) + 3*Math.PI/2), true);
  }
  ctx.lineTo(100,100);
  ctx.fillStyle = "lightgrey";
  ctx.fill();
  ctx.strokeStyle = "grey";
  ctx.stroke();

  if((2*Math.PI/100*(1-percentValue)) < 0) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(100,100, 100, 3*Math.PI/2, ((2*Math.PI/100*(1-percentValue)) + 3*Math.PI/2), true);
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
}

function drawCircle(ctx) {
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.arc(100, 100, 100, 0, 2*Math.PI);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "grey";
  ctx.stroke();
}


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
    timerData.forEach(function(timer, index) {
      let emptyTimer = createEmptyTimer();
      fillReadyTimer(emptyTimer, timer.id);
      displayInHTML(emptyTimer, timer);
    })
  }

  let initialTimer = createEmptyTimer();
  fillEmptyTimer(initialTimer);
}


window.onbeforeunload = function(){
  let testkey = "data";
  let testvalue = JSON.stringify(timerData);
  localStorage.setItem(testkey, testvalue)
};
