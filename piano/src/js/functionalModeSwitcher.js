"use strict";

import { pressedKeys } from "./inputHandler.js";

import { updateSoundHints, updateKbdHints, 
  restoreKbdHints, updateDisabledKeys } from "./hintsUpdater.js";

import { assignModeCont, noteInputCont, toggleVisualMode, toggleFullKbd, showFullKbd, hideFullKbd, changeStylesForOneRow, changeStylesForTwoRows, visualMode } from "./visualModeChanger.js";

let basInfo = document.querySelector(".bas-info");
let advInfo = document.querySelector(".adv-info");
let proInfo = document.querySelector(".pro-info");

let digits = ["0", "1", "2", "3", "4", "5", "6"];
let tDigits = ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"];

export function switchBasicMode() {
  let targetDigit = tDigits.find(key => pressedKeys.has(key));

  if (targetDigit) {
    targetDigit = targetDigit.slice(5, 6);
    activeBasicOffset = +targetDigit;
    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.classList.contains("js-key-main")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit}`;
      }
      if (keyElem.classList.contains("js-key-sub")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit - 1}`;
      }
      if (keyElem.classList.contains("js-key-sup")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 1}`;
      }
      if (keyElem.classList.contains("js-key-super")) {
        keyElem.dataset.sound = 
          `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 2}`;
      }
    })

    let displayedHint = `${targetDigit - 1} - ${targetDigit} - ${+targetDigit + 1}`;
    basInfo.textContent = displayedHint;
  }



  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


function createAdvancedModeSingleLayout() {
  let layout = {
    sub: 3,
    main: 4,
    sup: 5,
    super: 6
  };
  return layout;
}


function createAdvancedModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createAdvancedModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}


let advancedModeLayouts = createAdvancedModeLayouts(5);

let noteForProMode = undefined;

const modeSelectors = document.querySelectorAll("input[name='select-switch-mode']");
export const editModeToggler = document.querySelector("input[name='toggle-edit-mode']");
export const noteInput = document.querySelector("input[name='enter-note']");
const noteValidateBtn = document.querySelector(".js-note-validate-btn");


noteValidateBtn.addEventListener("click", function() {
  if (noteInput.value.length === 3) {
    noteInput.value = noteInput.value.slice(0, 1).toUpperCase() + 
      noteInput.value.slice(1).toLowerCase();
  } else {
    noteInput.value = noteInput.value.toUpperCase();
  }

  const regex = /^[a-gA-G]b?[0-8]$/;
  console.log(regex.test(noteInput.value));
  if (noteInput.value.match(/([a-h]|[A-H])[b|B]?[0-8]/)) {
    noteForProMode = noteInput.value;
  }

})


function createProModeSingleLayout() {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]");  
  let layout = {};

  playableKbdKeys.forEach(kbdKey => {
    let key = kbdKey.dataset.key;
    let sound = kbdKey.dataset.sound;
    layout[key] = sound;
  })
  return layout;
}


function createProModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createProModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}


let proModeLayouts = createProModeLayouts(2);

let activeBasicOffset = 4;
export let activeAdvancedLayout = 0;
let activeProLayout = 0;
export let switchModeType = "basic";
export let isEditModeActive = false;


modeSelectors.forEach(input => {
  input.addEventListener("change", function() {
    if (input.checked) {
      switchModeType = input.value;
      updateMode();
    }
  })
})

function updateMode() {
  const keyElems = document.querySelectorAll(".key");
  switch(switchModeType) {
    case "basic": {
      //switchModeCont.classList.remove("control-panel__switch-mode-cont--hided");
      //assignModeCont.classList.add("control-panel__switch-mode-cont--hided");
      noteInputCont.classList.add("control-panel__switch-mode-cont--hided");

      keyElems.forEach(keyElem => {
        if (keyElem.classList.contains("js-key-main")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset}`;
        }
        if (keyElem.classList.contains("js-key-sub")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset - 1}`;
        }
        if (keyElem.classList.contains("js-key-sup")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset + 1}`;
        }
        if (keyElem.classList.contains("js-key-super")) {
          keyElem.dataset.sound = 
            `${keyElem.dataset.sound.slice(0, -1)}${activeBasicOffset + 2}`;
        }
      })
      break;
    }
    case "advanced": {
      //assignModeCont.classList.remove("control-panel__switch-mode-cont--hided");
      noteInputCont.classList.add("control-panel__switch-mode-cont--hided");

      keyElems.forEach(keyElem => {
        let targetClass = Array.from(keyElem.classList).find(keyClass => ["js-key-main", "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
        if (targetClass) {
          targetClass = targetClass.slice(7);
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
        }
      })
      break;
    }
    case "pro": {
      //assignModeCont.classList.remove("control-panel__switch-mode-cont--hided");
      noteInputCont.classList.remove("control-panel__switch-mode-cont--hided");

      keyElems.forEach(keyElem => {
        if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
          keyElem.dataset.sound = proModeLayouts[activeProLayout][keyElem.dataset.key];
        }
      })
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}

let prevOctave = undefined;
let prevOctaveNum = undefined;
let targetOctave = undefined;
let targetOctaveNum = undefined;

editModeToggler.addEventListener("change", () => {
  isEditModeActive = editModeToggler.checked;
  if (isEditModeActive) {

    switch(switchModeType) {
      case "basic": {
        changeStylesForOneRow();
        showFullKbd();

        updateKbdHints();
        updateSoundHints();
        updateDisabledKeys();

        const allKeyElems = document.querySelectorAll(".key");
        allKeyElems.forEach(key => {
          key.removeEventListener("click", test);
          key.addEventListener("click", function test(e) {
            switchBasicModeClick(e, key);
          });
        })

        break;
      }
      case "advanced": {
        
        changeStylesForOneRow();
        showFullKbd();

        updateKbdHints();
        updateSoundHints();
        updateDisabledKeys();

        console.log(advancedModeLayouts);

        const allKeyElems = document.querySelectorAll(".key");
        const playableKbdKeys = document.querySelectorAll(".key[data-key]"); 
        playableKbdKeys.forEach(key => {

        })
        allKeyElems.forEach(key => {
          key.removeEventListener("click", test);
          key.addEventListener("click", function test(e) {
            switchAdvancedModeClick(e, key);
          });
        })
        
        break;
      }
      case "pro": {
        changeStylesForOneRow();
        showFullKbd();

        updateKbdHints();
        updateSoundHints();
        updateDisabledKeys();

        const allKeyElems = document.querySelectorAll(".key");
        const playableKbdKeys = document.querySelectorAll(".key[data-key]"); 
        playableKbdKeys.forEach(key => {

        })
        allKeyElems.forEach(key => {
          key.removeEventListener("click", test);
          key.addEventListener("click", function test(e) {
            switchProModeClick(e, key);
          });
        })

        break;
      }
    }
    

  } else {
    switch(visualMode) {
      case "double": {
        changeStylesForTwoRows();
        hideFullKbd();
        break;
      }
      case "single": {
        hideFullKbd();
        break;
      }
      case "full": {

      }
    }


    const allKeyElems = document.querySelectorAll(".key");
    const playableKbdKeys = document.querySelectorAll(".key[data-key]"); 
    playableKbdKeys.forEach(key => {

    })
    allKeyElems.forEach(key => {
      key.removeEventListener("click", test);
    })
  }
});



function switchBasicModeClick(e, key) {
  console.log(e.target.parentNode.parentNode, key);

  let targetOctave = e.target.parentNode.parentNode;
  let targetBasicNum = Array.from(targetOctave.classList);
  targetBasicNum = targetBasicNum.find(
    className => className.startsWith("keyboard--count")).slice(-1);
  console.log({targetBasicNum});

  let targetDigit = +targetBasicNum;
  const keyElems = document.querySelectorAll(".key");
  keyElems.forEach(keyElem => {
    if (keyElem.classList.contains("js-key-main")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit}`;
    }
    if (keyElem.classList.contains("js-key-sub")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit - 1}`;
    }
    if (keyElem.classList.contains("js-key-sup")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 1}`;
    }
    if (keyElem.classList.contains("js-key-super")) {
      keyElem.dataset.sound = 
        `${keyElem.dataset.sound.slice(0, -1)}${+targetDigit + 2}`;
    }
  })

  updateKbdHints();
  updateSoundHints();

  updateDisabledKeys();

}


function switchAdvancedModeClick(e, key) {
  console.log(e.target.parentNode.parentNode);
  if ((prevOctave === undefined)) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {
      prevOctave = e.target.parentNode.parentNode;
      console.log(prevOctave);
      prevOctaveNum = Array.from(prevOctave.classList);
      prevOctaveNum = prevOctaveNum.find(
        className => className.startsWith("keyboard--count")).slice(-1);
    }

    console.log({prevOctave, prevOctaveNum});
    console.log(advancedModeLayouts);
    //prevOctave = undefined; 
  } else {
    targetOctave = Array.from(e.target.parentNode.parentNode.classList);
    targetOctave = targetOctave.find(
      className => className.startsWith("keyboard--count")).slice(-1);
    console.log({targetOctave});
    console.log(advancedModeLayouts);


    const octaveKeys = prevOctave.querySelectorAll(".key");
    console.log(octaveKeys);

    let octaveName = undefined;
    const keyElems = document.querySelectorAll(".key");
    octaveKeys.forEach(key => {
      //console.log(key.classList);
      let kbdHint = key.querySelector(".js-kbd-key-hint");
      if (kbdHint) {
        console.log(kbdHint.textContent);

        keyElems.forEach(allKey => {
          if (allKey.dataset.symbol === kbdHint.textContent) {
            
            let classes = Array.from(allKey.classList);
            console.log(classes);
            classes = classes.filter(className => (className.startsWith("js-key-") && (className !== "js-key-hideable")));
            if (classes.length === 1) {
              octaveName = classes[0];
            }
            console.log(classes);
          
          }
        })


      };


    });

    //const octaveName = Array.from(octaveKeys[0].classList).find(className => className.startsWith("js-key-"));
    console.log({octaveName});

    const name = octaveName.slice(7);
    console.log({name});

    console.log(advancedModeLayouts);
    advancedModeLayouts[activeAdvancedLayout][name] = +targetOctave;
    console.log(advancedModeLayouts);

    keyElems.forEach(keyElem => {
      let targetClass = Array.from(keyElem.classList).find(keyClass => ["js-key-main", "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
      //console.log({targetClass});
      if ((targetClass)) {
        
        targetClass = targetClass.slice(7);
        keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
          advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
      }
    })
    updateKbdHints();
    updateSoundHints();

    updateDisabledKeys();

    prevOctave = undefined;
    prevOctaveNum = undefined;
    targetOctave = undefined;
  }
}


let pressedProKeyElemClick = undefined;


function switchProModeClick(e, key) {
  console.log(e.target.parentNode.parentNode, key);

  if (!pressedProKeyElemClick) {
    let kdbHint = key.querySelector(".js-kbd-key-hint");
    if (key.dataset && (kdbHint.textContent !== "")) {
      console.log(kdbHint.textContent);

      const keyElems = document.querySelectorAll(".key");
      keyElems.forEach(key => {
        if (kdbHint.textContent === key.dataset.symbol) {
          pressedProKeyElemClick = key;
        }
      })


      console.log({pressedProKeyElemClick});
    } else {
      console.log("fail");
    }
  } else {
    if (key) {
      console.log("target: ", key);
      pressedProKeyElemClick.dataset.sound = key.dataset.display;

      pressedProKeyElemClick = undefined;
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


let pressedOctave = undefined;


export function switchAdvancedMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
      targetKey = targetKey.slice(-1);
    }

    if ((targetKey) && digits.includes(targetKey)) {
      activeAdvancedLayout = targetKey;

      const keyElems = document.querySelectorAll(".key");
      keyElems.forEach(keyElem => {
        let targetClass = Array.from(keyElem.classList).find(keyClass => ["js-key-main", "js-key-sub", "js-key-sup", "js-key-super"].includes(keyClass));
        console.log({targetClass});
        if (targetClass) {
          targetClass = targetClass.slice(7);
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            advancedModeLayouts[activeAdvancedLayout][targetClass]}`;
        }
      })
    }

  } else {
    if (pressedOctave) {
      const pressedOctaveKeys = document.querySelectorAll(`.${pressedOctave}`);
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
        value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
        targetKey = targetKey.slice(-1);
      }

      if (targetKey) {
        pressedOctaveKeys.forEach(keyElem => {
          keyElem.dataset.sound = `${keyElem.dataset.sound.slice(0, -1)}${
            targetKey}`;
        })

        let octaveName = pressedOctave.slice(7);

        advancedModeLayouts[activeAdvancedLayout][octaveName] = +targetKey;
        advInfo.textContent = JSON.stringify(advancedModeLayouts);
      }

      pressedOctave = undefined;
    } else {
      const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
        value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
      let targetKey = undefined;
      if (pressedSymbolKeys.size === 1) {
        targetKey = Array.from(pressedSymbolKeys)[0];
      }
      pressedKeys.delete(targetKey); //optional?

      if (targetKey) {
        const allKeyElems = document.querySelectorAll(".key");
        allKeyElems.forEach(keyElem => {
          if (keyElem.dataset.key === targetKey) {
            keyElem.classList.forEach(className => {
              if (className.startsWith("js-key-")) {
                pressedOctave = className;
              }
            })
          }
        })
      }
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}


