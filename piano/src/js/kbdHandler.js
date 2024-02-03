"use strict";

const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;

window.addEventListener("keypress", playSound);

function kbdHandler(e) {
  console.log(e.keyCode);
  switch(e.keyCode) {
    case 16: {
      modeHandler(e);
      break;
    }
    default: playSound(e);
  }
}

function modeHandler(e) {
  lowerMode = true;
  console.log({lowerMode});
  window.addEventListener("keyup", function(e) {
    console.log("up", e.keyCode);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    key.classList.remove("key--pressing");
  })
}


let newAudio = document.querySelectorAll("audio");
let newAudioList = {};
newAudio.forEach(audioElem => {
  console.log(audioElem.dataset.sound);

})


function playSound(e) {
  console.log(e.keyCode);

  let isPlaying = false;

  //const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);

  console.log(key.dataset.sound);


  
  if (!audio) {
    return;
  }
  console.log(key.getAttribute("data-playing"));

  if (key.getAttribute("data-playing") !== "true") {
    console.log("y");
    audio.load();
    audio.play();
  }

  console.log(audio);
  audio.id = 5;
  key.setAttribute("data-playing", true);

  key.classList.add("key--pressing");
}


window.addEventListener("keyup", function(e) {
  //console.log("up", e.keyCode);
  //console.log("up", e.code);
  const keyText = e.code.charAt(3).toLowerCase();
  console.log({keyText});
  let key = undefined;
  const keys = this.document.querySelectorAll(".key");
  keys.forEach(keyElem => {
    if (keyElem.textContent === keyText) {
      key = keyElem;
    }
  })
  console.log(key);
  //const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (key) {
    key.classList.remove("key--pressing");
    const dataKey = key.dataset.key;
    console.log(dataKey);
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    console.log(audio);

    key.setAttribute("data-playing", false);
    //audio.load();

    //audio.pause();
    //audio.currentTime = 0;
    //audio.load();
  }
})