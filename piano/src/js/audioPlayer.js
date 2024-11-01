"use strict";

import { updateRecorder } from "./recorder.js";

export function createAudio(audioSrc) {
  console.log("initiate creating audio controls...");

  let state = false;
  let rafRef = null;

  const audioCont = document.createElement("div");
  audioCont.classList.add("js-audio-player-cont", "audio");

  const audio = document.createElement("audio");
  audio.src = audioSrc;
  audioCont.append(audio);

  const playPauseBtn = document.createElement("button");
  playPauseBtn.classList.add("js-audio-player-play-btn", "audio__play-btn");
  playPauseBtn.textContent = "PL";
  audioCont.append(playPauseBtn);


  const timeCont = document.createElement("span");
  audioCont.append(timeCont);

  const curTime = document.createElement("span");
  curTime.classList.add("js-audio-player-cur-time", "audio__cur-time");
  curTime.textContent = "0:00";
  timeCont.append(curTime);

  const timeDivider = document.createElement("span");
  timeDivider.classList.add("js-audio-player-dur-time", "audio__dur-time");
  timeDivider.textContent = " / ";
  timeCont.append(timeDivider);

  const durTime = document.createElement("span");
  durTime.classList.add("js-audio-player-dur-time", "audio__dur-time");
  durTime.textContent = "0:00";
  timeCont.append(durTime);


  const seekInput = document.createElement("input");
  seekInput.classList.add("js-audio-player-seek-input", "audio__seek-input");
  seekInput.type = "range";
  seekInput.max = "100";
  seekInput.value = "0";
  audioCont.append(seekInput);


  const volumeInput = document.createElement("input");
  volumeInput.classList.add("js-audio-player-volume-input", "audio__volume-input");
  volumeInput.type = "range";
  volumeInput.max = "100";
  volumeInput.value = "100";
  audioCont.append(volumeInput);


  const volumeLevelCont = document.createElement("span");
  audioCont.append(volumeLevelCont);

  const volumeLevel = document.createElement("span");
  volumeLevel.classList.add("js-audio-player-volume-level", "audio__volume-level");
  volumeLevel.textContent = "100";
  volumeLevelCont.append(volumeLevel);

  const volumeUnit = document.createElement("span");
  volumeUnit.textContent = "%";
  volumeLevelCont.append(volumeUnit);

  const delBtn = document.createElement("button");
  delBtn.classList.add("js-audio-player-del-btn", "audio__del-btn");
  delBtn.textContent = "DEL";
  audioCont.append(delBtn);


  function prepareAudioHandler(obj, e) {
    console.log(e);
    console.log(obj);
    console.log(prepareAudioWrapper);
    prepareAudio(e, obj, prepareAudioWrapper, durTime);
  }

  const prepareAudioWrapper = prepareAudioHandler.bind(null, rafRef);

  if (audio.duration === Infinity || isNaN(Number(audio.duration))) {
    audio.currentTime = 1e101;
    audio.addEventListener("timeupdate", prepareAudioWrapper);
  } else {
    console.log("else");
    audio.addEventListener("timeupdate", prepareAudioWrapper); //???
  }

  const whilePlaying = () => {
    console.log("playing");
    seekInput.value = Math.floor(audio.currentTime);
    curTime.textContent = calculateTime(seekInput.value);
    seekInput.style.setProperty('--seek-before-width', `${seekInput.value / seekInput.max * 100}%`);


    if (audio.currentTime === audio.duration) {
      cancelAnimationFrame(rafRef);
      audio.pause();
      audio.load();
      seekInput.value = 0;
      seekInput.style.setProperty('--seek-before-width', `${0}%`);
      state = false;
    } else {
      if (audio.paused) {
        audio.play();
      }

      rafRef = requestAnimationFrame(whilePlaying);
    }
  }

  playPauseBtn.addEventListener("click", () => {
    if (state === false) {
      audio.play();
      requestAnimationFrame(whilePlaying);
      state = true;
      playPauseBtn.textContent = "PS";
    } else {
      audio.pause();
      cancelAnimationFrame(rafRef);
      state = false;
      playPauseBtn.textContent = "PL";
    }
  })

  seekInput.addEventListener("input", () => {
    curTime.textContent = calculateTime(seekInput.value);
    seekInput.style.setProperty('--seek-before-width', `${seekInput.value / seekInput.max * 100}%`);
    if (!audio.paused) {
      cancelAnimationFrame(rafRef);
    }
  })

  seekInput.addEventListener("change", () => {
    audio.currentTime = seekInput.value;
    console.log(state);
    if (!audio.paused && (audio.currentTime !== audio.duration)) {
      requestAnimationFrame(whilePlaying);
    } else {
      console.log("paused?");
    }
  })

  volumeInput.style.setProperty('--volume-before-width', "100%");

  volumeInput.addEventListener("input", (e) => {
    const value = e.target.value;
    volumeLevel.textContent = value;

    audio.volume = value / 100;


    volumeInput.style.setProperty('--volume-before-width', value / volumeInput.max * 100 + '%');
  })

  delBtn.addEventListener("click", () => {
    audioCont.remove();
    updateRecorder("delete");
  })

  return audioCont;
}


function prepareAudio(e, rafRef, prepareAudioWrapper, durTime) {
  e.target.removeEventListener("timeupdate", prepareAudioWrapper);

  const audioElem = e.target;
  const parentElem = audioElem.parentElement;
  const seekInput = parentElem.querySelector(".js-audio-player-seek-input");

  getDuration(e, durTime);
  setSliderMax(audioElem, seekInput);
}



const setSliderMax = (audioElem, sliderElem) => {
  sliderElem.max = Math.floor(audioElem.duration);
}

function getDuration(e, durTime) {
  e.target.currentTime = 0;
  e.target.removeEventListener("timeupdate", getDuration);
  durTime.textContent = calculateTime(e.target.duration);
  return e.target.duration;
}

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}
