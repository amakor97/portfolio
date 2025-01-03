"use strict";

import { createAudio } from "./audioPlayer.js";
import { showAlert } from "./dialogHandlers.js";

let audioContext = undefined;
let mediaRecorder = undefined;
let audioChunks = [];
let isRecording = false;
const recordsLimit = 5;
let destination = undefined;


function initializeAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
    destination = audioContext.createMediaStreamDestination();

    let audioElems = document.querySelectorAll(".js-audio-recordable");
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

      let audioCont = createAudio(audioURL);
      audioCont.classList.add("js-created-record");
      const parent = document.querySelector(
        ".js-dialog-recorder-content");
      parent.append(audioCont);

      const recordsCount = document.querySelectorAll(
        ".js-created-record").length;
      if (recordsCount >= recordsLimit) {
        disableBtns();
      }
    };
  } else {
    let audioElems = document.querySelectorAll(".js-audio-recordable");
    audioElems.forEach(audioElem => {
      try {
        const track = audioContext.createMediaElementSource(audioElem);
        track.connect(audioContext.destination);
        track.connect(destination);
      } catch (error) {}
    });
  }
}


function startRecording() {
  initializeAudioContext();
  audioChunks = [];
  mediaRecorder.start();
}


function stopRecording() {
  mediaRecorder.stop();
}


export function updateRecorder(action = undefined) {
  const recordsCount = document.querySelectorAll(
    ".js-created-record").length;
  if (recordsCount >= recordsLimit) {
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
  if (!isRecording) {
    enableBtnsIdle();
  } else {
    enableBtnsRecording();
  }
}


function enableBtnsRecording() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  fileInput.disabled = true;
}


function enableBtnsIdle() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  fileInput.disabled = false;
}


function disableBtns() {
  startBtn.disabled = true;
  stopBtn.disabled = true;
  fileInput.disabled = true;
}


const startBtn = document.querySelector(".js-recorder-start-btn");
startBtn.addEventListener("click", updateRecorder.bind(null, "start"));

const stopBtn = document.querySelector(".js-recorder-stop-btn");
stopBtn.addEventListener("click", updateRecorder.bind(null, "stop"));


const fileInput = document.querySelector(".js-audio-file-upload");
fileInput.addEventListener("input", function() {
  const isFileValid = fileInput.files[0].type.includes("audio");

  if (isFileValid) {
    let audioURL = window.URL.createObjectURL(fileInput.files[0]);
    let audioCont = createAudio(audioURL);
    audioCont.classList.add("js-created-record", "js-audio-recordable");
    const parent = document.querySelector(
      ".js-dialog-recorder-content");
    parent.append(audioCont);
  } else {
    showAlert();
  }

  updateRecorder();
})