"use strict";

import { createAudio } from "./audioPlayer.js";

let audioContext = undefined;
let mediaRecorder = undefined;
let audioChunks = [];

const recordsLimit = 5;

let destination = null;

function initializeAudioContext() {
 if (!audioContext) {
   audioContext = new AudioContext();
   destination = audioContext.createMediaStreamDestination();

   console.log(audioContext);
   console.log(audioContext.destination);
   console.log(destination);

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
      //audioElem.classList.add("modal__audio", "js-created-record");
      audioElem.src = audioURL;
      audioElem.controls = true;

      let audioCont = createAudio(audioURL);
      audioCont.classList.add("js-created-record");
      const parent = document.querySelector(
      ".js-dialog-recorder-content");

      const audioDiv = createAudioBlock(audioElem);
      //parent.appendChild(audioDiv);
        parent.append(audioCont);

     const recordsCount = document.querySelectorAll(
      ".js-created-record").length;
      if (recordsCount >= recordsLimit) {
        disableBtns();
      }
    };
  } else {
    let audioElems = document.querySelectorAll("audio");
    audioElems.forEach(audioElem => {
      try {
        const track = audioContext.createMediaElementSource(audioElem);
        track.connect(audioContext.destination);
        track.connect(destination);
        console.log(track);
      } catch (error) {}
    });
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
  } else {
    enableBtns();
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
    default: {
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
}



function createAudioBlock(audioElem) {
  const div = document.createElement("div");
  div.classList.add("modal__audio-cont");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    console.log(div);
    console.log(div.parentElement);
    div.parentElement.removeChild(div);
    updateRecorder("delete");
  })

  div.append(audioElem);
  div.append(deleteBtn);

  return div;
}



const startBtn = document.querySelector(".js-recorder-start-btn");
startBtn.addEventListener("click", updateRecorder.bind(null, "start"));

const stopBtn = document.querySelector(".js-recorder-stop-btn");
stopBtn.addEventListener("click", updateRecorder.bind(null, "stop"));