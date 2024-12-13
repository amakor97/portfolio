"use strict";

const metronomeAudioFile = document.querySelector(".js-metronome-audiofile");
const plusBtn = document.querySelector(".js-metronome-plus-btn");
const minusBtn = document.querySelector(".js-metronome-minus-btn");
const startStopBtn = document.querySelector(".js-metronome-toggle-sound");
const bpmCont = document.querySelector(".js-metronome-bpm-number");

let targetBpm = 60;
let int = undefined;


startStopBtn.addEventListener("click", function() {
  updateInterval();
  if (!int) {
    metronomeAudioFile.pause();
    metronomeAudioFile.currentTime = 0;
  }
})


function updateInterval() {
  if (!int) {
    int = setInterval(() => {
      metronomeAudioFile.currentTime = 0;
      metronomeAudioFile.play();
    }, 60 * 1000 / targetBpm);
  } else {
    clearInterval(int);
    int = undefined;
  }

}


plusBtn.addEventListener("click", () => {
  targetBpm += 10;
  bpmCont.textContent = targetBpm;
  updateBpm();
})


minusBtn.addEventListener("click", () => {
  targetBpm -= 10;
  bpmCont.textContent = targetBpm;
  updateBpm();
})


function updateBpm() {
  if (int) {
    clearInterval(int);
    int = setInterval(() => {
      metronomeAudioFile.currentTime = 0;
      metronomeAudioFile.play();
    }, 60 * 1000 / targetBpm);
  } 
}