"use strict";

import { updateRecorder } from "./recorder.js";


const playIcon = `
  <svg 
    fill="none" 
    height="24" 
    width="24"  
    viewBox="0 0 58.752 58.752">
    <path d="M52.524 23.925L12.507 0.824c-1.907-1.1-4.376-1.097-6.276 0C4.293 
      1.94 3.088 4.025 3.088 6.264v46.205 c0 2.24 1.204 4.325 3.131 5.435c0.953 
      0.555 2.042 0.848 3.149 0.848c1.104 0 2.192-0.292 3.141-0.843l40.017-23.103
      c1.936-1.119 3.138-3.203 3.138-5.439C55.663 27.134 54.462 25.05 52.524 
      23.925z M49.524 29.612L9.504 52.716 c-0.082 0.047-0.18 
      0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1 
      0.052-0.192 0.14-0.243 c0.042-0.025 0.09-0.038 0.139-0.038c0.051 0 0.099 
      0.013 0.142 0.038l40.01 23.098c0.089 0.052 0.145 0.147 0.145 0.249
    C49.663 29.47 49.611 29.561 49.524 29.612z" fill="currentColor"/>
  </svg>`;

const crossIcon = `
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none">
    <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 
      4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 
      12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 
      19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 
      13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 
      19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 
      12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 
      4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 
      10.5858L6.2253 4.81108Z"
    fill="currentColor"/>
  </svg>`;

const pauseIcon = `
  <svg width="800px" height="800px" viewBox="-1 0 8 8">
    <g transform="translate(-227.000000, -3765.000000)">
      <g transform="translate(56.000000, 160.000000)">
        <path d="M172 3605 C171.448,3605 171,3605.448 171,3606 L171,3612 
          C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 
          173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 
          L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,
          3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 
          C176.552,3605 177,3605.448 177,3606" fill="currentColor"/>
      </g>
    </g>
  </svg>`;


export function createAudio(audioSrc) {
  let state = false;
  let rafRef = null;

  const audioCont = document.createElement("div");
  audioCont.classList.add("js-audio-player-cont", "audio");

  const audio = document.createElement("audio");
  audio.src = audioSrc;
  audioCont.append(audio);

  const playPauseBtn = document.createElement("button");
  playPauseBtn.classList.add(
    "js-audio-player-play-btn", "audio__play-btn");
  playPauseBtn.innerHTML = playIcon;
  audioCont.append(playPauseBtn);

  const timeCont = document.createElement("span");
  audioCont.append(timeCont);

  const curTime = document.createElement("span");
  curTime.classList.add(
    "js-audio-player-cur-time", "audio__cur-time");
  curTime.textContent = "0:00";
  timeCont.append(curTime);

  const timeDivider = document.createElement("span");
  timeDivider.classList.add(
    "js-audio-player-dur-time", "audio__dur-time");
  timeDivider.textContent = " / ";
  timeCont.append(timeDivider);

  const durTime = document.createElement("span");
  durTime.classList.add(
    "js-audio-player-dur-time", "audio__dur-time");
  durTime.textContent = "0:00";
  timeCont.append(durTime);

  const seekInput = document.createElement("input");
  seekInput.classList.add(
    "js-audio-player-seek-input", "audio__seek-input");
  seekInput.type = "range";
  seekInput.max = "100";
  seekInput.value = "0";
  audioCont.append(seekInput);

  const volumeInput = document.createElement("input");
  volumeInput.classList.add(
    "js-audio-player-volume-input", "audio__volume-input");
  volumeInput.type = "range";
  volumeInput.max = "100";
  volumeInput.value = "100";
  audioCont.append(volumeInput);

  const volumeLevelCont = document.createElement("span");
  audioCont.append(volumeLevelCont);

  const volumeLevel = document.createElement("span");
  volumeLevel.classList.add(
    "js-audio-player-volume-level", "audio__volume-level");
  volumeLevel.textContent = "100";
  volumeLevelCont.append(volumeLevel);

  const volumeUnit = document.createElement("span");
  volumeUnit.textContent = "%";
  volumeLevelCont.append(volumeUnit);

  const delBtn = document.createElement("button");
  delBtn.classList.add("js-audio-player-del-btn", "audio__del-btn");
  delBtn.innerHTML = crossIcon;
  audioCont.append(delBtn);


  function prepareAudioHandler(obj, e) {
    prepareAudio(e, prepareAudioWrapper, durTime);
  }

  const prepareAudioWrapper = prepareAudioHandler.bind(null, rafRef);


  if (audio.duration === Infinity || isNaN(Number(audio.duration))) {
    audio.currentTime = 1e101;
    audio.addEventListener("timeupdate", prepareAudioWrapper);
  } else {
    audio.addEventListener("timeupdate", prepareAudioWrapper); //???
  }


  const whilePlaying = () => {
    seekInput.value = Math.floor(audio.currentTime);
    curTime.textContent = calculateTime(seekInput.value);
    seekInput.style.setProperty("--seek-before-width", 
      `${seekInput.value / seekInput.max * 100}%`);

    if (audio.currentTime === audio.duration) {
      cancelAnimationFrame(rafRef);
      audio.pause();
      audio.load();
      seekInput.value = 0;
      seekInput.style.setProperty("--seek-before-width", `${0}%`);
      state = false;
      playPauseBtn.innerHTML = playIcon;
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
      playPauseBtn.innerHTML = pauseIcon;
    } else {
      audio.pause();
      cancelAnimationFrame(rafRef);
      state = false;
      playPauseBtn.innerHTML = playIcon;
    }
  })

  seekInput.addEventListener("input", () => {
    curTime.textContent = calculateTime(seekInput.value);
    seekInput.style.setProperty("--seek-before-width", 
      `${seekInput.value / seekInput.max * 100}%`);
    if (!audio.paused) {
      cancelAnimationFrame(rafRef);
    }
  })

  seekInput.addEventListener("change", () => {
    audio.currentTime = seekInput.value;
    if (!audio.paused && (audio.currentTime !== audio.duration)) {
      requestAnimationFrame(whilePlaying);
    }
  })

  volumeInput.style.setProperty("--volume-before-width", "100%");

  volumeInput.addEventListener("input", (e) => {
    const value = e.target.value;
    volumeLevel.textContent = value;
    audio.volume = value / 100;
    volumeInput.style.setProperty("--volume-before-width", 
      value / volumeInput.max * 100 + "%");
  })

  delBtn.addEventListener("click", () => {
    audioCont.remove();
    updateRecorder("delete");
  })

  return audioCont;
}


function prepareAudio(e, prepareAudioWrapper, durTime) {
  e.target.removeEventListener("timeupdate", prepareAudioWrapper);

  const audioElem = e.target;
  const parentElem = audioElem.parentElement;
  const seekInput = parentElem.querySelector(
    ".js-audio-player-seek-input");

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
