"use strict";

let audioContext = undefined;
let mediaRecorder = undefined;
let audioChunks = [];


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
     audioElem.src = audioURL;
     audioElem.controls = true;
     document.body.appendChild(audioElem);
   };
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