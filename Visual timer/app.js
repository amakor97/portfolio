"use strict";
const wrapper = document.querySelector(".timers-wrapper");
let timerData = [];
let allTimers = [];

let timersCounter = 0;
let type = "circle";



let addTimerBtn = document.querySelector(".js-add-timer-btn");
addTimerBtn.addEventListener("click", showAddTimerWindow);


function showAddTimerWindow(e) {
  let timerContainer = e.currentTarget.parentElement;
  
  timerContainer.innerHTML = `<form class="timer__add-window add-form">
                                <!--
                                <label for="type-circle">Circle
                                  <input type="radio" id="type-circle" name="type" />
                                </label>
                                <label for="type-line">Line
                                  <input type="radio" id="type-line" name="type" />
                                </label>
                                -->
                                <input class="add-form__input-time js-input-number" type="number" min="0"/>
                                <button class="add-form__submit btn" type="submit"/>Add timer</button>
                              </form>`;


  const inputNumber = timerContainer.querySelector(".js-input-number");
  inputNumber.addEventListener("input", function(){
    if (this.value < 0) {
      this.value = 0;
    }
  }) 

 
  const submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();
    const form = e.currentTarget.parentElement;
    
    timerContainer.innerHTML = `<canvas class="timer__circle js-timer-canvas" width="200" height="200"></canvas>
                                <div class="timer__text-wrapper">
                                  <div class="timer__percent">Percents</div>
                                  <div class="timer__text timer__text--remaining js-remaining-secs">Rem. time in secs</div>
                                </div>
                                <div class="timer__settings">
                                  <button class="btn">*</button>
                                  <button class="js-pause-timer-btn btn">Pause</button>
                                  <button class="js-del-timer-btn btn">Delete</button>
                                </div>`;


    let timerInfo = {};
    timerInfo.id = timersCounter;
    timerInfo.type = type;
    timerInfo.initialTime = inputNumber.value;
    timerInfo.remainingTime = timerInfo.initialTime;
    timerInfo.status = "running";
    timerInfo.timestamp = new Date().getTime();
    timerData.push(timerInfo);

    
    const pauseBtn = timerContainer.querySelector(".js-pause-timer-btn");
    pauseBtn.addEventListener("click", function(e){
      let index = getTimerIndex(timerInfo.id);
      pauseHandler(index);
    })
    
    
    const delBtn = timerContainer.querySelector(".js-del-timer-btn");
    delBtn.addEventListener("click", function(e){
      wrapper.removeChild(timerContainer);
      let index = getTimerIndex(timerInfo.id);
      timerData.splice(index, 1);
      if (timerData.length == 0) {
        timersCounter = 0;
      }
    })

    
    createNewBox();
    timersCounter++;
  })
}


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



function createNewBox() {
  let newTimer = document.createElement("article");
  newTimer.classList.add("timer");

  newTimer.innerHTML = `<button class="timer__add-timer-btn js-add-timer-btn">+</button>
                        <p class="timer__text">Add new timer</p>`;
  
  let addTimerBtn = newTimer.querySelector(".js-add-timer-btn");
  addTimerBtn.addEventListener("click", showAddTimerWindow);

  wrapper.appendChild(newTimer);
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

calcValues();

function pauseHandler(index) {
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

/* drawing */

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


