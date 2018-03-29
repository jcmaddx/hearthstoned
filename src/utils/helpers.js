'use strict';

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function asyncPlay(sound, volume) {
	let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_NONE, volume: volume})
	sound.play(props);
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
		sound.setVolume(0).play({interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1});
	}
	createjs.Tween.get(sound).to({volume:toVolume}, seconds);
}

export function setupSounds() {
	let soundsObj = {
		auraEpic0: createjs.Sound.createInstance("aura-epic"),
		auraEpic1: createjs.Sound.createInstance("aura-epic"),
		auraEpic2: createjs.Sound.createInstance("aura-epic"),
		auraEpic3: createjs.Sound.createInstance("aura-epic"),
		auraEpic4: createjs.Sound.createInstance("aura-epic"),
		auraLegendary0: createjs.Sound.createInstance("aura-legendary"),
		auraLegendary1: createjs.Sound.createInstance("aura-legendary"),
		auraLegendary2: createjs.Sound.createInstance("aura-legendary"),
		auraLegendary3: createjs.Sound.createInstance("aura-legendary"),
		auraLegendary4: createjs.Sound.createInstance("aura-legendary"),
		auraRare0: createjs.Sound.createInstance("aura-rare"),
		auraRare1: createjs.Sound.createInstance("aura-rare"),
		auraRare2: createjs.Sound.createInstance("aura-rare"),
		auraRare3: createjs.Sound.createInstance("aura-rare"),
		auraRare4: createjs.Sound.createInstance("aura-rare"),
		backgroundChatter: createjs.Sound.createInstance("background-chatter"),
		betterHand: createjs.Sound.createInstance("better-hand"),
		deckDrop: createjs.Sound.createInstance("deck-drop"),
		dragGlitter: createjs.Sound.createInstance("drag-glitter"),
		enterBox: createjs.Sound.createInstance("enter-box"),
		epic0: createjs.Sound.createInstance("epic"),
		epic1: createjs.Sound.createInstance("epic"),
		epic2: createjs.Sound.createInstance("epic"),
		epic3: createjs.Sound.createInstance("epic"),
		epic4: createjs.Sound.createInstance("epic"),
		existingQuestPopup: createjs.Sound.createInstance("existing-quest-popup"),
		exitBox: createjs.Sound.createInstance("exit-box"),
		flipEpic0: createjs.Sound.createInstance("flip-epic"),
		flipEpic1: createjs.Sound.createInstance("flip-epic"),
		flipEpic2: createjs.Sound.createInstance("flip-epic"),
		flipEpic3: createjs.Sound.createInstance("flip-epic"),
		flipEpic4: createjs.Sound.createInstance("flip-epic"),
		flipLegendary0: createjs.Sound.createInstance("flip-legendary"),
		flipLegendary1: createjs.Sound.createInstance("flip-legendary"),
		flipLegendary2: createjs.Sound.createInstance("flip-legendary"),
		flipLegendary3: createjs.Sound.createInstance("flip-legendary"),
		flipLegendary4: createjs.Sound.createInstance("flip-legendary"),
		flipCommon0: createjs.Sound.createInstance("flip-common"),
		flipCommon1: createjs.Sound.createInstance("flip-common"),
		flipCommon2: createjs.Sound.createInstance("flip-common"),
		flipCommon3: createjs.Sound.createInstance("flip-common"),
		flipCommon4: createjs.Sound.createInstance("flip-common"),
		flipRare0: createjs.Sound.createInstance("flip-rare"),
		flipRare1: createjs.Sound.createInstance("flip-rare"),
		flipRare2: createjs.Sound.createInstance("flip-rare"),
		flipRare3: createjs.Sound.createInstance("flip-rare"),
		flipRare4: createjs.Sound.createInstance("flip-rare"),
		goldenLegendary: createjs.Sound.createInstance("golden-legendary"),
		hover: createjs.Sound.createInstance("hover"),
		hubFlip: createjs.Sound.createInstance("hub-flip"),
		hubHover: createjs.Sound.createInstance("hub-hover"),
		legendary0: createjs.Sound.createInstance("legendary"),
		legendary1: createjs.Sound.createInstance("legendary"),
		legendary2: createjs.Sound.createInstance("legendary"),
		legendary3: createjs.Sound.createInstance("legendary"),
		legendary4: createjs.Sound.createInstance("legendary"),
		mainTitle: createjs.Sound.createInstance("main-title"),
		manaLoop: createjs.Sound.createInstance("mana-loop"),
		newQuestsClose: createjs.Sound.createInstance("new-quests-close"),
		nope: createjs.Sound.createInstance("nope"),
		packDrop: createjs.Sound.createInstance("pack-drop"),
		packOpen: createjs.Sound.createInstance("pack-open"),
		questButtonHover: createjs.Sound.createInstance("quest-button-hover"),
		questLogClose: createjs.Sound.createInstance("quest-log-close"),
		questLogOpen: createjs.Sound.createInstance("quest-log-open"),
		rare0: createjs.Sound.createInstance("rare"),
		rare1: createjs.Sound.createInstance("rare"),
		rare2: createjs.Sound.createInstance("rare"),
		rare3: createjs.Sound.createInstance("rare"),
		rare4: createjs.Sound.createInstance("rare"),
		smallClick: createjs.Sound.createInstance("small-click"),
		trayClick: createjs.Sound.createInstance("tray-click"),
		trayOut: createjs.Sound.createInstance("tray-out")
	}
	return soundsObj;
}
