"use strict";

const playIcon = `
  <svg
    fill="none"
    height="24"
    width="24"
    viewBox="0 0 24 24">
    <polygon points="4.5,2 21,12 4.5,22" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
  </svg>`;

const stopIcon = `
  <svg
    fill="currentColor"
    height="24"
    width="24"
    viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="3" rx="4" ry="4" />
  </svg>`;

const metronomeAudioFile = document.querySelector(".js-metronome-audiofile");
const plusBtn = document.querySelector(".js-metronome-plus-btn");
const minusBtn = document.querySelector(".js-metronome-minus-btn");
const startStopBtn = document.querySelector(".js-metronome-toggle-sound");
const bpmCont = document.querySelector(".js-metronome-bpm-number");

let targetBpm = 60;
let int = undefined;
let isMetronomeRunning = false;


startStopBtn.addEventListener("click", function() {
  isMetronomeRunning = !isMetronomeRunning;
  
  updateInterval();
  if (!int) {
    metronomeAudioFile.pause();
    metronomeAudioFile.currentTime = 0;
  }

  if (isMetronomeRunning) {
    startStopBtn.innerHTML = stopIcon;
  } else {
    startStopBtn.innerHTML = playIcon;
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
  if (targetBpm < 200) {
    targetBpm += 10;
    bpmCont.textContent = targetBpm;
    updateBpm();
  }
})


minusBtn.addEventListener("click", () => {
  if (targetBpm > 30) {
    targetBpm -= 10;
    bpmCont.textContent = targetBpm;
    updateBpm();
  }
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