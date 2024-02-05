"use strict";

const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;
let switchMode = false;



const octaveCodes = [
  ["C1", "Db1", "D4"]
]

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");



let switchModeType = "basic";

modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      console.log({switchModeType}); 
    }
  })
})

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
      //console.log("SWITCHING");
      //console.log(e.code.charAt(5));
      const targetOctave = e.code.charAt(5) - 1;
      const targetNum = e.code.charAt(5);
      //console.log(octaveCodes[targetOctave]);

      const mainOctaveElems = document.querySelectorAll(".key");
      mainOctaveElems.forEach(key => {
        //console.log(key.classList);
        if (key.classList.contains("js-key-main")) {
          key.dataset.sound = `${key.dataset.sound.slice(0, -1)}${targetNum}`;
        }
        if (key.classList.contains("js-key-sub")) {
          key.dataset.sound = `${key.dataset.sound.slice(0, -1)}${targetNum - 1}`;
        }
        if (key.dataset.sound) {

        }
        //console.log(key.dataset.sound);
      }) 
      break;
    }
  }
}


function prepareForSwitchAdvancedMode() {

}


function switchAdvancedMode(e) {
  console.log("SWWWWW", e.keyCode);
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
      console.log("SWITCHING ADV");
    }
  }
}


function switchProMode(e) {
  //console.log("p");
}

//33, 64, 35, 36, 37, 94, 38, 42, 40 
//keycodes of 1-9 with shift
//49-57

window.addEventListener("keypress", playSound);
window.addEventListener("keydown", kbdHandler);

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


function waiterForKbdInputAdvSwitch(e) {
  console.log(this);
  switchAdvancedMode(e);
  window.removeEventListener("keydown", waiterForKbdInputAdvSwitch);
}

function waiterForKbdInput(e) {
  console.log(this);

  window.addEventListener("keyup", waiterForShiftRelease);
  window.removeEventListener("keydown", waiterForKbdInput);

  window.addEventListener("keydown", waiterForKbdInputAdvSwitch);
}

function waiterForShiftRelease(e) {
  if (e.keyCode === 16) {
    switchMode = false;
    console.warn({switchMode});
    window.removeEventListener("keyup", waiterForShiftRelease);
  }
}

function modeHandler(e) {
  switchMode = true;
  console.warn({switchMode});
  window.addEventListener("keydown", waiterForKbdInput);
  //waiterForKbdInput(e);

  
  //window.removeEventListener("keydown", waiterForKbdInput);
}


let newAudio = document.querySelectorAll("audio");
let newAudioList = {};
newAudio.forEach(audioElem => {
  //console.log(audioElem.dataset.sound);

})


function playSound(e) {
  if (switchMode === true) {
    
    switch(switchModeType) {
      case "basic": {
        switchBasicMode(e);
        break;
      }
      case "advanced": {
        //window.addEventListener("keydown", function(e) {
          //console.log(e.keyCode);
        //})
        //switchAdvancedMode(e);
        break;
      }
      case "pro": {
        switchProMode(e);
        break;
      }

    }

    return;
  }
  console.log(e.keyCode);

  let isPlaying = false;

  //const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);

  //console.log(key.dataset.sound);


  
  if (!audio) {
    return;
  }
  //console.log(key.getAttribute("data-playing"));

  if (key.getAttribute("data-playing") !== "true") {
    //console.log("y");
    audio.load();
    audio.play();
  }

  //console.log(audio);
  audio.id = 5;
  key.setAttribute("data-playing", true);

  key.classList.add("key--pressing");
}


window.addEventListener("keyup", function(e) {
  //console.log("up", e.keyCode);
  if (e.keyCode === 16) {
    return;
  }
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
  //console.log(key);
  //const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (key) {
    key.classList.remove("key--pressing");
    const dataKey = key.dataset.key;
    //console.log(dataKey);
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    //console.log(audio);

    key.setAttribute("data-playing", false);
  }
})