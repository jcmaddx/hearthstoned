'use strict';

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function fadeOut(sound, time, stop) {
	let seconds = time*1000;
	createjs.Tween.get(sound).to({volume:0.0}, seconds);
	if(stop){
		setTimeout(() => {
			sound.stop();
		},seconds);
	}
}

export function fadeIn(sound, time, start, volume) {
	let seconds = time*1000;
	let toVolume = (volume) ? volume : 1;
	if(start){
		sound.setVolume(0).play({loop: -1});
	}
	createjs.Tween.get(sound).to({volume:toVolume}, seconds);
}

export function setupSounds() {
	let soundsObj = {
		auraEpic: createjs.Sound.createInstance("aura-epic"),
		auraLegendary: createjs.Sound.createInstance("aura-legendary"),
		auraRare: createjs.Sound.createInstance("aura-rare"),
		backgroundChatter: createjs.Sound.createInstance("background-chatter"),
		betterHand: createjs.Sound.createInstance("better-hand"),
		deckDrop: createjs.Sound.createInstance("deck-drop"),
		dragGlitter: createjs.Sound.createInstance("drag-glitter"),
		enterBox: createjs.Sound.createInstance("enter-box"),
		epic: createjs.Sound.createInstance("epic"),
		existingQuestPopup: createjs.Sound.createInstance("existing-quest-popup"),
		exitBox: createjs.Sound.createInstance("exit-box"),
		flipEpic: createjs.Sound.createInstance("flip-epic"),
		flipLegendary: createjs.Sound.createInstance("flip-legendary"),
		flipCommon: createjs.Sound.createInstance("flip-common"),
		flipRare: createjs.Sound.createInstance("flip-rare"),
		goldenLegendary: createjs.Sound.createInstance("golden-legendary"),
		hover: createjs.Sound.createInstance("hover"),
		hubFlip: createjs.Sound.createInstance("hub-flip"),
		hubHover: createjs.Sound.createInstance("hub-hover"),
		legendary: createjs.Sound.createInstance("legendary"),
		mainTitle: createjs.Sound.createInstance("main-title"),
		manaLoop: createjs.Sound.createInstance("mana-loop"),
		newQuestsClose: createjs.Sound.createInstance("new-quests-close"),
		nope: createjs.Sound.createInstance("nope"),
		packDrop: createjs.Sound.createInstance("pack-drop"),
		packOpen: createjs.Sound.createInstance("pack-open"),
		questButtonHover: createjs.Sound.createInstance("quest-button-hover"),
		questLogClose: createjs.Sound.createInstance("quest-log-close"),
		questLogOpen: createjs.Sound.createInstance("quest-log-open"),
		rare: createjs.Sound.createInstance("rare"),
		smallClick: createjs.Sound.createInstance("small-click"),
		trayClick: createjs.Sound.createInstance("tray-click"),
		trayOut: createjs.Sound.createInstance("tray-out")
	}
	return soundsObj;
}
