"use strict";

const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;
let switchMode = false;

window.addEventListener("keydown", kbdHandler);

const octaveCodes = [
  ["C1", "Db1", "D4"]
]


function switchBasicMode(e) {
  console.log(e.keyCode);
  switch(e.keyCode) {
    case 33:
    case 64:
    case 35:
    case 36:
    case 37:
    case 94:
    case 38:
    case 42:
    case 40: {
      console.log("SWITCHING");
      console.log(e.code.charAt(5));
      const targetOctave = e.code.charAt(5) - 1;
      const targetNum = e.code.charAt(5);
      console.log(octaveCodes[targetOctave]);

      const firstOctaveElems = document.querySelectorAll(".keyboard--main .key");
      firstOctaveElems.forEach(key => {
        console.log(key.dataset.sound);
        if (key.dataset.sound) {
          key.dataset.sound = `${key.dataset.sound.slice(0, -1)}${targetNum}`;
        }
        console.log(key.dataset.sound);
      })
      console.log(firstOctaveElems);  
      break;
    }
  }
}

//33, 64, 35, 36, 37, 94, 38, 42, 40 
//keycodes of 1-9 with shift
//49-57

window.addEventListener("keypress", playSound);

function kbdHandler(e) {
  //console.log(e.keyCode);
  switch(e.keyCode) {
    case 16: {
      modeHandler(e);
      break;
    }
    default: break; playSound(e);
  }
}

function modeHandler(e) {
  switchMode = true;
  console.log({switchMode});
  window.addEventListener("keyup", function(e) {
    console.log("up", e.keyCode);
    //const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    //key.classList.remove("key--pressing");
    switchMode = false;
    console.log({switchMode});
  })
}


let newAudio = document.querySelectorAll("audio");
let newAudioList = {};
newAudio.forEach(audioElem => {
  console.log(audioElem.dataset.sound);

})


function playSound(e) {
  if (switchMode === true) {
    switchBasicMode(e);
    return;
  }
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