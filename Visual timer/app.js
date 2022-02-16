"use strict";
const wrapper = document.querySelector(".timers-wrapper");
let timerData = [];
let allTimers = [];

let timersCounter = 0;
let type = "circle";


//let initialTimer = createEmptyTimer();
  //fillEmptyTimer(initialTimer);


function showAddTimerWindow(e) {
  let timerContainer = e.currentTarget.parentElement;
  fillSettingUpTimer(timerContainer);

  const inputNumber = timerContainer.querySelector(".js-input-number");
  inputNumber.addEventListener("input", function(){
    if (this.value < 0) {
      this.value = 0;
    }
  }) 

  const submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();

    let timerInfo = {};
    timerInfo.id = timersCounter;
    timerInfo.type = type;
    timerInfo.initialTime = inputNumber.value;
    timerInfo.remainingTime = timerInfo.initialTime;
    timerInfo.remTimeMs = timerInfo.remainingTime*1000;
    timerInfo.status = "running";
    timerInfo.timestamp = new Date().getTime();
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

  let inputNumber = document.createElement("input");
  inputNumber.classList.add("add-form__input-time", "js-input-number");
  inputNumber.type = "number";
  inputNumber.min = "0";
  addForm.appendChild(inputNumber);

  let dataSubmitBtn = document.createElement("button");
  dataSubmitBtn.classList.add("add-form__submit", "btn");
  dataSubmitBtn.type = "submit";
  dataSubmitBtn.textContent = "Add timer";
  addForm.appendChild(dataSubmitBtn);

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
  
  pauseBtn.addEventListener("click", function(e){
    let index = getTimerIndex(id);
    pauseHandler(index);
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
    let canvases = document.querySelectorAll(".timer__circle");
    let percentContainers = document.querySelectorAll(".timer__percent");
    let timeInSecsContainers = document.querySelectorAll(".js-remaining-secs");
    
    timerData.forEach(function(timer, index) {
      if (timer.status !== "paused") {
        let ctx = canvases[index].getContext("2d");
        let currentTimestamp = new Date().getTime();
        let timeDif = currentTimestamp - timer.timestamp;
        let remTimeMs = timer.initialTime*1000 - timeDif;
        timer.remainingTime = remTimeMs/1000;
        let percentValue = timer.remainingTime*100/timer.initialTime;

        if (percentValue > 0) {
          timeInSecsContainers[index].innerHTML = `Rem. time: ${(remTimeMs/1000).toFixed(3)} secs`;
          percentContainers[index].innerHTML = `${(Math.round(percentValue*100)/100).toFixed(2)}%`;
          drawTimer(ctx, percentValue);
        } else {
          percentContainers[index].innerHTML = "finished";
          timeInSecsContainers[index].innerHTML = `finished`;
          drawCircle(ctx);
        }
      }
    })
  }
  setTimeout(calcValues, 100);
}


function displayInHTML() {
  if (timerData.length !== 0) {
    let canvases = document.querySelectorAll(".timer__circle");
    let percentContainers = document.querySelectorAll(".timer__percent");
    let timeInSecsContainers = document.querySelectorAll(".js-remaining-secs");

    timerData.forEach(function(timer, index) {
      
      //percentContainers[index].innerHTML = `${(Math.round(timer.percentValue*100)/100).toFixed(2)}%`;

      if (timer.status !== "paused") {     //fix that?
        let ctx = canvases[index].getContext("2d");
        timer.remTimeMs = calcRemainingTimeMs(timer);
        timer.percentValue = calcPercentValue(timer);

        if (timer.percentValue > 0) {
          timeInSecsContainers[index].innerHTML = `Rem. time: ${(timer.remTimeMs/1000).toFixed(3)} secs`;
          percentContainers[index].innerHTML = `${(Math.round(timer.percentValue*100)/100).toFixed(2)}%`;
          drawTimer(ctx, timer.percentValue);
        } else {
          percentContainers[index].innerHTML = "finished";
          timeInSecsContainers[index].innerHTML = "finished";
          drawCircle(ctx);
        }
      } /*else {
        percentContainers[index].innerHTML = "paused";
        timeInSecsContainers[index].innerHTML = "paused";
      }*/
    })
  }
  setTimeout(displayInHTML, 100);
}

let calcPercentValue = (timer) => timer.remainingTime*100/timer.initialTime;

function calcRemainingTimeMs(timer) {
  let currentTimestamp = new Date().getTime();
  let timeDif = currentTimestamp - timer.timestamp;
  let remTimeMs = timer.initialTime*1000 - timeDif;
  timer.remainingTime = remTimeMs/1000;
  return remTimeMs;
}

//calcValues();
displayInHTML();

function pauseHandler(index) {
  console.log("pause handler is called");
  if (timerData[index].status == "running") {
    timerData[index].status = "paused";
    timerData[index].timestampWhenPaused = new Date().getTime();
  } else {
    timerData[index].status = "running";
    timerData[index].timestampWhenRunned = new Date().getTime();
    
    timerData[index].pauseDelayTimeMs = 
    timerData[index].timestampWhenRunned - 
    timerData[index].timestampWhenPaused;
    
    timerData[index].timestamp += 
    timerData[index].pauseDelayTimeMs;
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


/* test localStorage */


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

      let canvas = emptyTimer.querySelector(".timer__circle");
      let ctx = canvas.getContext("2d");
      let percentContainer = emptyTimer.querySelector(".timer__percent");
      let timeInSecsContainer = emptyTimer.querySelector(".js-remaining-secs");
      
      if (timer.percentValue > 0) {
        timeInSecsContainer.innerHTML = `Rem. time: ${(timer.remTimeMs/1000).toFixed(3)} secs`;
        percentContainer.innerHTML = `${(Math.round(timer.percentValue*100)/100).toFixed(2)}%`;
        drawTimer(ctx, timer.percentValue);
      } else {
        percentContainer.innerHTML = "finished";
        timeInSecsContainer.innerHTML = "finished";
        drawCircle(ctx);
      }

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
