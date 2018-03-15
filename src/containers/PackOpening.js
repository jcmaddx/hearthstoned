'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';
import {fadeIn, fadeOut} from '../utils/helpers';

import Debris from '../components/Debris';
import Card from '../components/Card';

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
			busy: false,
			current: 0
		}
	}

	componentDidMount() {
		document.body.onmousemove = this._track;
		document.body.onmouseup = this._dropEm;
		this._initGrabber();
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
		let ontarget = this._checkTarget(event);
		let sticky = document.getElementById("sticky-pack");
		if(ontarget && sticky.classList.contains('stuck')) {
			this._packOpening();
		} else if (sticky.classList.contains('stuck')) {
			// Restore pack count
			this.props.actions.changeCount("up");
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
		this.props.sounds.packDrop.play();
		this.props.sounds.manaLoop.stop();
		this.setState({busy: true});
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
			tray.classList.add('blurred');
			altar.classList.add('blurred');
		},1300);
		setTimeout(() => {
			this.setState({busy: false});
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

	_flipCard = (card) => {
		card.classList.remove("facedown");
		let remaining = document.getElementsByClassName("facedown").length;
		if(remaining === 0){
			document.getElementById("pack-done").classList.add('show');
		}
	};

	_stageReset = () => {
		let tray = document.getElementById('pack-tray');
		let altar = document.getElementById('altar');
		let packCards = document.getElementById('pack-cards');
		let overlay = document.getElementById('opening-overlay');
		let done = document.getElementById('pack-done');
		tray.classList.remove('blurred');
		altar.classList.remove('blurred');
		packCards.classList.remove('show', 'idle');
		overlay.classList.remove('show');
		done.classList.remove('show');
		this.setState({current: this.state.current + 1});
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
							<div id="altar-glow" className="altar-glow"></div>
							<div id="shockwave" className="shockwave"></div>
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
							(this.state.current < this.props.packs.length ) ? 
							<div id="pack-cards" className="pack-cards">
								{
									Object.keys(this.props.packs[this.state.current]).map((current, key) => {
										let currentCard = this.props.packs[this.state.current][current];
										return <Card key={key}
											facedown={true} 
											callback={this._flipCard} 
											art={current+".jpg"} 
											title={currentCard.title} 
											mana={currentCard.mana} 
											health={currentCard.health} 
											attack={currentCard.attack} 
											rarity={currentCard.rarity} 
											type={currentCard.type} 
											category={currentCard.category} 
											tag={currentCard.tag} 
											description={currentCard.description} />
									})
								}
								<div id="pack-done" onClick={this._stageReset} className="pack-done">Done</div>
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
    count: data.packCount
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