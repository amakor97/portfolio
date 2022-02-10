"use strict";
const wrapper = document.querySelector(".timers-wrapper");
let timerData = [];

let timers = 0;
let type = "circle";


//data structure:
// id: 0, 1, 2...
// type: circle/line
// initial time
// remaining time
// status: running/paused


let addTimerBtn = document.querySelector(".js-add-timer-btn");
console.log(addTimerBtn);
addTimerBtn.addEventListener("click", showAddTimerWindow);


function showAddTimerWindow(e) {
  let timerContainer = e.currentTarget.parentElement;
  
  timerContainer.innerHTML = `<form class="timer__add-window add-form">
                                <label for="type-circle">Circle
                                  <input type="radio" id="type-circle" name="type" />
                                </label>
                                <label for="type-line">Line
                                  <input type="radio" id="type-line" name="type" />
                                </label>
                                <input class="add-form__input-time" type="number" />
                                <input class="add-form__submit" type="submit" />
                              </form>`;

  const submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();
    const form = e.currentTarget.parentElement;
    const timerInput = form.querySelector(".add-form__input-time");
    
    timerContainer.innerHTML = `<canvas class="timer__circle" width="200" height="200"></canvas>
                                <div class="timer__percent">74,843%</div>
                                <div class="timer__settings">
                                  <button>*</button>
                                </div>`;

    let canvas = timerContainer.querySelector(".timer__circle");
    console.log(canvas);
    let ctx = canvas.getContext("2d");

    console.log(ctx);

    let timerInfo = {};
    timerInfo.id = timers;
    timerInfo.type = type;
    timerInfo.initialTime = timerInput.value;
    timerInfo.remainingTime = timerInfo.initialTime;
    timerInfo.status = 1;
    timerInfo.timestamp = new Date().getTime();
    timerData.push(timerInfo);
    console.log(timerData);
    
    createNewBox();
    calcValues(ctx, timers);
    timers++;
  })
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

function calcValues(ctx, i) {
  let percentValue = timerData[i].remainingTime*100/timerData[i].initialTime;
  let percentContainers = document.querySelectorAll(".timer__percent");
  percentContainers[i].innerHTML = `${percentValue}%`;

  setInterval(function(){
      if(percentValue > 0) {
        percentValue = timerData[i].remainingTime*100/timerData[i].initialTime;
        percentContainers[i].innerHTML = `${Math.floor(percentValue*100)/100}%`;
        console.log(percentValue, i);
        timerData[i].remainingTime -= 0.1;
        if(percentValue > 0) {
          drawTimer2(ctx, percentValue);
        }
      } else {
        drawCircle(ctx);
        percentContainers[i].innerHTML = "finished";
      }
  }, 100);
}

function drawTimer2(ctx, percentValue) {
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.moveTo(100,100);
  ctx.lineWidth = 2;
  ctx.lineTo(100,0);
  console.log(percentValue);
  console.log((2*Math.PI/100*(1-percentValue)));
  if((2*Math.PI/100*(1-percentValue)) < 0) {
  //ctx.arc(100, 100, 100, 3*Math.PI/2, ((2*Math.PI/100*percentValue) + 3*Math.PI/2), false);
    ctx.arc(100,100, 100, 3*Math.PI/2, ((2*Math.PI/100*(1-percentValue)) + 3*Math.PI/2), true);
  }
  ctx.lineTo(100,100);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "green";
  ctx.stroke();

  if((2*Math.PI/100*(1-percentValue)) < 0) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(100,100, 100, 3*Math.PI/2, ((2*Math.PI/100*(1-percentValue)) + 3*Math.PI/2), true);
    ctx.strokeStyle = "green";
    ctx.stroke();
  }
}

function drawCircle(ctx) {
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.arc(100, 100, 100, 0, 2*Math.PI);
  ctx.strokeStyle = "green";
  ctx.stroke();
}


function drawTimer(ctx, percentValue) {
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.moveTo(100,100);
  ctx.lineWidth = 5;
  ctx.lineTo(200,100);
  ctx.arc(100, 100, 100, 0, 2*Math.PI/100*percentValue);
  ctx.lineTo(100,100);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "green";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.arc(100, 100, 100, 0, 2*Math.PI/100*percentValue);
  ctx.strokeStyle = "green";
  ctx.stroke();
}



