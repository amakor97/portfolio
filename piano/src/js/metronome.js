const metronomeAudioFile = document.querySelector(".metron");

const pb = document.querySelector(".plus");
const mb = document.querySelector(".minus");


let length = metronomeAudioFile.duration;
let freq = 60/length;

console.log(metronomeAudioFile);
console.log("def", length);
console.log("def", freq);

console.log("default duration: ", metronomeAudioFile.duration);
console.log("default frequency: ", 60/metronomeAudioFile.duration);
console.log("default playbackRate: ", metronomeAudioFile.playbackRate);

let targetBpm = 60;

//metronomeAudioFile.playbackRate = metronomeAudioFile.playbackRate * targetBpm / freq;

console.log("upd pbRate:", metronomeAudioFile.playbackRate);

metronomeAudioFile.playbackRate = 1.0125 * metronomeAudioFile.duration;

console.log("compens pbRate: ", metronomeAudioFile.playbackRate);

console.log("bpm: ", metronomeAudioFile.playbackRate * 60 * 1.15/metronomeAudioFile.duration);

let audioLength = metronomeAudioFile.duration / metronomeAudioFile.playbackRate;
console.log({audioLength});

console.log(metronomeAudioFile.duration);

const step10 = 10 / freq;
console.log(step10);

pb.addEventListener("click", () => {
  targetBpm += 10;

  //metronomeAudioFile.playbackRate += step10;
  metronomeAudioFile.playbackRate = metronomeAudioFile.playbackRate * targetBpm / freq;
  console.log("freq: ", 60/(metronomeAudioFile.duration*metronomeAudioFile.playbackRate));
  console.log("bpm: ", metronomeAudioFile.playbackRate * 60/metronomeAudioFile.duration);
})


metronomeAudioFile.addEventListener("ended", function(){
  //this.currentTime = 0;
  //this.play();
})