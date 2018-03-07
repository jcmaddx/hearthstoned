'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
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
			busy: false
		}
	}

	componentDidMount() {
		document.body.onmousemove = this._track;
		document.body.onmouseup = this._dropEm;
		this._initGrabber();
	}

	_initGrabber = () => {
		document.getElementById('pack-stack').onmousedown = () => {
			if(!this.state.busy){
				//add grabbing hand
				document.getElementById("hearthstoned").classList.add('grab');
				//show moving pack
				document.getElementById("sticky-pack").classList.add('stuck');
				//hide the main pack -- WONT BE NEEDED LATER
				document.getElementById("main-pack").classList.remove('show');
				//add glow effects for hover
				document.getElementById("drop-glow").classList.add('show');
				document.getElementById("altar-glow").classList.add('show');
				//fade out bg song and add glow sound
				fadeOut(this.props.sounds.betterHand, .5, false);
				fadeIn(this.props.sounds.manaLoop, .5, true);
			}
		};
	};

	_dropEm = (event) => {
		let ontarget = this._checkTarget(event);
		let sticky = document.getElementById("sticky-pack");
		if(ontarget && sticky.classList.contains('stuck')) {
			this._packOpening();
		} else if (sticky.classList.contains('stuck')) {
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
		let pack = document.getElementById('main-pack');
		let debris = document.getElementById('debris');
		let shockwave = document.getElementById('shockwave');
		pack.classList.add('show');
		setTimeout(() => {
			pack.classList.add('burst');
			debris.classList.add('show', 'burst');
			shockwave.classList.add('show', 'burst');
			this.props.sounds.packOpen.play();
		},500);
		setTimeout(() => {
			this.setState({busy: false});
			pack.classList.remove('show','burst');
			debris.classList.remove('show', 'burst');
			shockwave.classList.remove('show', 'burst');
		},4500);
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
			<div className={packClasses}>
				<div id="sticky-pack" className="sticky-pack"></div>
				<div className="opening-container">
					<div id="opening-content" className={contentClasses}>
						<div className="pack-tray">
							<div id="pack-stack" className="packs-available">
								<div className="pack-counter">
									<p>11</p>
								</div>
							</div>
						</div>
						<div className="altar">
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
						<Card facedown={true} art="nick.jpg" title="Nick Hamer" mana={8} health={10} attack={10}  rarity="legendary" type="minion" category="warrior" tag="Cohort" description="A guy I used to work with and will work with AGAIN!" />
						<Card facedown={true} art="thinking.jpg" title="Spell Name" mana={4} rarity="rare" type="spell" category="mage" description="A Spell that can be used to do a thing!" />
						<Debris />
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
    transition: data.transition
  };
}

export default connect(
  mapStateToProps
)(PackOpening);