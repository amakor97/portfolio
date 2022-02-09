"use strict";
const wrapper = document.querySelector(".timers-wrapper");
let timerData = []

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
//addTimerBtn.addEventListener("click", addNewTimer);




function showAddTimerWindow(e) {
  let timerContainer = e.currentTarget.parentElement;
  timerContainer.innerHTML = `<form class="timer__add-window add-form">
  <label for="type-circle"
    >Circle
    <input type="radio" id="type-circle" name="type" />
  </label>
  <label for="type-line"
    >Line
    <input type="radio" id="type-line" name="type" />
  </label>
  <input class="add-form__input-time" type="number" />
  <input class="add-form__submit" type="submit" />
</form>`;

  let submitBtn = timerContainer.querySelector(".add-form__submit");
  submitBtn.addEventListener("click", function(e){
    e.preventDefault();
    let form = e.currentTarget.parentElement;
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
    /*ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,100);
ctx.arc(100, 100, 100, 0, 2*Math.PI/100*77);
ctx.lineTo(100,100);
ctx.stroke();*/

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
    //drawTimer(ctx, timers);
    timers++;
  })

}

function drawTimer(ctx, i) {
  let percentValue = timerData[i].remainingTime*100/timerData[i].initialTime;;
  
  setInterval(function(){
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,100);
ctx.arc(100, 100, 100, 0, 2*Math.PI/100*percentValue);
ctx.lineTo(100,100);
ctx.stroke();
  }, 1000);
}

function addNewTimer() {
  let timerInfo = {};
  timerInfo.id = ++timers;
  timerInfo.type = type;
  timerInfo.initialTime = 100;
  timerInfo.remainingTime = 100;
  timerInfo.status = 1;
  timerData.push(timerInfo);
  console.log(timerData);
}

function createNewBox() {
  let newTimer = document.createElement("article");
  newTimer.classList.add("timer");
  newTimer.innerHTML = `<button class="timer__add-timer-btn js-add-timer-btn">+</button>
  <p class="timer__text">Add new timer</p>`;
  
  let addTimerBtn = newTimer.querySelector(".js-add-timer-btn");
  console.log(addTimerBtn);
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
        
        ctx.beginPath();
        ctx.clearRect(0, 0, 200, 200);
        ctx.moveTo(100,100);
        ctx.lineTo(200,100);
        ctx.arc(100, 100, 100, 0, 2*Math.PI/100*percentValue);
        ctx.lineTo(100,100);
        ctx.stroke();

      } else {
        percentContainers[i].innerHTML = "finished";
      }
  }, 100);
}

/*
let submitBtn = document.querySelector(".add-form__submit");
submitBtn.addEventListener("click", function(e){
  e.preventDefault();
  let form = e.currentTarget.parentElement;
  const timerInput = form.querySelector(".add-form__input-time");
  let timerContainer = form.parentElement;
  timerContainer.innerHTML = `<div class="timer__circle">
  <div class="timer__circle-segment"></div>
</div>
<!--<canvas class="timer__circle"></canvas>-->
<div class="timer__percent">74,843%</div>
<div class="timer__settings">
  <button>*</button>
</div>`;

  let timerInfo = {};
  timerInfo.id = ++timers;
  timerInfo.type = type;
  timerInfo.initialTime = timerInput.value;
  timerInfo.remainingTime = timerInfo.initialTime;
  timerInfo.status = 1;
  timerInfo.timestamp = new Date().getTime();
  timerData.push(timerInfo);
  console.log(timerData);
})*/

/***** test *****/
/*
let percentContainer = document.querySelector(".timer__percent");


let time = prompt("input time in secs", 100);
console.log(time);
let initialTime = time;
let percentValue = undefined;
//initialTime/100*time;
setInterval(function(){
  
  percentValue = time*100/initialTime;
  console.log("time:", time);
  console.log("percent:", percentValue);
  percentContainer.innerHTML = `${percentValue}%`;

  time -= 1;
}, 1000);

*/



