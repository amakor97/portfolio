"use strict";

const audio = document.querySelector("audio");
const keyboard = document.querySelector(".keyboard");

let lowerMode = false;
let switchMode = false;



let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");


const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//let pressedKeys = [];

const octaveCodes = [
  ["C1", "Db1", "D4"]
]

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");
const editModeToggler = document.querySelector("input[name='toggle-edit-mode']");
const noteInput = document.querySelector("input[name='enter-note']");
const noteValidateBtn = document.querySelector(".js-note-validate-btn");

let noteForProMode = undefined;

noteValidateBtn.addEventListener("click", function() {
  //console.log(noteInput.value);
  noteForProMode = noteInput.value;
  console.log({noteForProMode});
})

let advancedModeLayouts = [
  {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  },
  {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  },
  {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  }
]

let proModeLayouts = [
  {
    z: "C4",
    x: "D4",
    c: "E4"
  },
  {
    z: "C4",
    x: "D4",
    c: "E4"
  }
]

let activeAdvancedLayout = 0;
let activeProLayout = 0;

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
editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked;
  console.log({isEditModeActive});
});


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

//window.addEventListener("keydown", kbdHandler);
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
  //if (!pressedKeys.includes(keyText)) {
    //pressedKeys.push(keyText);
  //}
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


function stopPlaying(e) {
  const keyText = e.code.startsWith("D") ? e.code.charAt(5) : e.code.charAt(3).toLowerCase();

  let key = undefined;
  const keys = document.querySelectorAll(".key");
  keys.forEach(keyElem => {
    if (keyElem.textContent === keyText) {
      console.log(keyElem);
      key = keyElem;
    }
  })
  console.log({key});
  if (key) {
    key.classList.remove("key--pressing");
    const dataKey = key.dataset.key;
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);

    key.setAttribute("data-playing", false);
  }
}


/*
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
*/

let pressedKeys = new Set();
console.log(pressedKeys);

function addKeyToArray(e) {
  console.log("press:", e.keyCode);
  switch(e.keyCode) {
    case 16: {
      console.log("aKTA: adding 'shift' to pK");
      pressedKeys.add("shift");
      break;
    }
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57: {
      const digit = e.code.charAt(5);
      console.log(`aKTA: adding '${digit}' to pK`);
      pressedKeys.add(digit);
      break;
    }
    default: {
      const keyText = e.code.charAt(3).toLowerCase();
      console.log(`aKTA: adding '${keyText}' to pK`);
      pressedKeys.add(keyText);
      break;
    }
  }
}

function removeKeyFromArray(e) {
  console.log("release:", e.keyCode);
  switch(e.keyCode) {
    case 16: {
      console.log("rKTA: removing 'shift' from pK");
      pressedKeys.delete("shift");
      break;
    }
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57: {
      const digit = e.code.charAt(5);
      console.log(`rKTA: removing '${digit}' from pK`);
      pressedKeys.delete(digit);
      break;
    }
    default: {
      const keyText = e.code.charAt(3).toLowerCase();
      console.log(`rKTA: removing '${keyText}' from pK`);
      pressedKeys.delete(keyText);
      break;
    }
  }
}

window.addEventListener("keydown", kbdInputHandler);
window.addEventListener("keyup", kbdReleaseHandler);

function kbdInputHandler(e) {
  addKeyToArray(e);
  pressedKeysHandler(e);
}

function kbdReleaseHandler(e) {
  removeKeyFromArray(e);
  stopPlaying(e);
}

function pressedKeysHandler(e) {
  console.log(pressedKeys);
  if (pressedKeys.has("shift")) {
    console.log("SWITCHING MODE");
    switch(switchModeType) {
      case "basic": {
        tmpSwitchBasicMode();
        break;
      }
      case "advanced": {
        tmpSwitchAdvancedMode();
        break;
      }
      case "pro": {
        tmpSwitchProMode();
        break;
      }
    }
  } else {
    playSound(e);
  }
}

function tmpSwitchBasicMode() {
  console.warn("BASIC SWITCH MODE");

  const targetDigit = digits.find(key => pressedKeys.has(key));
  console.log({targetDigit});
  if (targetDigit) {
    console.error(`SWITCHING PIANO TO ${targetDigit} OCTAVE`);
    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${targetDigit}`;
      }
      if (keyElem.classList.contains("js-key-sub")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${targetDigit - 1}`;
      }
    })
  }
}

