'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';
import {fadeIn, fadeOut, asyncPlay} from '../utils/helpers';

import Debris from '../components/Debris';
import Card from '../components/Card';
import Button from '../components/Button';

import '../styles/opening.scss';

/**
* PackOpening component
*
* @class PackOpening
* @constructor
*/
class PackOpening extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			busy: true
		}
	}
	componentWillMount() {
		document.onkeyup = this._handleSpace;
	}

	componentDidMount() {
		document.body.onmousemove = this._track;
		document.body.onmouseup = this._dropEm;
		this._initGrabber();
		// half second delay before you can open packs
		setTimeout(() => {
			this.setState({busy: false})
		}, 500)
	}

	componentWillUnmount() {
		document.body.onmousemove = null;
		document.body.onmouseup = null;
		document.onkeyup = null;
	}

	_handleSpace = (event) => {
		event = event || window.event;
    let isSpace = false;
    if ("code" in event) {
        isSpace = (event.code === "Space");
    } else {
        isSpace = (event.keyCode === 32);
    }
    if (isSpace && !this.state.busy && this.props.stage === 2) {
    	// decrease pack count
			this.props.actions.changeCount("down");
			// open pack
      this._packOpening();
    }
	}

	_initGrabber = () => {
		if(document.getElementById('pack-stack')){
			document.getElementById('pack-stack').onmousedown = () => {
				if(!this.state.busy){
					//add grabbing hand
					document.getElementById("hearthstoned").classList.add('grab');
					//show moving pack
					document.getElementById("sticky-pack").classList.add('stuck');
					// decrease pack count
					this.props.actions.changeCount("down");
					//add glow effects for hover
					document.getElementById("drop-glow").classList.add('show');
					document.getElementById("altar-glow").classList.add('show');
					//fade out bg song and add glow sound
					fadeOut(this.props.sounds.betterHand, .5, false);
					fadeIn(this.props.sounds.manaLoop, .5, true);
				}
			};
		}
	};

	_dropEm = (event) => {
		let sticky = document.getElementById("sticky-pack");
		// if we are going back and this doesn't exist when mouseup fires
		if(!sticky){
			return false;
		}
		let ontarget = this._checkTarget(event);
		if(ontarget && sticky.classList.contains('stuck')) {
			this._packOpening();
		} else if (sticky.classList.contains('stuck')) {
			// Restore pack count
			this.props.actions.changeCount("up");
			// re-add grab handler
			if(this.props.count === 1){
				this._initGrabber();
			} 
			// Switch back to song
			this.props.sounds.packDrop.play();
			fadeOut(this.props.sounds.manaLoop, .5, false);
			fadeIn(this.props.sounds.betterHand, .5, false);
		}		
		sticky.classList.remove('stuck');
		document.getElementById("hearthstoned").classList.remove('grab');
		//remove glow effects for hover
		document.getElementById("drop-glow").classList.remove('show');
		document.getElementById("altar-glow").classList.remove('show');
	}

	_packOpening = () => {
		this.setState({busy: true});
		this.props.sounds.packDrop.play();
		this.props.sounds.manaLoop.stop();
		let tray = document.getElementById('pack-tray');
		let altar = document.getElementById('altar');
		let pack = document.getElementById('main-pack');
		let debris = document.getElementById('debris');
		let shockwave = document.getElementById('shockwave');
		let explosions = document.getElementById('explosions');
		let packCards = document.getElementById('pack-cards');
		let overlay = document.getElementById('opening-overlay');
		pack.classList.add('show');
		setTimeout(() => {
			pack.classList.add('burst');
			debris.classList.add('show', 'burst');
			shockwave.classList.add('show', 'burst');
			explosions.classList.add('show', 'burst');
			this.props.sounds.packOpen.play();
		},500);
		setTimeout(() => {
			packCards.classList.add('show', 'burst');
			overlay.classList.add('show');
		},1300);
		setTimeout(() => {
			pack.classList.remove('show','burst');
			debris.classList.remove('show', 'burst');
			shockwave.classList.remove('show', 'burst');
			explosions.classList.remove('show', 'burst');
			packCards.classList.remove('burst');
			packCards.classList.add('idle');
		},2500);
	}

	_checkTarget = (event) => {
		let mouseX = event.clientX,
				mouseY = event.clientY,
				target = document.getElementById('drop-zone'),
				targetRect = target.getBoundingClientRect(),
				ontarget = false;
		if((mouseX >= targetRect.left && mouseX <= targetRect.right) && (mouseY >= targetRect.top && mouseY <= targetRect.bottom)) {
			ontarget = true;
		}
		return ontarget;
	}

	_track = (event) => {
		let sticky = document.getElementById('sticky-pack');
		let packHeight = window.innerHeight * .3;
		let packWidth = packHeight * .70;
		if(sticky){
			event = event || window.event;
	    sticky.style.left = (event.clientX - (packWidth / 2)) + 'px';
	    sticky.style.top = (event.clientY - (packHeight / 2)) + 'px';
		}
	};

	_flipCard = (id, card, rarity, golden, index) => {
		if(!card.classList.contains('cardfront')){
			this.props.actions.gainCard(id);
			let upperRarity = rarity.charAt(0).toUpperCase() + rarity.slice(1);
			let auraSound = "aura"+upperRarity+index;
			let flipSound = "flip"+upperRarity+index;
			// rare cards
			if(rarity !== "common"){
				// add flipping effect for non commons
				card.classList.add("flipping");
				// rarity voice lines
				if(golden){
					asyncPlay(this.props.sounds["golden"+upperRarity], 1);
				} else {
					asyncPlay(this.props.sounds[rarity+index], 1);
				}
				// end aura loop
				fadeOut(this.props.sounds[auraSound], .5, true);
				// delay for special card effects
				setTimeout(() => {
					// rare flip effects
					card.classList.remove("facedown");
					card.classList.add("flipped");
					card.classList.remove("flipping");
					// ensure aura is stopped
					this.props.sounds[auraSound].stop();
					// set remaining cards
					let remaining = document.getElementsByClassName("facedown").length;
					if(remaining === 0){
						document.getElementById("pack-done").classList.add('show');
					}
				}, 1300);
			} else { // common cards
				card.classList.remove("facedown");
				card.classList.add("flipped");
				// set remaining cards
				let remaining = document.getElementsByClassName("facedown").length;
				if(remaining === 0){
					document.getElementById("pack-done").classList.add('show');
				}
			}
			// play flip sound for all rarities
			asyncPlay(this.props.sounds[flipSound], 0.3);
		}
	};

	_stageReset = () => {
		this.props.sounds.cardsDissipate.play({volume: 0.3});
		let packCards = document.getElementById('pack-cards');
		let overlay = document.getElementById('opening-overlay');
		let done = document.getElementById('pack-done');
		packCards.classList.add('fadeaway');
		done.classList.add('fadeaway');
		overlay.classList.add('fadeaway');
		setTimeout(() => {
			this.setState({busy: false});
			packCards.classList.remove('show', 'idle', 'fadeaway');
			overlay.classList.remove('show', 'fadeaway');
			done.classList.remove('show', 'fadeaway');
			this.props.actions.nextPack();
			[].map.call(document.querySelectorAll('.card'), function(el) {
	        el.classList.add('facedown');
	        el.classList.remove("flipped");
	    });
		}, 1500);
	};

	_onHover = (card, rarity, out, index) => {
		if(!card.classList.contains("cardfront") && !out){
			this.props.sounds['cardOver'+index].play();
		}
		if(rarity === "common" || card.classList.contains("cardfront")){
			return false;
		}
		let upperRarity = rarity.charAt(0).toUpperCase() + rarity.slice(1);
		let sound = "aura"+upperRarity+index;
		if(!out){
			fadeIn(this.props.sounds[sound], .5, true, 0.4);
		} else {
			fadeOut(this.props.sounds[sound], .2, true);
		}
	}

	_floatyMouse = () => {
		this.props.sounds.floatyOver.stop();
		this.props.sounds.floatyOver.play();
	};

	_goBack = () => {
		// play sound for going back to hub
		this.props.sounds.boxClose.play();
		// no file loading required. Execute animation
		this.props.sounds.betterHand.stop();
		this.props.sounds.enterBox.play();
		this.props.actions.setTransition("open-out");
		setTimeout(() => {
			this.props.sounds.mainTitle.play({volume: 1, offset: 0});
			this.props.actions.setTransition(null);
			this.props.actions.setStage(1);
		},200);
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let packClasses = classnames({
			"hs-full": true,
			"hs-packs": true,
			"hidden": this.props.stage !== 2 && this.props.transition !== "open-in" && this.props.transition !== "open-out",
			[this.props.transition]: this.props.transition
		});
		let contentClasses = classnames({
			"opening-content": true,
			"busy": this.state.busy
		})
		return(
			<div id="hs-packs" className={packClasses}>
				<div id="sticky-pack" className="sticky-pack"></div>
				<div className="opening-container">
					<div id="opening-content" className={contentClasses}>
						<div id="pack-tray" className="pack-tray">
							{
								(this.props.count > 0) ? 
									<div id="pack-stack" className="packs-available">
									{
										(this.props.count > 1) ? 
										<div className="pack-counter">
											<p>{this.props.count}</p>
										</div>
										: null
									}
								</div>
								: null
							}
						</div>
						<div id="altar" className="altar">
							<h2>Open Packs</h2>
							<div id="altar-glow" className="altar-glow"></div>
							<div id="shockwave" className="shockwave"></div>
							<div className="back-button">
								<Button hover={this.props.sounds.hubHover} cb={this._goBack} text="Back" />
							</div>
						</div>
						<div id="drop-zone" className="drop-zone">
							<div id="main-pack" className="drop-pack"></div>
							<div className="bullseye">
								<div id="drop-glow" className="drop-glow">
									<div className="swirl-glow"></div>
								</div>
							</div>
						</div>
						<Debris />
						{
							(this.props.current < this.props.packs.length ) ? 
							<div id="pack-cards" className="pack-cards">
								{
									Object.keys(this.props.packs[this.props.current]).map((current, key) => {
										let currentCard = this.props.packs[this.props.current][current];
										let extension = (currentCard.hasOwnProperty("golden")) ? ".gif" : ".jpg";
										let artwork = current + extension;
										return <Card key={key}
											cardKey={current}
											listIndex={key}
											facedown={true} 
											callback={this._flipCard}
											onhover={this._onHover}
											art={artwork} 
											title={currentCard.title} 
											mana={currentCard.mana} 
											health={currentCard.health} 
											attack={currentCard.attack} 
											rarity={currentCard.rarity}
											golden={currentCard.hasOwnProperty("golden")} 
											type={currentCard.type} 
											category={currentCard.category} 
											tag={currentCard.tag} 
											description={currentCard.description} />
									})
								}
								<div id="pack-done" onMouseEnter={this._floatyMouse} onClick={this._stageReset} className="pack-done">Done</div>
							</div>
							: null
						}
						<div id="explosions" className="explosions">
							<div className="explosion1"></div>
							<div className="explosion2"></div>
						</div>
						<div id="opening-overlay"></div>
					</div>
				</div>
			</div>
		);
	}
}

/**
* Props available to pass in and their type
*
* @property propTypes
* @type {Object}
*/
PackOpening.propTypes = {
	
};

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    stage: data.stage,
    transition: data.transition,
    packs: data.packs,
    count: data.packCount,
    cards: data.cards,
    current: data.currentPack
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackOpening);