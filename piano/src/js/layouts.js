export const basicLayout = {
  "q": "C-1",
  "2": "Db-1",
  "w": "D-1",
  "3": "Eb-1",
  "e": "E-1",
  "r": "F-1",
  "5": "Gb-1",
  "t": "G-1",
  "6": "Ab-1",
  "y": "A-1",
  "7": "Bb-1",
  "u": "B-1",
  "z": "C+0",
  "s": "Db+0",
  "x": "D+0",
  "d": "Eb+0",
  "c": "E+0",
  "v": "F+0",
  "g": "Gb+0",
  "b": "G+0",
  "h": "Ab+0",
  "n": "A+0",
  "j": "Bb+0",
  "m": "B+0",
  ",": "C+1",
  "l": "Db+1",
  ".": "D+1",
  ";": "Eb+1",
  "/": "E+1",
  "i": "F+1",
  "9": "Gb+1",
  "o": "G+1",
  "0": "Ab+1",
  "p": "A+1",
  "-": "Bb+1",
  "[": "B+1",
  "]": "C+2"
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


export function createAdvancedModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createAdvancedModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}


function createProModeSingleLayout() {
  const playableKbdKeys = document.querySelectorAll(".key[data-key]");  
  let layout = {};

  playableKbdKeys.forEach(kbdKey => {
    let key = kbdKey.dataset.key;
    let sound = kbdKey.dataset.display;
    layout[key] = sound;
  })
  return layout;
}


export function createProModeLayouts(num) {
  let layouts = [];
  for (let i = 0; i < num; i++) {
    let layout = createProModeSingleLayout();
    layouts.push(layout);
  }
  return layouts;
}