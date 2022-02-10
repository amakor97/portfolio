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
                                <div class="timer__text js-remaining-secs">Rem. time in secs</div>
                                <div class="timer__settings">
                                  <button>*</button>
                                  <button class="js-pause-timer-btn">P</button>
                                  <button class="js-del-timer-btn">D</button>
                                </div>`;

    let canvas = timerContainer.querySelector(".timer__circle");
    console.log(canvas);
    let ctx = canvas.getContext("2d");

    let timerInfo = {};
    timerInfo.id = timers;
    timerInfo.type = type;
    timerInfo.initialTime = timerInput.value;
    timerInfo.remainingTime = timerInfo.initialTime;
    timerInfo.status = "running";
    timerInfo.timestamp = new Date().getTime();
    timerData.push(timerInfo);
    console.log(timerData);
    let id = timers;

    const pauseBtn = timerContainer.querySelector(".js-pause-timer-btn");
    pauseBtn.addEventListener("click", function(e){
      
      let currentBox = e.currentTarget.parentElement.parentElement;
      let timersBoxes = document.querySelectorAll(".timer");
      console.log(timersBoxes);
      let boxIndex = Array.prototype.indexOf.call(timersBoxes, currentBox);
      console.log("index: ", boxIndex);

      if (timerData[boxIndex].status == "running") {
        timerData[boxIndex].status = "paused";
      } else {
        timerData[boxIndex].status = "running";
      }
    })
    
    
    const delBtn = timerContainer.querySelector(".js-del-timer-btn");
    delBtn.addEventListener("click", function(e){
      let currentBox = e.currentTarget.parentElement.parentElement;
      let timersBoxes = document.querySelectorAll(".timer");
      let boxIndex = Array.prototype.indexOf.call(timersBoxes, currentBox);
      console.log("index: ", boxIndex);
      timerData.splice(boxIndex, 1);
      
      wrapper.removeChild(timersBoxes[boxIndex]);
      console.log(timerData);
    })

    console.log(ctx);
    
    createNewBox();
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

//let title = document.querySelector(".js-title");

function calcValues2() {
  if (timerData.length !== 0) {
    let canvases = document.querySelectorAll(".timer__circle");
    let percentContainers = document.querySelectorAll(".timer__percent");
    let timeInSecsContainers = document.querySelectorAll(".js-remaining-secs");
    timerData.forEach(function(timer, index) {
      if (timer.status !== "paused") {
        let ctx = canvases[index].getContext("2d");
        let percentValue = timer.remainingTime*100/timer.initialTime;
        
        if (percentValue > 0) {
          if (document.hidden) {
            timer.remainingTime -= 1;
          } else {
            timer.remainingTime -= 0.1;
          }
          percentContainers[index].innerHTML = `${Math.floor(percentValue*100)/100}%`;
          //title.innerHTML = timer.remainingTime;
          timeInSecsContainers[index].innerHTML = `Rem. time: ${Math.round(timer.remainingTime)} secs`;
          drawTimer2(ctx, percentValue);
        } else {
          percentContainers[index].innerHTML = "finished";
          drawCircle(ctx);
        }
      }

    })
  }
  if (document.hidden) {
    setTimeout(calcValues2, 0);
  } else {
  setTimeout(calcValues2, 100);
  }
}

calcValues2();

function drawTimer2(ctx, percentValue) {
  ctx.beginPath();
  ctx.clearRect(0, 0, 200, 200);
  ctx.moveTo(100,100);
  ctx.lineWidth = 2;
  ctx.lineTo(100,0);
  //console.log(percentValue);
  //console.log((2*Math.PI/100*(1-percentValue)));
  if((2*Math.PI/100*(1-percentValue)) < 0) {
  //ctx.arc(100, 100, 100, 3*Math.PI/2, ((2*Math.PI/100*percentValue) + 3*Math.PI/2), false);
    ctx.arc(100,100, 100, 3*Math.PI/2, ((2*Math.PI/100*(1-percentValue)) + 3*Math.PI/2), true);
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


function calcValues(ctx, i) {
  let percentValue = timerData[i].remainingTime*100/timerData[i].initialTime;
  let percentContainers = document.querySelectorAll(".timer__percent");
  percentContainers[i].innerHTML = `${percentValue}%`;

  setInterval(function(){
      if(percentValue > 0) {
        percentValue = timerData[i].remainingTime*100/timerData[i].initialTime;
        
        //timerData[i].remainingTime -= 0.1;
        if(percentValue > 0) {
          //drawTimer2(ctx, percentValue);
          //percentContainers[i].innerHTML = `${Math.floor(percentValue*100)/100}%`;
        }
      } else {
        drawCircle(ctx);
        percentContainers[i].innerHTML = "finished";
      }
  }, 100);
}