let pressedProKeyElem = undefined;


export function switchProMode() {
  if (!isEditModeActive) {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
      targetKey = targetKey.slice(-1);
    }
    if (Number.isInteger(+targetKey)) {
      activeProLayout = targetKey;
    }

    const keyElems = document.querySelectorAll(".key");
    keyElems.forEach(keyElem => {
      if (keyElem.dataset.key in proModeLayouts[activeProLayout]) {
        keyElem.dataset.sound = proModeLayouts[activeProLayout][keyElem.dataset.key];
      }
    })

  } else {
    const pressedSymbolKeys = new Set(([...pressedKeys]).filter(
      value => ((value !== "ShiftLeft") && (value !== "ShiftRight") && (value !== "Space"))));
    let targetKey = undefined;
    if (pressedSymbolKeys.size === 1) {
      targetKey = Array.from(pressedSymbolKeys)[0];
    }
    pressedKeys.delete(targetKey); //optional?

    if ((targetKey) && (noteInput !== document.activeElement) && noteForProMode) {
      const allKeyElems = document.querySelectorAll(".key");
      allKeyElems.forEach(keyElem => {
        if (keyElem.dataset.key === targetKey) {
          pressedProKeyElem = keyElem;
        }
      })
      pressedProKeyElem.dataset.sound = noteForProMode;
      proModeLayouts[activeProLayout][targetKey] = noteForProMode;
      proInfo.textContent = JSON.stringify(proModeLayouts);
    }
  }

  updateSoundHints();
  updateKbdHints();
  updateDisabledKeys();
}