'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

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
	}

	componentDidMount() {
		document.body.onmousemove = this._track;
		document.body.onmouseup = this._dropEm;
		this._initGrabber();
	}

	_initGrabber = () => {
		document.getElementById('pack-stack').onmousedown = () => {
			document.getElementById("sticky-pack").classList.add('stuck');
			document.getElementById("main-pack").classList.remove('show');
		};
	};

	_dropEm = (event) => {
		let ontarget = this._checkTarget(event);
		let sticky = document.getElementById("sticky-pack");
		if(ontarget && sticky.classList.contains('stuck')) {
			this._packOpening();
		}
		sticky.classList.remove('stuck');
	}

	_packOpening = () => {
		let pack = document.getElementById('main-pack');
		pack.classList.add('show');
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
		return(
			<div className={packClasses}>
				<div id="sticky-pack" className="sticky-pack"></div>
				<div className="opening-container">
					<div className="opening-content">
						<div className="pack-tray">
							<div id="pack-stack" className="packs-available">
								<div className="pack-counter">
									<p>11</p>
								</div>
							</div>
						</div>
						<div className="altar">
							<div className="altar-glow"></div>
							<div id="drop-zone" className="drop-zone">
								<div className="bullseye">
									<div className="drop-glow"></div>
									<div id="main-pack" className="drop-pack"></div>
								</div>
							</div>
						</div>
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

export default PackOpening;