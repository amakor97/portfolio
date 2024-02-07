"use strict";

const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;
let switchMode = false;

let pressedKeys = [];

const octaveCodes = [
  ["C1", "Db1", "D4"]
]

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");
const editModeToggler = document.querySelector("input[name='toggle-edit-mode']");


const mainOctaveSymbols = ["z", "s", "x"];

let switchModeType = "basic";

modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      console.log({switchModeType}); 
    }
  })
})


let isEditModeActive = false;
editModeToggler.addEventListener("change", () => isEditModeActive = editModeToggler.checked);


function switchBasicMode() {
  console.log(pressedKeys);
  //console.log(e.keyCode);
  let pressedSymbols = pressedKeys.filter(key => key !== "shift");
  console.log(pressedSymbols);
  console.log(pressedSymbols[0]);
  let targetNum = undefined;
  if (typeof(+pressedSymbols[0]) === "number") {
    targetNum = pressedSymbols[0];
  }
  console.error({targetNum});

  if ((+targetNum > 0) && (+targetNum < 10)) {
    console.log("VALID");

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${targetNum}`;
      }
    })
  }

  /*
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
  */
}


function switchAdvancedMode() {
  console.log(pressedKeys);
  let pressedSymbols = pressedKeys.filter(key => key !== "shift");
  console.log(pressedSymbols);
  console.log(pressedSymbols[0]);

  let pressedOctave = undefined;

  if (mainOctaveSymbols.includes(pressedSymbols[0])) {
    pressedOctave = "main";
  }
  console.warn({pressedOctave});
}


function keyHandler() {
  if (pressedKeys.includes("shift")) {
    console.warn("SWITCHING MODE ON");
    switch(switchModeType) {
      case "basic": {
        console.error("BASIC SWITCHING MODE IS ACTIVE");
        //switchBasicMode();
        break;
      }
      case "advanced": {
        console.error("ADVANCED SWITCHING MODE IS ACTIVE");
        if (isEditModeActive === true) {
          console.log("EDITING IS ON");
          //switchAdvancedMode();
        } else {
          console.log("EDITING IS OFF");
        }
        break;
      }
      case "pro": {
        console.error("PRO SWITCHING MODE IS ACTIVE");
        if (isEditModeActive === true) {
          console.log("EDITING IS ON");
        } else {
          console.log("EDITING IS OFF");
        }
        break;
      }
    }

  } else {
    switch(switchModeType) {
      case "basic": {
        console.error("BASIC SWITCHING MODE IS INACTIVE");
        break;
      }
      case "advanced": {
        console.error("ADVANCED SWITCHING MODE IS INACTIVE");
        if (isEditModeActive === true) {
          console.log("EDITING IS ON");

        } else {
          console.log("EDITING IS OFF");
        }
        break;
      }
      case "pro": {
        console.error("PRO SWITCHING MODE IS INACTIVE");
        if (isEditModeActive === true) {
          console.log("EDITING IS ON");
        } else {
          console.log("EDITING IS OFF");
        }
        break;
      }
    }
    console.warn("SWITCHING MODE OFF");
  }

}


function prepareForSwitchAdvancedMode() {

}

/*
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
*/


function switchProMode(e) {
  //console.log("p");
}

//33, 64, 35, 36, 37, 94, 38, 42, 40 
//keycodes of 1-9 with shift
//49-57

window.addEventListener("keydown", kbdHandler);
//window.addEventListener("keydown", kbdHandler);

function kbdHandler(e) {
  //console.log(e.keyCode);
  switch(e.keyCode) {
    case 16: {
      if (!pressedKeys.includes("shift")) {
        console.log(`adding "shift" to`);
        pressedKeys.push("shift");
        keyHandler();
      }
      console.log(pressedKeys);
      //modeHandler(e);
      break;
    }
    default: {
      if (switchModeType === "basic") {
        console.log(e.code.charAt(5), e.keyCode);
        if (typeof(+(e.code.charAt(5))) === "number") {
          console.log("num");
        };
        pressedKeys.push(e.code.charAt(5));
        console.log(pressedKeys);
        if (pressedKeys.includes("shift")) {
          switchBasicMode();
        }
      }
      if ((switchModeType === "advanced") && (isEditModeActive)) {
        console.log("adv");
        const keyText = e.code.charAt(3).toLowerCase();
        console.log({keyText});
        if (!pressedKeys.includes(keyText)) {
          pressedKeys.push(keyText);
        }
        console.log(pressedKeys);
        if (pressedKeys.includes("shift")) {
          switchAdvancedMode();
        }
      } else {
        playSound(e);
      }

    }
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

  console.log(e.keyCode);

  let isPlaying = false;

  //const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-sound="${key.dataset.sound}"]`);


  const keyText = e.code.charAt(3).toLowerCase();
  console.log({keyText});
  if (!pressedKeys.includes(keyText)) {
    pressedKeys.push(keyText);
  }
  console.log(`adding ${keyText} to`);
  console.log(pressedKeys);

  
  if (!audio) {
    return;
  }
  //console.log(key.getAttribute("data-playing"));

  if (key.getAttribute("data-playing") !== "true") {
    audio.load();
    audio.play();
  }

  audio.id = 5;
  key.setAttribute("data-playing", true);
  key.classList.add("key--pressing");
}


window.addEventListener("keyup", function(e) {
  if (e.keyCode === 16) {
    pressedKeys.splice(pressedKeys.indexOf("shift"), 1);
    console.log(pressedKeys);
    keyHandler();
    return;
  }
  const keyText = e.code.charAt(3).toLowerCase();

  if (pressedKeys.includes(keyText)) {
    pressedKeys.splice(pressedKeys.indexOf(keyText), 1);
  }
   console.log(pressedKeys);

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