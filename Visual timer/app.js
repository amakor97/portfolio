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
  inputNumber.addEventListener("input", function(){
    if ((this.value) && (this.value < 0)) {
      this.value = 0;
    }
  })

  const inputFinishTime = timerContainer.querySelector(".js-input-finish-time");
  inputFinishTime.addEventListener("input", function(){

  })

  const submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();

    let timerInfo = {};
    timerInfo.id = timersCounter;
    timerInfo.timestamp = new Date().getTime();
    timerInfo.type = type;
    if (inputNumber.value) {
      timerInfo.initialTime = inputNumber.value;
    } else {
      console.log(inputFinishTime.value);
      let finish = inputFinishTime.value;
      console.log(new Date(finish).getTime());
      let finishTimestamp = new Date(finish).getTime();
      let dif = finishTimestamp - timerInfo.timestamp;
      console.log(dif);
      console.log(Math.floor(dif/1000));
      timerInfo.initialTime = Math.round(dif/1000);
    }
    timerInfo.remainingTime = timerInfo.initialTime;
    timerInfo.remTimeMs = timerInfo.remainingTime*1000;
    timerInfo.status = "running";
    
    console.log(timerInfo.timestamp);
    timerInfo.percentValue = 100;
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
  console.log(id);
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

  let inputFinishType1Label = document.createElement("label");
  inputFinishType1Label.textContent = "Amount of seconds";
  addForm.appendChild(inputFinishType1Label);
  let forAttrFinish1 = document.createAttribute("for");
  forAttrFinish1.value = `finishType1`;
  inputFinishType1Label.setAttributeNode(forAttrFinish1);

  let inputFinishType1 = document.createElement("input");
  inputFinishType1.type = "radio";
  inputFinishType1.name = "finishType";
  inputFinishType1.id = "finishType1";
  addForm.appendChild(inputFinishType1);
  inputFinishType1.addEventListener("input", function() {

  })

  let inputFinishType2Label = document.createElement("label");
  inputFinishType2Label.textContent = "Precise finish time";
  addForm.appendChild(inputFinishType2Label);
  let forAttrFinish2 = document.createAttribute("for");
  forAttrFinish2.value = `finishType1`;
  inputFinishType2Label.setAttributeNode(forAttrFinish2);

  let inputFinishType2 = document.createElement("input");
  inputFinishType2.type = "radio";
  inputFinishType2.name = "finishType";
  inputFinishType2.id = "finishType2";
  addForm.appendChild(inputFinishType2);

  let inputNumberLabel = document.createElement("label");
  inputNumberLabel.textContent = "Please, enter the amount of seconds";
  addForm.appendChild(inputNumberLabel);
  let forAttr = document.createAttribute("for");
  forAttr.value = `InputNumber${timersCounter}`;
  inputNumberLabel.setAttributeNode(forAttr);

  let inputNumber = document.createElement("input");
  inputNumber.classList.add("add-form__input-time", "js-input-number");
  inputNumber.type = "number";
  inputNumber.min = "0";
  inputNumber.id = `InputNumber${timersCounter}`;
  addForm.appendChild(inputNumber);

  let inputFinishTime = document.createElement("input");
  inputFinishTime.classList.add("add-form__input-time", "js-input-finish-time");
  inputFinishTime.type = "datetime-local";
  addForm.appendChild(inputFinishTime);

  let dataSubmitBtn = document.createElement("button");
  dataSubmitBtn.classList.add("add-form__submit", "btn");
  dataSubmitBtn.type = "submit";
  dataSubmitBtn.textContent = "Add timer";
  addForm.appendChild(dataSubmitBtn);


  inputFinishType1.addEventListener("input", function() {
    console.log("secs");
    inputNumber.disabled = false;
    inputFinishTime.disabled = true;
  })
  inputFinishType2.addEventListener("input", function() {
    console.log("time");  
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
    let timers = document.querySelectorAll(".timer");

    timerData.forEach(function(timer, index) {
    let currentTimer = timers[index];
      if (timer.status !== "paused") {     
        timer.remTimeMs = calcRemainingTimeMs(timer);
        timer.percentValue = calcPercentValue(timer);
        displayInHTML(currentTimer, timer);
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

function calcRemainingTimeMs(timer) {
  let currentTimestamp = new Date().getTime();
  let timeDif = currentTimestamp - timer.timestamp;
  let remTimeMs = timer.initialTime*1000 - timeDif;
  timer.remainingTime = remTimeMs/1000;
  return remTimeMs;
}

calcValues();

function pauseHandler(e, index) {
  console.log("pause handler is called");
  let btn = e.currentTarget;
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

    btn.textContent = "Pause";
  }
}


function deleteTimer(timer, index) {
  wrapper.removeChild(timer);
  timerData.splice(index, 1);
}


/* drawing functions */

function drawTimer(ctx, percentValue) {
  //console.log(2*Math.PI/100*(1-percentValue));  //there is a problem when sometimes the circle is not as accurate as it should be
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.moveTo(100,100);
  ctx.lineWidth = 2;
  ctx.lineTo(100,0);


  if((2*Math.PI/100*(1-percentValue)) < 0) {
  //ctx.arc(100, 100, 100, 3*Math.PI/2, ((2*Math.PI/100*percentValue) + 3*Math.PI/2), false);
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
  console.log(testValue);
  if ((testValue) && (testValue.length > 0)) {
    timerData = [...testValue];
    timersCounter = timerData.length;
  } else {
    timerData = [];
  }

  if (timerData.length > 0) {

    timerData.forEach(function(timer, index) {
      let emptyTimer = createEmptyTimer();
      console.log(timer.id);
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
