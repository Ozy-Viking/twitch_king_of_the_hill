export var audio = [];
export var soundplay = 0;

export function playBattleSound(volume = 0.2, gameLength = 60) {
  let filename = "battle";
  if (gameLength < 56) {
    filename += ".mp3";
  } else if (gameLength < 112) {
    filename += "_mid.mp3";
  } else {
    filename += "_long.mp3";
  }
  playSound(filename, 0, true);
  changeVolume(0, volume, 5000, 30);
}

export function playSound(filename, volume = 0.4, loop = false) {
  audio[soundplay] = new Audio(`static/sound/${filename}`);
  audio[soundplay].volume = volume;
  audio[soundplay].loop = loop;
  audio[soundplay].play();
  soundplay++;
}

export function stepVolume(localSound, localdiff) {
  if (localSound.volume + localdiff <= 0) {
    localSound.volume = 0;
  } else if (localSound.volume + localdiff >= 1) {
    localSound.volume = 1;
  } else {
    localSound.volume += localdiff;
  }
  localSound.play();
}

export function changeVolume(audioID, newVolume, timeSpan, steps = 10) {
  let localSplit = timeSpan / steps;
  let currentVolume = audio[audioID].volume;
  let diff = (newVolume - currentVolume) / steps;
  for (let i = 0; i < steps; i++) {
    setTimeout(stepVolume, localSplit * i, audio[audioID], diff);
  }
}

export function stopAllSound() {
  for (let i = 0; i < audio.length; i++) {
    let sound = audio[i];
    try {
      sound.volume = 0;
      sound.pause();
      sound = null;
    } catch (error) {
      console.error(error);
    }
  }
}

export function loseSound() {
  var yeetNumber = Math.floor(Math.random() * 14) + 1;
  playSound(`yeet${yeetNumber}.mp3`, 0.4);
}
