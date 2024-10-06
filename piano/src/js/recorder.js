"use strict";

let audioContext = undefined;
let mediaRecorder = undefined;
let audioChunks = [];

const recordsLimit = 5;

function initializeAudioContext() {
 if (!audioContext) {
   audioContext = new AudioContext();
   let destination = audioContext.createMediaStreamDestination();

   let audioElems = document.querySelectorAll("audio");
   audioElems.forEach(audioElem => {
     const track = audioContext.createMediaElementSource(audioElem);
     track.connect(audioContext.destination);
     track.connect(destination);
   });

   mediaRecorder = new MediaRecorder(destination.stream);

   mediaRecorder.ondataavailable = e => {
     audioChunks.push(e.data);
   };

   
   mediaRecorder.onstop = () => {
     const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
     const audioURL = URL.createObjectURL(audioBlob);
     
     const audioElem = document.createElement("audio");
     audioElem.classList.add("modal__audio", "js-created-record");
     audioElem.src = audioURL;
     audioElem.controls = true;

     const parent = document.querySelector(
      ".js-dialog-recorder-content");

     parent.appendChild(audioElem);

     const recordsCount = document.querySelectorAll(
      ".js-created-record").length;
      if (recordsCount >= recordsLimit) {
        disableBtns();
      }
    };
  }
}


function startRecording() {
  initializeAudioContext();
  audioChunks = [];
  mediaRecorder.start();

  console.log("startR");

  //enableBtns();
}


function stopRecording() {
  mediaRecorder.stop();

  console.log("stopR");

  //enableBtns();
}


export function updateRecorder(action) {
  const recordsCount = document.querySelectorAll(
    ".js-created-record").length;
  if (recordsCount >= recordsLimit) {
    console.log("limit is reached");
    isRecording = false;
    disableBtns();
    return;

  }

  switch(action) {
    case "start": {
      initiateRecording();
      break;
    }
    case "stop": {
      finishRecording();
      break;
    }
    case "toggle": {
      if (!isRecording) {
        initiateRecording();
      } else {
        finishRecording();
      }
      break;
    }
  }

  console.log(action);
  console.log(recordsCount);
}


function initiateRecording() {
  isRecording = true;
  startRecording();
  enableBtns();
}

function finishRecording() {
  isRecording = false;
  stopRecording();
  enableBtns();
}


function enableBtns() {
  console.log(isRecording);
  if (!isRecording) {
    enableBtnsIdle();
    console.log("hy");
  } else {
    enableBtnsRecording();
  }
}


function enableBtnsRecording() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function enableBtnsIdle() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function disableBtns() {
  startBtn.disabled = true;
  stopBtn.disabled = true;
}


let isRecording = false;


export function toggleRecording() {
  if (isRecording) {
    stopRecording();
  } else {
    const recordsCount = document.querySelectorAll(
      ".js-created-record").length;
    console.log(recordsCount);

    if (recordsCount < recordsLimit) {
      startRecording();
    }
  }

  isRecording = !isRecording;
  console.log(isRecording);
}


const startBtn = document.querySelector(".js-recorder-start-btn");
startBtn.addEventListener("click", updateRecorder.bind(null, "start"));

const stopBtn = document.querySelector(".js-recorder-stop-btn");
stopBtn.addEventListener("click", updateRecorder.bind(null, "stop"));