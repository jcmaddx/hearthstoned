'use strict';

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function fadeOut(sound, time) {
	let seconds = time*1000;
	createjs.Tween.get(sound).to({volume:0.0}, seconds);
	setTimeout(() => {
		sound.stop();
	},seconds);
}

export function fadeIn(sound, time) {
	let seconds = time*1000;
	sound.setVolume(0).play({loop: -1});
	createjs.Tween.get(sound).to({volume:1}, seconds);
}
