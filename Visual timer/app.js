"use strict";
let timerData = [
  {},
]

//data structure:
// id: 0, 1, 2...
// type: circle/line
// initial time
// remaining time
// status: running/paused


let addTimerBtn = document.querySelector(".js-add-timer-btn");
addTimerBtn.addEventListener("click", showAddTimerWindow);

function showAddTimerWindow(e) {
  console.log(e.currentTarget);
  let timerContainer = e.currentTarget.parentElement;
  console.log(timerContainer);
  let input = document.createElement("input");
  input.type = "number";
  timerContainer.appendChild(input);
}



/***** test *****/

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