let pressedOctave = undefined;

function tmpSwitchAdvancedMode() {
  console.warn("ADVANCED SWITCH MODE");
  console.warn({isEditModeActive});
  if (!isEditModeActive) {
    console.error("LIGHT MODE ISN'T COMPLETED YET");
    console.log(pressedKeys);
    console.log(activeAdvancedLayout);

    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
    console.log({pressedSymbolKeys});
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    console.error({targetKey});

    activeAdvancedLayout = targetKey;
    console.log({activeAdvancedLayout});

    //inp for setting activeAdvLYOUT

    console.log(advancedModeLayouts[activeAdvancedLayout]);
    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${advancedModeLayouts[activeAdvancedLayout].main}`;
      }
    })  
  } else {
    console.error("HARD MODE");
    console.error("PRESS ONE OF DISPLAYED KEY");
    if (pressedOctave) {
      console.error("OCTAVE IS FOUND");
      console.warn("new p", pressedKeys);

      const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
      console.log(pressedOctaveKeys);


      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
      console.log({pressedSymbolKeys});
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      console.error({targetKey});
      if (targetKey) {
        pressedOctaveKeys.forEach(keyElem => {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${targetKey}`;
        })

        let octaveName = undefined;
        switch(pressedOctave) {
          case "js-key-main": {
            octaveName = "main";
            console.log(octaveName);
            break;
          }
        }

        advancedModeLayouts[activeAdvancedLayout][octaveName] = +targetKey;
        advInfo.textContent = JSON.stringify(advancedModeLayouts);
        console.log(advancedModeLayouts);
      }


      pressedOctave = undefined;
    } else {
      console.log(pressedKeys);
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
      console.log({pressedSymbolKeys});
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      pressedKeys.delete(targetKey); //optional?
      if (targetKey) {
        const allKeyElems = document.querySelectorAll(".key");
  
        allKeyElems.forEach(keyElem => {
          if (keyElem.textContent === targetKey) {
            //console.log(keyElem);
            //console.log(keyElem.classList);
            keyElem.classList.forEach(className => {
              console.log(className);
              if (className.startsWith("js-key-")) {
                pressedOctave = className;
              }
            })
          }
        })
        console.log({pressedOctave});
  
        const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
        console.log({pressedOctaveKeys});
  
      }
    }
  }
}


let pressedProKeyElem = undefined;


function tmpSwitchProMode() {
  console.warn("PRO SWITCH MODE");
  console.warn({isEditModeActive});
  if (!isEditModeActive) {
    console.error("LIGHT MODE ISN'T COMPLETED YET");
    console.log(pressedKeys);
    console.log(activeProLayout);

    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
    console.log({pressedSymbolKeys});
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    console.error({targetKey});

    if (Number.isInteger(+targetKey)) {
      activeProLayout = targetKey;
    }


    console.log({activeProLayout});
    console.log(proModeLayouts[activeProLayout]);
    const keyElems = document.querySelectorAll(".key");

    
    keyElems.forEach(keyElem => {
      if (keyElem.textContent in proModeLayouts[activeProLayout]) {
        console.log(keyElem.textContent);
        console.log(proModeLayouts[activeProLayout][keyElem.textContent]);
        keyElem.dataset.sound = proModeLayouts[activeProLayout][keyElem.textContent];
      }
    })

  } else {
    console.error("HARD MODE");
    console.error("PRESS ONE OF DISPLAYED KEY");

    console.log(pressedKeys);
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(value => value !== "shift"));
    console.log({pressedSymbolKeys});

    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    pressedKeys.delete(targetKey); //optional?
    if (targetKey) {
      console.log({targetKey});

      const allKeyElems = document.querySelectorAll(".key");

      allKeyElems.forEach(keyElem => {
        if (keyElem.textContent === targetKey) {
          pressedProKeyElem = keyElem;
        }
      })
      console.log(pressedProKeyElem);
      console.log(pressedProKeyElem.textContent);
      pressedProKeyElem.dataset.sound = noteForProMode;

      proModeLayouts[activeProLayout][targetKey] = noteForProMode;
      proInfo.textContent = JSON.stringify(proModeLayouts);
    }
  }
}

